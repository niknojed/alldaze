'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CurrentlyItem {
  label: string;
  value: string;
}

interface HeroProps {
  /** Rows shown inside the "Currently" calling card */
  currentlyItems?: CurrentlyItem[];
}

const defaultCurrentlyItems: CurrentlyItem[] = [
  { label: 'Based in', value: 'Atlanta, GA' },
  { label: 'Booking', value: 'Summer 2026' },
  { label: 'Est.', value: '2022' },
];

export default function Hero({
  currentlyItems = defaultCurrentlyItems,
}: HeroProps) {
  return (
    <section
      className="relative bg-white pt-8 lg:pt-12 pb-12 overflow-hidden"
      id="hero"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

        {/* ─── Main hero content: headline left, calling card right ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">

          {/* Headline + sub + CTAs */}
          <div className="lg:col-span-8">
            {/* Audience eyebrow — who we work with */}
            <div className="flex items-center gap-2.5 text-sm font-medium text-gray-500 mb-5 lg:mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#0052FF] flex-shrink-0"
                aria-hidden="true"
              />
              <span>For founders, product teams, and independent brands</span>
            </div>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.98] tracking-tight"
            >
              <span className="text-gray-900">We design, build, and launch </span>
              <span className="text-gray-400">
                the work that matters.
              </span>
            </h1>

            <p className="mt-8 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Brands, sites, and apps, built with you from first idea to launch.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#0052FF] hover:bg-[#003ECC] text-white rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
              >
                Start a project
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#selected-work"
                className="group inline-flex items-center gap-2 px-6 py-3.5 border border-gray-200 hover:border-gray-900 text-gray-900 rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                See selected work
                <ArrowUpRight
                  size={16}
                  className="text-gray-400 group-hover:text-gray-900 transition-colors"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* "Currently" calling card */}
          <aside className="lg:col-span-4" aria-label="Studio status card">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-5">
              <ul className="space-y-0" role="list">
                {currentlyItems.map((item, i) => (
                  <li
                    key={item.label}
                    className={`flex items-baseline justify-between gap-4 py-3 ${
                      i < currentlyItems.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <span className="text-xs text-gray-500 uppercase tracking-wider flex-shrink-0">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 text-right">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 mt-1 border-t border-gray-100 flex items-center gap-4">
                <a
                  href="#why-us"
                  aria-label="Meet the team"
                  className="group relative block w-1/2 flex-shrink-0 rounded-xl hover:z-20 focus:outline-none focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
                >
                  <img
                    src="/design-duo.png"
                    alt="The AllDazeWork design studio — meet the team"
                    className="w-full h-auto rounded-xl object-cover border border-gray-100 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-[1.6] group-hover:border-[#0052FF] group-hover:shadow-2xl group-focus-visible:scale-[1.6] motion-reduce:transform-none"
                  />
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-[#0052FF] transition-colors"
                >
                  Say hi
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
