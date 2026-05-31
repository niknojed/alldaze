'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface Service {
  number: string;
  title: string;
  description: string;
  /** Sub-services / deliverables under this offering */
  bullets: string[];
}

interface ServicesProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    number: '01',
    title: 'Web Design',
    description:
      "Conversion-focused websites that look as good as they perform. We design and build sites that represent your brand clearly and turn visitors into customers.",
    bullets: [
      'UX strategy & wireframing',
      'Visual & interface design',
      'Responsive build (Next.js / React)',
      'CMS integration & handoff',
    ],
  },
  {
    number: '02',
    title: 'UX Strategy',
    description:
      "Research and design rooted in real user behavior. We dig into who you serve, what they need, and design experiences that actually move the needle.",
    bullets: [
      'User research & interviews',
      'Information architecture',
      'Prototyping & usability testing',
      'Design systems',
    ],
  },
  {
    number: '03',
    title: 'Digital Marketing',
    description:
      "Campaigns and content that reach the right people. We pair brand-aligned creative with measurement so you can see what's working and double down.",
    bullets: [
      'Marketing strategy',
      'Brand & content campaigns',
      'Email & landing pages',
      'Analytics & reporting',
    ],
  },
  {
    number: '04',
    title: 'Google Ads & SEO',
    description:
      "Get found, drive traffic, grow the business. Local SEO and paid search that puts your business in front of the people already looking for what you offer.",
    bullets: [
      'Local SEO optimization',
      'Google Ads management',
      'On-page & technical SEO',
      'Performance tracking',
    ],
  },
];

export default function Services({ services = defaultServices }: ServicesProps) {
  return (
    <section className="bg-white py-24 lg:py-32" id="services" aria-labelledby="services-heading">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <SectionHeader
          label="Services"
          number="04"
          heading="What we do, and how we do it together."
          description="Four core offerings — used independently or stacked into a full engagement. Either way, you're working with us directly, not a handoff chain."
        />

        <ul className="divide-y divide-gray-200 border-y border-gray-200" role="list">
          {services.map((service) => (
            <li key={service.number}>
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-10 lg:py-16 group">
                {/* Left: number + title */}
                <div className="lg:col-span-5 flex items-start gap-6">
                  <div className="text-sm font-mono text-[#0052FF] mt-2 tabular-nums">
                    {service.number}
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-[1.05]">
                    {service.title}
                  </h3>
                </div>

                {/* Middle: description */}
                <div className="lg:col-span-4">
                  <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Right: sub-service bullets */}
                <div className="lg:col-span-3">
                  <ul className="space-y-3" role="list">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm text-gray-700"
                      >
                        <Plus
                          size={14}
                          className="text-[#0052FF] mt-1 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
