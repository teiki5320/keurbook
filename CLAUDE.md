@AGENTS.md

- Site en français : textes UI, commentaires et messages en français.
- Contenus : respecter docs/REDACTION.md (résumés écrits par nous, citations de 2 lignes au plus, jamais d'ISBN, d'ASIN ou de prix inventés).
- Ce que contient chaque page : docs/CONTENU.md. Le design définitif est fait à part (Claude Design) : l'habillage actuel est provisoire.
- Données : passer par src/lib/data/* (données écrites dans src/lib/demo, src/lib/countries.ts et content/conseils ; site statique, sans base).
- Vérifications : `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
- Dates du plan du site : après tout changement d'une fiche livre, BD ou auteur, d'un article Conseils ou d'un top 10, lance `npx tsx scripts/lastmod.mjs` et mets `src/lib/lastmod.json` dans le même commit (les pages changées prennent la date du jour).

## Fiches à jour à chaque changement (règle de Jean, 22 octobre 2026)

Le Studio de Jean affiche les fiches de ce dépôt (docs/INFRA.md, docs/MARKETING.md, docs/PUBLICATION.md) et le README. Elles doivent toujours dire la vérité d'aujourd'hui.

- Dès qu'un travail change un fait affiché par ces fiches — version envoyée ou en ligne (App Store, Google Play, site), date de mise en ligne, hébergement ou domaine, service ajouté ou retiré, code Amazon Partenaires, état AdSense ou Pinterest, monétisation, nombre de contenus publiés —, mets à jour **dans le même envoi** toutes les phrases concernées des trois fiches (En bref, Parcours, Boutiques, Vue d'ensemble, Ce qui reste…) et du README.
- Une ancienne valeur ne reste qu'au passé, datée (« la 1.0.4 a été mise en ligne le 15 octobre »).
- Ne recopie jamais de secret ni de clé dans ces fichiers.
- Chaque matin, la tâche « Fiches Mes Apps » du Studio vérifie derrière toi, compare les versions avec ce que servent réellement les boutiques et signale toute phrase fausse.
