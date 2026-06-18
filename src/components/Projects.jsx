import { motion } from 'framer-motion';
import { FiGithub, FiFolder } from 'react-icons/fi';

const projects = [
  {
    title: 'FinApp Mobile',
    subtitle: 'AI-Powered Stock Market Analysis',
    role: 'AI Integration & Backend Logic Engineer',
    type: 'Group Project',
    year: '2026',
    description:
      'A collaborative mobile Decision Support System for financial tracking. I engineered the core analytical engine integrating the OpenRouter LLM API with a Fuzzy AHP + TOPSIS (MCDA) algorithm to convert user preferences into data-driven Buy/Hold/Sell decisions.',
    tags: ['Python', 'LLM API', 'Fuzzy AHP', 'TOPSIS', 'Mobile'],
    github: 'https://github.com/asda1-max/finappmobile.git',
  },
  {
    title: 'EventSync',
    subtitle: 'Cloud-Based Event Organizer Platform',
    role: 'Mobile Developer',
    type: 'Group Project',
    year: '2026',
    description:
      'I built the entire cross-platform Flutter application from scratch, enabling event organizers to manage real-time chats, tasks, rundowns, and vendor operations, consuming a dual-database backend via JWT-secured REST APIs.',
    tags: ['Flutter', 'REST API', 'JWT', 'Real-time', 'Cloud'],
    github: 'https://github.com/prettycoolflacko/EO_Mobile.git',
  },
  {
    title: 'Real-Time PLTS Monitoring',
    subtitle: 'PLN Indonesia Power Internship',
    role: 'Backend & Software Developer',
    type: 'Solo Project',
    year: '2026',
    description:
      'Engineered an automated Bun.js + Playwright scraper for the Sungrow iSolarCloud platform, eliminating manual portal checks with a real-time internal dashboard. Built REST APIs with Redis caching for live data pipelines.',
    tags: ['Bun.js', 'Playwright', 'Redis', 'REST API', 'Dashboard'],
    github: 'https://github.com/prettycoolflacko/PLN_IP-Isolar-WebScraping.git',
  },
  {
    title: 'CipherDrop',
    subtitle: 'Secure E2EE Messaging & File Sharing',
    role: 'Backend & Security Engineer',
    type: 'Group Project',
    year: '2026',
    description:
      'A secure desktop messaging and file-sharing app with End-to-End Encryption, image steganography, and zero-knowledge architecture. I developed the FastAPI backend on VPS implementing AES-256-GCM and Vigenère super-encryption, keeping the server blind to plaintext.',
    tags: ['Python', 'FastAPI', 'AES-256', 'VPS', 'E2EE', 'Security'],
    github: 'https://github.com/TedjaSatedji/cipherdrop.git',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Projects() {
  return (
    <section id="projects" className="relative bg-[var(--color-bg-secondary)]">
      <hr className="gradient-divider" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Things I've built and contributed to</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid md:grid-cols-2 gap-10"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="glass-card p-8 flex flex-col h-full group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)]">
                  <FiFolder className="text-2xl" />
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub`}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 text-xl"
                  >
                    <FiGithub />
                  </a>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-[var(--color-text-primary)] mb-2 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-[var(--color-text-primary)] text-base font-medium mb-4">
                {project.subtitle}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] mb-6">
                <span>{project.role}</span>
                <span>·</span>
                <span>{project.type}</span>
                <span>·</span>
                <span>{project.year}</span>
              </div>

              {/* Description */}
              <p className="text-[var(--color-text-secondary)] text-base leading-relaxed flex-1 mb-8">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-auto">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-tag text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
