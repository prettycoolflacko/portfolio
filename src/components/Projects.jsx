import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import VistaIcon from './VistaIcon';

const projects = [
  {
    sprite: 'chart',
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
    sprite: 'web',
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
    sprite: 'computer',
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
    sprite: 'lock',
    title: 'CipherDrop',
    subtitle: 'Secure E2EE Messaging & File Sharing',
    role: 'Backend & Security Engineer',
    type: 'Group Project',
    year: '2026',
    description:
      'A secure desktop messaging and file-sharing app with End-to-End Encryption, image steganography, and zero-knowledge architecture. I developed the FastAPI backend on VPS implementing AES-256-GCM and Vigenère super-encryption.',
    tags: ['Python', 'FastAPI', 'AES-256', 'VPS', 'E2EE', 'Security'],
    github: 'https://github.com/TedjaSatedji/cipherdrop.git',
  },
];

const tagColors = ['skill-orb-sky', 'skill-orb-aqua', 'skill-orb-green', 'skill-orb-silver'];

export default function Projects() {
  return (
    <section id="projects" style={{ padding:'2rem 0 3rem' }}>
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.4 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid #c2d7eb', paddingBottom:'6px' }}>
            <VistaIcon id="folder" size={24} title="Projects" />
            <h2 style={{ fontSize:'1.3rem', fontWeight:700, color:'#0d3a5c', margin:0 }}>
              Featured Projects
            </h2>
            <span style={{ color:'#4a7190', fontSize:'0.85rem', marginLeft:'auto' }}>
              4 items · C:\Users\Elyuzar\Projects
            </span>
          </div>
        </motion.div>

        {/* Project Cards Grid (Square!) */}
        <div style={{ display:'grid', gap:'1.5rem', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.4, delay: i * 0.1 }}
              className="glass-card"
              style={{ display:'flex', flexDirection:'column', borderRadius: 3 }}
            >
              {/* Window-like folder header strip */}
              <div style={{
                background:'linear-gradient(180deg, #f2f7fc 0%, #e1eefa 100%)',
                borderBottom:'1px solid #c2d7eb',
                padding:'6px 12px',
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between',
                fontSize:'11px',
                color:'#1a4e70',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                  <VistaIcon id="folder" size={16} />
                  <span style={{ fontWeight:700 }}>{project.title}</span>
                </div>
                <span style={{ color:'#4a7190', fontWeight:600 }}>{project.year} · {project.type}</span>
              </div>

              {/* Themed screenshot placeholder (water-surface backdrop) */}
              <div
                className="img-placeholder"
                style={{
                  height:140, margin:'0.85rem 0.85rem 0', borderRadius:2,
                  background:'linear-gradient(180deg, #d7f2f7 0%, #8fd8ea 55%, #4fc3f7 100%)',
                  color:'#0b3863',
                }}
              >
                {/* ── PROJECT SCREENSHOT PLACEHOLDER ── */}
                <VistaIcon id={project.sprite} size={52} />
                <span style={{ fontWeight:700, color:'#0b3863' }}>{project.title} Preview</span>
                <span style={{ fontSize:'10px', color:'#0d47a1', opacity:.8 }}>Drop image in public/screenshots/</span>
              </div>

              {/* Content body */}
              <div style={{ padding:'1rem 1rem 1.25rem', display:'flex', flexDirection:'column', flex:1 }}>
                <h3 style={{ fontWeight:700, fontSize:'1.1rem', color:'#0d3a5c', margin:'0 0 0.2rem' }}>
                  {project.title}
                </h3>
                <p style={{ color:'#0288d1', fontWeight:600, fontSize:'0.82rem', margin:'0 0 0.65rem' }}>
                  {project.subtitle} · <span style={{ color:'#4a7190' }}>{project.role}</span>
                </p>

                <p style={{ color:'#1a4e70', fontSize:'0.88rem', lineHeight:1.6, flex:1, marginBottom:'1rem' }}>
                  {project.description}
                </p>

                {/* Square Tech Tags */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:'4px', marginBottom:'1rem' }}>
                  {project.tags.map((tag, ti) => (
                    <span
                      key={tag}
                      className={`skill-orb ${tagColors[ti % tagColors.length]}`}
                      style={{ fontSize:'11px', padding:'2px 7px', borderRadius:2 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Windows 7 Aero Button (Square!) */}
                <div style={{ display:'flex', gap:'8px', marginTop:'auto' }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aero-btn aero-btn-sky"
                    style={{ flex:1, fontSize:'12px', padding:'6px 12px' }}
                  >
                    <FiGithub style={{ position:'relative', zIndex:1 }} />
                    <span style={{ position:'relative', zIndex:1 }}>Repository</span>
                    <FiExternalLink style={{ position:'relative', zIndex:1, fontSize:'10px' }} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
