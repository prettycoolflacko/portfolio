import { motion } from 'framer-motion';
import AeroSprite from './AeroSprite';

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
    <section id="experience" style={{ padding:'2rem 0 3rem' }}>
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.4 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid #c2d7eb', paddingBottom:'6px' }}>
            <AeroSprite id="briefcase" size={22} title="Work Experience" />
            <h2 style={{ fontSize:'1.3rem', fontWeight:700, color:'#0d3a5c', margin:0 }}>
              Work Experience
            </h2>
            <span style={{ color:'#4a7190', fontSize:'0.85rem', marginLeft:'auto' }}>
              Event Log · Career History
            </span>
          </div>
        </motion.div>

        <div className="aero-timeline" style={{ maxWidth:820 }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity:0, x:-15 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.35, delay:i * 0.1 }}
              style={{ position:'relative', marginBottom: i < experiences.length - 1 ? '1.5rem' : 0 }}
            >
              {/* Square Timeline marker */}
              <div className="aero-timeline-dot" />

              <div className="glass-card" style={{ padding:'1.25rem 1.5rem', borderRadius: 3 }}>
                {/* Header */}
                <div style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'0.65rem' }}>
                  <AeroSprite id="briefcase" size={32} />
                  <div>
                    <h3 style={{ fontWeight:700, fontSize:'0.95rem', color:'#0d3a5c', margin:0 }}>
                      {exp.title}
                    </h3>
                    <p style={{ color:'#0288d1', fontWeight:600, fontSize:'0.85rem', marginTop:'2px', marginBottom:0 }}>
                      {exp.company}
                    </p>
                    <p style={{ color:'#4a7190', fontSize:'0.75rem', fontWeight:600, marginTop:'2px', marginBottom:0 }}>
                      {exp.period}
                    </p>
                  </div>
                </div>

                {/* Bullets */}
                <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:'0.3rem' }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{
                      color:'#1a4e70', fontSize:'0.86rem', lineHeight:1.5,
                      paddingLeft:'1.1rem', position:'relative',
                    }}>
                      <span style={{ position:'absolute', left:0, color:'#0288d1', fontWeight:700 }}>▸</span>
                      {b}
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
