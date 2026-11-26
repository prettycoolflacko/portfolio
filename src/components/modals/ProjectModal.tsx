'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { ProjectItem } from '@/data/portfolio';
import ModalFrame from '@/components/modals/ModalFrame';
import BrutalButton from '@/components/ui/BrutalButton';
import StarburstIcon from '@/components/ui/StarburstIcon';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <ModalFrame
      open={Boolean(project)}
      onClose={onClose}
      title={project?.title ?? ''}
      headerColor={project?.accent}
      titleId="project-modal-title"
      maxWidthClass="max-w-3xl"
    >
      {project && (
        <div>
          {project.image ? (
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-5 items-start">
              <div className="border-2 border-ink brutal-shadow-sm overflow-hidden aspect-[9/16] max-h-[320px] relative mx-auto w-[180px] sm:w-full bg-cream">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="200px"
                  className="object-cover object-top"
                />
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="border-2 border-ink bg-cream px-2 py-0.5 font-mono text-[11px] uppercase text-ink">
                    ROLE: {project.role}
                  </span>
                  <span className="border-2 border-ink bg-cream px-2 py-0.5 font-mono text-[11px] uppercase text-ink">
                    {project.type}
                  </span>
                  <span className="border-2 border-ink bg-cream px-2 py-0.5 font-mono text-[11px] uppercase text-ink">
                    {project.year}
                  </span>
                </div>

                <div className="mt-3 bg-accent-yellow border-2 border-ink brutal-shadow-sm px-3 py-2 font-mono text-xs text-ink font-medium">
                  {project.highlightMetric}
                </div>

                <p className="mt-4 text-sm font-bold leading-relaxed text-ink">
                  {project.summary}
                </p>

                <div className="mt-3 space-y-3">
                  {project.details.map((paragraph, idx) => (
                    <p key={idx} className="text-sm leading-relaxed text-ink">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{ background: project.accent }}
                className="border-2 border-ink brutal-shadow-sm p-4 flex items-center gap-4"
              >
                <StarburstIcon size={44} color="#F5F0E6" className="shrink-0" />
                <div className="min-w-0">
                  <p className="font-display text-sm sm:text-base uppercase text-ink leading-tight">
                    {project.subtitle}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="border-2 border-ink bg-cream px-2 py-0.5 font-mono text-[11px] uppercase text-ink">
                      ROLE: {project.role}
                    </span>
                    <span className="border-2 border-ink bg-cream px-2 py-0.5 font-mono text-[11px] uppercase text-ink">
                      {project.type}
                    </span>
                    <span className="border-2 border-ink bg-cream px-2 py-0.5 font-mono text-[11px] uppercase text-ink">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-accent-yellow border-2 border-ink brutal-shadow-sm px-3 py-2 font-mono text-xs text-ink font-medium">
                {project.highlightMetric}
              </div>

              <p className="mt-4 text-sm font-bold leading-relaxed text-ink">
                {project.summary}
              </p>

              <div className="mt-3 space-y-3">
                {project.details.map((paragraph, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-ink">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 border-2 border-ink bg-[#111111] grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
            {project.techDetails.map((spec) => (
              <div key={spec.key} className="bg-cream p-3">
                <div className="font-mono text-[10px] uppercase text-ink/70">{spec.key}</div>
                <div className="mt-1 text-xs sm:text-sm font-bold text-ink">{spec.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs uppercase border-2 border-ink px-2 py-0.5 bg-cream text-ink"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t-2 border-ink flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <BrutalButton color="yellow" href={project.github} external>
                <span>VIEW ON GITHUB</span>
                <ExternalLink size={14} strokeWidth={2.5} aria-hidden="true" />
              </BrutalButton>
              {project.liveUrl && (
                <BrutalButton color="blue" href={project.liveUrl} external>
                  <span>LIVE DEMO</span>
                  <ExternalLink size={14} strokeWidth={2.5} aria-hidden="true" />
                </BrutalButton>
              )}
            </div>

            <BrutalButton color="cream" onClick={onClose}>
              CLOSE
            </BrutalButton>
          </div>
        </div>
      )}
    </ModalFrame>
  );
}
