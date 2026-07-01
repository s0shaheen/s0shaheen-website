# s0shaheen.com

Personal website for Salman Shaheen — Next.js (App Router) + TypeScript + Tailwind CSS v4, built with Turbopack and deployed on [Vercel](https://vercel.com).

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts: `pnpm build` (production build), `pnpm start` (serve the build), `pnpm lint`.

Node is pinned to **22** via `.nvmrc` / `engines.node`.

## Deploy

Hosted on Vercel with Git-connected auto-deploys:

- Push to `main` → **production** (`www.s0shaheen.com`).
- Every other branch / PR → its own **preview** URL.

DNS is managed at Namecheap (BasicDNS); the domain was migrated here from GitHub Pages.

## Notes

- Blog is **Substack-first**; an on-site `/blog` route may be added later.
- Secrets live in Vercel env vars — pull them locally with `vercel env pull`. Never commit `.env*` (gitignored).

See [`AGENTS.md`](./AGENTS.md) for agent / contributor context.
