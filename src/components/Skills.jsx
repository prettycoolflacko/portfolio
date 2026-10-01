import { motion } from 'framer-motion';
import AeroSprite from './AeroSprite';

const skillGroups = [
  {
    sprite: 'code',
    title: 'Programming Languages',
    skills: ['Python', 'JavaScript', 'PHP', 'C++', 'Java', 'SQL'],
  },
  {
    sprite: 'layers',
    title: 'Frameworks & Libraries',
    skills: ['FastAPI', 'React Native', 'Express.js', 'Flutter', 'TailwindCSS'],
  },
  {
    sprite: 'tool',
    title: 'Tools & Infrastructure',
    skills: ['Git/GitHub', 'Linux', 'VPS', 'REST APIs', 'Redis', 'MQTT', 'IoT Hardware'],
  },
  {
    sprite: 'film',
    title: 'Creative & Multimedia',
    skills: ['Adobe Premiere Pro', 'Photoshop', 'Videography', 'Graphic Design'],
  },
];

const orbCycle = ['skill-orb-sky', 'skill-orb-aqua', 'skill-orb-green', 'skill-orb-silver'];

export default function Skills() {
  return (
    <section id="skills" style={{ padding:'2rem 0 3rem' }}>
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.4 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid #c2d7eb', paddingBottom:'6px' }}>
            <AeroSprite id="bolt" size={22} title="Technical Skills" />
            <h2 style={{ fontSize:'1.3rem', fontWeight:700, color:'#0d3a5c', margin:0 }}>
              Technical Skills
            </h2>
            <span style={{ color:'#4a7190', fontSize:'0.85rem', marginLeft:'auto' }}>
              Installed Libraries & Frameworks
            </span>
          </div>
        </motion.div>

        {/* Skill Groups (Square Cards) */}
        <div style={{ display:'grid', gap:'1.25rem', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity:0, y:15 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.35, delay: gi * 0.08 }}
              className="glass-card"
              style={{ padding:'1.35rem', borderRadius: 3 }}
            >
              {/* Group header */}
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'1rem' }}>
                <AeroSprite id={group.sprite} size={34} />
                <h3 style={{ fontWeight:700, fontSize:'0.95rem', color:'#0d3a5c', margin:0 }}>
                  {group.title}
                </h3>
              </div>

              {/* Square Skill Badges */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                {group.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className={`skill-orb ${orbCycle[(gi + si) % orbCycle.length]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
