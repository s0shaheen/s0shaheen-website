import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import * as GravityIcons from "@gravity-ui/icons";
import type { Item } from "@/lib/content";

/**
 * The two card types (locked in SPEC v1.0 §D6b): square (icon or greyed logo)
 * and wide (2 columns, fits a wider transparent graphic). Shared consistency
 * devices: border, radius, hover lift, ↗ cue, caption treatment.
 * Items with popup content link to /work/<slug> (intercepted into a modal on
 * soft navigation); items without render inert.
 */

function ItemGraphic({ item }: { item: Item }) {
  const g = item.graphic;
  if (!g) return null;
  if (g.kind === "icon") {
    const Icon = (
      GravityIcons as unknown as Record<
        string,
        ComponentType<SVGProps<SVGSVGElement>> | undefined
      >
    )[g.value];
    if (!Icon) throw new Error(`Unknown Gravity UI icon: ${g.value}`);
    return <Icon width={30} height={30} aria-hidden />;
  }
  const width = g.wide ? 220 : 34;
  const height = g.wide ? 100 : 34;
  return (
    <Image
      src={g.value}
      alt=""
      width={width}
      height={height}
      className={`${g.kind === "logo" ? "logo-grey " : ""}${g.wide ? "w-3/4 h-auto" : "h-9 w-9 object-contain"}`}
    />
  );
}

function CardShell({
  item,
  children,
}: {
  item: Item;
  children: React.ReactNode;
}) {
  const wide = item.graphic?.wide;
  const className = `group relative flex flex-col items-center justify-center gap-2 rounded-lg border border-[rgba(20,20,18,0.16)] bg-white p-4 transition-[transform,border-color] duration-[180ms] ${
    wide ? "col-span-2" : "aspect-square"
  } ${item.popup ? "hover:-translate-y-0.5 hover:border-ink" : ""}`;

  if (!item.popup) return <div className={className}>{children}</div>;
  return (
    <Link href={`/work/${item.slug}`} scroll={false} className={className}>
      <span
        aria-hidden
        className="absolute right-2.5 top-2 text-xs text-faint transition-transform duration-[180ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
      >
        ↗
      </span>
      {children}
    </Link>
  );
}

export function ItemCard({ item }: { item: Item }) {
  return (
    <CardShell item={item}>
      <ItemGraphic item={item} />
      <span className="px-1 text-center text-xs font-semibold leading-tight text-soft">
        {item.title}
      </span>
    </CardShell>
  );
}

export function ItemRow({ item }: { item: Item }) {
  const inner = (
    <>
      <span className="min-w-0">
        <span className="font-semibold">{item.title}</span>
        {item.org && <span className="text-muted"> · {item.org}</span>}
        {item.oneLiner && (
          <span className="block text-sm text-muted">{item.oneLiner}</span>
        )}
      </span>
      <span className="flex shrink-0 items-baseline gap-2">
        {item.years && (
          <span className="font-mono text-[0.68rem] uppercase tracking-wide text-muted">
            {item.years}
          </span>
        )}
        {item.popup && (
          <span
            aria-hidden
            className="text-faint opacity-0 transition-opacity duration-[180ms] group-hover:opacity-100"
          >
            →
          </span>
        )}
      </span>
    </>
  );

  const className =
    "group flex items-baseline justify-between gap-4 border-t border-hair py-3 text-[0.95rem]";
  if (!item.popup) return <div className={className}>{inner}</div>;
  return (
    <Link
      href={`/work/${item.slug}`}
      scroll={false}
      className={`${className} transition-transform duration-[180ms] hover:translate-x-1`}
    >
      {inner}
    </Link>
  );
}

/** Popup body — server-renderable; used by both the modal and /work/<slug>. */
export function ItemDetail({ item }: { item: Item }) {
  if (!item.popup) return null;
  return (
    <article>
      <h1 className="font-serif text-xl font-semibold">{item.title}</h1>
      <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted">
        {[item.org, item.years].filter(Boolean).join(" · ")}
      </p>
      <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-relaxed">
        {item.popup.body.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {item.popup.skills && item.popup.skills.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.popup.skills.map((s) => (
            <li
              key={s}
              className="rounded-full border border-hair px-2.5 py-0.5 font-mono text-[0.64rem] text-soft"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
      {item.popup.links && item.popup.links.length > 0 && (
        <p className="mt-4 flex gap-4">
          {item.popup.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-grow text-sm font-semibold"
            >
              {l.label} ↗
            </a>
          ))}
        </p>
      )}
    </article>
  );
}
