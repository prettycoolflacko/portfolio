'use client';

import { useState } from 'react';
import { skillCategories, type SkillCategoryId } from '@/data/portfolio';
import BrutalButton from '@/components/ui/BrutalButton';

type SkillFilter = 'ALL' | SkillCategoryId;

function levelBgColor(level: string) {
  if (level === 'Primary') return '#F5DB82';
  if (level === 'Proficient') return '#8FD3E8';
  return '#F5F0E6';
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillFilter>('ALL');

  const selectedCat =
    activeCategory === 'ALL'
      ? null
      : skillCategories.find((cat) => cat.id === activeCategory) ?? null;

  return (
    <section id="skills" className="md:col-span-2 lg:col-span-12 bg-cream p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="text-extruded text-[clamp(2rem,3.4vw,3rem)]">
          <span>TECHNICAL </span>
          <span className="text-accent-blue">SKILLS</span>
        </h2>

        <div
          role="group"
          aria-label="Filter technical skills"
          className="flex flex-wrap gap-2"
        >
          <BrutalButton
            color={activeCategory === 'ALL' ? 'yellow' : 'cream'}
            size="sm"
            onClick={() => setActiveCategory('ALL')}
          >
            ALL
          </BrutalButton>
          {skillCategories.map((cat) => (
            <BrutalButton
              key={cat.id}
              color={activeCategory === cat.id ? 'yellow' : 'cream'}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.shortLabel}
            </BrutalButton>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {selectedCat ? (
          <div>
            <div
              style={{ background: selectedCat.accent }}
              className="border-2 border-ink brutal-shadow-sm p-4 flex flex-wrap items-center justify-between gap-2"
            >
              <div>
                <h3 className="font-display text-base sm:text-lg uppercase text-ink">
                  {selectedCat.name}
                </h3>
                <p className="text-xs sm:text-sm text-ink mt-1">{selectedCat.description}</p>
              </div>
              <span className="border-2 border-ink bg-cream px-2.5 py-1 font-mono text-xs uppercase text-ink">
                {selectedCat.items.length} SKILLS
              </span>
            </div>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedCat.items.map((skill) => (
                <li
                  key={skill.name}
                  className="border-2 border-ink brutal-shadow-sm bg-cream p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-display text-base uppercase text-ink">
                        {skill.name}
                      </span>
                      <span
                        style={{ background: levelBgColor(skill.level) }}
                        className="font-mono text-[10px] uppercase px-1.5 py-0.5 border border-ink text-ink shrink-0"
                      >
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-ink mt-2 leading-snug">{skill.role}</p>
                  </div>

                  <div className="mt-3 font-mono text-[11px] text-ink/75 uppercase">
                    {skill.version}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="border-2 border-ink brutal-shadow-sm bg-[#111111] grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="bg-cream p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      style={{ background: cat.accent }}
                      className="border-2 border-ink px-2.5 py-1 font-display text-xs sm:text-sm uppercase text-ink"
                    >
                      {cat.name}
                    </span>
                    <span className="font-mono text-xs uppercase text-ink/80">
                      {cat.items.length} SKILLS
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-ink/80 leading-relaxed">{cat.description}</p>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <li
                      key={skill.name}
                      title={`${skill.role} (${skill.version})`}
                      className="border-2 border-ink px-2.5 py-1 bg-cream inline-flex items-center gap-2"
                    >
                      <span className="font-ui font-bold uppercase text-xs text-ink">
                        {skill.name}
                      </span>
                      <span
                        style={{ background: levelBgColor(skill.level) }}
                        className="font-mono text-[10px] uppercase px-1.5 py-0.5 border border-ink text-ink"
                      >
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
