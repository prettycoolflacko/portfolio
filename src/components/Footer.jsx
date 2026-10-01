import AeroSprite from './AeroSprite';

const socials = [
  { sprite: 'github',    href: 'https://github.com/prettycoolflacko',   label: 'GitHub' },
  { sprite: 'linkedin',  href: 'https://www.linkedin.com/in/elyuzar-f', label: 'LinkedIn' },
  { sprite: 'instagram', href: 'https://instagram.com/elyuzar_f',       label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="win7-statusbar" style={{ marginTop:'auto', padding:'8px 16px' }}>
      {/* Left: credit */}
      <div style={{ display:'flex', alignItems:'center', gap:'6px', color:'#1a4e70', fontSize:'12px' }}>
        <span>Windows 7 Aero Edition</span>
        <span>·</span>
        <span>Built by</span>
        <a href="https://github.com/prettycoolflacko" target="_blank" rel="noopener noreferrer"
          style={{ color:'#0288d1', textDecoration:'none', fontWeight:700 }}
          onMouseOver={e => e.currentTarget.style.textDecoration='underline'}
          onMouseOut={e => e.currentTarget.style.textDecoration='none'}
        >
          Elyuzar Fazlurrahman
        </a>
      </div>

      {/* Centre: social icons */}
      <div style={{ display:'flex', gap:'6px' }}>
        {socials.map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            aria-label={s.label} style={{ display:'inline-block' }}>
            <AeroSprite id={s.sprite} size={20} title={s.label} />
          </a>
        ))}
      </div>

      {/* Right: status indicator */}
      <div style={{ display:'flex', alignItems:'center', gap:'8px', color:'#4a7190', fontSize:'11px' }}>
        <span>● Local Intranet | 100%</span>
        <span>·</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
