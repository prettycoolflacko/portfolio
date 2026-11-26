import StarburstIcon from '@/components/ui/StarburstIcon';

const STAR_COLORS = ['#F4B3A4', '#8FD3E8', '#D94B43'] as const;

function MarqueeCopy({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex items-center shrink-0" aria-hidden={hidden || undefined}>
      {STAR_COLORS.map((color, idx) => (
        <span key={idx} className="inline-flex items-center gap-4 px-4">
          <span className="font-display text-2xl md:text-3xl text-ink uppercase whitespace-nowrap leading-none">
            PERSONAL PORTFOLIO
          </span>
          <StarburstIcon size={26} color={color} className="shrink-0" />
        </span>
      ))}
    </div>
  );
}

export default function MarqueeBanner() {
  return (
    <section
      aria-label="Personal portfolio"
      className="bg-accent-yellow overflow-hidden py-4 flex items-center h-full"
    >
      <div className="marquee-track">
        <MarqueeCopy />
        <MarqueeCopy hidden />
      </div>
    </section>
  );
}
