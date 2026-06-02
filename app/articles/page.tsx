/**
 * Articles — blog-style page hosting our Litewrk & Play experiments.
 *
 * BONES ONLY: layout + placeholder entries. Wire to real content (MDX,
 * a CMS, or a /content folder) in a later pass. Each entry below is a
 * stand-in for a published experiment.
 */

import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Litewrk & Play — short experiments, build notes, and design tangents from the AllDazeWork duo.',
};

interface ArticleEntry {
  title: string;
  blurb: string;
  /** "Litewrk" = build notes / case-adjacent writing, "Play" = experiments */
  track: 'Litewrk' | 'Play';
  date: string;
}

// Placeholder entries — replace with real posts.
const entries: ArticleEntry[] = [
  {
    title: 'Coming soon',
    blurb: 'Our first Litewrk note is in the oven. Build logs and the thinking behind recent client work will land here.',
    track: 'Litewrk',
    date: '2026',
  },
  {
    title: 'Coming soon',
    blurb: 'Play experiments — small interface ideas, motion studies, and things we make just to see if they work.',
    track: 'Play',
    date: '2026',
  },
];

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-white pt-16 lg:pt-24 pb-24" aria-labelledby="articles-heading">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          {/* Page header */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span className="text-[#0052FF] font-semibold" aria-hidden="true">/</span>
            <span className="tracking-wide">Articles</span>
          </div>
          <h1
            id="articles-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight mt-4"
          >
            <span className="text-gray-900">Litewrk </span>
            <span className="text-gray-400">&amp; Play.</span>
          </h1>
          <p className="mt-8 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
            Build notes, design tangents, and the experiments we run between projects. Half studio journal, half playground.
          </p>

          {/* Entry list */}
          <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
            {entries.map((entry, i) => (
              <li
                key={i}
                className="group rounded-2xl border border-gray-200 p-7 transition-colors hover:border-gray-900"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0052FF]">
                    {entry.track}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{entry.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                  {entry.title}
                  <ArrowUpRight
                    size={20}
                    className="text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0052FF]"
                    aria-hidden="true"
                  />
                </h2>
                <p className="text-gray-600 leading-relaxed">{entry.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
