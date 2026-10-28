@AGENTS.md

- Site en français : textes UI, commentaires et messages en français.
- Contenus : respecter docs/REDACTION.md (résumés écrits par nous, citations de 2 lignes au plus, jamais d'ISBN, d'ASIN ou de prix inventés).
- Ce que contient chaque page : docs/CONTENU.md. Le design définitif est fait à part (Claude Design) : l'habillage actuel est provisoire.
- Données : passer par src/lib/data/* (données écrites dans src/lib/demo, src/lib/countries.ts et content/conseils ; site statique, sans base).
- Vérifications : `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, puis `npm run test:sortie` (contrôle du site construit dans `out/` : un seul h1, description, canonique, JSON-LD lisible, titres de 60 caractères au plus, srcset, AdSense, en-têtes). La publication lance les mêmes contrôles avant la mise en ligne.
- Dates du plan du site : rien à lancer à la main. `npm run build` met d'abord à jour `src/lib/lastmod.json` (« prebuild » → `scripts/lastmod.mjs`) : une page changée et pas encore commitée prend la date du jour, sinon le jour du commit qui l'a changée. Après un changement de fiche, d'article Conseils ou de top 10, mets `src/lib/lastmod.json` dans le même commit s'il a changé (sur GitHub, il est de toute façon recalculé à chaque publication).

## Fiches à jour à chaque changement (règle de Jean, 22 octobre 2026)

Le Studio de Jean affiche les fiches de ce dépôt (docs/INFRA.md, docs/MARKETING.md, docs/PUBLICATION.md) et le README. Elles doivent toujours dire la vérité d'aujourd'hui.

- Dès qu'un travail change un fait affiché par ces fiches — version envoyée ou en ligne (App Store, Google Play, site), date de mise en ligne, hébergement ou domaine, service ajouté ou retiré, code Amazon Partenaires, état AdSense ou Pinterest, monétisation, nombre de contenus publiés —, mets à jour **dans le même envoi** toutes les phrases concernées des trois fiches (En bref, Parcours, Boutiques, Vue d'ensemble, Ce qui reste…) et du README.
- Une ancienne valeur ne reste qu'au passé, datée (« la 1.0.4 a été mise en ligne le 15 octobre »).
- Ne recopie jamais de secret ni de clé dans ces fichiers.
- Chaque matin, la tâche « Fiches Mes Apps » du Studio vérifie derrière toi, compare les versions avec ce que servent réellement les boutiques et signale toute phrase fausse.
