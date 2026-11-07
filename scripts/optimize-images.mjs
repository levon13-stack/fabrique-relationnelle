// Génère des variantes AVIF + WebP redimensionnées pour chaque image JPG/PNG de
// public/images/ (dans public/images/optim/, non versionné). Lancé
// automatiquement avant `npm run dev` et `npm run build` : il suffit donc de
// déposer une photo dans public/images/ pour qu'elle soit optimisée.
import { readdirSync, mkdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { FORMATS, EXCLUES, largeursPour, nomVariante } from '../src/lib/images.mjs';

const publicDir = fileURLToPath(new URL('../public', import.meta.url));
const sourcesDir = path.join(publicDir, 'images');
mkdirSync(path.join(sourcesDir, 'optim'), { recursive: true });

const sources = readdirSync(sourcesDir).filter(
  (f) => /\.(jpe?g|png)$/i.test(f) && !EXCLUES.includes(f),
);

let crees = 0;
for (const fichier of sources) {
  const source = path.join(sourcesDir, fichier);
  const dateSource = statSync(source).mtimeMs;
  const { width } = await sharp(source).metadata();

  for (const largeur of largeursPour(width)) {
    for (const format of FORMATS) {
      const sortie = path.join(publicDir, nomVariante(`/images/${fichier}`, largeur, format));
      if (existsSync(sortie) && statSync(sortie).mtimeMs >= dateSource) continue;
      const image = sharp(source).rotate().resize({ width: largeur, withoutEnlargement: true });
      await (format === 'avif' ? image.avif({ quality: 55, effort: 4 }) : image.webp({ quality: 78 }))
        .toFile(sortie);
      crees++;
    }
  }
}

console.log(`[images] ${sources.length} image(s) source, ${crees} variante(s) générée(s).`);
