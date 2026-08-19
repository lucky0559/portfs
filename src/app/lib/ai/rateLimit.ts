export type RateVerdict = { allowed: true } | { allowed: false; retryAfterSeconds: number };

export function checkChatRate(_ip: string): RateVerdict {
  return { allowed: true };
}

export function checkLeadQuota(_ip: string): RateVerdict {
  return { allowed: true };
}

export function recordLead(_ip: string): void {
  return;
}
