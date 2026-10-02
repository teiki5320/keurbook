# Lots de fiches (octobre 2026) — consignes communes

Plusieurs agents écrivent en parallèle. Chacun **ne modifie que son fichier** `src/lib/demo/lots/lot-XX.ts`,
son fichier de scènes `docs/essais/scenes-lots/lot-XX.json`, et ajoute ses images dans `public/illustrations/`
(et `public/authors/` pour les photos des nouveaux auteurs). Ne jamais toucher aux autres fichiers
(auteurs-*.ts, livres-*.ts, bd.ts, photos.ts, illustrations.ts, index.ts, composants…), sauf mention contraire dans
la consigne du lot. Pas de commit.

## 1. Quels livres

0. **Aucun nouveau pays** : seulement des auteurs de pays déjà présents dans `src/lib/countries.ts`. Ne jamais modifier `countries.ts` ni les formes de la carte.

1. **Tous les livres** de chaque auteur du lot **publiés en français** (écrits en français ou traduits), quel que soit le
   genre : romans, nouvelles, poésie, théâtre, essais, récits, contes, jeunesse, BD.
2. Exclus : ouvrages collectifs et anthologies dirigées par d'autres, préfaces, articles, **ouvrages savants (thèses,
   travaux universitaires, sociologie académique)**, livres jamais traduits en français. Les livres écrits à deux sont
   gardés, sur la fiche de l'auteur du site (le co-auteur avec `authorSlug: null`).
3. Un livre déjà présent sur le site (tous les fichiers de `src/lib/demo/`) n'est **jamais** ajouté une deuxième fois :
   vérifier les slugs **et** les titres avant d'écrire.
4. Si on ne trouve pas assez d'informations fiables pour écrire un résumé juste, **on n'écrit pas la fiche** : le titre
   reste dans les « autres titres » de l'auteur. Le signaler dans le rapport.

## 2. Règles de rédaction (docs/REDACTION.md, résumé)

- Français, ton clair et chaleureux. Résumé **écrit par nous** (3 à 5 phrases), jamais copié ni paraphrasé de près
  d'une quatrième de couverture ou de Wikipédia, **sans dévoiler la fin**.
- `whyRead` : 2 ou 3 phrases de moins de 120 caractères. `themes` : 2 à 4 clés de `src/lib/themes.ts`.
- `genre`, `audience`, `format` : valeurs de `src/lib/types.ts` et `src/lib/themes.ts`.
- `year` : première parution (en langue originale pour une traduction). `originalLanguage` : null si écrit en français.
- `publisher` : éditeur de l'édition en vente conseillée (poche de préférence).
- **Jamais inventés** : `isbn` et `pages` seulement s'ils sont vérifiés pour cette édition (BnF :
  https://catalogue.bnf.fr/api/SRU, site de l'éditeur), avec une clé ISBN-13 correcte ; sinon `null`.
  `amazonAsin`, `priceCents`, `cover` : toujours `null`.
- `quote` : `null`. `awards` : seulement les prix vérifiés.
- Traductions : contributeur `{ role: "traducteur", name: "…", authorSlug: null }`, traducteur vérifié.
- `adaptations` (facultatif) : seulement les adaptations vérifiées (film, série, théâtre, BD…).
- `featured: false`, `isPublished: true`, `addedAt: "2026-10-02"`, `subtitle: null` sauf vrai sous-titre.
- `outOfPrint: true` **seulement si c'est prouvé** (éditeur ou libraire qui l'indique « indisponible » / « épuisé », ou notice qui le dit). Une simple estimation (édition ancienne, pas trouvée) ne suffit pas : dans le doute, ne pas mettre le champ.
- Slugs : titre en minuscules, sans accents, mots séparés par « - » (ex. `les-soleils-des-independances`).
- Prendre `src/lib/demo/lots/lot-01.ts` comme modèle exact du format (helper `livre`, 6 fiches déjà écrites).

## 3. Couvertures illustrées (OpenArt) — planches de 4

Les couvertures sont produites **4 par 4** sur une seule image (30 crédits la planche, soit 7,5 par livre).

1. Pour chaque livre, écrire une scène en anglais (1 ou 2 phrases) tirée de **notre** résumé : lieu, époque, objets,
   personnages **de dos ou de loin**, sans personne réelle reconnaissable, sans texte. L'ajouter à
   `docs/essais/scenes-lots/lot-XX.json` (`{ "slug": "scène" }`).
2. Grouper les livres par 4 et générer chaque planche avec `openart_generate_image`, modèle `nano-banana-2`, mode
   `text2image`, `aspectRatio: "2:3"`, `resolution: "2K"`, avec exactement ce texte (remplacer P1 à P4) :

   > A sheet of FOUR separate vertical book-cover illustrations arranged in a strict 2x2 grid, all four panels exactly
   > the same size, separated by straight plain cream-white gutters of equal width, nothing crossing the gutters. Same
   > style in all four panels: paper cut-out collage illustration, layered textured papers with fragments of African
   > wax-print fabric patterns, bold Matisse-like shapes, warm palette of ochre, terracotta, indigo and cream; in each
   > panel keep the top third calm and uncluttered for a title. Panel 1 (top left): P1 Panel 2 (top right): P2 Panel 3
   > (bottom left): P3 Panel 4 (bottom right): P4 Absolutely no text anywhere, no letters, no numbers, no writing, no
   > logo, no visible faces.

3. Lancer plusieurs planches à la fois, relever chaque résultat avec `openart_creation_get` (pas de `sleep`), télécharger
   la planche (`curl -s -o planche.png URL`, dans **son propre sous-dossier** `scratchpad/lot-XX/` : d'autres agents
   travaillent en même temps dans le scratchpad ; jamais dans le projet), puis la
   découper depuis la racine du projet :
   `node scripts/decouper-planche.mjs planche.png 2 2 slug1 slug2 slug3 slug4`
   (ordre : haut gauche, haut droite, bas gauche, bas droite). Le script écrit `public/illustrations/<slug>.webp`.
4. **Regarder chaque couverture découpée** (outil Read). Si l'une contient du texte, des lettres, une enseigne, un visage
   net ou si la découpe est ratée, la refaire seule : génération simple `aspectRatio: "2:3"`, `resolution: "1K"`
   (20 crédits) avec le texte « Paper cut-out collage illustration, layered textured papers with fragments of African
   wax-print fabric patterns, bold Matisse-like shapes, warm palette of ochre, terracotta, indigo and cream. Scene: SCENE
   Vertical book-cover composition, keep the top third calm and uncluttered for a title. Absolutely no text anywhere, no
   signs, no letters, no writing, no logo, no visible faces. », puis
   `node -e "require('sharp')('IN.png').resize(600,900).webp({quality:80}).toFile('public/illustrations/SLUG.webp')"`.
5. Ajouter le slug à `illustres` dans le fichier du lot.
6. Ne pas dépasser le nombre de planches indiqué dans la consigne du lot.

## Nouveaux auteurs (lot 09)

Fiche `Author` complète dans `auteurs` (modèle : `src/lib/demo/auteurs-bd.ts`), pays **déjà présent** dans
`src/lib/countries.ts` (sinon on écarte l'auteur et on le signale). Photo seulement si elle est libre de droits
(Wikimedia Commons, licence et auteur notés dans `photos`), fichier dans `public/authors/<slug>.webp`.

## Confidentialité

Ne jamais mettre d'adresse e-mail ni d'information personnelle dans une requête (en-tête User-Agent compris).
Pour Wikipédia, un User-Agent du type « KeurbookBot/1.0 (https://keurbook.com) » suffit.

## 4. Vérifications avant de rendre la main

`npm run lint`, `npm run typecheck`, `npm test` doivent passer (les tests vérifient slugs uniques, auteurs existants,
champs complets, clés ISBN, thèmes). Corriger ce qui relève de son lot ; signaler le reste.

## 5. Rapport final (en français, court)

Nombre de livres ajoutés par auteur ; titres écartés et pourquoi ; ISBN laissés à null ; images générées
et régénérées ; points incertains.
