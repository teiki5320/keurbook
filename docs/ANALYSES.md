# « Le livre en détail » — consignes de rédaction (octobre 2026)

Pourquoi : Google AdSense a refusé Keurbook le 21/10/2026 pour « contenu à faible valeur informative ». Chaque fiche
n'avait qu'environ 100 mots propres au livre. On ajoute à **chacune des 796 fiches** un texte long, écrit par nous.

## Où écrire

- Un fichier par lot de 50 fiches : `src/lib/demo/analyses/lot-NN.ts`. La liste des fiches du lot est en tête du fichier.
- Un rédacteur ne modifie **que son fichier de lot**. Rien d'autre.
- Les données de la fiche (résumé, « Pourquoi le lire », thèmes, auteur, pays, prix, année) sont dans
  `src/lib/demo/` (livres-*.ts, bd.ts, lots/lot-*.ts), la biographie de l'auteur dans les fichiers auteurs-*.ts et lots.

## Forme

```ts
"slug-du-livre": {
  contexte: "…",  // 90 à 150 mots
  ecriture: "…",  // 90 à 150 mots
  aQui: "…",      // 60 à 120 mots
},
```

Total 250 à 450 mots (vérifié par `npm test`). Texte simple, sans Markdown ni lien.

1. **Le contexte** : où en était l'auteur quand il a écrit le livre, l'époque et le pays (faits historiques connus),
   la place du livre dans son œuvre, l'accueil (prix vérifiés seulement).
2. **Les thèmes et l'écriture** : ce dont parle vraiment le livre au-delà de l'intrigue, sa forme (roman à plusieurs
   voix, lettre, recueil, conte, dessin…), son ton, ce qui le distingue. Pas de spoiler : jamais la fin.
3. **À qui le conseiller** : quel lecteur, à partir de quel âge pour la jeunesse, et quels autres livres **du site**
   lire avant ou après (titres cités en toutes lettres, présents sur Keurbook).

## Règles (en plus de docs/REDACTION.md)

- **Rien d'inventé.** Seulement ce qui est vérifié : données de la fiche, biographie de l'auteur, faits historiques
  sûrs, informations publiques fiables (éditeur, presse, Wikipédia). Aucun détail d'intrigue, personnage, scène ou
  citation qu'on ne connaît pas avec certitude.
- **Livre peu connu** : ne pas broder sur l'intrigue. Écrire plutôt sur l'auteur, le pays, l'époque, le genre, les
  thèmes de la fiche et les livres voisins du site. C'est vrai et utile au lecteur.
- **Écrit par nous** : jamais recopié ni paraphrasé de près d'une quatrième de couverture ou de Wikipédia.
- **Chaque texte est propre à son livre** : pas de phrase passe-partout répétée d'une fiche à l'autre, pas de
  redite du résumé ni du « Pourquoi le lire » de la fiche.
- Pas de vocabulaire de vente (acheter, prix, promo…), pas de note ni d'avis d'acheteurs.
- Ton clair et chaleureux, pour un lecteur curieux qui ne connaît pas forcément la littérature africaine.
