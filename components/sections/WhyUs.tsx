'use client';

import React from 'react';
import { Users, Layers, LifeBuoy, Star, Plus, ArrowUpRight } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  rating: number; // out of 5
  totalReviewsLabel: string;
  quote: string;
  author: string;
  role: string;
}

interface WhyUsProps {
  /** The three small feature cards in column 3 */
  features?: Feature[];
  /** Featured testimonial shown in column 2 */
  testimonial?: Testimonial;
  /** Value bullets shown under the brand card in column 1 */
  values?: string[];
}

const defaultFeatures: Feature[] = [
  {
    icon: <Users size={20} aria-hidden="true" />,
    title: 'Embedded Partnership',
    description:
      "We treat your project like it's the only one we have. Because most weeks, it close to is.",
  },
  {
    icon: <Layers size={20} aria-hidden="true" />,
    title: 'Design + Build',
    description:
      'No handoff gap. We design and ship the code, so what gets built is what you approved.',
  },
  {
    icon: <LifeBuoy size={20} aria-hidden="true" />,
    title: 'Long-term Support',
    description:
      "We don't disappear after launch. Most clients become long-term partners, not one-offs.",
  },
];

// TODO: Replace with a real client quote before launch.
const defaultTestimonial: Testimonial = {
  rating: 5,
  totalReviewsLabel: '20+ Happy clients across Atlanta',
  quote:
    'AllDazeWork got our brand and built the site to match — fast. Felt like working with our own in-house team, not a vendor.',
  author: 'Client Name',
  role: 'Founder, Client Company',
};

const defaultValues: string[] = [
  'Collaborative by default',
  'Atlanta-grounded',
  'Quick turnaround',
  'Clear communication',
  'Long-term partners',
];

export default function WhyUs({
  features = defaultFeatures,
  testimonial = defaultTestimonial,
  values = defaultValues,
}: WhyUsProps) {
  return (
    <section
      className="bg-[#FAFAFA] py-24 lg:py-32"
      id="why-us"
      aria-labelledby="why-us-heading"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Header — slash label + section number on left, duotone headline on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 lg:mb-16">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span className="text-[#0052FF] font-semibold" aria-hidden="true">/</span>
              <span className="tracking-wide">Why us</span>
            </div>
            <div className="text-xs text-gray-400 font-mono">(03)</div>
          </div>
          <div className="lg:col-span-9">
            <h2
              id="why-us-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="text-gray-900">Two designers, embedded with you, </span>
              <span className="text-gray-400">building work that earns its keep.</span>
            </h2>
          </div>
        </div>

        {/* Bento grid — 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

          {/* ── Column 1: Dark brand card on top + values list below ── */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {/* Brand card (dark with subtle texture) */}
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden p-6 flex flex-col justify-between bg-gray-900"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(0,82,255,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,82,255,0.15) 0%, transparent 50%)',
              }}
            >
              <div className="relative">
                <h3 className="text-2xl font-bold text-white leading-tight">
                  Purposeful design for Atlanta&apos;s ambitious teams.
                </h3>
                <div className="text-xs text-white/50 mt-3 font-mono">© 2026</div>
              </div>
              <div className="relative">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get started
                  <Plus size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Values list */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex-1">
              <ul className="space-y-3.5" role="list">
                {values.map((value) => (
                  <li
                    key={value}
                    className="flex items-center gap-3 text-sm font-semibold text-gray-900"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#0052FF] flex-shrink-0"
                      aria-hidden="true"
                    />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Column 2: Social proof on top + testimonial below ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-6 min-h-[500px]">
            {/* Top: avatar cluster + rating */}
            <div className="flex items-start justify-between">
              <div className="flex -space-x-2" aria-hidden="true">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white" />
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 border-2 border-white" />
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white" />
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-600 border-2 border-white" />
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                {testimonial.rating}/5
                <Star
                  size={14}
                  className="text-yellow-400 fill-yellow-400 ml-0.5"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-900 -mt-2">
              {testimonial.totalReviewsLabel}
            </div>

            {/* Spacer pushes testimonial to the bottom */}
            <div className="flex-1" />

            {/* Testimonial block */}
            <div className="space-y-4">
              <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-gray-900 fill-gray-900"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-sm text-gray-700 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Column 3: Three stacked feature cards ── */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-200 rounded-2xl p-5 flex-1 flex flex-col gap-2.5 min-h-[155px]"
              >
                <div className="text-gray-900">{feature.icon}</div>
                <h4 className="text-base font-bold text-gray-900 mt-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* ── Column 4: Tall blue brand poster card ── */}
          <div
            className="relative rounded-2xl overflow-hidden p-6 flex flex-col justify-between min-h-[500px] bg-[#0052FF]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 80% 10%, rgba(255,255,255,0.18) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(0,0,0,0.25) 0%, transparent 55%)',
            }}
          >
            <div className="relative flex items-start justify-between">
              <h3 className="text-lg font-bold text-white">AllDazeWork®</h3>
              <ArrowUpRight
                size={18}
                className="text-white/60"
                aria-hidden="true"
              />
            </div>
            <div className="relative">
              <h3 className="text-3xl lg:text-4xl font-bold text-white leading-[1.1] tracking-tight">
                Designed together.
              </h3>
              <p className="text-base text-white/80 mt-3 leading-snug">
                No fluff. No handoffs. Just two designers who show up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
