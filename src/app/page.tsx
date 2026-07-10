import Image from "next/image";
import { Mark } from "@/components/mark";
import { ItemCard, ItemRow } from "@/components/items";
import { getExperiences, getProjects, getSite, type Item } from "@/lib/content";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-medium text-[0.66rem] uppercase tracking-[0.14em] text-muted">
      {children}
    </h2>
  );
}

function ItemGroup({ label, items }: { label: string; items: Item[] }) {
  if (items.length === 0) return null;
  const cards = items.filter((i) => i.featured && i.graphic);
  const rows = items.filter((i) => !(i.featured && i.graphic));
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      {cards.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {cards.map((i) => (
            <ItemCard key={i.slug} item={i} />
          ))}
        </div>
      )}
      <div className="mt-3">
        {rows.map((i) => (
          <ItemRow key={i.slug} item={i} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const site = getSite();
  const experiences = getExperiences();
  const projects = getProjects();
  const current = experiences.filter((e) => e.status === "current");
  const previous = experiences.filter((e) => e.status === "previous");
  const buckets = [...new Set(projects.map((p) => p.bucket))];

  return (
    <div className="pt-16 sm:pt-24">
      {/* About */}
      <section className="fade-up flex items-center gap-5 sm:gap-0">
        <div className="min-w-0 flex-1 sm:max-w-96 sm:flex-none">
          <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-3 text-lg text-soft">{site.tagline}</p>
          {site.currently && (
            <p className="mt-5 flex items-baseline gap-2 font-medium text-[0.7rem] uppercase tracking-[0.08em] text-muted">
              <Mark size={9} className="shrink-0 translate-y-px" />
              currently: {site.currently} · {site.location}
            </p>
          )}
        </div>
        {site.portrait && (
          <div className="shrink-0 sm:flex sm:flex-1 sm:justify-center">
            <Image
              src={site.portrait}
              alt="Ink-sketch portrait of Salman"
              width={480}
              height={459}
              priority
              className="h-auto w-[156px] sm:w-[208px]"
            />
          </div>
        )}
      </section>

      {/* Experience */}
      <section className="fade-up mt-16 space-y-10 sm:mt-20">
        <ItemGroup label="Currently" items={current} />
        <ItemGroup label="Previously" items={previous} />
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="fade-up mt-16 space-y-10 sm:mt-20">
          {buckets.map((b) => (
            <ItemGroup
              key={b}
              label={b}
              items={projects.filter((p) => p.bucket === b)}
            />
          ))}
        </section>
      )}

      {/* What I care about */}
      {site.interests && (
        <section className="fade-up mt-16 max-w-[62ch] sm:mt-20">
          <SectionLabel>Off hours</SectionLabel>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-soft">
            {site.interests}
          </p>
        </section>
      )}

      {/* Contact */}
      <section className="fade-up mt-16 max-w-[62ch] sm:mt-20">
        <SectionLabel>Contact</SectionLabel>
        {site.reachOutIf.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-[0.95rem] text-soft">
            {site.reachOutIf.map((line) => (
              <li key={line} className="flex items-baseline gap-2.5">
                <Mark size={8} variant="light" className="shrink-0 text-faint" />
                {line}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[0.95rem] text-soft">
          The fastest way to reach me is{" "}
          <a href="mailto:shaheensalmant@gmail.com" className="link-grow font-semibold text-ink">
            email
          </a>
          . Everything else is in the footer.
        </p>
      </section>
    </div>
  );
}
