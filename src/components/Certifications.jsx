import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';

const certifications = [
  {
    title: 'BNSP Junior Web Programmer',
    issuer: 'BNSP',
    date: 'Nov 2025',
  },
  {
    title: 'HERTECH',
    issuer: 'ICT Watch',
    date: 'Nov 2025',
  },
  {
    title: 'Python for Data Science & ML Bootcamp',
    issuer: 'Udemy',
    date: 'Apr 2026',
  },
  {
    title: 'GEMASTIK XVIII 2025, Data Mining',
    issuer: 'National Competition',
    date: 'Oct 2025',
  },
  {
    title: 'IELTS Preparation, Score Band 7',
    issuer: 'IELTS',
    date: 'Jun 2024',
  },
  {
    title: 'TOEFL ITP, Score 557',
    issuer: 'ETS',
    date: 'Dec 2022',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

export default function Certifications() {
  return (
    <section id="certifications" className="relative">
      <hr className="gradient-divider" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Credentials and achievements</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={cardVariants}
              className="glass-card p-8 flex items-start gap-6 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-subtle)] border border-[rgba(0,201,255,0.12)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                <FiAward className="text-lg" />
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-heading)] text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-[var(--color-text-muted)] text-xs font-[var(--font-mono)] mt-1">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
