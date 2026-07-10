import type { Metadata } from "next";
import Link from "next/link";
import { Literata, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Mark } from "@/components/mark";
import { getSite } from "@/lib/content";
import "./globals.css";

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  axes: ["opsz"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://s0shaheen.com"),
  title: {
    default: "Salman Shaheen",
    template: "%s · Salman Shaheen",
  },
  description:
    "Product manager building platforms that move money and solve problems.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const site = getSite();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: "https://s0shaheen.com",
    jobTitle: "Product Manager",
    address: { "@type": "PostalAddress", addressLocality: site.location },
    sameAs: site.handles
      .map((h) => h.href)
      .filter((href) => !href.startsWith("mailto:")),
  };

  return (
    <html
      lang="en"
      className={`${literata.variable} ${hanken.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        <header className="mx-auto w-full max-w-[680px] px-6 pt-10 sm:pt-14">
          <Link
            href="/"
            className="inline-flex items-baseline gap-2 font-serif text-lg font-semibold tracking-tight"
          >
            {site.name}
            <Mark size={13} className="translate-y-px text-faint" />
          </Link>
        </header>

        <main className="mx-auto w-full max-w-[680px] flex-1 px-6">
          {children}
        </main>

        <footer className="mx-auto w-full max-w-[680px] px-6 pb-12 pt-20">
          <div className="border-t border-hair pt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            {site.handles.map((h) => (
              <a
                key={h.href}
                href={h.href}
                className="link-grow text-sm font-medium"
                {...(h.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {h.label}
              </a>
            ))}
            <span className="ml-auto inline-flex items-center gap-2 font-medium text-[0.65rem] uppercase tracking-[0.12em] text-faint">
              <Mark size={9} variant="light" />
              {new Date().getFullYear()}
            </span>
          </div>
        </footer>

        {modal}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
