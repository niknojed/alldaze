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
    title: 'Discover',
    description:
      "We start with listening. A working session (or two) to understand your business, your customers, and what success actually looks like for you.",
  },
  {
    number: '02',
    title: 'Design',
    description:
      "We sketch, wireframe, and prototype with you in the loop. No big reveals — you see the work as it takes shape and we shape it together.",
  },
  {
    number: '03',
    title: 'Build',
    description:
      "Designs become a real, fast, accessible site. We handle the technical implementation in-house — no design-to-dev handoff gap.",
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      "Launch day, training, and the docs to keep it running. We stay close after — most clients become long-term partners, not one-off projects.",
  },
];

export default function Process({ steps = defaultSteps }: ProcessProps) {
  return (
    <section className="bg-[#FAFAFA] py-24 lg:py-32" id="process" aria-labelledby="process-heading">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <SectionHeader
          label="Process"
          number="05"
          heading="A clear path from idea to launch."
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
