import { Mail, FileText } from 'lucide-react';
import { hero, socials } from '@/data/portfolio';
import BrutalButton from '@/components/ui/BrutalButton';
import StarburstIcon from '@/components/ui/StarburstIcon';

function wordColorClass(hex: '#FFFFFF' | '#D94B43' | '#8FD3E8') {
  if (hex === '#D94B43') return 'text-accent-red';
  if (hex === '#8FD3E8') return 'text-accent-blue';
  return undefined;
}

export default function HeroSection() {
  return (
    <section className="md:col-span-2 lg:col-span-7 bg-cream p-6 md:p-10 flex flex-col justify-between">
      <div>
        <p className="font-ui font-bold uppercase tracking-[0.04em] text-sm text-ink">
          {hero.eyebrow}
        </p>

        <h1 className="text-extruded mt-4 text-[clamp(1.8rem,4vw,3.35rem)]">
          <span className="block">
            {hero.line1.map((word, idx) => (
              <span key={word.t} className={wordColorClass(word.c)}>
                {idx > 0 ? ' ' : ''}
                {word.t}
              </span>
            ))}
          </span>
          <span className="block mt-1">
            {hero.line2.map((word, idx) => (
              <span key={word.t} className={wordColorClass(word.c)}>
                {idx > 0 ? ' ' : ''}
                {word.t}
              </span>
            ))}
          </span>
        </h1>

        <p className="font-ui font-bold uppercase text-sm md:text-base max-w-[46ch] leading-snug mt-6 text-ink">
          {hero.sub}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          {socials.map((item) => (
            <BrutalButton
              key={item.id}
              href={item.href}
              external={item.external}
              download={item.download}
              color="cream"
              size="icon"
              aria-label={item.label}
              title={item.label}
            >
              {item.id === 'github' && item.iconPath && (
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                  <path d={item.iconPath} fill="#111111" />
                </svg>
              )}
              {item.id === 'linkedin' && (
                <span className="font-display text-lg leading-none lowercase" aria-hidden="true">
                  in
                </span>
              )}
              {item.id === 'email' && <Mail size={18} strokeWidth={2.5} aria-hidden="true" />}
              {item.id === 'cv' && <FileText size={18} strokeWidth={2.5} aria-hidden="true" />}
            </BrutalButton>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 border-2 border-ink bg-accent-yellow brutal-shadow-sm px-3 py-2 font-ui font-bold uppercase tracking-[0.04em] text-xs text-ink whitespace-nowrap">
          <StarburstIcon size={12} />
          <span>{hero.status}</span>
          <StarburstIcon size={12} />
        </span>
      </div>
    </section>
  );
}
