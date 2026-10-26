/** The Codaze Held mark: two opposing corners around the orange dot. */
export function HeldMark({ size = 32, title }: { size?: number; title?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <rect width="120" height="120" rx="27" fill="#1C1C1C" />
      <path d="M38 63V48a10 10 0 0 1 10-10h15" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M82 57v15a10 10 0 0 1-10 10H57" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="60" cy="60" r="7" fill="#E99669" />
    </svg>
  );
}
