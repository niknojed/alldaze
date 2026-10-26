import type { Metadata } from 'next';
import Link from 'next/link';
import { Held } from '@/components/codaze-home/Held';
import { JournalDemo, MoodChips, RailMark, SwapCard, WaitlistForm } from '@/components/codaze-home/Interactive';
import { LEGAL_ENTITY, TRADE_NAME } from '@/components/legal/shared';
import './home.css';

export const metadata: Metadata = {
  title: { absolute: 'Codaze · Coparenting app for parents in two homes' },
  description:
    'Codaze keeps pickups, swaps and promises in order between two homes, with a private Journal for the time you have with your kids. iPhone first. Join the waitlist.',
  alternates: { canonical: '/codaze' },
  openGraph: {
    title: 'Codaze · Be there for the walk home.',
    description: 'Pickups, swaps and promises in order between two homes. Join the waitlist.',
    url: '/codaze',
    siteName: 'Codaze',
    type: 'website',
    images: [{ url: '/codaze/dad-daughter.webp', width: 1200, height: 800, alt: 'A dad and his daughter walking home.' }],
  },
};

type Moment = {
  id: string;
  time: string;
  period: string;
  title: string;
  tint: string;
  h: string;
  body: string;
  img: { src: string; w: number; h: number; alt: string };
  card: React.ReactNode;
  more?: boolean;
};
type Beat = { id: string; time: string; h: string; body: string };

const DROP_CARD = (
  <div className="ui">
    <div className="ui-row">
      <span className="avatar" style={{ background: 'var(--kid-b)' }} aria-hidden="true">A</span>
      <div className="grow">
        <div className="ui-strong">Dropoff · Little Oaks</div>
        <div className="ui-meta tnum">You · 7:40 AM</div>
      </div>
    </div>
    <div className="chips">
      <span className="chip ok">Confirmed</span>
      <span className="chip">Packed: lunch, blanket</span>
    </div>
  </div>
);

const LATE_CARD = (
  <div className="ui">
    <div className="ui-row">
      <span className="avatar" style={{ background: 'var(--kid-a)' }} aria-hidden="true">T</span>
      <div className="grow">
        <div className="ui-strong">Pickup · Lincoln Elementary</div>
        <div className="ui-meta tnum">You · new time 3:30 PM</div>
      </div>
    </div>
    <div className="chips">
      <span className="chip late">Running late</span>
    </div>
    <div className="ui-meta">Text to Dana, ready to send: “Running 15 min late. I’ll be at the gate at 3:30.”</div>
  </div>
);

const DAY: (Moment | Beat)[] = [
  {
    id: 'm1', time: '7:40 AM', period: 'Morning', title: 'Dropoff', tint: 'var(--morning)',
    h: 'Ava points out every dog on the way to daycare.',
    body: 'You stay on the walk. Codaze already knows who’s doing dropoff and what’s packed.',
    img: { src: '/codaze/stroller.webp', w: 570, h: 524, alt: 'A parent pushes a toddler in a stroller past city trees.' },
    card: DROP_CARD,
  },
  {
    id: 'm2', time: '3:15 PM', period: 'Afternoon', title: 'Pickup', tint: 'var(--afternoon)',
    h: 'Theo is waiting at the gate, and he knows you’re coming.',
    body: 'Running late? Codaze writes the text to his mom with the new time. You hit send. Nobody else gets a ping.',
    img: { src: '/codaze/coffee.webp', w: 701, h: 515, alt: 'A mom with a coffee walks her son home after school.' },
    card: LATE_CARD,
  },
  { id: 'b1', time: '4:05 PM', h: 'The long way home, past the fire station.', body: 'Nothing to log.' },
  {
    id: 'm3', time: '6:00 PM', period: 'Evening', title: 'Swap', tint: 'var(--evening)',
    h: 'A goodbye at the door, and a hello on the other side.',
    body: 'Anything that changed was settled earlier. You confirm the handoff, and it goes in the record with the time it happened.',
    img: { src: '/codaze/dad-son-night.webp', w: 1200, h: 800, alt: 'A dad with a backpack walks hand in hand with his son.' },
    card: <SwapCard />,
  },
  { id: 'b2', time: '7:30 PM', h: 'Ava picks the second book. Then a third.', body: 'Nothing to log.' },
  {
    id: 'm4', time: '8:45 PM', period: 'Night', title: 'Journal', tint: 'var(--night)',
    h: 'You write down what Theo said about the fire trucks.',
    body: 'A one-word check-in on how the day went, and a line you’ll want to read again someday.',
    img: { src: '/codaze/mom-daughter-night.webp', w: 1200, h: 800, alt: 'A mom walks her daughter home, both looking ahead.' },
    card: <MoodChips />,
    more: true,
  },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Does my coparent need the app?',
    a: 'No. Add them as a contact and your plan works from the first day. Requests and running-late notes go to them as a normal text or email that you send. You can invite them later.',
  },
  {
    q: 'Who can see my Journal?',
    a: 'Only you. Your Journal is private to your account. Your coparent can’t see it, and neither can anyone you add to a plan.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. Codaze is free while we build it. If paid plans come later, we’ll tell you before anything changes.',
  },
  {
    q: 'What do you store?',
    a: (
      <>
        Your account, your kids’ names and colours, the people and plans you add, and your Journal. Your location is used on your phone during a swap and is
        never uploaded. The <Link href="/codaze/privacy">privacy policy</Link> has the full list.
      </>
    ),
  },
  {
    q: 'Is it on Android?',
    a: 'Codaze launches on iPhone. Android comes after that. Join the waitlist and we’ll tell you when it’s ready.',
  },
  {
    q: 'Does it work for partners and blended families?',
    a: 'Yes. Each kid can have a coparent, and you can add a partner who lives with you. Each plan is set up per kid, so different schedules for different kids work too.',
  },
];

function isMoment(x: Moment | Beat): x is Moment {
  return 'period' in x;
}

export default function CodazeHome() {
  return (
    <div className="czh">
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav">
        <div className="wrap">
          <Link className="lockup" href="/codaze" aria-label="Codaze home">
            <Held size={34} className="load" />
            codaze
          </Link>
          <nav className="nav-links" aria-label="Sections">
            <a href="#day">How it works</a>
            <a href="#journal">Journal</a>
            <a href="#handoffs">Handoffs</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="btn btn-primary btn-sm" href="#waitlist">Join the waitlist</a>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="h1">
          <div className="wrap grid">
            <div className="stack">
              <span className="eyebrow">For parents in two homes</span>
              <h1 id="h1">Be there for the walk home.</h1>
              <p className="lede">
                Codaze keeps pickups, swaps, and promises in order between two homes, so time with your kids can just be time with your kids. Free while we build it.
              </p>
              <nav className="pillars" aria-label="What’s inside">
                <a className="pill" href="#day">Schedule and swaps</a>
                <a className="pill" href="#journal">Journal</a>
                <a className="pill" href="#handoffs">Calm handoffs</a>
              </nav>
              <div className="cta-row">
                <a className="btn btn-primary" href="#waitlist">Join the waitlist</a>
                <a className="btn btn-ghost" href="#day">See a day</a>
              </div>
              <p className="fine">iPhone first. Your coparent never needs an account.</p>
            </div>
            <img
              className="walk-in"
              src="/codaze/dad-daughter.webp"
              width={1200}
              height={800}
              alt="A dad carrying groceries walks hand in hand with his daughter through the city."
            />
          </div>
        </section>

        <section className="section" id="day" aria-labelledby="day-h">
          <div className="wrap">
            <span className="eyebrow">A day in two homes</span>
            <h2 id="day-h" style={{ marginTop: 12 }}>One Tuesday, start to finish.</h2>
            <p className="lede day-lede">Codaze shows up when something needs doing, then gets out of the way.</p>
            <div className="day-grid">
              <div className="rail" aria-hidden="true">
                <div className="rail-mark"><RailMark targetId="m3" /></div>
              </div>
              <div className="day-list">
                {DAY.map((m) =>
                  isMoment(m) ? (
                    <article className="moment" id={m.id} key={m.id} style={{ background: m.tint }} aria-labelledby={`${m.id}-h`}>
                      <div className="timecol">
                        <div className="time tnum">{m.time}</div>
                        <div className="period">{m.period} · {m.title}</div>
                      </div>
                      <div className="body">
                        <h3 id={`${m.id}-h`}>{m.h}</h3>
                        <p>{m.body}</p>
                        <div className="handled">
                          <span className="handled-k">What Codaze handled</span>
                          {m.card}
                        </div>
                        {m.more && <a className="more" href="#journal">More about Journal</a>}
                      </div>
                      <img className="walk-in" src={m.img.src} width={m.img.w} height={m.img.h} alt={m.img.alt} loading="lazy" decoding="async" />
                    </article>
                  ) : (
                    <article className="beat" key={m.id} aria-labelledby={`${m.id}-h`}>
                      <div className="time tnum">{m.time}</div>
                      <h3 id={`${m.id}-h`}>{m.h}</h3>
                      <p>{m.body}</p>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section flush" id="journal" aria-labelledby="j-h">
          <div className="wrap">
            <div className="journal">
              <div className="stack">
                <span className="eyebrow">Journal</span>
                <h2 id="j-h">A journal for the time you have with them.</h2>
                <p className="lede">
                  The schedule covers where they are. Journal covers what happened while they were with you, and what you want to keep doing. Only you can see it.
                </p>
                <dl className="jparts">
                  <div className="jpart"><dt>Check-in</dt><dd>One word for how the day went: Rough, Uneven, Okay, Good, or Full.</dd></div>
                  <div className="jpart"><dt>Moments</dt><dd>A line, a photo, or a voice note.</dd></div>
                  <div className="jpart"><dt>Promises</dt><dd>Something you said you’d do, with a date. Each week you answer Kept it, Partly, or Next time.</dd></div>
                  <div className="jpart"><dt>Rituals</dt><dd>The things you always do together. Pause one when life gets busy. End it when it’s done. The history stays.</dd></div>
                </dl>
                <div className="prompts">
                  <span className="eyebrow">Prompts that work on a hard day too</span>
                  <p className="prompt">“What’s one thing you noticed about them today?”</p>
                  <p className="prompt">“What did today need from you?”</p>
                  <p className="prompt">“Something small worth remembering.”</p>
                </div>
              </div>
              <JournalDemo />
            </div>
          </div>
        </section>

        <section className="section flush" aria-labelledby="solo-h">
          <div className="wrap">
            <div className="solo">
              <div className="stack">
                <span className="eyebrow">Solo works</span>
                <h2 id="solo-h">Works if they never download it.</h2>
                <p>Add your coparent as a contact. Your plan, pickups, record, and Journal work from the first day. Invite them when it makes sense, or keep it yours.</p>
              </div>
              <ol className="solo-steps">
                <li className="solo-step"><span className="n" aria-hidden="true">1</span><div><b>Add your kids and your rhythm</b><span>2-2-3, week on week off, or whatever your plan says.</span></div></li>
                <li className="solo-step"><span className="n" aria-hidden="true">2</span><div><b>Add your coparent</b><span>A name is enough. No invite goes out.</span></div></li>
                <li className="solo-step"><span className="n" aria-hidden="true">3</span><div><b>Log what happens</b><span>Pickups, swaps, and changes, with the times they happened.</span></div></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="section flush" id="handoffs" aria-labelledby="rec-h">
          <div className="wrap split">
            <div className="stack">
              <span className="eyebrow">Handoffs</span>
              <h2 id="rec-h">The handoff can just be a handoff.</h2>
              <p className="lede">Changes get settled in the app ahead of time. Nothing gets decided on the doorstep in front of the kids.</p>
            </div>
            <img className="walk-in" src="/codaze/mom-daughter-night.webp" width={1200} height={800} loading="lazy" decoding="async" alt="A mom with a red tote walks her daughter home." />
          </div>
          <div className="wrap">
            <div className="facts">
              <div className="fact"><h3>Changes start as a request</h3><p>A new time stays a proposal until it’s agreed. The record shows what was asked, what was agreed, and when.</p></div>
              <div className="fact"><h3>Your location stays on your phone</h3><p>Codaze uses it only during a swap, to tell you when you’re close to the pickup spot. It’s never uploaded.</p></div>
              <div className="fact"><h3>Your Journal is yours</h3><p>Entries, photos, and voice notes are private to your account. Your coparent never sees them.</p></div>
              <div className="fact"><h3>Leave any time</h3><p>Delete your account from Settings and everything you added goes with it.</p></div>
            </div>
          </div>
        </section>

        <section className="section flush" aria-labelledby="f-h">
          <div className="wrap founder">
            <div className="stack">
              <span className="eyebrow">Why it exists</span>
              <h2 id="f-h">Built by a parent who uses it every week.</h2>
            </div>
            <figure>
              <blockquote>
                “I needed one place for pickups, swaps, and the promises I made my kids. So I built it, and I use it between my two homes.”
              </blockquote>
              <figcaption>
                <span className="initial" aria-hidden="true">K</span>
                <div><b>Kinan Adams</b><div className="fine">Designer and engineer, Atlanta</div></div>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section flush" id="faq" aria-labelledby="faq-h">
          <div className="wrap faq-wrap">
            <h2 id="faq-h">Questions</h2>
            <div className="faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section flush" id="waitlist" aria-labelledby="w-h">
          <div className="wrap">
            <div className="join">
              <div className="stack">
                <span className="eyebrow">Waitlist</span>
                <h2 id="w-h">Get Codaze when it’s ready.</h2>
                <p className="lede">One email when the app is in the App Store. Nothing else.</p>
                <img className="walk-in" src="/codaze/stroller.webp" width={570} height={524} loading="lazy" decoding="async" alt="" />
              </div>
              <div>
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <div>
            <p>
              Codaze is made by <a href="https://alldaze.studio">{TRADE_NAME}</a> in Atlanta. © 2026 {LEGAL_ENTITY}
            </p>
            <nav aria-label="Codaze pages">
              <Link href="/codaze/support">Support</Link>
              <Link href="/codaze/privacy">Privacy</Link>
              <Link href="/codaze/terms">Terms</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
