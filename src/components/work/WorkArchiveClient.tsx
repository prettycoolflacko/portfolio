'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects, type ProjectCategory, type ProjectItem } from '@/data/portfolio';
import TopNav from '@/components/bento/TopNav';
import MarqueeBanner from '@/components/bento/MarqueeBanner';
import BrutalButton from '@/components/ui/BrutalButton';
import StarburstIcon from '@/components/ui/StarburstIcon';
import ProjectModal from '@/components/modals/ProjectModal';

type FilterValue = 'ALL' | ProjectCategory;

const FILTERS: FilterValue[] = ['ALL', 'MOBILE', 'BACKEND', 'SECURITY'];

export default function WorkArchiveClient() {
  const [filter, setFilter] = useState<FilterValue>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    filter === 'ALL' ? projects : projects.filter((project) => project.category === filter);

  return (
    <main className="px-3 md:px-6">
      <div
        id="top"
        className="mx-auto my-4 md:my-8 max-w-[1280px] border-[3px] border-[#111111] bg-[#111111] shadow-[6px_6px_0_#111111] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[2px]"
      >
        <TopNav activePage="work" />

        <section className="md:col-span-2 lg:col-span-12 bg-cream p-6 md:p-10">
          <BrutalButton color="cream" size="sm" href="/">
            <ArrowLeft size={14} strokeWidth={2.5} aria-hidden="true" />
            <span>BACK TO HOME</span>
          </BrutalButton>

          <h1 className="text-extruded mt-5 text-[clamp(2.2rem,4.5vw,3.75rem)]">
            <span>ALL </span>
            <span className="text-accent-red">WORK</span>
          </h1>

          <p className="font-ui font-bold uppercase text-sm md:text-base max-w-[54ch] leading-snug mt-4 text-ink">
            4 SELECTED PROJECTS — MOBILE APPS, BACKEND PIPELINES &amp; SECURITY SYSTEMS.
          </p>

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {FILTERS.map((item) => (
              <BrutalButton
                key={item}
                color={filter === item ? 'yellow' : 'cream'}
                size="sm"
                onClick={() => setFilter(item)}
              >
                {item}
              </BrutalButton>
            ))}
          </div>
        </section>

        <div className="md:col-span-2 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-[#111111]">
          {filteredProjects.map((project, index) => (
            <article
              key={project.slug}
              className={`bg-cream p-6 md:p-8 flex flex-col justify-between ${
                filteredProjects.length === 1 ? 'md:col-span-2' : ''
              }`}
            >
              <div>
                <div
                  style={{ background: project.accent }}
                  className="aspect-[16/10] w-full border-2 border-ink brutal-shadow-sm overflow-hidden relative"
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      loading={index === 0 ? 'eager' : undefined}
                      sizes="(min-width:768px) 45vw, 95vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full p-5 flex flex-col items-center justify-center gap-3 text-center">
                      <StarburstIcon color="#F5F0E6" size={88} />
                      <span className="border-2 border-ink bg-cream px-3 py-1 font-ui font-bold uppercase text-xs tracking-[0.04em] text-ink">
                        {project.subtitle}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                  <span
                    style={{ background: project.accent }}
                    className="border-2 border-ink px-2 py-0.5 font-mono text-[11px] uppercase text-ink"
                  >
                    {project.category}
                  </span>
                  <span className="font-mono text-xs text-ink uppercase">
                    {project.type} / {project.year}
                  </span>
                </div>

                <h2 className="mt-3 font-display text-xl sm:text-2xl uppercase text-ink">
                  {project.title}
                </h2>
                <p className="font-ui font-bold text-xs uppercase tracking-[0.04em] mt-1 text-ink">
                  {project.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink">{project.summary}</p>

                <div className="mt-4 border-2 border-ink bg-accent-yellow px-3 py-1.5 font-mono text-xs text-ink">
                  {project.highlightMetric}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] uppercase border-2 border-ink px-2 py-0.5 bg-cream text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <BrutalButton
                  color="peach"
                  size="sm"
                  onClick={() => setSelectedProject(project)}
                >
                  <span>CASE STUDY</span>
                  <ArrowUpRight size={14} strokeWidth={2.5} aria-hidden="true" />
                </BrutalButton>
                <BrutalButton color="cream" size="sm" href={project.github} external>
                  GITHUB
                </BrutalButton>
              </div>
            </article>
          ))}
        </div>

        <div className="md:col-span-2 lg:col-span-12">
          <MarqueeBanner />
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
