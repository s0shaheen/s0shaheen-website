import type { Metadata } from "next";
import { XMLParser } from "fast-xml-parser";
import { getSite } from "@/lib/content";

/**
 * /writing — auto index of Substack posts (title, date, excerpt → link out).
 * Refreshes via ISR. While `substackFeed` is "" in content/site.yml, this
 * renders a quiet empty state. Not linked from the nav yet (deliberate).
 */

export const revalidate = 3600;

export const metadata: Metadata = { title: "Writing" };

type Post = { title: string; link: string; date?: string; excerpt?: string };

async function getPosts(feedUrl: string): Promise<Post[]> {
  try {
    const res = await fetch(feedUrl, {
      headers: { "user-agent": "s0shaheen.com feed reader" },
    });
    if (!res.ok) return [];
    const xml = new XMLParser({ ignoreAttributes: false }).parse(
      await res.text(),
    );
    const items = xml?.rss?.channel?.item;
    const list = Array.isArray(items) ? items : items ? [items] : [];
    return list.map((it: Record<string, unknown>) => {
      // <description> is often junk ("..."); derive the excerpt from the body.
      const body = String(it["content:encoded"] ?? it.description ?? "");
      const text = body
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const date = it.pubDate
        ? new Date(String(it.pubDate)).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : undefined;
      return {
        title: String(it.title ?? "Untitled"),
        link: String(it.link ?? "#"),
        date,
        excerpt: text ? `${text.slice(0, 180)}…` : undefined,
      };
    });
  } catch {
    return [];
  }
}

export default async function WritingPage() {
  const site = getSite();
  const posts = site.substackFeed ? await getPosts(site.substackFeed) : [];

  return (
    <div className="pt-16 sm:pt-24">
      <h1 className="font-serif text-3xl font-semibold tracking-tight">
        Writing
      </h1>
      {posts.length === 0 ? (
        <p className="mt-6 text-[0.95rem] text-muted">
          Nothing published yet.
        </p>
      ) : (
        <div className="mt-8 max-w-[62ch]">
          {posts.map((p) => (
            <a
              key={p.link}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-t border-hair py-4"
            >
              <span className="font-semibold group-hover:underline group-hover:underline-offset-4">
                {p.title}{" "}
                <span aria-hidden className="font-normal text-faint">
                  ↗
                </span>
              </span>
              {p.date && (
                <span className="mt-0.5 block font-medium text-[0.66rem] uppercase tracking-[0.08em] text-muted">
                  {p.date} · on Substack
                </span>
              )}
              {p.excerpt && (
                <span className="mt-1.5 block text-sm leading-relaxed text-soft">
                  {p.excerpt}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
