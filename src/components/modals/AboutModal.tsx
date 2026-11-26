'use client';

import Image from 'next/image';
import { profile, about } from '@/data/portfolio';
import ModalFrame from '@/components/modals/ModalFrame';
import BrutalButton from '@/components/ui/BrutalButton';

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  return (
    <ModalFrame
      open={open}
      onClose={onClose}
      title="ABOUT ME"
      headerColor="#8FD3E8"
      titleId="about-modal-title"
      maxWidthClass="max-w-3xl"
    >
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-ink">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 shrink-0 border-2 border-ink brutal-shadow-sm overflow-hidden bg-cream">
              <Image
                src={profile.avatar}
                width={64}
                height={64}
                alt={profile.name}
                className="w-full h-full object-cover object-[50%_55%]"
              />
            </div>
            <div>
              <h3 className="font-display text-lg uppercase text-ink leading-tight">
                {profile.name}
              </h3>
              <p className="font-ui font-bold uppercase text-xs tracking-[0.04em] text-ink mt-1">
                {profile.location}
              </p>
              <span className="inline-block mt-1.5 border-2 border-ink bg-accent-yellow px-2 py-0.5 font-mono text-[11px] uppercase text-ink">
                GPA 3.67 / 4.00 (6th Sem)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <BrutalButton color="yellow" size="sm" href={profile.cv} download>
              DOWNLOAD CV
            </BrutalButton>
            <BrutalButton color="cream" size="sm" href="/os">
              WIN7 OS MODE
            </BrutalButton>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {about.bio.map((paragraph, idx) => (
            <p key={idx} className="text-sm leading-relaxed text-ink">
              {paragraph}
            </p>
          ))}
        </div>

        <h3 className="font-display text-lg uppercase text-ink mt-6 mb-3">EXPERIENCE</h3>
        <div className="space-y-3">
          {about.experience.map((item) => (
            <div
              key={`${item.organization}-${item.period}`}
              className="border-2 border-ink brutal-shadow-sm bg-cream p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-ui font-bold uppercase text-sm text-ink">{item.title}</span>
                <span className="bg-accent-yellow border-2 border-ink px-2 py-0.5 font-mono text-[11px] text-ink">
                  {item.period}
                </span>
              </div>
              <p className="font-mono text-xs text-ink/80 mt-1">{item.organization}</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-xs sm:text-sm text-ink">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="font-display text-lg uppercase text-ink mt-6 mb-3">EDUCATION</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {about.education.map((edu) => (
            <div
              key={edu.institution}
              className="border-2 border-ink brutal-shadow-sm bg-cream p-4 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block bg-accent-blue border-2 border-ink px-2 py-0.5 font-mono text-[11px] text-ink">
                  {edu.period}
                </span>
                <h4 className="mt-2 font-ui font-bold uppercase text-sm text-ink">
                  {edu.institution}
                </h4>
                <p className="text-xs text-ink mt-0.5">{edu.degree}</p>
                <div className="mt-2 inline-block border-2 border-ink bg-accent-yellow px-2 py-0.5 font-mono text-[11px] text-ink">
                  {edu.metric}
                </div>
              </div>

              <ul className="mt-3 space-y-1 list-disc list-inside text-xs text-ink">
                {edu.highlights.map((hl, idx) => (
                  <li key={idx}>{hl}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="font-display text-lg uppercase text-ink mt-6 mb-3">CERTIFICATIONS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {about.certifications.map((cert, idx) => (
            <div
              key={cert.friendlyName}
              className={`border-2 border-ink brutal-shadow-sm p-3 ${
                idx % 2 === 0 ? 'bg-cream' : 'bg-accent-peach'
              }`}
            >
              <div className="font-ui font-bold uppercase text-xs sm:text-sm text-ink">
                {cert.friendlyName}
              </div>
              <div className="mt-1 flex items-center justify-between gap-2 font-mono text-[11px] text-ink">
                <span>{cert.issuer}</span>
                <span className="border border-ink bg-cream px-1.5 py-0.2 shrink-0">
                  {cert.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalFrame>
  );
}
