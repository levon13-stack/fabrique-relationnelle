// Génère les images de marque à partir de la charte et de src/data/site.json :
//  - public/images/og-image.png   (1200 × 630, aperçu de partage social)
//  - public/apple-touch-icon.png  (180 × 180, icône iOS)
//  - public/favicon.ico, public/favicon-48.png, public/icon-192.png,
//    public/icon-512.png (favicon pour les anciens navigateurs, Google, Android)
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

function png(svg, largeur) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: largeur },
    font: { fontFiles: polices, loadSystemFonts: false, defaultFontFamily: 'Mulish' },
  });
  return resvg.render().asPng();
}

function rendre(svg, sortie, largeur) {
  writeFileSync(chemin(sortie), png(svg, largeur));
  console.log(`✓ ${sortie}`);
}

// Fichier .ico contenant des PNG (format accepté par tous les navigateurs actuels)
function ico(images, sortie) {
  const entete = Buffer.alloc(6 + 16 * images.length);
  entete.writeUInt16LE(0, 0);
  entete.writeUInt16LE(1, 2);
  entete.writeUInt16LE(images.length, 4);
  let decalage = entete.length;
  images.forEach(({ taille, donnees }, i) => {
    const e = 6 + 16 * i;
    entete.writeUInt8(taille, e);
    entete.writeUInt8(taille, e + 1);
    entete.writeUInt16LE(1, e + 4);
    entete.writeUInt16LE(32, e + 6);
    entete.writeUInt32LE(donnees.length, e + 8);
    entete.writeUInt32LE(decalage, e + 12);
    decalage += donnees.length;
  });
  writeFileSync(chemin(sortie), Buffer.concat([entete, ...images.map((im) => im.donnees)]));
  console.log(`✓ ${sortie}`);
}

const faviconSvg = readFileSync(chemin('public/favicon.svg'), 'utf8');

rendre(ogSvg, 'public/images/og-image.png', 1200);
rendre(appleSvg, 'public/apple-touch-icon.png', 180);
rendre(appleSvg, 'public/icon-192.png', 192);
rendre(appleSvg, 'public/icon-512.png', 512);
rendre(faviconSvg, 'public/favicon-48.png', 48);
ico(
  [16, 32, 48].map((taille) => ({ taille, donnees: png(faviconSvg, taille) })),
  'public/favicon.ico',
);
