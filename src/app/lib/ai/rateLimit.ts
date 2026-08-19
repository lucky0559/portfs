const CHAT_WINDOW_MS = 5 * 60 * 1000;
const CHAT_MAX_REQUESTS = 15;
const LEAD_WINDOW_MS = 60 * 60 * 1000;
const LEAD_MAX = 2;

export type RateVerdict = { allowed: true } | { allowed: false; retryAfterSeconds: number };

const chatHits = new Map<string, number[]>();
const leadHits = new Map<string, number[]>();

const prune = (store: Map<string, number[]>, ip: string, windowMs: number): number[] => {
  const cutoff = Date.now() - windowMs;
  const kept = (store.get(ip) ?? []).filter((at) => at > cutoff);
  if (kept.length > 0) {
    store.set(ip, kept);
  } else {
    store.delete(ip);
  }
  return kept;
};

const retryAfter = (hits: number[], windowMs: number): number => {
  const oldest = hits[0] ?? Date.now();
  return Math.max(1, Math.ceil((oldest + windowMs - Date.now()) / 1000));
};

export function checkChatRate(ip: string): RateVerdict {
  const hits = prune(chatHits, ip, CHAT_WINDOW_MS);

  if (hits.length >= CHAT_MAX_REQUESTS) {
    return { allowed: false, retryAfterSeconds: retryAfter(hits, CHAT_WINDOW_MS) };
  }

  hits.push(Date.now());
  chatHits.set(ip, hits);
  return { allowed: true };
}

export function checkLeadQuota(ip: string): RateVerdict {
  const hits = prune(leadHits, ip, LEAD_WINDOW_MS);

  if (hits.length >= LEAD_MAX) {
    return { allowed: false, retryAfterSeconds: retryAfter(hits, LEAD_WINDOW_MS) };
  }

  return { allowed: true };
}

export function recordLead(ip: string): void {
  const hits = prune(leadHits, ip, LEAD_WINDOW_MS);
  hits.push(Date.now());
  leadHits.set(ip, hits);
}

export function __resetRateLimitForTests(): void {
  chatHits.clear();
  leadHits.clear();
}
