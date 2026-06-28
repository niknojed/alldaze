'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import ProjectModal from './ProjectModal';

export interface ProjectDetail {
  /** Intro paragraph shown above the hero image in the modal */
  description: string;
  /** Path to the hero image — leave empty to show placeholder */
  heroImage: string;
  /** Alt text for the hero image */
  heroImageAlt: string;
  /** "Objective" sidebar section */
  objective: string;
  /** "Our Contribution" sidebar list */
  contributions: string[];
  /** "Biggest Impact" stat block */
  biggestImpact: {
    statValue: string;
    statLabel: string;
    showStars?: boolean;
  };
}

export interface Project {
  id: string;
  name: string;
  year: string;
  /** Short descriptor — e.g. "Brand & Web Design" */
  type: string;
  detail: ProjectDetail;
}

interface SelectedWorkProps {
  projects?: Project[];
  /** Optional analytics callback — fires alongside the modal opening */
  onProjectClick?: (projectId: string) => void;
}

// All project details are populated from real content. CV Home & Lawn and
// YOU Continuum still need hero images and a year/scope confirmation pass —
// see the inline notes on those entries.
const defaultProjects: Project[] = [
  {
    id: 'pure-upscale',
    name: 'Pure Upscale Hair Studio',
    year: '2024',
    type: 'Brand & Web Design',
    detail: {
      description:
        "Pure Upscale Hair Studio is a beloved barbershop & community staple owned by lead barber, Corey Cooper, and located in East Atlanta Village. Our collaboration over the years has produced effective digital services & solutions for the brand's website & booking experience — by focusing on what truly matters.",
      heroImage: '/PureUpscale.png',
      heroImageAlt:
        'Inside Pure Upscale Hair Studio — barber tools and equipment laid out on the workstation',
      objective:
        'Make it easy for people to book online, find the shop, and leave a happy client.',
      contributions: [
        'Brand & Marketing',
        'Website Design',
        'Mobile Optimization',
        'Streamlined Booking',
        'Video Production',
      ],
      biggestImpact: {
        statValue: '91 – 5',
        statLabel: 'Star Average reviews on Google',
        showStars: true,
      },
    },
  },
  {
    id: 'cv-home-lawn',
    // ⚠️ Final Content Spec §5 / §7.2: confirm year (2025); if you have a real
    // review count, a number beats "5★".
    name: 'CV Home & Lawn',
    year: '2025',
    type: 'Brand Identity · Website · Local Presence',
    detail: {
      description:
        "A Marietta lawn-care and handyman business that needed to look as dependable online as it is on the job. We built the brand, the site, and the local-search presence from the ground up.",
      heroImage: '/cv-home_720.png',
      heroImageAlt: 'CV Home & Lawn brand identity and website',
      objective:
        "Carlos had the skills and the reviews but no cohesive brand or web presence to turn local searches into booked jobs. He needed to look established — and be found when neighbors search for lawn care or a handyman.",
      contributions: [
        'Brand identity & logo',
        'Website design + build',
        'Google Business Profile setup',
        'Local SEO & marketing foundation',
      ],
      biggestImpact: {
        statValue: '5★',
        statLabel: 'across Google & Thumbtack',
        showStars: true,
      },
    },
  },
  {
    id: 'you-continuum',
    // ⚠️ Final Content Spec §5 / §7.3: confirm year (2025) and exact scope of
    // contributions. Paused experiment — frame around craft, NOT traction; do
    // not imply active growth or metrics.
    name: 'YOU Continuum',
    year: '2025',
    type: 'Brand Identity · Product Concept · Web',
    detail: {
      description:
        "A self-care platform built on a simple premise: well-being shifts by small degrees, not big leaps. We shaped the brand and the product concept — a nine-domain model and the Self-Care Compass that points people to the life area that needs them most — and brought it to life on the web.",
      heroImage: '/yc-image_720.png',
      heroImageAlt: 'YOU Continuum brand identity and product concept',
      objective:
        "Turn a thoughtful philosophy about evolving personal values into something a person could actually use — a clear, data-guided starting point for self-care, instead of a vague 'where do I even begin?'",
      contributions: [
        'Brand identity',
        'Product & UX concept (nine life domains + Self-Care Compass)',
        'Web design + build',
      ],
      biggestImpact: {
        statValue: '9',
        statLabel: 'life domains mapped into one clear starting point',
        showStars: false,
      },
    },
  },
  {
    id: 'digilence',
    name: 'Digilence',
    year: '2024',
    type: 'Product UX & Web',
    detail: {
      description:
        'Before its acquisition by Aiwyn in early 2025, the team focused on automating tax engagements for firms and their clients. We were brought in to help visualize user flows and interactions across key product features. Our contributions strengthened the Digilence design system and produced high-fidelity prototypes that supported sales presentations and partnership pitches.',
      heroImage: '/Digilence.png',
      heroImageAlt:
        'Illustration of a delivery rider on a scooter carrying a box of tax files',
      objective:
        'Create UI widgets for firm dashboards & client engagement workflows.',
      contributions: [
        'UX Design',
        'Rapid Prototyping',
        'UI Development',
        'Design System',
        'Brand Design',
      ],
      biggestImpact: {
        statValue: '20+',
        statLabel: 'widgets designed, dev’d & delivered',
        showStars: false,
      },
    },
  },
  {
    id: 'roswell-barbell',
    name: 'Roswell Barbell',
    year: '2023',
    type: 'Local Web & Brand',
    detail: {
      description:
        'Roswell Barbell is a North Atlanta staple and strength training team & facility centered in the heart of Roswell & Alpharetta. Our partnership began with the brand’s inception, where we led and delivered a full-scale web package that established and strengthened its digital presence—one that has continued to stand the test of time.',
      heroImage: '/RoswellBarbell.png',
      heroImageAlt:
        'A coach spotting a lifter during a dumbbell bench press on the training floor at Roswell Barbell',
      objective:
        'Make it easy for people to find the gym, join the team and get stronger.',
      contributions: [
        'Brand & Marketing',
        'Web Design & Maintenance',
        'Mobile Optimization',
        'Streamlined Booking with Typeform',
        'Video Production',
        'Social Media',
      ],
      biggestImpact: {
        statValue: '61 – 5',
        statLabel: 'Star Average reviews on Google',
        showStars: true,
      },
    },
  },
  {
    id: 'zaba-therapy',
    name: 'Zaba Therapy',
    year: '2023',
    type: 'Web Design & Strategy',
    detail: {
      description:
        'Zaba Therapy is an evidenced based ABA therapy team led by Dr. Thomas Zwicker, who provide services for parents and their children with autism across home, center, and school settings.',
      heroImage: '/ZabaTherapy.png',
      heroImageAlt:
        'A father and child painting together on a large canvas in an art studio',
      objective:
        'Redesign and modernize the brand to improve discoverability and position it as a trusted industry knowledge leader.',
      contributions: [
        'Brand & Marketing',
        'Logo Enhancement',
        'Web Design & Maintenance',
        'Content Strategy',
        'Mobile Optimization',
        'Booking with Jotform',
        'HIPAA Compliant',
      ],
      biggestImpact: {
        statValue: '',
        statLabel:
          'Helped facilitate the opening of new clinics across Connecticut, connecting families in need throughout multiple counties with the care they deserve.',
        showStars: false,
      },
    },
  },
];

export default function SelectedWork({
  projects = defaultProjects,
  onProjectClick,
}: SelectedWorkProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  const openProject = openProjectId
    ? projects.find((p) => p.id === openProjectId) ?? null
    : null;
  const openIndex = openProjectId
    ? projects.findIndex((p) => p.id === openProjectId)
    : -1;

  const handleOpen = (projectId: string) => {
    setOpenProjectId(projectId);
    onProjectClick?.(projectId);
  };

  const handleClose = () => setOpenProjectId(null);

  const handleNext = () => {
    if (openIndex === -1) return;
    const next = projects[(openIndex + 1) % projects.length];
    setOpenProjectId(next.id);
    onProjectClick?.(next.id);
  };

  return (
    <>
      <section
        className="bg-white py-24 lg:py-32"
        id="selected-work"
        aria-labelledby="selected-work-heading"
      >
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <SectionHeader
            heading="Recent work, real partnerships."
            description="A curated look at work we've shipped with the people in our sweet spot — solo founders, local trades, and brand starters building something worth getting right."
          />

          <ul className="border-t border-gray-200" role="list">
            {projects.map((project) => {
              const isHovered = hoveredId === project.id;
              return (
                <li
                  key={project.id}
                  className="border-b border-gray-200"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleOpen(project.id)}
                    className="w-full group flex items-baseline justify-between gap-4 py-6 lg:py-8 px-2 lg:px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-sm"
                    aria-label={`View ${project.name} case study, ${project.year}, ${project.type}`}
                  >
                    <div className="flex-1 grid grid-cols-12 gap-4 items-baseline">
                      <span
                        className={`col-span-12 sm:col-span-6 lg:col-span-7 text-2xl md:text-3xl lg:text-5xl font-semibold tracking-tight transition-colors duration-300 ${
                          isHovered ? 'text-[#0052FF]' : 'text-gray-900'
                        }`}
                      >
                        {project.name}
                      </span>
                      <span className="hidden sm:block sm:col-span-2 lg:col-span-2 text-sm text-gray-500 font-medium tabular-nums">
                        {project.year}
                      </span>
                      <span className="hidden sm:block sm:col-span-4 lg:col-span-3 text-sm text-gray-500">
                        {project.type}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={28}
                      className={`flex-shrink-0 transition-all duration-300 ${
                        isHovered
                          ? 'translate-x-1 -translate-y-1 text-[#0052FF] opacity-100'
                          : 'text-gray-300 opacity-70'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Mobile-only metadata row */}
                  <div className="sm:hidden flex items-center gap-3 px-2 pb-4 -mt-2 text-xs text-gray-500">
                    <span className="font-medium tabular-nums">{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.type}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ProjectModal
        project={openProject}
        totalProjects={projects.length}
        currentIndex={openIndex}
        onClose={handleClose}
        onNext={handleNext}
      />
    </>
  );
}
