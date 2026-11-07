# À compléter

## Reste à faire

### 1. Horaires précis

Le site indique seulement « du lundi au samedi ». Renseigner les horaires dans
**`src/data/site.json`** → `horaires` (alimente les données structurées de
l'accueil, `openingHoursSpecification`). Une entrée par plage :

```json
{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday"], "opens": "09:00", "closes": "19:00" }
```

Utiliser les mêmes horaires que sur la fiche Google Business Profile.

### 2. `[DATE DE MISE EN LIGNE]` — politique de confidentialité

- **`src/content/pages/politique-de-confidentialite.md`** → ligne
  « Dernière mise à jour : … » en tête du texte.

### 3. `[Coordonnées du médiateur à compléter le cas échéant.]` — mentions légales

Ce texte entre crochets est encore affiché sur la page.

- **`src/content/pages/mentions-legales.md`** → section « Médiation de la
  consommation ». Renseigner le médiateur de la consommation choisi (nom,
  adresse, site) ou retirer la phrase entre crochets si non applicable.

## Déjà fait ✅

- **E-mail** : `fabrique.relationnelle@gmail.com`, source unique
  `src/data/site.json`.
- **Photos** : `accueil-ambiance.jpg` (accueil + page allemande),
  `portrait-sabine.jpg` (À propos), `contact-ambiance.jpg` (Tarifs et
  contact). Pour en remplacer une : déposer un fichier du même nom dans
  `public/images/` puis rebuilder ; les versions AVIF/WebP sont régénérées
  automatiquement. Cadrage via `objectPosition` dans la page concernée.
- **Domaine** : `www.fabrique-relationnelle.com` (canonical, sitemap,
  hreflang) ; la version sans www redirige en 301. S'il change :
  `astro.config.mjs` (`site`), `public/robots.txt` (`Sitemap:`),
  `vercel.json` (redirection).
- **Fiche Google Business Profile** :
  `https://www.google.com/maps?cid=17635505642573603909`. Elle est renseignée
  dans `src/data/site.json` → `adresseAix.ficheGoogle`, utilisée dans les
  données structurées (`sameAs`, `hasMap`) et pour le lien « Voir le cabinet
  sur Google Maps » (pied de page, page Tarifs et contact).
- **Image de partage et icônes** : `npm run generate:og` régénère
  `og-image.png`, `apple-touch-icon.png`, `favicon.ico` et les icônes 192/512.
  À relancer si le nom, le sous-titre ou l'illustration changent.
- **Titles et meta descriptions** : réécrits dans la PR #1 (uniques, centrés
  sur Aix-en-Provence), sans mention de formulaire. Le site n'a pas de
  formulaire de contact, et les tarifs sont sur « Tarifs et contact ».
