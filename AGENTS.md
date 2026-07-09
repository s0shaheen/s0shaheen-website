<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project: s0shaheen.com

Personal website for Salman Shaheen. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, Turbopack, deployed on Vercel. Full design/decision record: `docs/SPEC.md`.

### Infrastructure
- **Deploys:** Vercel, Git-connected. `main` = production; other branches = preview URLs.
- **Domain:** `s0shaheen.com` (canonical, apex); `www` 308-redirects to it. DNS at Namecheap (BasicDNS): apex `A @ → 216.198.79.1`, `www CNAME → cname.vercel-dns.com`. ⚠️ **Never switch to Vercel nameservers** — Google Workspace email (`MX → smtp.google.com`) lives in Namecheap DNS and would break.
- **Commands:** `pnpm dev` / `pnpm build` / `pnpm start` / `pnpm lint`.
- **Node:** `.nvmrc` = 22, engines `>=22`; Vercel resolves to 24.x.
- **Analytics:** @vercel/analytics + speed-insights in `layout.tsx` (their scripts 404 in local dev — normal).

### Design system (locked — see docs/SPEC.md v1.0)
- **Type:** Literata (serif, headings) · Hanken Grotesk (sans, body) · Spline Sans Mono (metadata: labels, years, tags — uppercase, tracked). Self-hosted via `next/font`.
- ⛔ **NEVER use Geist Mono or Geist Sans. Anywhere. Ever.** (Owner's explicit permanent rule.) Avoid template-rinsed faces generally (Inter-as-display, Space Grotesk, etc.).
- **Icons:** Gravity UI (`@gravity-ui/icons`, per-icon imports). One set only — never mix packs.
- **Mark:** the heavy asterisk ✱ (`src/components/mark.tsx`; `variant="light"` = thin ∗ for small/secondary uses). It is the favicon, wordmark bullet, and section punctuation.
- **Color:** monochrome — ink `#141412` on white, greys `#3d3c39/#6d6b66/#9b9891`, hairline `rgba(20,20,18,.14)`. Color enters ONLY via photos/graphics. Company logos render greyscale (`.logo-grey`) and regain color on hover. No shadows (hairlines only), white-only (no dark mode in v1).
- **Motion:** one easing `cubic-bezier(.4,0,.2,1)` at 180ms — load fade (`.fade-up`), link underline-grow (`.link-grow`), row slide, card lift. Everything respects `prefers-reduced-motion`.
- **Cards:** two types, square (icon/greyed logo) and wide (`graphic.wide`, spans 2 columns, transparent graphic); identical border/radius/hover/↗/caption.

### Content model (git-based, phone-editable)
- Content lives in **`content/*.yml`**, validated by Zod (`src/lib/content.ts`) — a bad edit **fails the build** instead of shipping. Schemas documented as comments at the top of each YAML file.
- Making an item clickable = add a `popup:` block (2–4 talking points + skills + links) → it gets a shareable `/work/<slug>` URL, rendered as a centered dialog (desktop) / bottom sheet (mobile) via the `@modal` intercepting route.
- Promoting an item to a card = `featured: true` + `graphic:`.
- **Pages CMS:** `.pages.yml` maps these files to form UIs at app.pagescms.org (owner connects with GitHub; no build coupling).
- `/writing` auto-indexes the Substack feed once `substackFeed` is set in `content/site.yml` (ISR hourly; empty string = quiet empty state). `/fun` renders shelves + freeform from `content/fun.yml`.
- **Nav:** `/writing` and `/fun` exist but are deliberately NOT linked in the header yet (Substack is empty). Link them when content exists.

### Voice rules (binding on every edit, human or AI)
- First person. Sentence case. Plain section names. Cleverness only on /fun.
- Blurb shape for popups: scope line → impact line (relative metrics only — never raw internal figures; he's a bank PM) → decision line. Strong verbs; never "Responsible for."
- Skills: 3–6 specific tags; no soft-skill nouns, no ratings.
- ⛔ Banned constructions: "passionate about", "leveraging X to drive impact", "in today's fast-paced…", "it's not just X, it's Y", rule-of-three padding, empty value-nouns (driven, dynamic, innovative, impactful, synergy).
- Substitution test before shipping any copy: if the sentence could sit on 10,000 LinkedIn profiles, rewrite it with a specific only Salman could say.
- **Never invent facts** — no made-up dates, metrics, or accomplishments. Omit what you don't know (e.g., `years` fields are optional for a reason).
- Repo is public: never commit private info or `.env*`.

### Roadmap
1. **Copy workshop** (with Salman): about/interests prose, popup bodies, reach-out personas, first featured cards, fun shelves.
2. Link /writing + /fun in the nav once populated; set `substackFeed` when his publication exists.
3. Per-post OG images for /writing (@vercel/og) once posts exist.
