import { motion } from 'framer-motion';
import AeroSprite from './AeroSprite';
import profileImg from '../assets/profile.webp';

const stats = [
  { sprite: 'award',  label: 'GPA',       value: '3.67',             color: 'sky' },
  { sprite: 'mappin', label: 'Based in',   value: 'Yogyakarta, ID',   color: 'green' },
  { sprite: 'user',   label: 'Semester',   value: '6th',              color: 'aqua' },
  { sprite: 'globe',  label: 'TOEFL ITP',  value: '557',             color: 'silver' },
];

export default function About() {
  return (
    <section id="about" style={{ padding:'2rem 0 3rem' }}>
      <div>
        {/* Section Header */}
        <motion.div
          initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.4 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid #c2d7eb', paddingBottom:'6px' }}>
            <AeroSprite id="globe" size={22} title="About Me" />
            <h2 style={{ fontSize:'1.3rem', fontWeight:700, color:'#0d3a5c', margin:0 }}>
              About Me
            </h2>
            <span style={{ color:'#4a7190', fontSize:'0.85rem', marginLeft:'auto' }}>
              System Properties · Bio & Metrics
            </span>
          </div>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'1.5rem' }}
             className="md:grid-cols-[1.25fr_0.75fr]">

          {/* Bio card (Square) */}
          <motion.div
            className="glass-panel"
            style={{ padding:'1.75rem', borderRadius: 3 }}
            initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.4 }}
          >
            <div style={{ display:'flex', gap:'1.25rem', alignItems:'flex-start', marginBottom:'1.25rem' }}
                 className="flex-col sm:flex-row">
              {/* Profile photo tile (Square Windows 7 frame) */}
              <div className="win7-avatar-frame" style={{ flexShrink:0 }}>
                <div className="win7-avatar-inner" style={{ width:100, height:100, position:'relative' }}>
                  <img src={profileImg} alt="Elyuzar"
                    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                </div>
              </div>

              <div>
                <h3 style={{ fontWeight:700, fontSize:'1.2rem', color:'#0d3a5c', marginBottom:'0.2rem' }}>
                  Elyuzar Fazlurrahman
                </h3>
                <p style={{ color:'#0288d1', fontWeight:600, fontSize:'0.88rem', marginBottom:'0.6rem' }}>
                  CS Student · Backend Engineer · Mobile Developer
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                  {['Informatics', 'Class of 2023', 'Active'].map(tag => (
                    <span key={tag} className="skill-orb skill-orb-silver" style={{ fontSize:'11px', padding:'2px 6px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p style={{ color:'#1a4e70', lineHeight:1.7, marginBottom:'0.85rem', fontSize:'0.92rem' }}>
              I'm a 3rd-year Informatics student at{' '}
              <strong style={{ color:'#0d3a5c' }}>UPN Veteran Yogyakarta</strong>{' '}
              with a 3.67 GPA, passionate about backend engineering, mobile development, and
              data-driven systems. I've built everything from AI-powered stock analysis apps to
              end-to-end encrypted messaging platforms.
            </p>
            <p style={{ color:'#1a4e70', lineHeight:1.7, marginBottom:'1.25rem', fontSize:'0.92rem' }}>
              I'm fluent in both Indonesian and English (TOEFL 557, IELTS prep Band 7), and I'm
              always looking for meaningful problems to solve through code.
            </p>

            {/* Tag orbs (Square Aero chips) */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
              {['CS Student', 'Backend Engineer', 'Mobile Dev', 'Data Enthusiast'].map(t => (
                <span key={t} className="skill-orb skill-orb-sky">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Stats Cards (Square) */}
          <motion.div
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.85rem', alignContent:'start' }}
            initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.4 }}
          >
            {stats.map(s => (
              <div key={s.label} className="glass-card" style={{ padding:'1.1rem', borderRadius: 3 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.4rem' }}>
                  <AeroSprite id={s.sprite} size={28} />
                  <span style={{ fontSize:'0.75rem', fontWeight:600, color:'#4a7190', textTransform:'uppercase', letterSpacing:'0.05em' }}>
                    {s.label}
                  </span>
                </div>
                <div style={{ fontSize:'1.35rem', fontWeight:800, color:'#0d3a5c', paddingLeft:'4px' }}>
                  {s.value}
                </div>
              </div>
            ))}

            {/* Quick summary gadget box */}
            <div className="glass-card" style={{ gridColumn:'span 2', padding:'1rem 1.2rem', borderRadius:3, background:'linear-gradient(180deg, #f7fbff, #eaf2fa)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'4px' }}>
                <AeroSprite id="bolt" size={16} />
                <span style={{ fontSize:'12px', fontWeight:700, color:'#0d3a5c' }}>Status & Focus</span>
              </div>
              <p style={{ margin:0, fontSize:'12px', color:'#2c5475', lineHeight:1.5 }}>
                Available for internships & freelance projects in backend APIs, Flutter apps, and data systems.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
