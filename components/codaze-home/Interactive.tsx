'use client';

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Held, replay } from './Held';

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

/** The rail's mark turns once when the swap moment reaches mid-screen. */
export function RailMark({ targetId }: { targetId: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || !ref.current || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          replay(ref.current);
          io.disconnect();
        }
      },
      { rootMargin: '-40% 0px -40% 0px' },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [targetId]);
  return <Held size={36} svgRef={ref} />;
}

export function SwapCard() {
  const [done, setDone] = useState(false);
  const mark = useRef<SVGSVGElement>(null);
  return (
    <div className="ui">
      <div className="ui-row">
        <Held size={44} svgRef={mark} />
        <div className="grow">
          <div className="ui-strong">Swap at 6:00 PM</div>
          <div className="ui-meta tnum" aria-live="polite">
            {done ? 'Confirmed at 6:02 PM' : 'Theo goes to Dana’s'}
          </div>
        </div>
      </div>
      <div className="ui-actions">
        <button
          type="button"
          className="btn btn-primary"
          disabled={done}
          onClick={() => {
            replay(mark.current);
            setDone(true);
          }}
        >
          {done ? 'Confirmed' : 'Confirm handoff'}
        </button>
      </div>
    </div>
  );
}

// The app's check-in scale (types/journal MOOD_LABELS in the Codaze repo).
const MOODS = ['Rough', 'Uneven', 'Okay', 'Good', 'Full'] as const;

export function MoodChips() {
  const [mood, setMood] = useState<string | null>(null);
  const label = useId();
  return (
    <div className="ui">
      <div className="ui-strong" id={label}>How was today with Theo?</div>
      <div className="chips" role="group" aria-labelledby={label}>
        {MOODS.map((m) => (
          <button
            key={m}
            type="button"
            className="mood"
            aria-pressed={mood === m}
            onClick={() => setMood((cur) => (cur === m ? null : m))}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="ui-meta">Promise this week: Be at Ava’s soccer · Sat 10:00 AM</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Journal                                                             */
/* ------------------------------------------------------------------ */

const MODES = [
  { id: 'moment', label: 'Moment' },
  { id: 'promise', label: 'Promise' },
  { id: 'ritual', label: 'Ritual' },
] as const;
type Mode = (typeof MODES)[number]['id'];

const PROMPTS = [
  'What’s one thing you noticed about them today?',
  'What did today need from you?',
  'Something small worth remembering.',
  'What made them laugh?',
  'What would you do the same way tomorrow?',
];
const EXAMPLE = 'Theo read the whole page out loud before bed.';

const REPLIES = {
  kept: 'Noted. It’s in your Journal for this week.',
  partly: 'Noted. Want to add a line about what got in the way?',
  next: 'Noted. It stays on your list for next week.',
} as const;
type Answer = keyof typeof REPLIES;
const ANSWERS: { id: Answer; label: string }[] = [
  { id: 'kept', label: 'Kept it' },
  { id: 'partly', label: 'Partly' },
  { id: 'next', label: 'Next time' },
];

export function JournalDemo() {
  const [mode, setMode] = useState<Mode>('moment');
  const [prompt, setPrompt] = useState(0);
  const [text, setText] = useState(EXAMPLE);
  const [edited, setEdited] = useState(false);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const segRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ta = useRef<HTMLTextAreaElement>(null);

  function onSegKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const cur = MODES.findIndex((m) => m.id === mode);
    const next = (cur + (e.key === 'ArrowRight' ? 1 : -1) + MODES.length) % MODES.length;
    setMode(MODES[next].id);
    segRefs.current[next]?.focus();
  }

  return (
    <div className="jdemo">
      <div className="seg" role="group" aria-label="Composer mode" onKeyDown={onSegKey}>
        {MODES.map((m, i) => (
          <button
            key={m.id}
            ref={(el) => {
              segRefs.current[i] = el;
            }}
            type="button"
            aria-pressed={mode === m.id}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="composer">
        {mode === 'moment' && (
          <div className="stack">
            <label htmlFor="moment-text">Moment · Theo · Tue, Oct 14</label>
            <textarea
              id="moment-text"
              ref={ta}
              placeholder={PROMPTS[prompt]}
              value={text}
              maxLength={600}
              onChange={(e) => {
                setText(e.target.value);
                setEdited(true);
              }}
            />
            <div className="ctools">
              <button
                type="button"
                className="tool"
                onClick={() => {
                  setPrompt((p) => (p + 1) % PROMPTS.length);
                  if (!edited || text.trim() === '') setText('');
                  ta.current?.focus();
                }}
              >
                Try another prompt
              </button>
              <span className="tool" aria-hidden="true">Photo</span>
              <span className="tool" aria-hidden="true">Voice note</span>
            </div>
          </div>
        )}
        {mode === 'promise' && (
          <div>
            <p className="big">Be at Ava’s soccer.</p>
            <div className="field"><span>When</span><span className="tnum">Sat, Oct 18 · 10:00 AM</span></div>
            <div className="field"><span>For</span><span>Ava</span></div>
            <div className="field"><span>Check-in</span><span>Weekly reflection</span></div>
          </div>
        )}
        {mode === 'ritual' && (
          <div>
            <p className="big">Saturday pancakes.</p>
            <div className="field"><span>Repeats</span><span>Every Saturday</span></div>
            <div className="field"><span>With</span><span>Theo and Ava</span></div>
            <div className="field"><span>If life gets busy</span><span>Pause or end</span></div>
          </div>
        )}
      </div>

      <div className="reflect">
        <span className="eyebrow">Weekly reflection</span>
        <div className="ui-strong" id="reflect-q">Be at Ava’s soccer · Sat 10:00 AM</div>
        <div className="answers" role="group" aria-labelledby="reflect-q">
          {ANSWERS.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={answer === a.id}
              onClick={() => setAnswer((cur) => (cur === a.id ? null : a.id))}
            >
              {a.label}
            </button>
          ))}
        </div>
        <p className="reply" aria-live="polite">{answer ? REPLIES[answer] : ''}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Waitlist                                                            */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type Status = 'idle' | 'sending' | 'done';
type CoparentApp = 'yes' | 'no' | 'not-yet';

function validate(v: string) {
  if (!v) return 'Enter your email so we can tell you when Codaze is ready.';
  if (v.length > 254 || !EMAIL_RE.test(v)) return 'That email looks incomplete. Check for a missing @ or domain.';
  return '';
}

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [cp, setCp] = useState<CoparentApp | ''>('');
  const [company, setCompany] = useState(''); // honeypot
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState('');
  const [sentTo, setSentTo] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fieldError = touched ? validate(email.trim()) : '';

  useEffect(() => {
    if (status === 'done') doneRef.current?.focus();
  }, [status]);
  useEffect(() => () => abortRef.current?.abort(), []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setTouched(true);
    setFormError('');
    const addr = email.trim();
    if (validate(addr)) {
      emailRef.current?.focus();
      return;
    }
    setStatus('sending');
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const timer = window.setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch('/api/codaze/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: addr, coparentApp: cp || null, company }),
        signal: ctrl.signal,
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus('idle');
        setFormError(data.error || 'That didn’t go through. Try again in a moment.');
        return;
      }
      setSentTo(addr);
      setStatus('done');
    } catch {
      setStatus('idle');
      setFormError(
        ctrl.signal.aborted
          ? 'That took too long. Check your connection and try again.'
          : 'That didn’t go through. Check your connection and try again.',
      );
    } finally {
      window.clearTimeout(timer);
    }
  }

  function reset() {
    setEmail('');
    setCp('');
    setTouched(false);
    setFormError('');
    setStatus('idle');
    window.setTimeout(() => emailRef.current?.focus(), 0);
  }

  if (status === 'done') {
    return (
      <div className="success">
        <h3 tabIndex={-1} ref={doneRef}>You’re on the list.</h3>
        <p className="lede">We’ll email {sentTo} when Codaze is ready to download.</p>
        <div>
          <button className="btn btn-ghost btn-sm" type="button" onClick={reset}>
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={status === 'sending'}>
      <div className="stack" style={{ gap: 8 }}>
        <label className="flabel" htmlFor="wl-email">Email</label>
        <input
          ref={emailRef}
          id="wl-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          maxLength={254}
          aria-invalid={fieldError ? true : undefined}
          aria-describedby="wl-email-err"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => email.trim() && setTouched(true)}
        />
        <div className="err" id="wl-email-err" aria-live="polite">{fieldError}</div>
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="wl-company">Company</label>
        <input id="wl-company" name="company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <fieldset>
        <legend>Is your coparent using a coparenting app? <span className="fine">(optional)</span></legend>
        <div className="radios">
          {(
            [
              ['yes', 'Yes'],
              ['no', 'No'],
              ['not-yet', 'Not yet'],
            ] as const
          ).map(([v, l]) => (
            <label className="radio" key={v}>
              <input type="radio" name="coparentApp" value={v} checked={cp === v} onChange={() => setCp(v)} />
              <span>{l}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="cta-row">
        <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Joining…' : 'Join the waitlist'}
        </button>
      </div>
      <p className="form-err" role="alert">{formError}</p>
      <p className="fine">
        We use your email only to tell you when Codaze is out. <a href="/codaze/privacy#waitlist">Privacy</a>
      </p>
    </form>
  );
}
