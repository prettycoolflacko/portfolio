import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiDownload, FiArrowDown } from 'react-icons/fi';

/* Replace ./assets/profile.webp with your actual photo */
import profileImg from '../assets/profile.webp';

const roles = ['Backend Engineer', 'Mobile Developer', 'Data Enthusiast', 'Full-Stack Developer'];

function useTypingEffect(strings, typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState('');
  const state = useRef({
    text: '',
    index: 0,
    isDeleting: false,
    isPaused: false,
  });

  useEffect(() => {
    let timer;

    const tick = () => {
      const s = state.current;
      const current = strings[s.index];

      if (s.isPaused) return;

      if (!s.isDeleting) {
        s.text = current.substring(0, s.text.length + 1);
        setDisplayText(s.text);

        if (s.text.length === current.length) {
          s.isPaused = true;
          timer = setTimeout(() => {
            s.isPaused = false;
            s.isDeleting = true;
            tick();
          }, pauseDuration);
          return;
        }
      } else {
        s.text = current.substring(0, s.text.length - 1);
        setDisplayText(s.text);

        if (s.text.length === 0) {
          s.isDeleting = false;
          s.index = (s.index + 1) % strings.length;
        }
      }

      const speed = s.isDeleting ? deletingSpeed : typingSpeed;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, typingSpeed);

    return () => clearTimeout(timer);
  }, [strings, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/prettycoolflacko', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/elyuzar-f', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://instagram.com/elyuzar_f', label: 'Instagram' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Hero() {
  const typedRole = useTypingEffect(roles);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="section-container flex flex-col md:flex-row items-center gap-16 md:gap-24 pt-24"
      >
        {/* Profile Image Column — appears first on mobile */}
        <motion.div variants={itemVariants} className="flex-shrink-0 relative">
          <div className="relative">
            {/* Ambient glow behind image */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-40"
              style={{ background: 'radial-gradient(circle, rgba(139, 0, 0, 0.5) 0%, transparent 70%)' }}
            />
            <img
              src={profileImg}
              alt="Elyuzar Fazlurrahman"
              className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover shadow-xl"
              style={{
                border: '3px solid rgba(139, 0, 0, 0.6)',
                boxShadow: '0 0 30px rgba(139, 0, 0, 0.35), 0 0 60px rgba(139, 0, 0, 0.15)',
              }}
            />
          </div>
        </motion.div>

        {/* Text Column */}
        <div className="flex-1 text-center md:text-left">
          <motion.p
            variants={itemVariants}
            className="text-[var(--color-accent)] font-medium text-lg mb-6"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-[var(--font-heading)] text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] leading-tight mb-4"
          >
            Elyuzar Fazlurrahman
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-[var(--color-text-secondary)] text-xl sm:text-2xl font-[var(--font-heading)] mb-8 h-10 flex items-center justify-center md:justify-start"
          >
            <span className="text-[var(--color-text-primary)] font-medium">{typedRole}</span>
            <span className="typing-cursor" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-[var(--color-text-muted)] text-lg sm:text-xl max-w-2xl mx-auto md:mx-0 mb-12 leading-relaxed"
          >
            I build things that work — backends, mobile apps, and tools that solve real problems.
          </motion.p>

          <div className="flex flex-col gap-8 mt-16">
            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 justify-center md:justify-start"
            >
              <a href="#projects" className="btn-glow">
                <FiArrowDown className="text-xl" />
                View Projects
              </a>
              <a
                href="./assets/Elyuzar_CV.pdf"
                download
                className="btn-outline"
              >
                <FiDownload className="text-xl" />
                Download CV
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-6 justify-center md:justify-start"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-text-secondary)] text-xl transition-all duration-300 hover:border-[var(--color-border-accent)] hover:text-[var(--color-accent)] hover:-translate-y-1"
                >
                  <social.icon />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[var(--color-text-muted)] text-xs font-[var(--font-mono)] tracking-widest">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-[var(--color-text-muted)] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-[var(--color-accent)] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
