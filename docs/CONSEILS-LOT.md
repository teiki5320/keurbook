# Conseils : lot d'octobre 2026 (30 articles) — consignes communes

Trois agents écrivent en parallèle, 10 articles chacun. Chacun **ne crée que ses fichiers** :
`content/conseils/<slug>.md` et `public/conseils/<slug>.webp`. Ne modifier aucun article existant ni aucun autre
fichier. Pas de commit.

## 1. Modèle et règles

- Lire 2 articles existants en entier (ex. `content/conseils/alain-mabanckou.md`, `negritude.md`), `docs/CONTENU.md`
  (section Conseils), `docs/REDACTION.md`, `src/lib/conseils/article.ts`, `src/lib/conseils/categories.ts` et
  `tests/conseils.test.ts` (en-têtes, longueur de la description, livres cités, liens internes).
- Même format exact : en-tête (`title` en question, `description`, `date`, `theme`, `resume`, `livres`), puis le texte
  en Markdown avec des intertitres `##`, environ 700 à 1 000 mots, ton clair et chaleureux, tutoiement interdit
  (vouvoiement comme les articles existants).
- **Ne citer que des livres et auteurs présents sur le site** (`src/lib/demo/`, lots compris) et mettre leurs slugs
  dans `livres` (4 à 8). Liens internes : `/livre/<slug>`, `/bd/<slug>`, `/auteur/<slug>`, `/pays/<slug>`,
  `/conseils/<slug>` (seulement vers un article déjà publié ou du même lot, pas vers un article futur).
- Faits vérifiés uniquement (dates, prix, parcours). Pas de spoiler. Pas de citation longue (2 lignes au plus, exacte).
- Ne pas refaire un sujet déjà traité par un article existant (`content/conseils/`).
- Dates : celle indiquée dans la liste de l'agent (les articles du jour sont datés 2026-10-02, les articles programmés
  sont des lundis).

## 2. Illustrations (OpenArt) — planches de 4, format paysage

Une illustration par article, même style que les images existantes de `public/conseils/` (collage de papiers,
fragments de wax, scène vivante, personnages sans visage net).

1. Pour chaque article, écrire une scène en anglais (1 ou 2 phrases).
2. Grouper par 4 et générer avec `openart_generate_image`, modèle `nano-banana-2`, mode `text2image`,
   `aspectRatio: "3:2"`, `resolution: "4K"` (vérifier avec `openart_model_form_get` ; si le 4K n'existe pas en 3:2,
   prendre 2K), avec ce texte (remplacer P1 à P4) :

   > A sheet of FOUR separate horizontal illustrations arranged in a strict 2x2 grid, all four panels exactly the same
   > size, separated by straight plain cream-white gutters of equal width, nothing crossing the gutters. Same style in
   > all four panels: paper cut-out collage illustration, layered textured papers with fragments of African wax-print
   > fabric patterns, bold Matisse-like shapes, warm palette of ochre, terracotta, indigo and cream, lively editorial
   > scene. Panel 1 (top left): P1 Panel 2 (top right): P2 Panel 3 (bottom left): P3 Panel 4 (bottom right): P4
   > Absolutely no text anywhere, no letters, no numbers, no writing, no logo, no visible faces.

3. Télécharger la planche dans **son propre sous-dossier** du scratchpad (indiqué dans la consigne), jamais dans le
   projet, puis la découper depuis la racine du projet :
   `KEURBOOK_FORMAT=conseil node scripts/decouper-planche.mjs planche.png 2 2 slug1 slug2 slug3 slug4`
   (écrit `public/conseils/<slug>.webp` en 1200×805).
4. **Regarder chaque image** (outil Read). Texte, lettres, enseigne, visage net, découpe ratée ou personne réelle
   reconnaissable : la refaire (seule : `aspectRatio: "3:2"`, `resolution: "1K"`, même style, puis
   `node -e "require('sharp')('IN.png').resize(1200,805).webp({quality:80}).toFile('public/conseils/SLUG.webp')"`).
5. Au plus 4 planches et 3 régénérations simples par agent.

## Confidentialité

Jamais d'adresse e-mail ni d'information personnelle dans une requête (User-Agent : « KeurbookBot/1.0 (https://keurbook.com) »).

## 3. Vérifications et rapport

`npm run lint`, `npm run typecheck`, `npm test` doivent passer. Rapport court en français : articles écrits (slug,
date), images refaites, points incertains.
