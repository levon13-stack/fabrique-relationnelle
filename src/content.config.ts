import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Une entrée Markdown par page (FR, DE, légales). Le frontmatter porte les
// balises meta et les blocs structurés (sections, listes, vignettes…) ; le
// corps Markdown porte le texte courant. Un CMS git-based (TinaCMS, Decap,
// Sveltia…) pourra piloter ces champs tels quels.

const lien = z.object({
  label: z.string(),
  href: z.string(),
});

const section = z.object({
  id: z.string().optional(),
  titre: z.string(),
  accent: z.enum(['coral', 'coral-dark', 'yellow', 'brown']).optional(),
  paragraphes: z.array(z.string()).default([]),
  items: z.array(z.string()).default([]),
  sousTitre: z.string().optional(),
  itemsPro: z.array(z.string()).default([]),
});

const image = z.object({ src: z.string(), alt: z.string() });

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
    title: z.string(),
    kicker: z.string().optional(),
    citation: z.string().optional(),
    sousTitre: z.string().optional(),
    introTitre: z.string().optional(),
    lienPrincipal: lien.optional(),
    liens: z.array(lien).default([]),
    sommaire: z
      .array(z.object({ titre: z.string(), href: z.string(), teaser: z.string() }))
      .default([]),
    sections: z.array(section).default([]),
    noteListe: z.string().optional(),
    preventif: z
      .object({ titre: z.string(), intro: z.string(), items: z.array(z.string()) })
      .optional(),
    vignettes: z
      .array(z.object({ titre: z.string(), situation: z.string(), accompagnement: z.string() }))
      .default([]),
    portrait: image.optional(),
    photo: image.optional(),
    rubriques: z.record(z.string(), z.string()).default({}),
  }),
});

export const collections = { pages };
