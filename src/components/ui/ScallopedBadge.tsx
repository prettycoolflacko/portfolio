interface ScallopedBadgeProps {
  label: string;
  iconPath: string;
  size?: number;
  className?: string;
}

function scallopPath(lobes = 12, cx = 50, cy = 50, r = 38) {
  const step = (2 * Math.PI) / lobes;
  const a = r * Math.sin(step / 2) * 1.02;
  let d = '';
  for (let i = 0; i <= lobes; i++) {
    const t = i * step - Math.PI / 2;
    const x = (cx + r * Math.cos(t)).toFixed(2);
    const y = (cy + r * Math.sin(t)).toFixed(2);
    d += i === 0 ? `M${x} ${y}` : ` A${a.toFixed(2)} ${a.toFixed(2)} 0 0 1 ${x} ${y}`;
  }
  return d + ' Z';
}

const SCALLOP = scallopPath(12, 50, 50, 38);

export default function ScallopedBadge({
  label,
  iconPath,
  size = 64,
  className = '',
}: ScallopedBadgeProps) {
  return (
    <span
      tabIndex={0}
      role="img"
      aria-label={label}
      style={{ ['--badge-size' as string]: `${size}px` }}
      className={`group relative inline-flex items-center justify-center outline-none ${className}`}
    >
      <span
        className="relative inline-flex items-center justify-center w-full h-full transition-transform duration-120 ease-out group-hover:rotate-6 group-hover:-translate-x-[1px] group-hover:-translate-y-[1px] group-focus-visible:rotate-6 group-focus-visible:-translate-x-[1px] group-focus-visible:-translate-y-[1px] [filter:drop-shadow(2.5px_2.5px_0_#111111)] group-hover:[filter:drop-shadow(4px_4px_0_#111111)] group-focus-visible:[filter:drop-shadow(4px_4px_0_#111111)]"
      >
        <svg viewBox="0 0 100 100" overflow="visible" className="w-full h-full" aria-hidden="true">
          <path
            d={SCALLOP}
            fill="#F4B3A4"
            stroke="#111111"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="absolute w-[40%] h-[40%] pointer-events-none"
          aria-hidden="true"
        >
          <path d={iconPath} fill="#111111" />
        </svg>
      </span>

      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-120 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 bg-cream border-2 border-ink brutal-shadow-sm font-ui font-bold uppercase text-xs tracking-[0.04em] px-2 py-1 whitespace-nowrap text-ink z-20"
      >
        {label}
      </span>
    </span>
  );
}
