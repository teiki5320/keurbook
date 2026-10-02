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
2. Exclus : ouvrages collectifs et anthologies dirigées par d'autres, préfaces, articles, thèses universitaires,
   livres jamais traduits en français.
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
- Slugs : titre en minuscules, sans accents, mots séparés par « - » (ex. `les-soleils-des-independances`).
- Prendre les fiches existantes de `src/lib/demo/livres-ouest.ts` comme modèle exact du format.

## 3. Couvertures illustrées (OpenArt)

Pour chaque nouveau livre :

1. Écrire une scène en anglais (1 ou 2 phrases) tirée de **notre** résumé : lieu, époque, objets, personnages **de dos
   ou de loin**, sans personne réelle reconnaissable, sans texte. L'ajouter à `docs/essais/scenes-lots/lot-XX.json`
   (`{ "slug": "scène" }`).
2. Générer avec `openart_generate_image`, modèle `nano-banana-2`, mode `text2image`,
   `aspectRatio: "2:3"`, `resolution: "1K"`, avec exactement ce texte (remplacer SCENE) :

   > Paper cut-out collage illustration, layered textured papers with fragments of African wax-print fabric patterns,
   > bold Matisse-like shapes, warm palette of ochre, terracotta, indigo and cream. Scene: SCENE Vertical book-cover
   > composition, keep the top third calm and uncluttered for a title. Absolutely no text anywhere, no signs, no
   > letters, no writing, no logo, no visible faces.

3. Lancer plusieurs générations à la fois, puis relever chaque résultat avec `openart_creation_get` (ne pas utiliser
   `sleep`). Télécharger l'image (`curl -s -o`), puis la convertir depuis la racine du projet :
   `node -e "require('sharp')('IN.png').resize(600).webp({quality:80}).toFile('public/illustrations/SLUG.webp')"`.
4. **Regarder chaque image** (outil Read). Si elle contient du texte, des lettres, une enseigne ou un visage net et
   reconnaissable, la régénérer une fois avec une scène corrigée.
5. Ajouter le slug à `illustres` dans le fichier du lot.
6. Coût : 20 crédits par image. Ne pas dépasser le nombre d'images indiqué dans la consigne du lot.

## 4. Vérifications avant de rendre la main

`npm run lint`, `npm run typecheck`, `npm test` doivent passer (les tests vérifient slugs uniques, auteurs existants,
champs complets, clés ISBN, thèmes). Corriger ce qui relève de son lot ; signaler le reste.

## 5. Rapport final (en français, court)

Nombre de livres ajoutés par auteur ; titres écartés et pourquoi ; ISBN laissés à null ; images générées
et régénérées ; points incertains.
