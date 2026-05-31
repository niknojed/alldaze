/**
 * REPLACES the existing app/page.tsx (the "Ultra Simple Working Version").
 *
 * This wires up all 8 sections in their numbered order.
 * Each section is self-contained — props can be overridden if needed,
 * but defaults are populated with real-ish content tied to the four
 * confirmed case studies (Pure Upscale, Digilence, Roswell Barbell, Zaba Therapy).
 */

import Hero from '@/components/sections/Hero';
import SelectedWork from '@/components/sections/SelectedWork';
import WhyUs from '@/components/sections/WhyUs';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <SelectedWork />
      <WhyUs />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
