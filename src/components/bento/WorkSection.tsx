'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { projects, type ProjectItem } from '@/data/portfolio';
import BrutalButton from '@/components/ui/BrutalButton';
import StarburstIcon from '@/components/ui/StarburstIcon';
import ProjectModal from '@/components/modals/ProjectModal';

export default function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="work"
      className="md:col-span-2 lg:col-span-7 bg-cream py-6 md:py-8 pl-6 md:pl-8 pr-0 flex flex-col justify-between min-w-0"
    >
      <div className="pr-6 md:pr-8">
        <h2 className="text-extruded text-[clamp(2rem,3.4vw,3rem)]">WORK</h2>
      </div>

      <ul
        tabIndex={0}
        aria-label="Projects, scroll horizontally"
        className="mt-6 flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 pr-6"
      >
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="snap-start shrink-0 basis-[calc((100%-12px)/1.3)] md:basis-[calc((100%-24px)/2.3)] lg:basis-[calc((100%-36px)/3.3)]"
          >
            <button
              type="button"
              onClick={() => setSelectedProject(project)}
              aria-label={`Open ${project.title}`}
              style={{ background: project.accent }}
              className="group relative block w-full aspect-[3/4] border-2 border-ink brutal-shadow-sm brutal-press overflow-hidden text-left cursor-pointer"
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  loading={index === 0 ? 'eager' : undefined}
                  sizes="(min-width:1024px) 22vw, (min-width:768px) 40vw, 75vw"
                  className="object-cover object-top"
                />
              ) : (
                <div className="w-full h-full p-4 flex flex-col justify-between items-center text-center">
                  <div className="flex-1 flex items-center justify-center w-full">
                    <StarburstIcon color="#F5F0E6" size={88} className="w-[45%] h-auto" />
                  </div>
                  <span className="font-display text-sm sm:text-base uppercase text-ink leading-tight">
                    {project.title}
                  </span>
                </div>
              )}

              <span className="absolute inset-x-0 bottom-0 bg-cream border-t-2 border-ink p-3 transition-all duration-150 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                <span className="block font-display text-sm uppercase text-ink truncate">
                  {project.title}
                </span>
                <span className="mt-1.5 flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase border-2 border-ink px-1.5 bg-cream text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 pr-6 md:pr-8 flex justify-end">
        <BrutalButton color="peach" href="/work">
          <span>VIEW MORE</span>
          <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
        </BrutalButton>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
