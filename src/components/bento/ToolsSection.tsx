import { tools } from '@/data/portfolio';
import ScallopedBadge from '@/components/ui/ScallopedBadge';

export default function ToolsSection() {
  return (
    <section className="bg-cream p-6 md:p-8 flex flex-col justify-between">
      <h2 className="text-extruded text-[clamp(2rem,3.4vw,3rem)]">TOOLS</h2>

      <ul className="mt-8 flex flex-wrap items-center gap-4 md:gap-5">
        {tools.map((tool) => (
          <li key={tool.name}>
            <ScallopedBadge
              label={tool.name}
              iconPath={tool.path}
              className="w-[52px] h-[52px] sm:w-16 sm:h-16"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
