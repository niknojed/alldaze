'use client';

import React, { useState } from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQItem[];
  /** Which question is open by default — pass null for all collapsed */
  defaultOpenId?: string | null;
}

const defaultFAQs: FAQItem[] = [
  {
    id: 'who-we-work-with',
    question: 'Who do you typically work with?',
    answer:
      "Small business owners in Atlanta and independent brand owners building something of their own. Local shops, service businesses, solo founders, creators with a brand. The thread: real ambition, hands-on involvement, and the kind of company where decisions don't need five layers of sign-off.",
  },
  {
    id: 'location',
    question: 'Do you work with clients outside of Atlanta?',
    answer:
      "Yes. Most of our work happens over video and shared docs regardless of location. We just love that we can show up in person for our Atlanta clients, and we lean into that whenever it makes sense — meetings, launches, even just a coffee.",
  },
  {
    id: 'timeline',
    question: "What's a typical project timeline?",
    answer:
      "Most projects run 6–12 weeks from kickoff to launch. Discovery and design take the first 3–4 weeks; build and refinement take the rest. We pace projects so you have real time to give thoughtful feedback — not so we're rushing past your input.",
  },
  {
    id: 'pricing',
    question: 'How do you price work?',
    answer:
      "Project-based, not hourly. We scope a fixed fee upfront based on what you actually need — typically $8K–$30K for a website project, more for product or ongoing work. You get a proposal with clear milestones, so you know exactly what you're paying for and when.",
  },
  {
    id: 'minimum',
    question: "What's your minimum project size?",
    answer:
      "No hard minimum, but we work best with projects that have room for real strategy — typically $5K and up. If your budget is smaller, we'll happily point you toward someone who's a better fit. We'd rather refer you out than do shallow work.",
  },
  {
    id: 'support',
    question: 'Do you offer ongoing support after launch?',
    answer:
      "Always. Most of our clients keep us on retainer for ongoing updates, marketing campaigns, or just having designers on call. If you'd rather take it forward yourself, we hand off clean docs and code so your team is set up to run with it. Your call.",
  },
  {
    id: 'tech',
    question: 'What technology do you build with?',
    answer:
      "Next.js, React, TypeScript, and Tailwind for most web work. Webflow when speed-to-launch matters more than custom code. We pick the stack that fits the project, not the other way around.",
  },
  {
    id: 'getting-started',
    question: 'How do we get started?',
    answer:
      "Send us a note about what you're working on — even just a few sentences. We'll set up a 30-minute call to make sure we're a good fit, then send a proposal within a week. No high-pressure sales nonsense, ever.",
  },
];

export default function FAQ({
  faqs = defaultFAQs,
  defaultOpenId = defaultFAQs[0]?.id ?? null,
}: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      className="bg-[#FAFAFA] py-24 lg:py-32"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <SectionHeader
          label="FAQ"
          number="07"
          heading="Questions we hear often."
          description="Don't see what you're looking for? Reach out — we're friendly."
        />

        {/* Accordion */}
        <ul
          className="border-t border-gray-200 max-w-4xl mx-auto"
          role="list"
        >
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const contentId = `faq-content-${faq.id}`;
            const buttonId = `faq-button-${faq.id}`;
            return (
              <li key={faq.id} className="border-b border-gray-200">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full flex items-center justify-between gap-6 py-6 lg:py-8 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-sm"
                  >
                    <span
                      className={`text-lg lg:text-2xl font-semibold tracking-tight transition-colors duration-200 ${
                        isOpen ? 'text-[#0052FF]' : 'text-gray-900 group-hover:text-[#0052FF]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#0052FF] border-[#0052FF] text-white rotate-45'
                          : 'bg-white border-gray-200 text-gray-900 group-hover:border-gray-900'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>

                {/* Animated expanding content — grid-rows trick for smooth variable height */}
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 lg:pb-8 pr-16 text-base lg:text-lg text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Closing CTA — for the "still curious" people */}
        <div className="mt-12 lg:mt-16 max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white">
                Still have a question?
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                We'll get back to you within a business day. Usually faster.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-full text-sm font-semibold transition-colors flex-shrink-0 self-start sm:self-auto"
            >
              Get in touch
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
