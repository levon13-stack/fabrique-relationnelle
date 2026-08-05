// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// [DOMAINE À CONFIRMER] : lafabriquerelationnelle.fr est le nom de domaine
// envisagé. À remplacer par le domaine définitif avant la mise en ligne
// (voir A-COMPLETER.md). Sert au sitemap, aux balises canonical et hreflang.
export default defineConfig({
  site: 'https://lafabriquerelationnelle.fr',
  output: 'static',
  integrations: [sitemap()],
});
