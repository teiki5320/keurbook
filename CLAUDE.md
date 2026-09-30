@AGENTS.md

- Site en français : textes UI, commentaires et messages en français.
- Contenus : respecter docs/REDACTION.md (résumés écrits par nous, citations de 2 lignes au plus, jamais d'ISBN, d'ASIN ou de prix inventés).
- Ce que contient chaque page : docs/CONTENU.md. Le design définitif est fait à part (Claude Design) : l'habillage actuel est provisoire.
- Données : passer par src/lib/data/* (données écrites dans src/lib/demo, src/lib/countries.ts et content/conseils ; site statique, sans base).
- Vérifications : `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
