import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './codaze.css';

/**
 * Root layout for the Codaze pages on alldaze.studio/codaze. The home page
 * (codaze/page.tsx) brings its own chrome; the support and legal pages share
 * the header and footer in codaze/(info)/layout.tsx. Its own
 * stylesheet and font, so it can't change the studio homepage and the other
 * way round. Type follows the app: Visby CF for headings (licensed for web
 * use by Kinan), DM Sans (OFL) for text. Both are vendored in ./fonts, so
 * neither the build nor a visitor's browser calls Google Fonts.
 */
const dmSans = localFont({
  src: [
    { path: './fonts/dm-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/dm-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/dm-sans-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/dm-sans-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
  variable: '--font-sans',
});
const visby = localFont({
  src: [
    { path: './fonts/VisbyCF-DemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/VisbyCF-Bold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  fallback: ['Avenir Next', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alldaze.studio'),
  title: { default: 'Codaze', template: '%s · Codaze' },
  description: 'Codaze helps parents who share their kids across two homes keep pickups, swaps and promises in order.',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F6F1E8',
};

export default function CodazeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${visby.variable}`}>
      <body>{children}</body>
    </html>
  );
}
