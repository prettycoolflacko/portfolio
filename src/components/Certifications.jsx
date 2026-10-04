import { motion } from 'framer-motion';
import VistaIcon from './VistaIcon';

const certifications = [
  { title: 'BNSP Junior Web Programmer', issuer: 'BNSP',        date: 'Nov 2025', color: 'sky' },
  { title: 'HERTECH',                    issuer: 'ICT Watch',    date: 'Nov 2025', color: 'green' },
  { title: 'Python for Data Science & ML Bootcamp', issuer: 'Udemy', date: 'Apr 2026', color: 'aqua' },
  { title: 'GEMASTIK XVIII 2025, Data Mining', issuer: 'National Competition', date: 'Oct 2025', color: 'sky' },
  { title: 'IELTS Preparation, Score Band 7', issuer: 'IELTS',  date: 'Jun 2024', color: 'green' },
  { title: 'TOEFL ITP, Score 557',        issuer: 'ETS',         date: 'Dec 2022', color: 'aqua' },
];

export default function Certifications() {
  return (
    <section id="certifications" style={{ padding:'2rem 0 3rem' }}>
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.4 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid #c2d7eb', paddingBottom:'6px' }}>
            <VistaIcon id="certificate" size={24} title="Certifications" />
            <h2 style={{ fontSize:'1.3rem', fontWeight:700, color:'#0d3a5c', margin:0 }}>
              Certifications & Honors
            </h2>
            <span style={{ color:'#4a7190', fontSize:'0.85rem', marginLeft:'auto' }}>
              6 Verified Credentials
            </span>
          </div>
        </motion.div>

        <div style={{ display:'grid', gap:'0.85rem', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity:0, y:12 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.3, delay: i * 0.05 }}
              className="glass-card"
              style={{ padding:'1rem 1.1rem', display:'flex', alignItems:'flex-start', gap:'10px', borderRadius: 3 }}
            >
              <VistaIcon id="certificate" size={34} />
              <div style={{ minWidth:0 }}>
                <h3 style={{
                  fontWeight:700, fontSize:'0.88rem',
                  color:'#0d3a5c', margin:0, lineHeight:1.35,
                }}>
                  {cert.title}
                </h3>
                <p style={{ color:'#4a7190', fontSize:'0.75rem', fontWeight:600, marginTop:'3px', marginBottom:0 }}>
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
