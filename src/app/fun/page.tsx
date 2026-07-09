import type { Metadata } from "next";
import Image from "next/image";
import { getFun } from "@/lib/content";

/**
 * /fun — structured shelves for lists + a freeform drop zone for anything.
 * Deliberately looser than the rest of the site. Not linked from the nav yet.
 */

export const metadata: Metadata = { title: "Fun" };

export default function FunPage() {
  const fun = getFun();
  const empty = fun.shelves.length === 0 && fun.freeform.length === 0;

  return (
    <div className="pt-16 sm:pt-24">
      <h1 className="font-serif text-3xl font-semibold tracking-tight">Fun</h1>

      {empty && (
        <p className="mt-6 text-[0.95rem] text-muted">Nothing here yet.</p>
      )}

      {fun.shelves.map((shelf) => (
        <section key={shelf.title} className="mt-10 max-w-[62ch]">
          <h2 className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
            {shelf.title}
          </h2>
          <div className="mt-2">
            {shelf.items.map((item) => (
              <div
                key={item.title}
                className="flex items-baseline justify-between gap-4 border-t border-hair py-2.5 text-[0.95rem]"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-grow font-semibold"
                  >
                    {item.title}
                  </a>
                ) : (
                  <span className="font-semibold">{item.title}</span>
                )}
                {item.take && (
                  <span className="shrink-0 text-sm italic text-muted">
                    {item.take}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {fun.freeform.length > 0 && (
        <section className="mt-12 columns-2 gap-3 sm:columns-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
          {fun.freeform.map((f, i) => (
            <div
              key={i}
              className="rounded-sm border border-hair bg-white p-1.5 shadow-[0_1px_3px_rgba(20,20,18,0.08)]"
              /* deterministic tilt, seeded by index — SSR-stable */
              style={{ transform: `rotate(${((i * 37) % 5) - 2}deg)` }}
            >
              {f.image && (
                <Image
                  src={f.image}
                  alt={f.caption ?? ""}
                  width={600}
                  height={450}
                  className="h-auto w-full rounded-[2px]"
                />
              )}
              {f.text && (
                <p className="p-2 text-sm leading-relaxed text-soft">{f.text}</p>
              )}
              {f.caption && (
                <p className="px-1.5 pb-1 pt-1.5 text-xs italic text-muted">
                  {f.caption}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
