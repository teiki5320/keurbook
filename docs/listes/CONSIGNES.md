# Listes à valider (recherche seulement)

Chaque agent écrit **uniquement** `docs/listes/lot-XX.md` : aucune fiche, aucune image, aucun autre fichier.

Format (exactement) :

```
# Lot XX — <intitulé>

## <Nom de l'auteur> (<slug>)

Déjà sur le site : <titres déjà présents dans src/lib/demo/, séparés par « ; »>

| N° | Titre | Année | Genre | Langue d'origine | Éditeur de l'édition en vente | Disponibilité |
|---|---|---|---|---|---|---|
| XX.1 | Les Soleils des indépendances | 1968 | roman | français | Points | en vente (poche) |
```

- N° : numéro du lot, point, numéro continu sur tout le lot (01.1, 01.2… jusqu'à la fin du lot, sans repartir à 1 par auteur).
- Genre : roman, nouvelles, poésie, théâtre, essai, récit, contes, jeunesse, BD.
- Langue d'origine : « français », ou la langue traduite (le livre doit exister **en français**).
- Disponibilité : « en vente (poche) », « en vente (grand format) », « épuisé (occasion) », ou « à vérifier ».
- Tous les livres publiés en français de chaque auteur, quel que soit le genre. Exclus : collectifs dirigés par d'autres,
  préfaces, articles, thèses, livres non traduits en français. Ne pas reprendre ceux déjà sur le site.
- Vérifier sur le web (BnF : https://catalogue.bnf.fr, éditeurs, Wikipédia). Ne rien inventer : dans le doute sur
  l'existence d'une édition française, ne pas lister le titre (le mentionner en note en fin d'auteur).
- Terminer le fichier par une ligne « Total : N titres ».
