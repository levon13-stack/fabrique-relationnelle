// Règles partagées entre scripts/optimize-images.mjs (génération) et
// src/components/ResponsiveImage.astro (affichage).
export const LARGEURS = [160, 320, 480, 800, 1200, 1600];
export const FORMATS = ['avif', 'webp'];
export const DOSSIER_OPTIM = '/images/optim';

// Images de public/images/ qui ne passent pas par le pipeline
// (aperçu de partage social : PNG imposé par les réseaux).
export const EXCLUES = ['og-image.png'];

export const largeursPour = (largeurOrigine) => {
  const utiles = LARGEURS.filter((l) => l < largeurOrigine);
  return [...utiles, Math.min(largeurOrigine, LARGEURS.at(-1))];
};

export const nomVariante = (src, largeur, format) => {
  const base = src.split('/').pop().replace(/\.[^.]+$/, '');
  return `${DOSSIER_OPTIM}/${base}-${largeur}.${format}`;
};
