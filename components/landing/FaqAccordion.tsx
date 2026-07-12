'use client';

import React, { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
  open?: boolean;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const initial = faqs.findIndex((f) => f.open);
  const [openIndex, setOpenIndex] = useState<number | null>(
    initial === -1 ? null : initial,
  );

  return (
    <div>
      {faqs.map((f, i) => {
        const isOpen = openIndex === i;
        const contentId = `atl-faq-content-${i}`;
        const buttonId = `atl-faq-button-${i}`;
        return (
          <div
            key={f.q}
            className="border-t border-line [&:last-of-type]:border-b [&:last-of-type]:border-line"
          >
            <button
              type="button"
              id={buttonId}
              onClick={() => setOpenIndex((cur) => (cur === i ? null : i))}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-[1.02rem] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {f.q}
              <span
                className={`flex-shrink-0 text-brand transition-transform duration-[250ms] ease-[cubic-bezier(.25,.6,.3,1)] ${
                  isOpen ? 'rotate-45' : ''
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

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
                <p className="max-w-[64ch] pb-5 text-[.96rem] text-body">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
