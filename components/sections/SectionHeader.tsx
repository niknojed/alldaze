import React from 'react';

interface SectionHeaderProps {
  /** Small label like "Selected Work" */
  label: string;
  /** Section number — e.g. "02" */
  number: string;
  /** Display headline */
  heading: string;
  /** Optional supporting copy beneath the heading */
  description?: string;
  /** Optional right-aligned slot (e.g. a "View all" link) */
  action?: React.ReactNode;
}

/**
 * Kanso-style section header: slash-prefixed label + (XX) number on the left,
 * large headline + description on the right.
 *
 * Wrap with <section> in the consumer so we don't dictate vertical rhythm here.
 */
export default function SectionHeader({
  label,
  number,
  heading,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 lg:mb-20">
      <div className="lg:col-span-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <span className="text-[#0052FF] font-semibold" aria-hidden="true">/</span>
          <span className="tracking-wide">{label}</span>
        </div>
        <div className="text-xs text-gray-400 font-mono">({number})</div>
      </div>

      <div className="lg:col-span-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.05] tracking-tight">
              {heading}
            </h2>
            {description && (
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {action && <div className="lg:flex-shrink-0">{action}</div>}
        </div>
      </div>
    </div>
  );
}
