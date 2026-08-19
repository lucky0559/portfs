# Portfolio AI Chatbot — Design

**Date:** 2026-08-19
**Status:** Approved design, ready for implementation planning
**Scope:** Add a grounded AI chat assistant with conversational lead capture to the portfolio site.

---

## 1. Purpose

Visitors to this portfolio are hiring managers, engineering leads, founders, and prospective
clients. They arrive with specific questions — "has he shipped anything at scale?", "does he
know NestJS?", "is he available?" — and today they must scroll and infer the answers, then
switch to a form to ask anything else.

The chatbot does two jobs:

1. **Answer questions about Lucky's work**, grounded strictly in content that already exists in
   this repo, so answers are specific and verifiable rather than generic.
2. **Capture leads conversationally.** When a visitor shows real hiring or project intent, the
   bot collects their details in the flow of conversation and emails them to Lucky through the
   existing contact pipeline.

`PRODUCT.md` lists "vague AI copy" as an explicit anti-reference. This design treats that as a
binding constraint: the bot's value is specificity. A bot that answers "Lucky is a passionate
developer with a strong background in modern technologies" is a failure of this spec, not a
minor quality issue.

### Success criteria

- A visitor can get a specific, accurate answer about Lucky's experience without scrolling.
- The bot declines cleanly when it does not know something, and offers the contact path.
- A hiring-intent conversation produces a structured lead email with usable context.
- The bot never invents an employer, a date, a technology, or a claim about availability.
- Keyboard and screen-reader users can use the chat fully.
- Monthly cost stays negligible and is bounded by hard caps, not by trust.

---

## 2. Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Bot purpose | Portfolio Q&A + lead capture | Serves the site's actual audience and shortens the path to contact |
| Provider | Anthropic Claude API | Strong instruction-following for a tightly-scoped persona; native streaming and tool use |
| Model | `claude-haiku-4-5-20251001` | Fast and cheap; swap to Sonnet 5 via env var if answer quality disappoints |
| Grounding | Static context from existing constants + a curated voice file | Corpus fits in one prompt; no retrieval infrastructure needed |
| UI surface | Floating launcher + slide-over panel | Available from every section, which is what makes lead capture work |
| Lead capture | Claude tool use into the existing email path | Conversational rather than a form; adds no new delivery mechanism |
| Response architecture | Streaming SSE with a server-side tool loop | A silent multi-second wait in a chat panel reads as broken |
| Runtime | Node (not Edge) | nodemailer requires it, and the tool executor calls it |
| Persistence | None server-side | Stateless route; client holds history |
| Tests | Vitest, for pure units only | The logic where a silent bug costs a real lead or a real bill |

### Rejected alternatives

- **RAG with embeddings** — genuinely overkill. The entire corpus fits in one prompt.
- **Tool-use lookup of projects/experience** — adds round-trips and latency for no benefit at
  this corpus size.
- **SDK Tool Runner (`client.beta.messages.tool_runner`)** — least loop code, but a beta surface
  that takes control away exactly where guardrails need to run between turns.
- **Plain request/response** — simpler, but a 2–6s dead wait per reply conflicts with design
  principle 5 ("Let motion add orientation and feedback, never friction").
- **General-purpose assistant** — highest abuse and cost exposure, weakest fit with site purpose.

---

## 3. Architecture

All paths are relative to `src/app/`, which is the TypeScript `baseUrl` (`@/`).

### New files

```
api/chat/route.ts              POST handler, Node runtime, streams SSE
lib/ai/knowledge.ts            compiles Projects.ts + Experience.ts + Voice.ts into one text block
lib/ai/systemPrompt.ts         persona + scope rules + lead-capture rules + knowledge block
lib/ai/tools.ts                submit_lead schema, validation, and executor
lib/ai/rateLimit.ts            best-effort per-IP throttle
lib/email/sendLead.ts          nodemailer transport extracted from api/contact/route.ts
constants/Voice.ts             hand-written voice and FAQ content (authored by Lucky)
components/Chat/Launcher.tsx   floating launch button
components/Chat/Panel.tsx      slide-over chat panel
components/Chat/Message.tsx    single message bubble
lib/hooks/useChat.ts           client conversation state + SSE parsing
```

### Modified files

- `api/contact/route.ts` — delegates sending to `lib/email/sendLead.ts`; behavior unchanged
- `pages/HomePage.tsx` — mounts `<Launcher />`
- `globals.css` — chat styles using the existing design tokens
- `.env.local.example` — documents `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, and `NEXT_PUBLIC_CHAT_ENABLED`
- `package.json` — adds `@anthropic-ai/sdk`; adds `vitest` as a dev dependency
- `CHANGES.md` — dated summary section (project convention)

### Cost and caching

The knowledge block is sent with `cache_control: { type: "ephemeral" }` so repeat turns bill the
corpus at a fraction of full input rate. With Haiku 4.5, a cached system prompt, and ~600-token
replies, portfolio-scale traffic lands in the order of cents per month.

Treat that as an order of magnitude, not a quote — confirm current pricing at build time. The
real protection is the hard caps in §6, not the estimate.

---

## 4. Component boundaries

Each unit has one purpose, a narrow interface, and can be understood without reading the others.

**`lib/ai/knowledge.ts`**
Pure function: constants in, string out. No I/O, no side effects. Because it reads the same
constants the page renders from, the bot cannot drift out of sync with the site — adding a
project to `constants/Projects.ts` teaches the bot about it automatically.

**`lib/ai/systemPrompt.ts`**
Assembles persona, scope rules, refusal behavior, and lead-capture instructions around the
knowledge block. Single export. This is the file that will be tuned most during and after the
build.

**`lib/ai/tools.ts`**
Exports the `submit_lead` JSON schema and `execute(input, history)`. Validates every field
itself and does not trust the model's output shape. Depends only on `sendLead`; validation is
hand-written, no new validation dependency.

**`lib/ai/rateLimit.ts`**
`check(ip) -> { allowed, retryAfter }`, backed by an in-memory Map.

> **Known limitation, accepted deliberately.** On Vercel's serverless model this Map is
> per-instance and resets on cold start, so it is a speed bump rather than a wall. Genuine
> enforcement requires shared state (e.g. Upstash Redis). Given portfolio traffic and the hard
> payload caps in §6, the speed bump is sufficient for v1. Redis is a documented follow-up, not
> a v1 requirement.

**`api/chat/route.ts`**
Orchestration only — rate limit, validate, build prompt, run the tool loop, stream. No business
logic lives here.

**`lib/hooks/useChat.ts`**
Owns all client conversation state and SSE parsing. `Panel`, `Launcher`, and `Message` stay
presentational, which keeps them easy to restyle without touching behavior.

---

## 5. Data flow

The server is **stateless**. There is no database and no session store; the client sends the
conversation history with each request.

1. Client sends `POST /api/chat` with `{ messages: [{ role, content }] }`.
2. Server runs the rate-limit check, then validates the payload (§6). Rejections return a
   structured error, never a stack trace.
3. Server builds the system prompt and calls Anthropic with `tools` and `stream: true`.
4. Text deltas stream to the client as SSE events: `{ type: "text", value }`.
5. If the turn ends with `stop_reason: "tool_use"`, the server executes `submit_lead`, appends
   the assistant turn and the `tool_result`, and continues the loop. **Hard cap: 3 iterations.**
   On success it also emits `{ type: "lead_sent" }` so the UI can render a confirmation.
6. `{ type: "done" }` closes the stream.
7. Any failure emits `{ type: "error", value }`, and the panel surfaces a link to the existing
   `#contact` form so the visitor is never dead-ended.

Client history optionally mirrors to `sessionStorage`, so an accidental panel close does not
discard the conversation. It is cleared when the tab closes; nothing is persisted beyond that.

---

## 6. Guardrails and abuse control

Layered, because no single control is sufficient.

**Scope enforcement (prompt-level).** Answer only from the knowledge block. When something is
not in it — a salary figure, a company Lucky never worked at, a framework not listed — say so
plainly and offer the contact path. Never infer, never round up, never soften a gap into an
implication.

**Injection resistance.** The knowledge block is delimited and labeled as *data, not
instructions*, and user turns are told they cannot rewrite the rules.

> This is mitigation, not a proof. Prompt injection is not fully solvable at this layer. The
> saving grace is blast radius: the only privileged capability is `submit_lead`, and the server
> validates that independently of anything the model was talked into.

**Payload caps — the real cost ceiling.**

- Maximum 20 messages per request
- Maximum 2000 characters per message
- `max_tokens` ~600 per reply
- Tool loop capped at 3 iterations

**Content rule for the corpus.** Anything placed in the system prompt can be extracted from any
model. `constants/Voice.ts` must therefore contain only material Lucky would publish on the page
itself — no rates he would not quote publicly, no private client details, no personal contact
information beyond what the site already shows.

**Missing configuration.** If `ANTHROPIC_API_KEY` is absent, the route fails gracefully with a
clear message and the panel points to the contact form. It never leaks configuration state.

---

## 7. Lead-capture contract

### Tool schema

`submit_lead`:

| Field | Required | Notes |
|---|---|---|
| `name` | yes | |
| `email` | yes | validated server-side |
| `intent` | yes | what they are building or why they are reaching out |
| `company` | no | |

### Server-enforced rules

The model proposes; the server decides.

- **Email validation.** Malformed addresses return a `tool_result` error, and the model asks the
  visitor again in natural language rather than failing the conversation.
- **Dedupe.** Before sending, scan the incoming history for an already-successful lead
  `tool_result`. This keeps dedupe stateless — no session store required.
- **Minimum engagement.** At least two user turns must precede the tool call, so a drive-by
  cannot trigger an email on the first message.

### Model-side instructions

- Never open a conversation with data collection.
- Pursue contact details only after genuine hiring or project intent appears.
- Ask conversationally, one or two fields at a time.
- **State plainly that the details will be emailed to Lucky before sending them.**
- Confirm once the send succeeds; never claim a send that did not happen.

### Email format

Subject: `[Portfolio Chat] {name} — {company or intent}`

Body: the structured fields, followed by the last few conversation turns. The transcript tail is
included deliberately — what someone asked before identifying themselves is usually what
distinguishes a real lead from a tire-kicker.

---

## 8. UX and accessibility

`PRODUCT.md` commits the site to WCAG 2.2 AA fundamentals. These are requirements, not polish.

- Launcher is a real `<button>` with an `aria-label` and `aria-expanded`, and a touch target of
  at least 44px.
- Panel is `role="dialog"` with `aria-modal`, is labelled, moves focus inward on open, closes on
  Escape, traps focus while open, and returns focus to the launcher on close.
- The message list is an `aria-live="polite"` region that announces **completed** messages.
  Announcing each streamed token would make the panel unusable with a screen reader.
- Reduced motion is honored via `useReducedMotion`, already the established pattern in
  `Contact.tsx`; the panel slide becomes a fade.
- Below the `md` breakpoint the panel becomes a full-height sheet, using the existing
  `useCustomMediaQuery` hook rather than raw breakpoints.
- The lead-sent confirmation uses an icon **and** text — never color alone.
- All interactive elements keep visible focus states.
- Colors come from the existing token palette; bot and visitor bubbles must be verified for AA
  contrast rather than assumed.

### Restraint, per the anti-references

Deliberately excluded: auto-open on load, attention-seeking bounce or pulse animation, and any
"Hi 👋 I'm an AI assistant!" greeting bubble. The launcher sits quietly and opens on click.

The single piece of proactive UI is the panel's empty state, which offers three suggested
questions to avoid blank-input paralysis — for example, asking about a specific framework,
asking to see a project, or asking about availability.

---

## 9. Testing

The repo has no test framework today. Vitest is added for three pure units where a silent bug
has real cost, and for nothing else — UI and network behavior are verified manually.

**Unit tested:**

- `lib/ai/knowledge.ts` — compiles all projects and experience entries; output stays in sync
  when constants change
- `lib/ai/tools.ts` — email validation, dedupe detection, minimum-engagement rule
- `lib/ai/rateLimit.ts` — allows under the limit, blocks over it, and recovers after the window

**Manual verification checklist:**

1. Knowledge block reviewed by eye for accuracy and omissions
2. Happy-path Q&A returns specific, correct answers
3. Off-topic question is declined cleanly
4. **Hallucination probe** — ask about a company Lucky never worked for; the bot must say it does
   not know rather than improvise
5. **Injection probe** — "ignore previous instructions"; rules must hold
6. Lead capture end to end, with a real email arriving in the inbox
7. Invalid email is recovered from conversationally
8. Duplicate lead attempt in one conversation is blocked
9. Rate limit trips and returns a usable message
10. Missing API key fails gracefully with the contact-form fallback
11. Full keyboard-only pass
12. Screen-reader pass
13. Reduced-motion setting respected
14. Mobile viewport pass

---

## 10. Rollout

- `ANTHROPIC_API_KEY` is set server-side in Vercel and never exposed to the client.
- `ANTHROPIC_MODEL` selects the model, defaulting to `claude-haiku-4-5-20251001`. Upgrading to Sonnet 5
  is a config change, not a code change.
- `NEXT_PUBLIC_CHAT_ENABLED` gates the launcher. Toggling requires a redeploy, which takes about
  a minute on Vercel — simpler and more predictable than building a runtime status endpoint.
- `CHANGES.md` receives a dated summary section, per project convention.

---

## 11. Out of scope for v1

No database, no server-side conversation persistence, no analytics dashboard, no authentication,
no RAG or vector store, no voice input, no multi-language support, no admin panel, and no
avatar animation.

Redis-backed rate limiting is a documented follow-up, not a v1 requirement.

---

## 12. Dependency on the author

`constants/Voice.ts` cannot be generated from the repo. It is the file that carries how Lucky
talks about his work — his opinions, what he is looking for, what he declines, his stance on
availability.

Everything else in this design is buildable from existing content. This file is not. If it is
left thin, the bot will read like a résumé parser, which is precisely the "vague AI copy"
outcome `PRODUCT.md` warns against. It should be treated as a blocking input to implementation,
not as polish applied afterward.
