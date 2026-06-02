'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CurrentlyItem {
  label: string;
  value: string;
}

interface HeroProps {
  /** Recent client names shown in the bottom marquee */
  clients?: string[];
  /** Rows shown inside the "Currently" calling card */
  currentlyItems?: CurrentlyItem[];
  /** Status pill text (next to the pulsing dot) */
  statusText?: string;
}

const defaultClients = [
  'Pure Upscale Hair Studio',
  'Digilence',
  'Roswell Barbell',
  'Zaba Therapy',
];

const defaultCurrentlyItems: CurrentlyItem[] = [
  { label: 'Based in', value: 'Atlanta, GA' },
  { label: 'Booking', value: 'Summer 2026' },
  { label: 'Est.', value: '2022' },
];

export default function Hero({
  clients = defaultClients,
  currentlyItems = defaultCurrentlyItems,
  statusText = "Now booking Summer '26",
}: HeroProps) {
  return (
    <section
      className="relative bg-white pt-8 lg:pt-12 pb-12 overflow-hidden"
      id="hero"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

        {/* ─── Top row: section indicator + status pill ─── */}
        <div className="flex items-center justify-between mb-4 lg:mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-[#0052FF] font-semibold" aria-hidden="true">/</span>
            <span className="tracking-wide">AllDazeWork</span>
            <span className="text-xs text-gray-400 font-mono ml-2">(01)</span>
          </div>

          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white"
            role="status"
            aria-label={`Studio status: ${statusText}`}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-gray-900">{statusText}</span>
          </div>
        </div>

        {/* ─── Main hero content: headline left, calling card right ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-20 lg:mb-32">

          {/* Headline + sub + CTAs */}
          <div className="lg:col-span-8">
            {/* Audience eyebrow — who we work with
            <div className="flex items-center gap-2.5 text-sm font-medium text-gray-500 mb-5 lg:mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#0052FF] flex-shrink-0"
                aria-hidden="true"
              />
              <span>For Atlanta small businesses &amp; independent brand owners</span>
            </div>  */}

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.98] tracking-tight"
            >
              <span className="text-gray-900">A design duo from Atlanta, </span>
              <span className="text-gray-400">
                showing up for the work that matters.
              </span>
            </h1>

            <p className="mt-8 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Web design, UX strategy, and the engineering to ship it — all from the same two people. We design, we build, we stick around.
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
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                  Currently
                </span>
                <span className="text-xs font-mono text-[#0052FF]">★</span>
              </div>

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

              <div className="pt-3 mt-1 border-t border-gray-100">
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

        {/* ─── Client marquee ─── */}
        <div>
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-5">
            Recent partners
          </div>
          <div
            className="relative overflow-hidden border-t border-b border-gray-200 py-6"
            aria-label="Client marquee"
          >
            {/* Edge fade overlays */}
            <div
              className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="flex animate-hero-marquee whitespace-nowrap">
              {/* Render the client list 3x so the loop seams are invisible at any viewport width */}
              {[...clients, ...clients, ...clients].map((client, i) => (
                <span
                  key={`${client}-${i}`}
                  className="inline-flex items-center text-2xl lg:text-3xl font-semibold text-gray-900 mx-8"
                >
                  {client}
                  <span
                    className="text-[#0052FF] ml-16 text-base"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*
        NOTE for setup: add this keyframe to your tailwind.config.js or globals.css.
        Tailwind doesn't ship with a marquee animation by default.

        // tailwind.config.js
        theme: {
          extend: {
            animation: {
              'hero-marquee': 'hero-marquee 40s linear infinite',
            },
            keyframes: {
              'hero-marquee': {
                'from': { transform: 'translateX(0)' },
                'to': { transform: 'translateX(-33.333%)' },
              },
            },
          },
        },
      */}
    </section>
  );
}
