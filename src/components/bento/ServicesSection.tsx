import { services } from '@/data/portfolio';

export default function ServicesSection() {
  return (
    <section id="services" className="md:col-span-2 lg:col-span-5 bg-cream p-6 md:p-8 flex flex-col">
      <h2 className="text-extruded text-[clamp(2rem,3.4vw,3rem)]">SERVICES</h2>

      <ul className="mt-6 grid grid-cols-2 gap-3 flex-1">
        {services.map((service) => (
          <li
            key={service.title}
            style={{ background: service.color }}
            className="min-h-[76px] flex items-center justify-center text-center border-2 border-ink brutal-shadow-sm px-2 sm:px-3 font-ui font-bold uppercase tracking-[0.04em] text-xs sm:text-sm text-ink"
          >
            {service.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
