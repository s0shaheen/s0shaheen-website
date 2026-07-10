import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { z } from "zod";

/**
 * Content layer: YAML in /content, validated by Zod at build time.
 * A bad edit fails the Vercel build instead of shipping broken.
 */

const graphicSchema = z.object({
  kind: z.enum(["icon", "logo", "image"]),
  value: z.string(),
  wide: z.boolean().optional(),
});

const popupSchema = z.object({
  body: z.array(z.string()).min(1).max(6),
  skills: z.array(z.string()).max(8).optional(),
  links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
});

const itemBase = {
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  title: z.string(),
  org: z.string().optional(),
  years: z.string().optional(),
  oneLiner: z.string().optional(),
  featured: z.boolean().optional(),
  graphic: graphicSchema.optional(),
  popup: popupSchema.optional(),
};

const experienceSchema = z.object({
  ...itemBase,
  status: z.enum(["current", "previous"]),
});

const projectSchema = z.object({
  ...itemBase,
  bucket: z.string(),
});

// Optional fields default rather than fail: Pages CMS omits empty fields when
// it writes YAML, and a CMS round-trip must never break the build.
const siteSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  location: z.string(),
  currently: z.string().default(""),
  interests: z.string().default(""),
  substackFeed: z.union([z.literal(""), z.string().url()]).default(""),
  handles: z.array(z.object({ label: z.string(), href: z.string() })),
  reachOutIf: z.array(z.string()).default([]),
});

const funSchema = z.object({
  shelves: z.array(
    z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          take: z.string().optional(),
          href: z.string().optional(),
        }),
      ),
    }),
  ),
  freeform: z.array(
    z
      .object({
        text: z.string().optional(),
        image: z.string().optional(),
        caption: z.string().optional(),
      })
      .refine((i) => i.text || i.image, "freeform items need text or image"),
  ),
});

export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Site = z.infer<typeof siteSchema>;
export type Fun = z.infer<typeof funSchema>;
export type Item = Experience | Project;

function load(file: string): unknown {
  return parse(readFileSync(join(process.cwd(), "content", file), "utf8"));
}

export function getSite(): Site {
  return siteSchema.parse(load("site.yml"));
}

export function getExperiences(): Experience[] {
  return z.array(experienceSchema).parse(load("experiences.yml") ?? []);
}

export function getProjects(): Project[] {
  return z.array(projectSchema).parse(load("projects.yml") ?? []);
}

export function getFun(): Fun {
  return funSchema.parse(load("fun.yml"));
}

/** Every item that has popup content — these get /work/<slug> routes. */
export function getPopupItems(): Item[] {
  return [...getExperiences(), ...getProjects()].filter((i) => i.popup);
}

export function getItem(slug: string): Item | undefined {
  return [...getExperiences(), ...getProjects()].find((i) => i.slug === slug);
}
