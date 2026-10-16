import 'server-only';

/**
 * Lightweight spam protection for the contact and newsletter forms, on top of the hidden honeypot field.
 * Nothing here needs an account or a key. Suspected bots get a normal-looking "success" so they do not retry.
 */

const MIN_FILL_MS = 2500; // People take longer than this to fill in a form; scripts usually do not.
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

/** True when the form was submitted implausibly fast after the page loaded. Missing timing data is allowed. */
export function submittedTooFast(startedAt: unknown) {
  const started = Number(startedAt);
  if (!Number.isFinite(started) || started <= 0) return false;
  const elapsed = Date.now() - started;
  return elapsed >= 0 && elapsed < MIN_FILL_MS;
}

/** Messages stuffed with links or markup are almost always spam. */
export function looksLikeSpam(...fields: string[]) {
  const text = fields.join(' ');
  const links = text.match(/https?:\/\/|www\./gi)?.length || 0;
  return links > 3 || /<a\s+href|\[url=|\[link=/i.test(text);
}

function clientKey(request: Request, scope: string) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return `${scope}:${forwarded || request.headers.get('x-real-ip') || 'unknown'}`;
}

/**
 * Allows `limit` submissions per visitor per 10 minutes on each server instance.
 * Not a hard guarantee across instances, but it stops a single script hammering the form.
 */
export function rateLimited(request: Request, scope: string, limit: number) {
  const key = clientKey(request, scope);
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [entry, times] of hits) if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entry);
  }
  return recent.length > limit;
}
