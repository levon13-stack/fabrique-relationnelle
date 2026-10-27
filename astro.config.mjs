// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domaine définitif : www.fabrique-relationnelle.com (la version sans www doit rediriger en 301)
// Sert au sitemap, aux balises canonical, og:url et hreflang.
export default defineConfig({
  site: 'https://www.fabrique-relationnelle.com',
  output: 'static',
  integrations: [sitemap()],
});
