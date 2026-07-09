# s0shaheen.com — Site Overhaul Spec

**Status: v1.0 — ALL decisions resolved (round 2 closed 2026-07-09); site v1 built and shipped. Remaining work: copy workshop, then linking /writing + /fun once populated.**

## Round-2 resolutions (final)

| # | Decision | Resolution |
|---|---|---|
| D1 | Type system | **E — Literata (headings) + Hanken Grotesk (body) + Spline Sans Mono (metadata)** |
| D2 | Icon set | **Gravity UI** (`@gravity-ui/icons`, MIT) |
| D11 | Signature mark | **✱ heavy asterisk everywhere; ∗ thin/math asterisk as the light variant** (SVG in `src/components/mark.tsx`; also the favicon) |
| D6b | Card system | **Approved:** square + wide (2-col span), identical border/radius/hover/↗/caption |

Substack: profile exists (substack.com/@s0shaheen) but no publication yet → `/writing` and `/fun` are built but **unlinked from the nav**, and `substackFeed` stays `""` in `content/site.yml` until posts exist.

---

## 0. Global rules (permanent)

- **NEVER use Geist Mono. Anywhere. Ever.** (Salman, verbatim: "this applies across ALL uses EVER.") Geist Sans is likewise out. Metadata/mono roles use a distinctive alternative chosen per the final type system.
- Avoid any typeface/aesthetic "rinsed by every vibe-coded AI project" — distinctiveness is a requirement, not a preference.
- $0/month beyond the domain. Content git-based, phone-editable, auto-deployed.
- Repo is public — never commit private info.

## 1. Goals & audiences

One personal site that reads two ways at once: **financial-services professionals** (instant credibility, professional register) and **SV builders** (personal touch, shown work and thinking). Structure and register stay professional; personality comes through content specificity, voice, the FUN page, and the signature mark.

## 2. Locked requirements

| # | Requirement |
|---|---|
| L1 | Three surfaces: **HOME** (single page), **/writing** (Substack cross-post), **/fun** (spontaneous board) |
| L2 | HOME order: about → experiences (**Currently / Previously**) → projects (bucketed) → what I care about (prose) → contact |
| L3 | Text lists first; items promoted over time to clickable cards. **Two card types:** square (icon or greyed logo) and wide (fits a wider transparent graphic, e.g. app screenshot/SVG) — visually consistent with each other |
| L4 | Cards open **popups, never separate pages** — small, mostly text (description + skills + links) |
| L5 | Black/white primary; color only via graphics/photos; logos greyed, **color restored on hover** |
| L6 | Distinctive-but-credible type (round 2 in progress); polished, minimal, mobile-first |
| L7 | One consistent clean/credible icon set with a distinct fingerprint (round 2 in progress) |
| L8 | Content in **YAML + Zod** in the repo; **Pages CMS** connected as the form-UI editing layer |
| L9 | Stack: Next.js 16 (App Router) + TypeScript + Tailwind v4 + Vercel Hobby + pnpm |
| L10 | FUN page: structured shelves for lists + an **open-ended drop zone** for anything |

## 3. Decision register — RESOLVED (round 1, 2026-07-09)

| # | Decision | Resolution |
|---|---|---|
| D3 | Page shell | **Responsive:** wider (~960px) organization on desktop, collapsing to a narrow single column on mobile. Section layouts adapt (e.g., card rows 4-up → 2-up, two-column lists → stacked). |
| D4 | Experiences organization | **B — Currently / Previously** (chronological aliveness). Projects section keeps thematic buckets. |
| D5 | Logo treatment | **b — greyscale, color restores on hover** (the one sanctioned color moment). |
| D6 | Popup engine | **A + B + C combined:** URL-addressable popups via Next.js intercepting/parallel routes (shareable, Back-button closes, SSR-indexable), presented as a centered dialog on desktop and a bottom sheet on mobile. The added routing complexity is accepted. |
| D7 | Content layer | **YAML + Zod** (build fails on invalid content) + **Pages CMS now** — `.pages.yml` schema in repo, Salman connects GitHub at app.pagescms.org (one OAuth, ~5 min of his time; setup lands right after the content files exist in the build). |
| D8 | Writing page | **Hybrid:** auto RSS excerpt index linking out to Substack (ISR ~hourly) + native MDX rendering path reserved for flagship essays. |
| D9 | Dark mode | **White only v1.** |
| D10 | Motion | **Base kit:** one easing/duration token (~180ms ease-out), load fade, underline-grow, row slide + chevron, card lift, popup fade-scale. All behind `prefers-reduced-motion`. |
| D12 | Routes | **/writing** and **/fun**. |
| D13 | Hero photo | **None.** Type-only hero; the name is the mark. |
| D14 | OG cards | **Both:** one static B/W site card + generated per-page cards for /writing (@vercel/og). |
| C1 | Copy & voice | **Voice rules approved** (first person, sentence case, plain names, anti-cringe checklist enforced on every edit) + **contact "reach out if…" pattern approved.** Blurb formula not yet approved — part of the later copy workshop. |
| F1 | Fun page | **Shelves for lists** (incl. pulled-from-elsewhere lists), everything else **open-ended** — a freeform area where anything can be dropped without a schema. Scrappy-kit styling and Letterboxd auto-strip: not committed; revisit when the page gets built. |

## 4. Decision register — OPEN (round 2, on the decision board)

| # | Decision | Round-2 ask |
|---|---|---|
| D1 | Type system | Leading: **Satoshi**. Board now compares **7–8 combos**: round-1 A (Newsreader+Inter) and B (Satoshi) plus 5–6 fresh, non-template-rinsed systems, each with its **own metadata face** (never Geist Mono). |
| D2 | Icon set | Nothing selected round 1. Board now compares **Lucide + 8–10 underutilized clean/credible packs**. |
| D11 | Signature mark | Asterisk motif approved in principle; board shows a **wall of 25–30 alternative marks** (typographic symbols with similar energy) to pick from or confirm ✳. |
| D6b | Card design | Two-card-type system (square + wide) mocked on the board for approval. |

## 5. Content model

As v0.1 §5, with amendments: data files are **YAML validated by Zod** (not TS modules); experiences carry `status: current | previous` instead of buckets; projects keep `bucket`. Cards support `graphic: { type: "logo" | "icon" | "image", ... , wide?: boolean }` for the two card formats. A `.pages.yml` mirrors the schema so Pages CMS renders form fields for every collection.

## 6. Design system

- **Color, spacing, motion, popup a11y checklist:** unchanged from v0.1 (§6.1, §6.5, §7).
- **Type:** round 2. Scale defaults stand (16–18px body, ~1.25 ratio, 60–75ch measure, weight-driven hierarchy).
- **Icons:** round 2. Logo-vs-icon rule stands (logos = orgs, icons = things).
- **Signature:** asterisk-energy mark, final glyph from the round-2 wall. Used as wordmark bullet, section dividers, list markers; already the favicon.
- **Layout:** responsive shell per D3 — desktop ~960px with adapted organization, mobile narrow column.

## 7. Writing page (resolved)

RSS excerpt index (title, date, 2-line excerpt derived from `content:encoded`, ↗ link out), `revalidate: 3600`, paywall-safe, plus an MDX route (`/writing/[slug]`) used only for hand-picked flagship essays with per-file canonical. Substack URL: **pending from Salman** (needed before this page can build).

## 8. Fun page (resolved shape)

Titled shelves driven by YAML files (movies, books, tools, …incl. lists pulled from elsewhere) + one open-ended freeform zone (mixed content dropped in without schema — images, links, notes). Photos pre-resized (~1600px) committed to repo + next/image. Visual looseness level: decide when building.

## 9. Copy & voice (approved rules)

First person; sentence case; plain section names; the anti-cringe checklist from v0.1 §9 is binding on every future edit (it will live in AGENTS.md). Contact section uses the "Reach out if you're…" pattern. **All actual copy is deferred** to a workshop with Salman once the build starts — nothing ships with placeholder prose.

## 10. Content inputs received

- **City:** Chicago, IL
- **Handles:** shaheensalmant@gmail.com · linkedin.com/in/s0shaheen · github.com/s0shaheen
- Still pending: Substack URL, experience/project items + first featured cards, reach-out personas, fun shelf list, "what I care about" material — all part of the copy workshop.

## 11. Build order (once round 2 closes)

1. Design tokens + type system + icon set wired (per round-2 picks).
2. Content schema: YAML files + Zod + `.pages.yml`; Salman connects Pages CMS (his OAuth).
3. HOME skeleton: responsive shell, nav, sections with placeholder-free structure (real data only where provided).
4. Card system (square + wide) + URL-addressable popup engine (dialog/sheet).
5. /writing: RSS index (needs Substack URL) + flagship MDX route.
6. /fun: shelves + freeform zone.
7. OG cards (static + @vercel/og for /writing), JSON-LD, a11y pass, `metadataBase` → apex fix.
8. Copy workshop → real content lands → launch.
