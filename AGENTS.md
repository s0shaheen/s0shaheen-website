<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project: s0shaheen.com

Personal website for Salman Shaheen. Next.js (App Router) + TypeScript + Tailwind CSS v4, built with Turbopack, deployed on Vercel.

- **Hosting / deploys:** Vercel, Git-connected. `main` = production; every other branch/PR = its own preview URL. (Migrated off GitHub Pages.)
- **Domain:** `s0shaheen.com` (canonical, apex) — `www.s0shaheen.com` redirects to it. DNS at Namecheap (BasicDNS).
- **Commands:** `pnpm dev` (Turbopack), `pnpm build`, `pnpm start`, `pnpm lint`.
- **Node:** 22+ — `.nvmrc` = `22`, `engines.node` = `>=22` (local dev on 24 is fine; Vercel builds on 22.x).
- **Content / blog:** Substack-first — no CMS / MDX / DB / auth yet. An on-site `/blog` route may come later.
- **Secrets:** live in Vercel env vars; pull locally with `vercel env pull`. Never commit `.env*` (gitignored).

### Roadmap (post-setup — not yet built)
1. Requirements for the `work`, `personal`, and `writing` sections (page by page).
2. Design system: Tailwind theme tokens (type scale, color, spacing, motion) + base components.
