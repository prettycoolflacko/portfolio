'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, User, Briefcase } from 'lucide-react';
import { profile } from '@/data/portfolio';
import BrutalButton from '@/components/ui/BrutalButton';
import StarburstIcon from '@/components/ui/StarburstIcon';
import AboutModal from '@/components/modals/AboutModal';
import ContactModal from '@/components/modals/ContactModal';

interface TopNavProps {
  activePage?: 'home' | 'work';
}

export default function TopNav({ activePage = 'home' }: TopNavProps) {
  const [activeNav, setActiveNav] = useState<'home' | 'work'>(activePage);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (activePage !== 'home') return;

    const workEl = document.getElementById('work');
    if (!workEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.intersectionRatio >= 0.4) {
          setActiveNav('work');
        } else {
          setActiveNav('home');
        }
      },
      { threshold: [0, 0.4, 1] }
    );

    observer.observe(workEl);
    return () => observer.disconnect();
  }, [activePage]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navBtnBase =
    'w-10 h-10 border-2 border-ink brutal-shadow-sm brutal-press inline-flex items-center justify-center cursor-pointer text-ink';

  const isHomeActive = activePage === 'home' && activeNav === 'home' && !aboutOpen;
  const isWorkActive = (activePage === 'work' || activeNav === 'work') && !aboutOpen;

  return (
    <header className="md:col-span-2 lg:col-span-12 bg-cream flex items-center justify-between px-4 md:px-6 py-3 gap-2">
      <div className="w-11 h-11 shrink-0 border-2 border-ink brutal-shadow-sm overflow-hidden bg-cream">
        <Image
          src={profile.avatar}
          width={44}
          height={44}
          alt={profile.name}
          className="w-full h-full object-cover object-[50%_55%]"
          priority
        />
      </div>

      <nav aria-label="Primary navigation" className="flex items-center gap-2">
        {activePage === 'work' ? (
          <Link href="/" aria-label="Home" title="Home" className={`${navBtnBase} bg-cream`}>
            <Home size={18} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => scrollTo('top')}
            aria-label="Home"
            title="Home"
            className={`${navBtnBase} ${isHomeActive ? 'bg-accent-yellow' : 'bg-cream'}`}
          >
            <Home size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setAboutOpen(true)}
          aria-label="About Elyuzar"
          title="About Elyuzar"
          className={`${navBtnBase} ${aboutOpen ? 'bg-accent-yellow' : 'bg-cream'}`}
        >
          <User size={18} strokeWidth={2.5} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => scrollTo(activePage === 'work' ? 'top' : 'work')}
          aria-label="Work"
          title="Work"
          className={`${navBtnBase} ${isWorkActive ? 'bg-accent-yellow' : 'bg-cream'}`}
        >
          <Briefcase size={18} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </nav>

      <BrutalButton
        color="yellow"
        size="sm"
        onClick={() => setContactOpen(true)}
        className="sm:px-4 sm:py-2 sm:text-sm"
        aria-label="Open contact modal"
      >
        <StarburstIcon size={12} />
        <span className="hidden sm:inline">LET&apos;S TALK</span>
        <span className="sm:hidden">TALK</span>
        <StarburstIcon size={12} />
      </BrutalButton>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );
}
