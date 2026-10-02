# Compléments (octobre 2026) — consignes communes

Plusieurs agents travaillent en parallèle. Chacun **ne modifie que son fichier** `src/lib/demo/extras/groupe-N.ts`.
Aucun autre fichier, aucune image, pas de commit. Les livres d'un auteur : tous les fichiers de `src/lib/demo/`
(livres-*.ts, bd.ts, lots/lot-*.ts), via `contributors[].authorSlug`.

## 1. « Le saviez-vous ? » (`facts`, par slug d'auteur)

- 2 à 4 anecdotes par auteur, une phrase chacune (moins de 220 caractères), en français, ton clair et chaleureux.
- **Vérifiées** (Wikipédia, BnF, éditeur, presse sérieuse), surprenantes ou parlantes : un métier inattendu, une
  rencontre, un geste, une origine de titre, un record, un prix refusé… **Pas** de redite de la biographie de la fiche
  (`bio`) ni de la liste des prix.
- Rien sur la vie privée qui ne soit public et utile (pas de santé, pas de rumeurs). Rien d'invérifiable.
- Auteurs très peu documentés : 1 ou 2 faits seulement, ou aucun. Mieux vaut rien qu'une approximation.

## 2. Citations (`quotes`, par slug de livre)

- Une citation **exacte, mot pour mot**, de moins de 200 caractères (2 lignes), tirée du livre lui-même.
- Seulement si on la trouve **à l'identique dans une source fiable** (Wikiquote en français, extrait publié par
  l'éditeur, article de presse qui cite le livre entre guillemets). Pour une traduction, la citation doit venir de la
  traduction française publiée.
- `source` : précision facultative (« incipit », « chapitre 3 », nom du personnage…), sinon `null`.
- Dans le doute sur un seul mot : pas de citation. On vise les livres les plus connus ; pas d'objectif de nombre.

## 3. Adaptations (`adaptations`, par slug de livre)

- Seulement les adaptations **vérifiées** : film, série, téléfilm, théâtre (mise en scène notable), BD, opéra, animation.
- `{ kind, title, year, by }` (`by` : réalisateur, metteur en scène ou dessinateur, sinon `null`).
- **Ne pas répéter** une adaptation déjà présente dans la fiche du livre (`adaptations` dans les fichiers de livres).
- Si l'adaptation BD a sa propre fiche sur le site, la mentionner quand même (c'est une information pour le lecteur).

## 4. Format

```ts
export const facts: Record<string, string[]> = {
  "slug-auteur": ["Phrase 1.", "Phrase 2."],
};
export const quotes: Record<string, Quote> = {
  "slug-livre": { text: "…", source: null },
};
export const adaptations: Record<string, Adaptation[]> = {
  "slug-livre": [{ kind: "film", title: "…", year: 1975, by: "…" }],
};
```

Les clés doivent exister (slug d'auteur ou de livre du site). Typographie française : apostrophe ’ ou ', guillemets
« », espaces fines non obligatoires.

## Confidentialité

Jamais d'adresse e-mail ni d'information personnelle dans une requête (User-Agent : « KeurbookBot/1.0 (https://keurbook.com) »).

## 5. Vérifications et rapport

`npm run lint`, `npm run typecheck`, `npm test` doivent passer. Rapport court en français : nombre de faits,
citations et adaptations ; auteurs sans fait ; points incertains.
