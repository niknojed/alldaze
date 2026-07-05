import type { Metadata } from 'next';
import Reveal from '@/components/landing/Reveal';
import AuditForm from '@/components/landing/AuditForm';

export const metadata: Metadata = {
  title: {
    absolute: 'Atlanta web design that gets you found and booked — AllDazeWork',
  },
  description:
    "We're a small Atlanta studio. We design and build websites for local businesses, and you work directly with us the whole way. Start with a free audit of the site you have now.",
  alternates: { canonical: '/atlanta' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alldaze.studio/atlanta',
    siteName: 'AllDazeWork',
    title: 'Atlanta web design that gets you found and booked — AllDazeWork',
    description:
      "We're a small Atlanta studio. We design and build websites for local businesses, and you work directly with us the whole way. Start with a free audit of the site you have now.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlanta web design that gets you found and booked — AllDazeWork',
    description:
      "We're a small Atlanta studio. We design and build websites for local businesses, and you work directly with us the whole way. Start with a free audit of the site you have now.",
  },
};

const WRAP = 'mx-auto w-full max-w-[1120px] px-[clamp(20px,5vw,64px)]';
const SECTION = 'py-[clamp(56px,8vw,104px)]';
const H2 =
  'text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-.022em] text-ink';
const BTN =
  'inline-flex items-center gap-[.5em] rounded-lg border border-transparent px-[1.4em] py-[.85em] text-[.95rem] font-semibold no-underline transition-colors duration-[250ms] ease-[cubic-bezier(.25,.6,.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2';
const BTN_BLUE = `${BTN} bg-brand text-white hover:bg-brand-dark`;
const BTN_LINE = `${BTN} border-line bg-white text-ink hover:border-ink`;

const tiles = [
  {
    title: 'A site that looks good and loads fast',
    body: "Clean and modern, built for phones first — that's where most of your customers are.",
  },
  {
    title: 'Show up when people nearby are looking',
    body: 'We set up your Google presence and build the site so local searches actually find you.',
  },
  {
    title: 'One team, design and code',
    body: 'The same people design your site and build it. What you approve is what goes live.',
  },
  {
    title: 'A fixed price, then real support',
    body: 'Clear fee and milestones up front. After launch we stick around — most clients keep us on.',
  },
];

const cases = [
  {
    name: 'CV Home & Lawn',
    meta: 'Home & lawn service · 2025',
    body: 'Brand identity, a new website, and a local presence built to turn searches into service calls.',
  },
  {
    name: 'Roswell Barbell',
    meta: 'Fitness gym · 2023',
    body: 'Web and brand for a local gym that needed to look as serious as the people training in it.',
  },
  {
    name: 'Pure Upscale Hair Studio',
    meta: 'Barber shop · 2024',
    body: 'Brand and web design that match the experience clients get in the chair, with easy booking.',
  },
];

const pillars = [
  {
    title: 'Embedded partnership',
    body: 'Your project gets our senior attention, every week. No junior handoff, no middle layer.',
  },
  {
    title: 'Design + build',
    body: 'No handoff gap. We design and ship the code, so what gets built is what you approved.',
  },
  {
    title: 'Long-term support',
    body: "Most clients become long-term partners — we don't disappear after launch.",
  },
];

const steps = [
  {
    n: 'Step 1',
    title: 'Send us your site',
    body: 'Drop your URL or business name in the form. Takes thirty seconds.',
  },
  {
    n: 'Step 2',
    title: 'We take a look',
    body: 'You get back a few honest, specific ways to improve — within a business day.',
  },
  {
    n: 'Step 3',
    title: 'A quick call, if you want',
    body: 'Thirty minutes to talk it through. Only if the audit lands and you want more.',
  },
  {
    n: 'Step 4',
    title: 'A clear proposal',
    body: "Fixed fee, clear milestones, within a week. You know exactly what you're paying for.",
  },
];

const recs = [
  {
    initial: 'J',
    quote:
      '“Kinan has created user experiences on a level much higher than most in his field. His input is highly regarded in all our web initiatives.”',
    name: 'John Monnett',
    role: 'Digital Trust Consultant · Managed Kinan directly',
  },
  {
    initial: 'M',
    quote:
      '“A wealth of knowledge in strategy, design, and development. He brings ideas to life with expertly crafted code.”',
    name: 'Michael Hicks',
    role: 'UX Design Instructor · Worked with Kinan at OneSpring',
  },
];

const faqs = [
  {
    q: 'What does a website cost?',
    a: "We scope a fixed fee up front based on what you actually need, then send a proposal with clear milestones. Pricing depends on scope, and it's always a real conversation.",
    open: true,
  },
  {
    q: 'How long does it take?',
    a: 'Most projects run 6–12 weeks from kickoff to launch. We pace it so you have real time to give feedback.',
    open: false,
  },
  {
    q: 'Are you actually local?',
    a: "Yes — based in Atlanta. We work with clients anywhere over video, and we're happy to show up in person for our Atlanta folks. Meetings, launches, or just a coffee.",
    open: false,
  },
  {
    q: 'What happens after launch?',
    a: "We stick around. Most clients keep us on for updates, marketing, or just having designers on call. If you'd rather run it yourself, we hand off clean docs and code.",
    open: false,
  },
  {
    q: 'How do we get started?',
    a: "Send us your site through the form below. We'll send your audit within a business day, and if it's a fit, we'll set up a quick call.",
    open: false,
  },
];

export default function AtlantaLandingPage() {
  return (
    <div className="min-h-screen bg-white text-[17px] leading-[1.6] text-body">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur-[8px]">
        <div className={`${WRAP} flex items-center justify-between py-[14px]`}>
          <a
            href="#top"
            className="text-[1.05rem] font-bold tracking-[-.02em] text-ink no-underline"
          >
            AllDaze<span className="text-brand">Work</span>
          </a>
          <a
            href="#audit"
            className={`${BTN_BLUE} px-[1.1em] py-[.6em] text-[.86rem]`}
          >
            Get a free audit
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="top" className="pt-[clamp(56px,9vw,110px)] pb-[clamp(56px,8vw,104px)]">
        <div className={WRAP}>
          <div className="mb-[14px] text-[.8rem] font-semibold tracking-[.02em] text-brand">
            Web design for Atlanta businesses
          </div>
          <h1 className="mb-5 max-w-[16ch] text-[clamp(2.3rem,5.6vw,4rem)] font-semibold leading-[1.12] tracking-[-.022em] text-ink">
            A website that gets your business{' '}
            <em className="not-italic text-brand">found and booked</em>.
          </h1>
          <p className="max-w-[56ch] text-[clamp(1.02rem,1.5vw,1.18rem)] text-body">
            We&apos;re a small Atlanta studio. We design and build websites for local
            businesses, and you work directly with us the whole way. Start with a free
            audit of the site you have now.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#audit" className={BTN_BLUE}>
              Get my free audit
            </a>
            <a href="#work" className={BTN_LINE}>
              See our local work
            </a>
          </div>
          <div className="mt-[34px] flex flex-wrap gap-x-[22px] gap-y-2">
            <span className="text-[.82rem] text-muted">
              Based in<b className="ml-[.35em] font-semibold text-ink">Atlanta, GA</b>
            </span>
            <span className="text-[.82rem] text-muted">
              Booking<b className="ml-[.35em] font-semibold text-ink">Summer 2026</b>
            </span>
            <span className="text-[.82rem] text-muted">
              Est.<b className="ml-[.35em] font-semibold text-ink">2022</b>
            </span>
          </div>
        </div>
      </section>

      {/* ── Client strip ── */}
      <div className="border-y border-line py-[22px]">
        <div className={`${WRAP} flex flex-wrap items-center gap-x-[36px] gap-y-[14px]`}>
          <span className="text-[.78rem] text-muted">
            Working with businesses across metro Atlanta
          </span>
          <span className="text-[.95rem] font-semibold text-ink opacity-75">CV Home & Lawn</span>
          <span className="text-[.95rem] font-semibold text-ink opacity-75">Roswell Barbell</span>
          <span className="text-[.95rem] font-semibold text-ink opacity-75">Pure Upscale Hair Studio</span>
          <span className="text-[.95rem] font-semibold text-ink opacity-75">Zaba Therapy</span>
        </div>
      </div>

      {/* ── Problem ── */}
      <section className={SECTION}>
        <Reveal className={WRAP}>
          <h2 className={H2}>Your website should work as hard as you do.</h2>
          <p className="mt-[18px] max-w-[58ch] text-[clamp(1.08rem,1.6vw,1.28rem)]">
            Most local businesses are running on a site that&apos;s costing them customers.
            Slow to load. Hard to find on Google. A few years out of date. Maybe you built
            it yourself between everything else, and it shows.
          </p>
          <p className="mt-[18px] max-w-[58ch] text-[clamp(1.08rem,1.6vw,1.28rem)] font-semibold text-ink">
            The fix: a site that looks good, shows up when people nearby are searching, and
            turns visitors into bookings. That&apos;s what we do.
          </p>
        </Reveal>
      </section>

      {/* ── What you get ── */}
      <section className={`${SECTION} bg-soft`}>
        <Reveal className={WRAP}>
          <h2 className={H2}>What you get</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 min-[680px]:grid-cols-2">
            {tiles.map((t) => (
              <div key={t.title} className="rounded-[10px] border border-line bg-white px-6 py-[26px]">
                <h3 className="mb-[.45em] text-[1.1rem] font-semibold leading-[1.12] tracking-[-.022em] text-ink">
                  <span className="mr-[.5em] font-bold text-brand">✓</span>
                  {t.title}
                </h3>
                <p className="text-[.95rem] text-body">{t.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Work ── */}
      <section id="work" className={SECTION}>
        <Reveal className={WRAP}>
          <h2 className={H2}>Recent work with businesses like yours.</h2>
          <div className="mt-10 grid max-w-[440px] grid-cols-1 gap-5 min-[820px]:max-w-none min-[820px]:grid-cols-3">
            {cases.map((c) => (
              <article
                key={c.name}
                className="overflow-hidden rounded-[10px] border border-line bg-white transition-colors duration-[250ms] ease-[cubic-bezier(.25,.6,.3,1)] hover:border-[#c9cdd2]"
              >
                {/* Placeholder slot — replace with a real project image */}
                <div className="grid h-[130px] place-items-center border-b border-line bg-soft text-[.78rem] text-muted">
                  [ project image ]
                </div>
                <div className="p-5">
                  <h3 className="text-[1.05rem] font-semibold leading-[1.12] tracking-[-.022em] text-ink">
                    {c.name}
                  </h3>
                  <div className="mt-[.3em] mb-[.8em] text-[.78rem] text-muted">{c.meta}</div>
                  <p className="text-[.92rem] text-body">{c.body}</p>
                  {/* Placeholder chip — replace with a real result */}
                  <span className="mt-3 inline-block rounded-md border border-dashed border-brand px-[.8em] py-[.4em] text-[.8rem] font-semibold text-brand">
                    Add real result here
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Why us ── */}
      <section className="pb-[clamp(56px,8vw,104px)]">
        <Reveal
          className={`${WRAP} grid grid-cols-1 gap-7 min-[760px]:grid-cols-[1fr_1.1fr] min-[760px]:gap-[clamp(32px,5vw,64px)]`}
        >
          <div>
            <h2 className={H2}>A small studio, on purpose.</h2>
            <p className="mt-[14px] max-w-[56ch] text-[clamp(1.02rem,1.5vw,1.18rem)] text-body">
              We keep our roster small so your project gets our senior attention every week.
              You work directly with the people designing and building your site. And
              we&apos;re local — happy to grab coffee.
            </p>
          </div>
          <div className="flex flex-col">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={`border-t border-line py-5 ${i === pillars.length - 1 ? 'border-b' : ''}`}
              >
                <h3 className="mb-[.3em] text-[1.05rem] font-semibold leading-[1.12] tracking-[-.022em] text-ink">
                  {p.title}
                </h3>
                <p className="text-[.93rem] text-body">{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Steps ── */}
      <section className={`${SECTION} bg-soft`}>
        <Reveal className={WRAP}>
          <h2 className={H2}>How the free audit works.</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 min-[900px]:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-[10px] border border-line bg-white px-[22px] py-6">
                <div className="mb-3 text-[.85rem] font-bold text-brand">{s.n}</div>
                <h3 className="mb-[.4em] text-[1.02rem] font-semibold leading-[1.12] tracking-[-.022em] text-ink">
                  {s.title}
                </h3>
                <p className="text-[.9rem] text-body">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-[26px] text-[.9rem] text-muted">
            No high-pressure sales nonsense, ever.
          </p>
        </Reveal>
      </section>

      {/* ── Recommendations ── */}
      <section className={SECTION}>
        <Reveal className={WRAP}>
          <h2 className={H2}>What people say about working with us.</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 min-[720px]:grid-cols-2">
            {recs.map((r) => (
              <div key={r.name} className="rounded-[10px] border border-line bg-white px-[26px] py-7">
                <div className="mb-[14px] text-[.75rem] italic text-muted">
                  Recommended on LinkedIn
                </div>
                <blockquote className="mb-[18px] text-[1.05rem] leading-[1.5] text-ink">
                  {r.quote}
                </blockquote>
                <div className="flex items-center gap-3">
                  <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-brand text-[.9rem] font-bold text-white">
                    {r.initial}
                  </span>
                  <div>
                    <div className="text-[.9rem] font-semibold text-ink">{r.name}</div>
                    <div className="text-[.78rem] text-muted">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://www.linkedin.com/in/kinan-adams/details/recommendations/"
            className="mt-[26px] inline-block text-[.9rem] font-semibold text-brand no-underline hover:underline"
          >
            See all 6 recommendations on LinkedIn →
          </a>
        </Reveal>
      </section>

      {/* ── FAQ ── */}
      <section className="pb-[clamp(56px,8vw,104px)]">
        <Reveal className={`${WRAP} max-w-[820px]`}>
          <h2 className={`${H2} mb-7`}>Questions we hear often.</h2>
          {faqs.map((f) => (
            <details
              key={f.q}
              open={f.open}
              className="group border-t border-line [&:last-of-type]:border-b [&:last-of-type]:border-line"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.02rem] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="faq-plus text-brand transition-transform duration-[250ms] ease-[cubic-bezier(.25,.6,.3,1)]">
                  +
                </span>
              </summary>
              <p className="max-w-[64ch] pb-5 text-[.96rem] text-body">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </section>

      {/* ── Audit form ── */}
      <section id="audit" className={`${SECTION} bg-ink text-[#D8DADD]`}>
        <Reveal
          className={`${WRAP} grid grid-cols-1 items-start gap-[clamp(32px,5vw,64px)] min-[760px]:grid-cols-2`}
        >
          <div>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-.022em] text-white">
              Get a free website audit.
            </h2>
            <p className="mt-[14px] max-w-[56ch] text-[clamp(1.02rem,1.5vw,1.18rem)] text-[#B9BCC0]">
              Tell us about your business and what you&apos;re aiming for. We&apos;ll take a
              look and send back a few honest, specific ways to improve — within a business
              day.
            </p>
            <div className="mt-7 text-[.9rem] text-[#9DA1A6]">
              <b className="mb-[2px] block text-white">Prefer email?</b>
              <a href="mailto:design@alldazework.com" className="text-white">
                design@alldazework.com
              </a>
              <br />
              Comes straight to the people you&apos;ll work with.
            </div>
          </div>
          <AuditForm />
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer className="py-[34px] text-[.82rem] text-muted">
        <div className={`${WRAP} flex flex-wrap items-center justify-between gap-3`}>
          <span>AllDazeWork · Atlanta, GA</span>
          <a href="mailto:design@alldazework.com" className="no-underline hover:underline">
            design@alldazework.com
          </a>
        </div>
      </footer>
    </div>
  );
}
