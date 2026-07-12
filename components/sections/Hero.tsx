'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import StatusCard from '@/components/StatusCard';

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
          <StatusCard
            items={currentlyItems}
            imageHref="#why-us"
            sayHiHref="#contact"
            className="lg:col-span-4"
          />
        </div>
      </div>
    </section>
  );
}
