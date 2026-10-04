import { motion } from 'framer-motion';
import VistaIcon from './VistaIcon';

const education = [
  {
    degree: 'Bachelor of Computer Science (Informatics)',
    institution: 'Universitas Pembangunan Nasional Veteran Yogyakarta',
    period: 'Aug 2023 – Present',
    gpa: '3.67',
    isGPA: true,
    details: [
      'Active member, Multimedia Community Informatika',
      'Pursuing personal projects in data science, mobile apps, and full-stack development',
    ],
  },
  {
    degree: 'Science (MIPA) Stream',
    institution: 'SMA Internasional Budi Mulia Dua',
    period: 'Jun 2020 – May 2023',
    gpa: 'Grade: 88',
    isGPA: false,
    details: [
    '1st Runner-Up, National Robotic Competition — ITS (2022)',
    'Gold Medal, Indonesian Student English Olympiad — Student Olympiad Center (2022)',
    ],
  },
];

export default function Education() {
  return (
    <section id="education" style={{ padding:'2rem 0 3rem' }}>
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.4 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid #c2d7eb', paddingBottom:'6px' }}>
            <VistaIcon id="book" size={24} title="Education" />
            <h2 style={{ fontSize:'1.3rem', fontWeight:700, color:'#0d3a5c', margin:0 }}>
              Education History
            </h2>
            <span style={{ color:'#4a7190', fontSize:'0.85rem', marginLeft:'auto' }}>
              Academic Records · Certificates
            </span>
          </div>
        </motion.div>

        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', maxWidth:820 }}>
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              className="glass-card"
              style={{ padding:'1.35rem 1.5rem', borderRadius: 3 }}
              initial={{ opacity:0, x:-15 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.35, delay:i * 0.1 }}
            >
              <div style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'0.75rem' }}>
                <VistaIcon id="book" size={34} />
                <div style={{ flex:1, minWidth:0 }}>
                  <h3 style={{ fontWeight:700, fontSize:'0.95rem', color:'#0d3a5c', margin:0 }}>
                    {edu.degree}
                  </h3>
                  <p style={{ color:'#0288d1', fontWeight:600, fontSize:'0.85rem', marginTop:'2px', marginBottom:0 }}>
                    {edu.institution}
                  </p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginTop:'6px', alignItems:'center' }}>
                    <span style={{ fontSize:'0.75rem', fontWeight:600, color:'#4a7190' }}>{edu.period}</span>
                    <span style={{ color:'#b3e5fc' }}>·</span>
                    <span className="skill-orb skill-orb-sky" style={{ fontSize:'11px', padding:'1px 6px', borderRadius:2 }}>
                      {edu.isGPA ? `GPA: ${edu.gpa}` : edu.gpa}
                    </span>
                  </div>
                </div>
              </div>

              <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:'0.3rem' }}>
                {edu.details.map((d, j) => (
                  <li key={j} style={{
                    color:'#1a4e70', fontSize:'0.86rem', lineHeight:1.5,
                    paddingLeft:'1.1rem', position:'relative',
                  }}>
                    <span style={{ position:'absolute', left:0, color:'#26c6da', fontWeight:700 }}>▸</span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
