'use client';

import React, { useState } from 'react';
import { Users, Layers, LifeBuoy, Linkedin, ArrowUpRight } from 'lucide-react';

interface TeamMember {
  /** Stable id linking a photo marker to its profile card */
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Short pedigree line. Optional — only Kinan's card carries one. */
  pedigree?: string;
  /** Profile link — LinkedIn for Kinan, portfolio for Kameron. */
  link?: { url: string; label: string; kind: 'linkedin' | 'portfolio' };
  variant?: 'light' | 'dark';
  /** Marker position on the team photo, as percentages of width/height. */
  marker: { x: number; y: number };
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Recommendation {
  quote: string;
  author: string;
  /** Role + company line under the author's name */
  meta: string;
  /** How the recommender knows the team, e.g. "Worked together at …" */
  relationship: string;
  /** 1–2 letter avatar initials */
  initials: string;
}

interface WhyUsProps {
  /** The two people behind the studio (also drives the photo markers) */
  team?: TeamMember[];
  /** Three small feature cards */
  features?: Feature[];
  /** LinkedIn-style recommendations */
  recommendations?: Recommendation[];
  /** Team photo shown with annotated markers */
  photoSrc?: string;
  photoAlt?: string;
  /** Destination for the "See all recommendations" link */
  recommendationsUrl?: string;
}

// Marker x/y are tuned to the why-us.jpg crop — adjust if the photo is recropped.
const defaultTeam: TeamMember[] = [
  {
    id: 'kameron',
    name: 'Kameron Adams',
    role: 'Product Designer (Marketing Focus)',
    bio: "A product designer who's spent years turning user insight into interfaces that convert — now applying that same craft to landing pages, ad creative, campaigns, SEO, and analytics.",
    link: {
      url: 'https://kameronadams.design',
      label: 'View portfolio',
      kind: 'portfolio',
    },
    variant: 'light',
    marker: { x: 36, y: 73 },
  },
  {
    id: 'kinan',
    name: 'Kinan Adams',
    role: 'Founder · Lead Designer · Engineer',
    bio: 'Leads design and engineering — from brand and UX through to the code that ships.',
    pedigree:
      'Previously Home Depot · Chick-fil-A · Boeing Credit Union, and agency work via One Spring & Premier Logic.',
    link: {
      url: 'https://www.linkedin.com/in/kinan-adams/',
      label: 'View profile',
      kind: 'linkedin',
    },
    variant: 'dark',
    marker: { x: 67, y: 63 },
  },
];

// Confirmed copy — carried over from the previous Why Us section.
const defaultFeatures: Feature[] = [
  {
    icon: <Users size={24} aria-hidden="true" />,
    title: 'Embedded Partnership',
    description:
      'We keep our roster small on purpose, so your project gets our senior attention, every week.',
  },
  {
    icon: <Layers size={24} aria-hidden="true" />,
    title: 'Design + Build',
    description:
      'No handoff gap. We design and ship the code, so what gets built is what you approved.',
  },
  {
    icon: <LifeBuoy size={24} aria-hidden="true" />,
    title: 'Long-term Support',
    description:
      "Most clients become long-term partners — we don't disappear after launch.",
  },
];

const defaultRecommendations: Recommendation[] = [
  {
    quote:
      'A wealth of knowledge in strategy, design, and development. As a designer, he approaches challenges with a unique sense of style; as a developer, he brings ideas to life with expertly crafted code.',
    author: 'Michael Hicks',
    meta: 'UX Design Instructor & Product Designer',
    relationship: 'Worked with Kinan at OneSpring',
    initials: 'M',
  },
  {
    quote:
      'Kinan has created user experiences on a level much higher than most in his field. We consider him a core member of our team — his input is highly regarded in all our web initiatives.',
    author: 'John Monnett',
    meta: 'Digital Trust Consultant',
    relationship: 'Managed Kinan directly',
    initials: 'J',
  },
];

export default function WhyUs({
  team = defaultTeam,
  features = defaultFeatures,
  recommendations = defaultRecommendations,
  photoSrc = '/team/why-us.jpg',
  photoAlt = 'The AllDazeWork team — Kameron and Kinan Adams',
  recommendationsUrl = 'https://www.linkedin.com/in/kinan-adams/details/recommendations/',
}: WhyUsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      className="bg-[#FAFAFA] py-24 lg:py-32"
      id="why-us"
      aria-labelledby="why-us-heading"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        {/* ── Header ── */}
        <div className="mb-7">
          <h2
            id="why-us-heading"
            className="text-4xl sm:text-5xl lg:text-[46px] font-extrabold leading-[1.04] tracking-tight text-gray-900"
          >
            Meet the team.
          </h2>
          <p className="mt-3.5 text-base text-gray-500">
            The people behind every project.
          </p>
          <div className="mt-2.5 flex items-center gap-2 text-[13px] text-gray-400">
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#0052FF] shadow-[0_0_0_3px_rgba(0,82,255,0.22)] flex-shrink-0"
              aria-hidden="true"
            />
            Hover or tap a marker to meet each of us.
          </div>
        </div>

        {/* ── Annotated team photo ── */}
        <div className="relative leading-none">
          <img
            src={photoSrc}
            alt={photoAlt}
            className="w-full h-auto block rounded-[22px] border border-gray-200"
          />

          {team.map((m) => {
            const isActive = activeId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                className="group absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 z-[3] focus:outline-none focus-visible:outline-none"
                style={{ left: `${m.marker.x}%`, top: `${m.marker.y}%` }}
                aria-label={`Meet ${m.name}, ${m.role}`}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveId(m.id)}
                onMouseLeave={() =>
                  setActiveId((c) => (c === m.id ? null : c))
                }
                onFocus={() => setActiveId(m.id)}
                onBlur={() => setActiveId((c) => (c === m.id ? null : c))}
                onClick={() =>
                  setActiveId((c) => (c === m.id ? null : m.id))
                }
              >
                {/* Pulse */}
                <span
                  className="absolute inset-0 rounded-full bg-[#0052FF] opacity-50 animate-ping motion-reduce:hidden"
                  aria-hidden="true"
                />
                {/* Dot */}
                <span
                  className={`absolute inset-0 rounded-full bg-[#0052FF] transition-transform duration-200 shadow-[0_0_0_4px_rgba(0,82,255,0.28),0_2px_9px_rgba(0,82,255,0.45)] group-hover:scale-[1.3] group-hover:shadow-[0_0_0_6px_rgba(0,82,255,0.32),0_4px_14px_rgba(0,82,255,0.55)] group-focus-visible:scale-[1.3] motion-reduce:transition-none ${
                    isActive
                      ? 'scale-[1.3] shadow-[0_0_0_6px_rgba(0,82,255,0.32),0_4px_14px_rgba(0,82,255,0.55)]'
                      : ''
                  }`}
                  aria-hidden="true"
                />
                {/* Label */}
                <span
                  className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0A0A0A] px-2.5 py-1.5 text-[11px] font-bold tracking-tight text-white transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {m.name}
                  <span
                    className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#0A0A0A]"
                    aria-hidden="true"
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Profile cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[18px]">
          {team.map((m) => {
            const dark = m.variant === 'dark';
            const isActive = activeId === m.id;
            return (
              <div
                key={m.id}
                onMouseEnter={() => setActiveId(m.id)}
                onMouseLeave={() =>
                  setActiveId((c) => (c === m.id ? null : c))
                }
                className={[
                  'rounded-[22px] p-7 flex flex-col border transition-all duration-300 will-change-transform',
                  dark
                    ? 'bg-[#0A0E17] border-[#1A2335]'
                    : 'bg-white border-gray-200',
                  isActive ? '-translate-y-1.5' : '',
                  isActive && dark
                    ? 'ring-2 ring-[#6E9BFF] shadow-[0_18px_40px_rgba(0,0,0,0.5)]'
                    : '',
                  isActive && !dark
                    ? 'ring-2 ring-[#0052FF] border-transparent shadow-[0_18px_40px_rgba(0,82,255,0.16)]'
                    : '',
                  'motion-reduce:transition-none',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <h3
                  className={`text-xl font-extrabold tracking-tight ${
                    dark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {m.name}
                </h3>
                <div
                  className={`text-[13px] font-semibold mt-1 mb-3.5 ${
                    dark ? 'text-[#6E9BFF]' : 'text-[#0052FF]'
                  }`}
                >
                  {m.role}
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    dark ? 'text-[#AAB3C5]' : 'text-gray-500'
                  }`}
                >
                  {m.bio}
                </p>

                {/* Pedigree — only rendered for members who carry one. */}
                {m.pedigree && (
                  <div
                    className={`mt-4 pt-3.5 text-xs border-t ${
                      dark
                        ? 'border-[#1E2740] text-[#8A93A6]'
                        : 'border-gray-100 text-gray-400'
                    }`}
                  >
                    {m.pedigree}
                  </div>
                )}

                {m.link && (
                  <a
                    href={m.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 mt-auto pt-[18px] text-[13px] font-bold transition-colors ${
                      dark
                        ? 'text-[#5B9BFF] hover:text-white'
                        : 'text-[#0A66C2] hover:text-[#084d92]'
                    }`}
                  >
                    {m.link.kind === 'linkedin' && (
                      <Linkedin size={16} aria-hidden="true" />
                    )}
                    {m.link.label}
                    {m.link.kind === 'portfolio' && (
                      <ArrowUpRight size={16} aria-hidden="true" />
                    )}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Feature cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-200 rounded-[22px] p-6"
            >
              <div className="text-gray-900 mb-3.5">{feature.icon}</div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                {feature.title}
              </h3>
              <p className="text-[13.5px] text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Recommendations ── */}
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, i) => (
              <figure
                key={`${rec.author}-${i}`}
                className="bg-white border border-gray-200 rounded-[22px] p-6 flex flex-col gap-3"
              >
                <figcaption className="flex items-center gap-2 text-[11px] font-bold text-[#0A66C2]">
                  <Linkedin size={14} aria-hidden="true" />
                  Recommended on LinkedIn
                </figcaption>
                <blockquote className="text-sm leading-relaxed text-gray-700">
                  &ldquo;{rec.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-2.5 pt-3 mt-auto border-t border-gray-100">
                  <span
                    className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#C9D3E6] to-[#AEBBD2] flex-shrink-0 flex items-center justify-center text-white font-extrabold text-sm"
                    aria-hidden="true"
                  >
                    {rec.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-bold text-gray-900 truncate">
                      {rec.author}
                    </div>
                    <div className="text-[11.5px] text-gray-500 truncate">
                      {rec.meta}
                    </div>
                    <div className="text-[10.5px] italic text-gray-400 truncate">
                      {rec.relationship}
                    </div>
                  </div>
                </div>
              </figure>
            ))}
          </div>

          <a
            href={recommendationsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-[#F4F8FF] border border-[#D9E6FF] rounded-2xl px-[18px] py-3 text-[13px] font-bold text-[#0A66C2] hover:bg-[#E9F1FF] transition-colors"
          >
            See all 6 recommendations on LinkedIn
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
