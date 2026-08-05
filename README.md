# La Fabrique Relationnelle — site vitrine

Site vitrine bilingue (français / allemand) de La Fabrique Relationnelle —
coaching et accompagnement systémique à Aix-en-Provence et Marseille.
Construit avec [Astro](https://astro.build), 100 % statique, sans backend,
sans base de données, sans formulaire et sans aucune animation.

## Lancer en local

```bash
npm install
npm run dev        # → http://localhost:4321
```

Autres commandes : `npm run build` (site statique dans `dist/`) et
`npm run preview` (prévisualisation du build).

## Déployer sur Vercel

1. Pousser ce dossier sur un dépôt Git neuf (GitHub, GitLab…).
2. Sur [vercel.com](https://vercel.com) : **Add New Project** → importer le
   dépôt. Vercel détecte Astro automatiquement (build `astro build`, sortie
   `dist/`). Aucune variable d'environnement n'est nécessaire.
3. Avant la mise en ligne : compléter les éléments listés dans
   [A-COMPLETER.md](A-COMPLETER.md) et vérifier le nom de domaine dans
   `astro.config.mjs` et `public/robots.txt`.

## Où modifier chaque contenu

Tout le contenu éditorial vit dans `src/content/` et `src/data/` — jamais
dans les composants. Une personne non technique n'a besoin de toucher qu'à
ces fichiers ; un CMS git-based (TinaCMS, Decap/Sveltia…) pourra s'y
brancher plus tard sans refonte.

| Contenu | Fichier |
| --- | --- |
| Textes et meta de chaque page française | `src/content/pages/<nom-de-page>.md` |
| Page allemande | `src/content/pages/de.md` |
| Mentions légales / politique de confidentialité | `src/content/pages/mentions-legales.md`, `politique-de-confidentialite.md` |
| Téléphone, WhatsApp, e-mail, adresse, cabinets, nom et sous-titre | `src/data/site.json` (source unique, reprise dans header, footer, contact, JSON-LD) |
| Tarifs (FR et DE) | `src/data/tarifs.json` |
| Entrées du menu | `src/data/navigation.json` |
| Encart « premier échange » (En pratique, Tarifs, Kontakt) | `src/data/cta.json` |
| Petits libellés d'interface (Menu, Contact, Cabinets…) | `src/data/ui.json` |

Dans chaque fichier `.md`, le **frontmatter** (entre `---`) porte les balises
meta et les blocs structurés (sections, listes, vignettes) ; le **corps** en
Markdown porte le texte courant d'introduction.

### Images

Toutes les images éditoriales vivent dans `public/images/` et sont
référencées depuis les fichiers de contenu/données, jamais en dur dans un
composant. Trois photos sont attendues (emplacements réservés affichés en
attendant — déposer le fichier au bon nom + rebuild suffit) :

- `public/images/portrait-sabine.jpg` — page À propos (portrait 4:5).
- `public/images/accueil-ambiance.jpg` — bande photo de l'accueil (paysage).
- `public/images/contact-ambiance.jpg` — page Tarifs et contact (4:5).
- **Illustration de marque** : remplacer `public/images/illustration.png`
  (même nom de fichier), ou changer le chemin dans `src/data/site.json`.
- **Image de partage social** : `public/images/og-image.png` et
  `public/apple-touch-icon.png` sont générées par `npm run generate:og` — à
  relancer si le nom, le sous-titre ou l'illustration changent.

## Structure technique

- `src/layouts/Layout.astro` — `<head>` complet : meta, canonical, hreflang
  FR/DE, Open Graph + Twitter card, JSON-LD `ProfessionalService`, police
  Mulish préchargée.
- `src/components/` — `Header` (lockup + nav + sélecteur FR/DE), `Footer`,
  `WavySeparator` (la ligne ondulée signature), `SectionRow` (rangée
  éditoriale, page DE), `ContactCTA` (encart jaune « premier échange »),
  `PhotoSlot` (photo ou emplacement réservé selon présence du fichier).
- `src/pages/404.astro` — page d'erreur sur charte (build : `dist/404.html`,
  servie automatiquement par Vercel).
- `src/styles/global.css` — charte (variables CSS), typographie, motifs.
  Les transitions y sont volontairement limitées à `color` /
  `background-color` : **ne pas ajouter d'animations** (exigence cliente).
- Sitemap généré par `@astrojs/sitemap` (`sitemap-index.xml`) +
  `public/robots.txt`.
