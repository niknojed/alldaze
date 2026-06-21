/**
 * AllDazeWork brand tokens
 *
 * Centralized so component files don't hardcode hex values.
 * Tailwind arbitrary values still work for one-offs, but for anything
 * that's repeated, import from here.
 */

export const brand = {
  colors: {
    primary: '#0052FF',
    primaryHover: '#003ECC',
    ink: '#0A0A0A',       // headlines
    text: '#1F2937',      // body text
    muted: '#6B7280',     // metadata, labels
    line: '#E5E7EB',      // borders
    surface: '#FAFAFA',   // section backgrounds
  },
} as const;

// Section numbers — keep these in one place so re-ordering is painless.
export const sectionNumbers = {
  hero: '01',
  selectedWork: '02',
  whyUs: '03',
  services: '04',
  process: '05',
  faq: '06',
  contact: '07',
} as const;
