/**
 * Per-IP rate limits for the public API routes.
 *
 * In-memory sliding windows: right for one Node process (Hostinger runs one
 * per site). The counts reset when the app restarts, which is fine for abuse
 * control. If the site ever runs on several instances, move this to a shared
 * store (Redis, Upstash) behind the same function.
 *
 * Sizes, so a real visitor never meets them:
 *   chat — one full Talon conversation is at most 20 visitor turns (the
 *          client sends the last 20 messages; the route caps a conversation
 *          at 40). 25 per 10 minutes covers a whole conversation with room to
 *          retry, whether it's about starting a project or, later, Codaze
 *          guidance on the parent articles. 100 a day covers several.
 *   lead — the contact form: 5 an hour, 15 a day.
 */

type Window = { limit: number; ms: number };
export type LimitName = 'chat' | 'lead';

const LIMITS: Record<LimitName, Window[]> = {
  chat: [
    { limit: 25, ms: 10 * 60_000 },
    { limit: 100, ms: 24 * 60 * 60_000 },
  ],
  lead: [
    { limit: 5, ms: 60 * 60_000 },
    { limit: 15, ms: 24 * 60 * 60_000 },
  ],
};

const MAX_TRACKED = 10_000;
const hits = new Map<string, number[]>(); // key → request timestamps (ms), oldest first

/** The visitor's IP from the proxy headers Hostinger sets, or null if absent. */
export function clientIp(req: Request): string | null {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) {
    const first = fwd.split(',')[0]?.trim();
    if (first) return first;
  }
  return req.headers.get('x-real-ip')?.trim() || null;
}

function prune(now: number) {
  if (hits.size <= MAX_TRACKED) return;
  const longest = Math.max(...Object.values(LIMITS).flat().map(w => w.ms));
  for (const [key, times] of hits) {
    if (!times.length || now - times[times.length - 1] > longest) hits.delete(key);
  }
  // Still too many: drop the oldest entries (Map keeps insertion order).
  while (hits.size > MAX_TRACKED) {
    const oldest = hits.keys().next().value;
    if (oldest === undefined) break;
    hits.delete(oldest);
  }
}

/**
 * Records one request and reports whether it is allowed. A request with no
 * IP header is allowed: grouping every such visitor under one key would let
 * one of them lock out the rest.
 */
export function rateLimit(name: LimitName, ip: string | null): { ok: true } | { ok: false; retryAfter: number } {
  if (!ip) return { ok: true };
  const now = Date.now();
  const windows = LIMITS[name];
  const longest = Math.max(...windows.map(w => w.ms));
  const key = `${name}:${ip}`;
  const times = (hits.get(key) ?? []).filter(t => now - t < longest);

  for (const w of windows) {
    const inWindow = times.filter(t => now - t < w.ms);
    if (inWindow.length >= w.limit) {
      const retryAfter = Math.max(1, Math.ceil((inWindow[0] + w.ms - now) / 1000));
      hits.set(key, times);
      return { ok: false, retryAfter };
    }
  }

  times.push(now);
  hits.delete(key); // re-insert so recently active keys sit at the end
  hits.set(key, times);
  prune(now);
  return { ok: true };
}
