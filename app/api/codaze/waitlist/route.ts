import { NextResponse } from 'next/server';
import { clientIp, rateLimit } from '@/lib/rate-limit';

/**
 * Codaze waitlist signups from alldaze.studio/codaze.
 *
 * Inserts one row into `codaze_waitlist` in the Codaze Supabase project over
 * PostgREST with the anon key. The table's RLS allows anon INSERT and nothing
 * else, so this key can't read the list back. Server-only env, never
 * NEXT_PUBLIC_:
 *
 *   CODAZE_SUPABASE_URL       https://<ref>.supabase.co
 *   CODAZE_SUPABASE_ANON_KEY  the project's anon (public) key
 *
 * Migration: supabase/migrations/20261026000000_codaze_waitlist.sql in the
 * Codaze repo. Until both are in place the form says signups are paused.
 *
 * Responses: 200 on a new signup or an email already on the list (no way to
 * probe who signed up), 400 bad JSON, 413 too large, 415 wrong type,
 * 422 bad email, 429 rate limited, 503 not configured, 502/504 upstream.
 */

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const COPARENT_APP = new Set(['yes', 'no', 'not-yet']);
const MAX_BODY = 2_000;
const SOURCE = 'alldaze.studio/codaze';

function json(status: number, body: Record<string, unknown>, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

export async function POST(req: Request) {
  const limited = rateLimit('waitlist', clientIp(req));
  if (!limited.ok) {
    return json(
      429,
      { error: 'Too many tries from this connection. Try again in a little while.' },
      { 'Retry-After': String(limited.retryAfter) },
    );
  }

  if (!(req.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) {
    return json(415, { error: 'Invalid request' });
  }
  const raw = await req.text();
  if (raw.length > MAX_BODY) return json(413, { error: 'Invalid request' });

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
    body = parsed as Record<string, unknown>;
  } catch {
    return json(400, { error: 'Invalid request' });
  }

  // Honeypot: a person never sees this field. Pretend it worked.
  if (typeof body.company === 'string' && body.company.trim() !== '') return json(200, { ok: true });

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return json(422, { error: 'That email looks incomplete. Check for a missing @ or domain.' });
  }
  const coparentApp =
    typeof body.coparentApp === 'string' && COPARENT_APP.has(body.coparentApp) ? body.coparentApp : null;

  const url = process.env.CODAZE_SUPABASE_URL?.replace(/\/+$/, '');
  const key = process.env.CODAZE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error('[codaze-waitlist] CODAZE_SUPABASE_URL or CODAZE_SUPABASE_ANON_KEY is not set');
    return json(503, { error: 'Signups are paused for a moment. Try again later.' });
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8_000);
  try {
    const res = await fetch(`${url}/rest/v1/codaze_waitlist`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email, coparent_app: coparentApp, source: SOURCE }),
      signal: ctrl.signal,
      cache: 'no-store',
    });
    if (res.ok) return json(200, { ok: true });

    const detail = (await res.json().catch(() => null)) as { code?: string; message?: string } | null;
    // 23505 = unique_violation: already on the list. Same answer as a new signup.
    if (res.status === 409 || detail?.code === '23505') return json(200, { ok: true });
    // 23514 = check_violation: the table's own email check said no.
    if (detail?.code === '23514') {
      return json(422, { error: 'That email looks incomplete. Check for a missing @ or domain.' });
    }
    console.error('[codaze-waitlist] insert failed', res.status, detail?.code, detail?.message);
    return json(502, { error: 'That didn’t go through. Try again in a moment.' });
  } catch (err) {
    const aborted = ctrl.signal.aborted;
    console.error('[codaze-waitlist]', aborted ? 'timed out' : 'network error', aborted ? '' : String(err));
    return json(aborted ? 504 : 502, { error: 'That didn’t go through. Try again in a moment.' });
  } finally {
    clearTimeout(timer);
  }
}
