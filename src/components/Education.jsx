import { motion } from 'framer-motion';
import { FiBookOpen } from 'react-icons/fi';

const education = [
  {
    degree: 'Bachelor of Computer Science (Informatics)',
    institution: 'Universitas Pembangunan Nasional Veteran Yogyakarta',
    period: 'Aug 2023 – Present',
    gpa: '3.67',
    details: [
      'Active member, Multimedia Community Informatika',
      'Pursuing personal projects in data science and full-stack development',
    ],
  },
  {
    degree: 'Science (MIPA) Stream',
    institution: 'SMA Internasional Budi Mulia Dua',
    period: 'Jun 2020 – May 2023',
    gpa: 'Grade: 88',
    details: [
      '🥈 1st Runner-Up, National Robotic Competition — ITS (2022)',
      '🥇 Gold Medal, Indonesian Student English Olympiad — Student Olympiad Center (2022)',
    ],
  },
];

export default function Education() {
  return (
    <section id="education" className="relative bg-[var(--color-bg-secondary)]">
      <hr className="gradient-divider" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">My academic journey</p>
        </motion.div>

        <div className="mt-12 timeline">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="timeline-item"
            >
              <div className="glass-card p-8">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-subtle)] border border-[rgba(0,201,255,0.12)] flex items-center justify-center text-[var(--color-accent)] shrink-0 mt-0.5">
                    <FiBookOpen className="text-base" />
                  </div>
                  <div>
                    <h3 className="font-[var(--font-heading)] text-base font-bold text-[var(--color-text-primary)]">
                      {edu.degree}
                    </h3>
                    <p className="text-[var(--color-accent)] text-sm font-[var(--font-mono)]">
                      {edu.institution}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-[var(--color-text-muted)] text-xs font-[var(--font-mono)]">
                        {edu.period}
                      </p>
                      <span className="text-[var(--color-text-muted)]">·</span>
                      <p className="text-[var(--color-accent)] text-xs font-[var(--font-mono)] font-semibold">
                        GPA: {edu.gpa}
                      </p>
                    </div>
                  </div>
                </div>

                <ul className="list-none space-y-2 ml-12 mt-3">
                  {edu.details.map((detail, j) => (
                    <li
                      key={j}
                      className="text-[var(--color-text-secondary)] text-sm leading-relaxed relative pl-4 before:content-['▹'] before:text-[var(--color-accent)] before:absolute before:left-0 before:top-0"
                    >
                      {detail}
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
