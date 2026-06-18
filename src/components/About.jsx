import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiAward, FiGlobe } from 'react-icons/fi';

const stats = [
  { icon: FiAward, label: 'GPA', value: '3.67' },
  { icon: FiMapPin, label: 'Based in', value: 'Yogyakarta, ID' },
  { icon: FiUser, label: 'Semester', value: '6th' },
  { icon: FiGlobe, label: 'TOEFL ITP', value: '557' },
];

export default function About() {
  return (
    <section id="about" className="relative bg-[var(--color-bg-secondary)]">
      <hr className="gradient-divider" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-6">
              I'm a 3rd-year Informatics student at{' '}
              <span className="text-[var(--color-text-primary)] font-medium">
                UPN Veteran Yogyakarta
              </span>{' '}
              with a 3.67 GPA, passionate about backend engineering, mobile development, and
              data-driven systems. I've built everything from AI-powered stock analysis apps to
              end-to-end encrypted messaging platforms.
            </p>
            <p className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-6">
              I'm fluent in both Indonesian and English (TOEFL 557, IELTS prep Band 7), and I'm
              always looking for meaningful problems to solve through code.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <span className="tech-tag">🎓 CS Student</span>
              <span className="tech-tag">⚙️ Backend Engineer</span>
              <span className="tech-tag">📱 Mobile Developer</span>
              <span className="tech-tag">📊 Data Enthusiast</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <stat.icon className="text-[var(--color-accent)] text-xl mx-auto mb-2" />
                <div className="text-[var(--color-text-primary)] font-[var(--font-heading)] text-lg font-bold">
                  {stat.value}
                </div>
                <div className="text-[var(--color-text-muted)] text-xs mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
