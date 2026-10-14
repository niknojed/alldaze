import FlightClient from '@/components/flight/FlightClient';
import { FLIGHT_MARKUP } from '@/components/flight/markup';

/**
 * Homepage. The markup is static and server-rendered for SEO and first paint;
 * FlightClient attaches the interactive behaviour after hydration.
 */
export default function HomePage() {
  return (
    <>
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: FLIGHT_MARKUP }} />
      <FlightClient />
    </>
  );
}
