# Keurbook — règles de rédaction des contenus

À lire avant d'écrire une fiche livre, BD, auteur, pays ou un article Conseils. Voir aussi `docs/CONTENU.md` (ce que contient chaque page) et `src/lib/types.ts` (champs exacts).

## Règles générales

1. Tout est en **français**, ton clair et chaleureux, sans jargon universitaire. On s'adresse à un lecteur curieux qui ne connaît pas forcément la littérature africaine.
2. **Exactitude** : titres, années, éditeurs, prix littéraires doivent être vrais. En cas de doute, vérifier sur le web (site de l'éditeur, Wikipédia, BnF, Google Books). Si on ne peut pas vérifier une information facultative, mettre `null` (ou ne pas citer le prix) plutôt qu'inventer.
3. **Jamais inventés** : ISBN, nombre de pages, ASIN, prix. Les illustrations de couverture Keurbook (public/illustrations/, liste dans src/lib/demo/illustrations.ts) : style « collage wax », aucun texte ni visage, aucune personne réelle reconnaissable ; scènes dans docs/essais/scenes.json. `amazonAsin`, `priceCents` et `cover` restent à `null` (remplis plus tard à la main). `isbn` et `pages` seulement s'ils sont vérifiés pour une édition en vente (de préférence en poche), sinon `null`.
4. **Écrit par nous** : résumés et biographies originaux, jamais recopiés ni paraphrasés de près d'une quatrième de couverture, de Wikipédia ou d'un autre site.
5. **Citations** : 2 lignes au maximum (moins de 200 caractères), exactes. En cas de doute sur l'exactitude d'une citation, `quote: null`.
6. **Pas de spoiler** : le résumé présente le point de départ et les enjeux, jamais la fin.
7. Périmètre : auteurs d'Afrique subsaharienne (liste ONU, Mauritanie incluse, Soudan exclu) et de leur diaspora ; livres écrits en français ou traduits en français (traducteur indiqué, rôle `traducteur`, `authorSlug: null`).

## Fiche livre / BD (`Book`)

- `summary` : 3 à 5 phrases.
- `whyRead` : 2 ou 3 raisons, une phrase courte chacune (moins de 120 caractères).
- `themes` : 2 à 4 clés de `src/lib/themes.ts`.
- `year` : première parution (en langue originale pour une traduction).
- `publisher` : éditeur de l'édition en vente conseillée (poche de préférence : Pocket, Points, Folio, J'ai lu, Babel, Le Livre de Poche, Présence Africaine…).
- `awards` : seulement les prix vérifiés.
- `addedAt` : `2026-09-28`. `featured` : `false` (sauf indication). `isPublished` : `true`.
- BD : `genre: "bd"`, `format: "album"` en général, rôles `scenariste` et `dessinateur` ; un coauteur non africain a `authorSlug: null`.

## Fiche auteur (`Author`)

- `bio` : 4 à 6 phrases (parcours, œuvre, place dans la littérature).
- `origin` : seulement pour la diaspora (« Née à Paris, d'origine sénégalaise »), sinon `null`.
- `photo` et `photoCredit` : `null` (ajoutés plus tard, photos libres de droits uniquement).
- `startWith` : le slug du livre du site à lire en premier.
- `otherTitles` : 2 à 5 autres titres vérifiés, au format « Titre (année) ».

## Articles Conseils (`content/conseils/<slug>.md`)

En-tête entre deux lignes `---`, une clé par ligne, listes séparées par des virgules :

```
---
title: Par quel livre commencer pour découvrir la littérature africaine ?
description: (70 à 170 caractères, pour Google)
date: 2026-09-28
theme: decouvrir
resume: (réponse courte, 2 ou 3 phrases)
livres: une-si-longue-lettre, l-enfant-noir, verre-casse
---
Corps en Markdown, parties en « ## ». Liens internes : /livre/<slug>, /bd/<slug>, /auteur/<slug>, /pays/<slug>, /conseils/<slug>.
```

- `title` : la question, terminée par « ? ».
- `date` : un **lundi** (AAAA-MM-JJ) ; l'article paraît ce jour-là.
- `theme` : `decouvrir`, `pays`, `age`, `auteurs` ou `actualite`.
- `livres` : slugs des livres et BD cités (affichés en cartes avec bouton Amazon en bas de l'article).
- Corps : 500 à 900 mots, qui répond vraiment à la question ; chaque livre cité renvoie à sa fiche.
