import { motion } from 'framer-motion';
import { FiCode, FiLayers, FiTool, FiFilm } from 'react-icons/fi';

const skillGroups = [
  {
    icon: FiCode,
    title: 'Programming',
    skills: ['Python', 'JavaScript', 'PHP', 'C++', 'Java', 'SQL'],
  },
  {
    icon: FiLayers,
    title: 'Frameworks',
    skills: ['FastAPI', 'React Native', 'Express.js', 'Flutter', 'TailwindCSS'],
  },
  {
    icon: FiTool,
    title: 'Tools & Infra',
    skills: ['Git/GitHub', 'Linux', 'VPS', 'REST APIs', 'Redis', 'MQTT', 'IoT Hardware'],
  },
  {
    icon: FiFilm,
    title: 'Creative',
    skills: ['Adobe Premiere Pro', 'Photoshop', 'Videography', 'Graphic Design'],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative">
      <hr className="gradient-divider" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technologies & tools I work with</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid sm:grid-cols-2 gap-10"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={cardVariants}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-subtle)] border border-[rgba(0,201,255,0.12)] flex items-center justify-center text-[var(--color-accent)]">
                  <group.icon className="text-lg" />
                </div>
                <h3 className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-text-primary)]">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="tech-tag">
                    {skill}
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
