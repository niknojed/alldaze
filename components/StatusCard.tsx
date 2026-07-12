'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CurrentlyItem {
  label: string;
  value: string;
}

interface StatusCardProps {
  /** Rows shown inside the "Currently" calling card */
  items?: CurrentlyItem[];
  /** Where the team photo links to */
  imageHref?: string;
  /** Where the "Say hi" link points */
  sayHiHref?: string;
  /** Extra classes for the outer <aside> (e.g. grid column span) */
  className?: string;
}

const defaultItems: CurrentlyItem[] = [
  { label: 'Based in', value: 'Atlanta, GA' },
  { label: 'Booking', value: 'Summer 2026' },
  { label: 'Est.', value: '2022' },
];

export default function StatusCard({
  items = defaultItems,
  imageHref = '#why-us',
  sayHiHref = '#contact',
  className = '',
}: StatusCardProps) {
  return (
    <aside className={className} aria-label="Studio status card">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-5">
        <ul className="space-y-0" role="list">
          {items.map((item, i) => (
            <li
              key={item.label}
              className={`flex items-baseline justify-between gap-4 py-3 ${
                i < items.length - 1 ? 'border-b border-gray-100' : ''
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
            href={imageHref}
            aria-label="Meet the team"
            className="group block w-1/2 flex-shrink-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
          >
            <img
              src="/design-duo.png"
              alt="The AllDazeWork design studio — meet the team"
              className="w-full h-auto rounded-xl object-cover border border-gray-100 transition-colors duration-300 ease-out group-hover:border-[#0052FF] group-focus-visible:border-[#0052FF]"
            />
          </a>
          <a
            href={sayHiHref}
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
  );
}
