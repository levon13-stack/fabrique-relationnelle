// Génère les images de marque à partir de la charte et de src/data/site.json :
//  - public/images/og-image.png   (1200 × 630, aperçu de partage social)
//  - public/apple-touch-icon.png  (180 × 180, icône iOS)
// À relancer si le nom, le sous-titre ou l'illustration changent :
//   npm run generate:og
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import site from '../src/data/site.json' with { type: 'json' };

const racine = new URL('..', import.meta.url);
const chemin = (rel) => fileURLToPath(new URL(rel, racine));

const CREME = '#FAF3EA';
const CORAIL = '#E8663C';
const BRUN = '#3E2A20';
const BRUN_DOUX = '#6B5648';
const VAGUE = 'M2 7 Q 17 0 32 7 T 62 7 T 92 7 T 122 7';

const polices = [chemin('src/assets/fonts/mulish-400.ttf'), chemin('src/assets/fonts/mulish-700.ttf')];
const illustration = readFileSync(chemin('public/images/illustration.png')).toString('base64');

const echapper = (texte) => texte.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const nomCapitales = echapper(site.nom.toUpperCase());
const sousTitre = echapper(site.sousTitre.fr);

// --- Image de partage social (1200 × 630) -----------------------------------
const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${CREME}"/>
  <image href="data:image/png;base64,${illustration}" x="365" y="64" width="470" height="322"/>
  <text x="600" y="464" text-anchor="middle" font-family="Mulish" font-weight="700" font-size="44" letter-spacing="7" fill="${BRUN}">${nomCapitales}</text>
  <g transform="translate(538, 488)"><path d="${VAGUE}" fill="none" stroke="${CORAIL}" stroke-width="3" stroke-linecap="round"/></g>
  <text x="600" y="549" text-anchor="middle" font-family="Mulish" font-weight="400" font-size="25" fill="${BRUN_DOUX}">${sousTitre}</text>
</svg>`;

// --- Icône iOS (180 × 180) ----------------------------------------------------
const appleSvg = `<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="${CREME}"/>
  <text x="90" y="103" text-anchor="middle" font-family="Mulish" font-weight="700" font-size="72" letter-spacing="3" fill="${BRUN}">FR</text>
  <g transform="translate(28, 124) scale(1)"><path d="${VAGUE}" fill="none" stroke="${CORAIL}" stroke-width="6" stroke-linecap="round"/></g>
</svg>`;

function rendre(svg, sortie, largeur) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: largeur },
    font: { fontFiles: polices, loadSystemFonts: false, defaultFontFamily: 'Mulish' },
  });
  writeFileSync(chemin(sortie), resvg.render().asPng());
  console.log(`✓ ${sortie}`);
}

rendre(ogSvg, 'public/images/og-image.png', 1200);
rendre(appleSvg, 'public/apple-touch-icon.png', 180);
