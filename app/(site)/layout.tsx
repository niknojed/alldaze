import Navbar from '@/components/Navbar';
import TalonChat from '@/components/chat/TalonChat';

/**
 * Layout for the main marketing site — wraps pages with the global Navbar and
 * the Talon chat widget. Landing pages (e.g. /atlanta) live outside this group
 * so they render with no site nav.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <TalonChat />
    </>
  );
}
