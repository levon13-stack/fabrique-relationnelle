# À compléter avant la mise en ligne

Liste de tous les placeholders du site et de leur emplacement exact.

## 1. E-mail — FOURNI ✅ (23 juillet 2026)

`fabrique.relationnelle@gmail.com` est renseigné dans `src/data/site.json`
(source unique) et remplace désormais le placeholder partout : footer,
encart « Premier échange », page Tarifs et contact, section Kontakt
allemande, Mentions légales et Politique de confidentialité.

## 2. `[DATE DE MISE EN LIGNE]` — politique de confidentialité

- **`src/content/pages/politique-de-confidentialite.md`** → ligne
  « Dernière mise à jour : … » en tête du texte.

## 3. `[Coordonnées du médiateur à compléter le cas échéant.]`

- **`src/content/pages/mentions-legales.md`** → section « Médiation de la
  consommation ». Renseigner le médiateur de la consommation choisi (nom,
  adresse, site) ou retirer la phrase entre crochets si non applicable.

## 4. Photos — FOURNIES ✅ (23 juillet 2026)

Les trois photos de Sabine sont intégrées et optimisées pour le web
(redimensionnées + compressées depuis les originaux 8049 px / 20 Mo) :

| Fichier dans `public/images/` | Page(s) | Rôle |
| --- | --- | --- |
| `accueil-ambiance.jpg` | Accueil + page allemande | grande bande photo sous le hero |
| `portrait-sabine.jpg` | À propos | portrait en tête, face à la citation |
| `contact-ambiance.jpg` | Tarifs et contact | photo « à l'écoute » près des coordonnées |

Pour remplacer une photo plus tard : déposer un fichier du même nom dans
`public/images/` (idéalement large ~1600–2400 px, JPEG optimisé) et rebuilder.
Le cadrage à l'intérieur du cadre se règle via `objectPosition` dans la page
concernée (ex. `objectPosition="center 30%"`).

## 5. Nom de domaine définitif

Le domaine envisagé `lafabriquerelationnelle.fr` (à réserver) est utilisé
comme base des URLs canoniques, du sitemap et des balises hreflang. S'il
change :

- **`astro.config.mjs`** → champ `site`.
- **`public/robots.txt`** → ligne `Sitemap:`.

## 6. Image de partage social (og-image)

`public/images/og-image.png` (1200 × 630) est générée sur charte
(illustration + nom + sous-titre) par `npm run generate:og`
(`scripts/generate-og.mjs`, qui produit aussi `public/apple-touch-icon.png`).
À relancer si le nom, le sous-titre ou l'illustration changent — ou remplacer
le fichier par une version avec photo une fois les photos disponibles.

## 7. À valider — deux balises meta ajustées

Le document de contenu prévoyait un formulaire de contact et les tarifs sur
la page « En pratique » ; le site n'a pas de formulaire et les tarifs sont
sur « Tarifs et contact ». Deux meta ont donc été ajustées en conséquence,
à valider :

- `src/content/pages/en-pratique.md` → titre « En pratique — Déroulement des
  séances… » (au lieu de « Séances et tarifs ») et description sans la
  mention des tarifs.
- `src/content/pages/tarifs-et-contact.md` → description « Par e-mail,
  téléphone ou WhatsApp » (le mot « formulaire » a été retiré, ici et dans
  le texte de la page ainsi que dans la section Kontakt allemande).
