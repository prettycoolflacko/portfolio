interface StarburstIconProps {
  color?: string;
  size?: number;
  className?: string;
}

function buildStarPoints(): string {
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 8;
    const r = i % 2 === 0 ? 46 : 20;
    const x = (50 + r * Math.cos(angle)).toFixed(2);
    const y = (50 + r * Math.sin(angle)).toFixed(2);
    pts.push(`${x},${y}`);
  }
  return pts.join(' ');
}

const STAR_POINTS = buildStarPoints();

export default function StarburstIcon({
  color = '#F5DB82',
  size = 16,
  className,
}: StarburstIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <polygon
        points={STAR_POINTS}
        fill={color}
        stroke="#111111"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
    </svg>
  );
}
