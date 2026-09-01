# portfs

Personal portfolio for Lucky Angelo Rabosa, built as a Next.js App Router site. It presents selected work, career history, skills, a time-aware light/dark theme, a contact form, and an optional AI chat assistant.

## Documentation scope

Repository documentation is intentionally kept in this README. The repository-level `docs/` directory is disabled and should not be recreated or updated; project tracking and architecture notes live in the linked Obsidian vault.

## Stack

- Next.js 13.4 with the App Router
- React 18 and TypeScript 5.1
- Hand-written BEM CSS with OKLCH theme tokens
- Anthropic Messages API for the optional portfolio chat
- Nodemailer with Gmail for contact and chat lead delivery
- Vitest for unit tests
- Vercel-compatible Node.js runtime

## Requirements

- Node.js 20 or newer, as declared in `package.json`
- npm, using the committed `package-lock.json`
- A Gmail account with an App Password if contact or chat lead delivery is enabled
- An Anthropic API key if the chat assistant is enabled

## Local setup

```bash
npm ci
cp .env.local.example .env.local
```

Fill in `.env.local` before starting the site. The file is gitignored and must never be committed.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The development server reloads automatically as source files change.

## Environment variables

| Variable | Required when | Purpose |
| --- | --- | --- |
| `GMAIL_USER` | Contact form or chat lead delivery is used | Gmail account used as the sender and recipient of portfolio messages. |
| `GMAIL_APP_PASSWORD` | Contact form or chat lead delivery is used | Google App Password for the Gmail account. Do not use the account password. |
| `ANTHROPIC_API_KEY` | Chat is enabled | Server-only credential for the Anthropic Messages API. Never expose it through a `NEXT_PUBLIC_*` variable. |
| `ANTHROPIC_MODEL` | Optional | Anthropic model override. Defaults to `claude-haiku-4-5-20251001`. |
| `NEXT_PUBLIC_CHAT_ENABLED` | Optional | The chat launcher is shown only when this value is exactly `true`. |

For Gmail, enable 2-Step Verification, create an App Password under Google Account Security, and copy the generated value into `GMAIL_APP_PASSWORD`. The example file contains the same setup reminder.

## Useful commands

```bash
npm run dev       # Start the local development server
npm run lint      # Run Next.js ESLint checks
npm test          # Run the Vitest suite once
npm run test:watch
npm run build     # Compile, lint, type-check, and generate the production app
npm run start     # Serve the latest production build
```

## Project content

The portfolio content is kept in source constants rather than a CMS:

- `src/app/constants/Projects.ts` contains project summaries, capabilities, and image references.
- `src/app/constants/Experience.ts` contains education and work history.
- `src/app/constants/Voice.ts` contains first-person context used by the assistant.
- `src/app/lib/ai/knowledge.ts` compiles those constants into the assistant's reference block.

When adding a project or role, update the relevant constant and run `npm test` plus `npm run build` to catch formatting, type, and knowledge-block regressions.

## Theme and profile imagery

Theme resolution lives in `src/app/lib/theme.ts`, `src/app/components/ThemeToggle.tsx`, and `src/app/globals.css`.

- Without a saved preference, the visitor's local time selects light mode from 07:00 through 18:59 and dark mode from 19:00 through 06:59.
- A manual selection is stored under the `portfolio-theme` local-storage key and takes precedence over the time-based default.
- Theme changes use the shared 440ms transition and skip animation for `prefers-reduced-motion: reduce`.
- The profile card uses `public/profile-light.jpeg` in light mode and `public/profile-dark.jpeg` in dark mode, with a layered opacity crossfade between them.

## Chat and contact APIs

The public API surface is intentionally small:

- `POST /api/chat` accepts a bounded message history and streams assistant events as Server-Sent Events. It is available only when `ANTHROPIC_API_KEY` is configured.
- `POST /api/contact` accepts the contact form payload and sends it through the Gmail transport.

Both routes keep credentials on the server. The current controls and failure behavior are summarized below.

### API abuse controls and failures

- Chat accepts at most 20 messages with a 2,000-character limit per message, allows 15 requests per IP per 5 minutes, and returns `429` with `Retry-After` when the in-memory limit is exceeded.
- Chat lead submission requires at least two visitor turns, validates the lead fields, escapes the email HTML, and allows two successful lead submissions per IP per hour in the current process.
- A missing Anthropic key returns `503`; provider or tool failures after streaming begins are sent as SSE `error` events followed by `done`.
- Contact rejects missing required fields with `400` and returns a generic `500` for malformed JSON or email-transport failures.
- The direct contact route currently has no server-side quota or CAPTCHA and interpolates fields into the received HTML email. Treat browser validation as a convenience, not a security boundary.
- The rate limiter is process-local and resets on restart or cold start. It is not a distributed production quota.

## Safe local API smoke checks

These checks exercise validation and configuration failures without sending an email or calling Anthropic:

```bash
# Start the app in one terminal first.
npm run dev

# Invalid chat payload: expected HTTP 400.
curl -i -X POST http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  --data '{"messages":[]}'

# Valid-shaped chat request with no Anthropic credential: expected HTTP 503.
curl -i -X POST http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  --data '{"messages":[{"role":"user","content":"What work is shown here?"}]}'

# Missing contact fields: expected HTTP 400.
curl -i -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  --data '{}'
```

Do not use a valid contact payload for a smoke test unless you intend to send a real message. Do not run a valid chat smoke test against a configured Anthropic key unless an external API call is expected.

## Deployment

The app can be deployed to Vercel or another Node.js host that supports Next.js 13.4:

1. Configure the production environment variables from the table above in the hosting provider.
2. Keep `ANTHROPIC_API_KEY`, `GMAIL_USER`, and `GMAIL_APP_PASSWORD` server-only.
3. Use Node.js 20 or newer.
4. Run `npm run build` during deployment and `npm run start` for a traditional Node server.
5. Confirm the configured public URL matches the canonical and Open Graph URL in `src/app/layout.tsx`.

The current rate limiter uses an in-memory map. It is useful as a lightweight guard, but it is per process and resets on cold starts, so it is not a distributed abuse-control boundary for a multi-instance deployment.

## Verification status

The current repository verification includes:

- `npm test`: 43 tests passed across 5 files.
- `npm run lint`: no ESLint warnings or errors.
- `npm run build`: production compilation, linting, type checking, static generation, and route optimization passed.
- Local browser verification: light/dark profile imagery and the profile-image crossfade were checked at runtime with no browser console errors.

The test runner reports a non-blocking Vite configuration warning about future native config loading, and Next.js reports that the repository's Browserslist data is outdated. Neither warning prevented verification from passing.
