import type { Ref } from 'react';

const INK = '#1C1B19';
const ORANGE = '#E99669';

/**
 * The bare Held mark (two opposing corners around the orange dot). The arms
 * sit in their own group so `.turn` / `.load` in home.css can rotate them.
 * Always decorative: the text beside it carries the meaning.
 */
export function Held({
  size,
  className = '',
  svgRef,
}: {
  size: number;
  className?: string;
  svgRef?: Ref<SVGSVGElement>;
}) {
  return (
    <svg
      ref={svgRef}
      className={`held ${className}`.trim()}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <g className="arms">
        <path d="M24 64V40A16 16 0 0 1 40 24H64" fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M96 56V80A16 16 0 0 1 80 96H56" fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx="60" cy="60" r="11" fill={ORANGE} />
    </svg>
  );
}

/** Restart a CSS animation class on an element (remove, force layout, add). */
export function replay(el: Element | null, cls = 'turn') {
  if (!el) return;
  el.classList.remove(cls);
  void (el as HTMLElement | SVGElement).getBoundingClientRect();
  el.classList.add(cls);
}
