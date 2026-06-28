import React from 'react';

interface SectionHeaderProps {
  /** Display headline */
  heading: string;
  /** Optional supporting copy beneath the heading */
  description?: string;
  /** Optional right-aligned slot (e.g. a "View all" link) */
  action?: React.ReactNode;
}

/**
 * Section header: large left-aligned headline + optional description,
 * with an optional right-aligned action slot.
 *
 * Wrap with <section> in the consumer so we don't dictate vertical rhythm here.
 */
export default function SectionHeader({
  heading,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-20">
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
  );
}
