/**
 * Artifacts — tools we're actively building.
 *
 * BONES ONLY: layout + placeholder tool cards. Replace `tools` with real
 * entries (and link out to live tools / repos) as they ship.
 */

import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Artifacts',
  description:
    'Tools the AllDazeWork duo is actively building — small utilities and experiments in progress.',
};

interface Tool {
  name: string;
  blurb: string;
  status: 'In progress' | 'Prototype' | 'Live';
}

// Placeholder tools — replace with real entries.
const tools: Tool[] = [
  {
    name: 'Coming soon',
    blurb: 'The first tool from our workbench is in active development. This page is where it will live.',
    status: 'In progress',
  },
];

const statusStyles: Record<Tool['status'], string> = {
  'In progress': 'text-[#0052FF] bg-[#0052FF]/10',
  Prototype: 'text-amber-700 bg-amber-100',
  Live: 'text-emerald-700 bg-emerald-100',
};

export default function ArtifactsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-white pt-16 lg:pt-24 pb-24" aria-labelledby="artifacts-heading">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          {/* Page header */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span className="text-[#0052FF] font-semibold" aria-hidden="true">/</span>
            <span className="tracking-wide">Artifacts</span>
          </div>
          <h1
            id="artifacts-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight mt-4"
          >
            <span className="text-gray-900">Tools we&apos;re </span>
            <span className="text-gray-400">building.</span>
          </h1>
          <p className="mt-8 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
            The stuff we make for ourselves — small utilities, prototypes, and tools in active development. Shared as they take shape.
          </p>

          {/* Tool grid */}
          <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {tools.map((tool, i) => (
              <li
                key={i}
                className="group rounded-2xl border border-gray-200 p-7 transition-colors hover:border-gray-900"
              >
                <div className="mb-5">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[tool.status]}`}
                  >
                    {tool.status}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                  {tool.name}
                  <ArrowUpRight
                    size={20}
                    className="text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0052FF]"
                    aria-hidden="true"
                  />
                </h2>
                <p className="text-gray-600 leading-relaxed">{tool.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
