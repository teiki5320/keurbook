# Journal du référencement

Tenu par la routine « Référencement du jour » (Keurbook : le lundi et le samedi). Une page travaillée n'est pas retouchée avant 28 jours : Google a besoin de ce temps pour réagir.

## 17/10/2026

### Pages améliorées (montrées par Google en 2e page, chiffres du 17/09 au 15/10)

Les titres des fiches livre sont déjà construits sur « Titre, Auteur | Keurbook » et le titre principal (h1) est le titre du livre : ils contiennent déjà la recherche principale, ils ne changent pas. Ce qui change : une description Google écrite à la main (champ `metaDescription` de la fiche) et des liens depuis les articles Conseils.

| Page | Recherches visées | Place | Vues | Titre (inchangé) | Liens ajoutés |
|---|---|---|---|---|---|
| /livre/les-gardiens-du-temple | « les gardiens du temple », « … cheikh hamidou kane », « … résumé » | 8,2 | 88 | Les Gardiens du temple, Cheikh Hamidou Kane \| Keurbook | /conseils/histoire-du-senegal, /conseils/classiques-litterature-africaine |
| /livre/crepuscule-des-temps-anciens | « crépuscule des temps anciens » | 11,4 | 84 | Crépuscule des temps anciens, Nazi Boni \| Keurbook | /conseils/classiques-litterature-africaine (nouveau paragraphe, et carte en bas d'article) |
| /livre/soundjata-ou-l-epopee-mandingue | « soundjata ou l'épopée mandingue », « soundjata keita… », « soundiata… » | 12,5 | 81 | Soundjata ou l'Épopée mandingue, Djibril Tamsir Niane | déjà 6 articles qui y mènent : description seulement (ajoute « Soundiata » et « Keïta ») |
| /livre/climbie | « climbié », « climbie » | 11,1 | 56 | Climbié, Bernard Dadié \| Keurbook | déjà 4 articles qui y mènent : description seulement |
| /livre/et-dieu-seul-sait-comment-je-dors | « et dieu seul sait comment je dors » | 19,7 | 56 | Et Dieu seul sait comment je dors, Alain Mabanckou | /conseils/alain-mabanckou, /conseils/romans-africains-exil-immigration |

Pour tout le site : descriptions coupées à 155 caractères au lieu de 160.

### Fiches enrichies vérifiées le 17/10/2026

Vérifié dans les pages construites (JSON valide) : Book sur les fiches livre et BD (nom, auteurs, langue, ISBN s'il est connu), Person sur les pages auteur, Article sur les Conseils, BreadcrumbList partout, WebSite et Organization sur l'accueil, ItemList sur les listes. Pas de FAQ visible, donc pas de FAQPage. Rien à corriger.

### Pages oubliées par Google (Search Console au 16/10)

959 pages dans le plan du site, 650 indexées. 211 pages « inconnues » de Google et 98 « trouvées, pas encore visitées » : surtout des BD (107), des pages auteur (les 92), des livres (75), les pays (23) et même les pages de liste /bd, /auteurs, /pays, /conseils.

Causes cherchées : aucune erreur trouvée. Ces pages répondent bien (code 200), ont la bonne adresse canonique, sont dans le plan du site, ne sont pas bloquées, et sont reliées depuis le menu, l'accueil et les fiches (la page /bd mène aux 121 BD, /auteurs aux 92 auteurs, /livres aux 675 livres). Le site a moins de 3 semaines : Google n'est simplement pas encore passé. Rien à corriger dans le code.

Reste à faire (Jean) : dans la Search Console, « Demander l'indexation » des 4 pages de liste (/bd, /auteurs, /pays, /conseils) et de /auteur/fatou-diome (la recherche « fatou diome », 52 vues, ne montre que ses livres). À revoir au prochain samedi.

### Socle vérifié le 17/10/2026

- IndexNow : clé publique `/86e162766f5615ec8020869f4b66761d.txt` et script `scripts/indexnow.mjs` déjà en place.
- Google Discover : ajout de `max-image-preview:large` sur toutes les pages (gabarit commun). Image de partage 1200 × 630 déjà présente par défaut.
- Vitesse sur téléphone : l'outil PageSpeed de Google a refusé (quota du jour épuisé). À refaire au prochain passage.

### Page nouvelle

Aucune : les recherches fréquentes (15 vues ou plus) ont toutes déjà leur page sur le site (fiche livre ou page auteur). Celles qui sont loin (« terre ceinte » 44e, « encre sueur salive et sang » 41e, « marianne porte plainte » 39e, « trop de soleil tue l'amour » 35e…) sont des fiches livre récentes : à revoir dans 4 semaines.
