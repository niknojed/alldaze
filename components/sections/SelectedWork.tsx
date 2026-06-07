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
  /** Href for the "View all" link */
  viewAllHref?: string;
}

// Pure Upscale Hair Studio detail is fully populated from real content.
// TODO: Fill in real detail for Digilence, Roswell Barbell, and Zaba Therapy
// before launch — current entries are placeholders.
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
    id: 'digilence',
    name: 'Digilence',
    year: '2024',
    type: 'Product UX & Web',
    detail: {
      description:
        'TODO: Add Digilence project description — what the product does, who it serves, and the nature of your engagement.',
      heroImage: '/Digilence.png',
      heroImageAlt: 'Digilence product interface',
      objective: 'TODO: Add the project objective.',
      contributions: ['UX Strategy', 'Product Design', 'Web Development'],
      biggestImpact: {
        statValue: 'TBD',
        statLabel: 'project outcome metric',
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
        'TODO: Add Roswell Barbell project description — local gym, community focus, your role.',
      heroImage: '/RoswellBarbell.png',
      heroImageAlt: 'Roswell Barbell exterior or training floor',
      objective: 'TODO: Add the project objective.',
      contributions: ['Website Design', 'Local SEO', 'Brand Refinement'],
      biggestImpact: {
        statValue: 'TBD',
        statLabel: 'membership growth metric',
        showStars: false,
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
        'TODO: Add Zaba Therapy project description — practice focus, audience, and what you delivered.',
      heroImage: '/ZabaTherapy.png',
      heroImageAlt: 'Zaba Therapy practice space',
      objective: 'TODO: Add the project objective.',
      contributions: ['Strategy & Research', 'Website Design', 'Copywriting Support'],
      biggestImpact: {
        statValue: 'TBD',
        statLabel: 'engagement metric',
        showStars: false,
      },
    },
  },
];

export default function SelectedWork({
  projects = defaultProjects,
  onProjectClick,
  viewAllHref = '/work',
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
            label="Selected Work"
            number="02"
            heading="Recent work, real partnerships."
            description="A curated look at projects we've shipped alongside Atlanta businesses, founders, and product teams."
            action={
              <a
                href={viewAllHref}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-[#0052FF] transition-colors"
              >
                View all projects
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            }
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
