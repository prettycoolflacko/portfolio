import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';

const experiences = [
  {
    title: 'Information Technology & Digital Intern',
    company: 'PLN Indonesia Power — Head Office',
    period: 'Jan 2026 – Feb 2026',
    bullets: [
      'Engineered an automated Bun.js + Playwright scraper for the Sungrow iSolarCloud platform',
      'Built REST APIs and integrated Redis caching for real-time data pipelines',
    ],
  },
  {
    title: 'Documentation Division Staff',
    company: 'PKKMB UPNVY',
    period: 'Jul 2025 – Aug 2025',
    bullets: [
      'Documented campus-wide events and Faculty of Industrial Engineering activities through photography and video',
    ],
  },
  {
    title: 'Videographer',
    company: 'Multimedia Community Informatika',
    period: 'Oct 2024 – Present',
    bullets: [
      'Produced and edited multimedia content for the Informatics community using professional-level video equipment',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative">
      <hr className="gradient-divider" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Where I've worked and contributed</p>
        </motion.div>

        <div className="mt-12 timeline">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="timeline-item"
            >
              <div className="glass-card p-8">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-subtle)] border border-[rgba(0,201,255,0.12)] flex items-center justify-center text-[var(--color-accent)] shrink-0 mt-0.5">
                    <FiBriefcase className="text-base" />
                  </div>
                  <div>
                    <h3 className="font-[var(--font-heading)] text-base font-bold text-[var(--color-text-primary)]">
                      {exp.title}
                    </h3>
                    <p className="text-[var(--color-accent)] text-sm font-[var(--font-mono)]">
                      {exp.company}
                    </p>
                    <p className="text-[var(--color-text-muted)] text-xs font-[var(--font-mono)] mt-1">
                      {exp.period}
                    </p>
                  </div>
                </div>

                <ul className="list-none space-y-2 ml-12">
                  {exp.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="text-[var(--color-text-secondary)] text-sm leading-relaxed relative pl-4 before:content-['▹'] before:text-[var(--color-accent)] before:absolute before:left-0 before:top-0"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
