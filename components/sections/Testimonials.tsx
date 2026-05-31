'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Star, Quote } from 'lucide-react';
import SectionHeader from './SectionHeader';

export interface Testimonial {
  id: string;
  /** 1–5 */
  rating: number;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  /** Optional accent for the avatar gradient — defaults rotate through brand-friendly hues */
  accent?: 'blue' | 'emerald' | 'amber' | 'fuchsia';
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

// TODO: Replace with real client testimonials before launch.
// Current entries are representative placeholders tied to confirmed case studies.
const defaultTestimonials: Testimonial[] = [
  {
    id: 'pure-upscale',
    rating: 5,
    quote:
      "We came in with a vague idea of needing a website and left with a brand we love and a site that actually books clients. They got our personality and translated it perfectly. Worth every penny.",
    authorName: 'Client Name',
    authorRole: 'Owner',
    authorCompany: 'Pure Upscale Hair Studio',
    accent: 'amber',
  },
  {
    id: 'digilence',
    rating: 5,
    quote:
      "AllDazeWork operates like an in-house product team, not a vendor. They asked the questions we hadn't thought to ask, designed flows that made sense to our users, and shipped. We've been working together for two years now.",
    authorName: 'Client Name',
    authorRole: 'Founder',
    authorCompany: 'Digilence',
    accent: 'blue',
  },
  {
    id: 'roswell-barbell',
    rating: 5,
    quote:
      "I needed a site that looked as serious as our community is. They got that immediately. No fluff, no over-design — just a clean site that's brought us a steady stream of new members ever since.",
    authorName: 'Client Name',
    authorRole: 'Owner',
    authorCompany: 'Roswell Barbell',
    accent: 'emerald',
  },
  {
    id: 'zaba-therapy',
    rating: 5,
    quote:
      "Sensitive work, sensitive audience — and they handled it with care. The strategy work alone was worth it. Our new site speaks to the people we want to reach in a way our old one never did.",
    authorName: 'Client Name',
    authorRole: 'Founder',
    authorCompany: 'Zaba Therapy',
    accent: 'fuchsia',
  },
];

const accentMap: Record<NonNullable<Testimonial['accent']>, string> = {
  blue: 'from-blue-400 to-blue-600',
  emerald: 'from-emerald-400 to-teal-600',
  amber: 'from-amber-400 to-orange-500',
  fuchsia: 'from-fuchsia-400 to-purple-600',
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function Testimonials({
  testimonials = defaultTestimonials,
}: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  // Keyboard navigation when the section is focused or hovered
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const section = document.getElementById('testimonials');
      if (!section?.matches(':hover, :focus-within')) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const active = testimonials[activeIndex];
  const accentClass = accentMap[active.accent ?? 'blue'];

  return (
    <section
      className="bg-white py-24 lg:py-32"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <SectionHeader
          label="Testimonials"
          number="06"
          heading="Kind words from the teams we work with."
          description="Don't take our word for it — take theirs."
        />

        {/* Featured card */}
        <div className="relative bg-[#FAFAFA] border border-gray-200 rounded-2xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Decorative quote glyph */}
          <Quote
            size={200}
            strokeWidth={1}
            className="absolute -top-6 -right-6 text-gray-100 pointer-events-none"
            aria-hidden="true"
          />

          <div
            className="relative flex flex-col gap-10 lg:gap-12"
            aria-live="polite"
            aria-atomic="true"
            key={active.id}
          >
            {/* Stars + position indicator row */}
            <div className="flex items-center justify-between">
              <div
                className="flex gap-1"
                aria-label={`${active.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < active.rating
                        ? 'text-[#0052FF] fill-[#0052FF]'
                        : 'text-gray-300'
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-gray-400 tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(total).padStart(2, '0')}
              </span>
            </div>

            {/* The quote */}
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-[1.25] tracking-tight max-w-4xl">
              &ldquo;{active.quote}&rdquo;
            </blockquote>

            {/* Author block + nav controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${accentClass} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                  aria-hidden="true"
                >
                  {getInitials(active.authorName)}
                </div>
                <div className="min-w-0">
                  <div className="text-base font-semibold text-gray-900 truncate">
                    {active.authorName}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {active.authorRole} · {active.authorCompany}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2" role="group" aria-label="Testimonial navigation">
                <button
                  type="button"
                  onClick={prev}
                  className="w-11 h-11 rounded-full border border-gray-200 bg-white text-gray-900 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="w-11 h-11 rounded-full border border-gray-200 bg-white text-gray-900 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators — clickable jump points */}
        <div
          className="flex justify-center gap-2 mt-8"
          role="tablist"
          aria-label="Testimonial selection"
        >
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-8 bg-[#0052FF]'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
