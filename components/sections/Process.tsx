'use client';

import React from 'react';
import SectionHeader from './SectionHeader';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessProps {
  steps?: ProcessStep[];
}

const defaultSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Explore',
    description:
      "Before anything gets designed, we map the vision and pressure-test the idea, so we build the right thing — not just the thing that was asked for.",
  },
  {
    number: '02',
    title: 'Design',
    description:
      "We shape the brand, the experience, and the screens — and you see the work as it takes shape.",
  },
  {
    number: '03',
    title: 'Build',
    description:
      "We engineer and ship it ourselves, so design and code never drift apart.",
  },
  {
    number: '04',
    title: 'Launch',
    description:
      "We get it live, then stick around — most clients stay on long after launch day.",
  },
];

export default function Process({ steps = defaultSteps }: ProcessProps) {
  return (
    <section className="bg-[#FAFAFA] py-24 lg:py-32" id="process" aria-labelledby="process-heading">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <SectionHeader
          label="Process"
          number="05"
          heading="From your first idea to launch day, we build it with you."
          description="Four phases, no surprises. You always know where we are and what's next."
        />

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
          {steps.map((step) => (
            <li
              key={step.number}
              className="bg-white p-8 lg:p-10 flex flex-col gap-4 min-h-[280px] lg:min-h-[320px] relative"
            >
              {/* Number with subtle treatment */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-[#0052FF] tabular-nums">
                  {step.number}
                </span>
                <span
                  className="w-8 h-px bg-gray-200"
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight mt-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed mt-1">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
