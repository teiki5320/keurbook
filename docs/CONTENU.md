# Keurbook — définition du contenu

Document de référence (contenu et structure). Le design sera fait séparément (Claude Design).

## Cadrage

1. Site qui rend hommage aux écrivains d'**Afrique subsaharienne** et fait découvrir leurs livres (liste ONU : Mauritanie incluse, Soudan exclu).
2. Auteurs nés dans ces pays **et** auteurs de la diaspora qui en sont originaires.
3. Livres **francophones** uniquement.
4. Revenus : **Amazon Partenaires** uniquement (le site ne vend rien lui-même).
5. Base technique : celle de Keur Cook (site statique Next.js, contenu dans le code, Cloudflare Pages).

## Architecture (centrée sur les auteurs, depuis le 1er octobre 2026)

Le site est une **ode aux écrivains** : les auteurs sont mis en avant, leurs livres se découvrent depuis leur fiche.

1. **Accueil** — `/` : mosaïque de portraits et dédicace, puis la **galerie des auteurs par grandes époques** (les pionniers, nés avant 1930 ; la génération des indépendances, 1930–1959 ; les voix d'aujourd'hui, depuis 1960). Les auteurs de BD sont dans la même galerie, avec la mention « BD ». Puis les pays et les derniers conseils.
2. **Fiche auteur** — `/auteur/[nom]` : la page principale ; portrait, vie, prix, « par où commencer », puis tous ses livres.
3. **Fiche livre** — `/livre/[titre]`, et **fiche BD** — `/bd/[titre]` : inchangées ; fil d'Ariane « Accueil › Auteur › Livre ».
4. **Auteurs de A à Z** — `/auteurs` (index, recherche, filtre pays).
5. **Pays** — `/pays` et `/pays/[pays]` : les auteurs du pays d'abord, puis les livres conseillés, les livres et les BD.
6. **Conseils** — `/conseils` et `/conseils/[article]` : un article chaque lundi, qui répond à une question que les gens se posent.
7. **Listes secondaires** — `/livres` et `/bd` (recherche et filtres), accessibles depuis l'accueil et le pied de page, plus depuis le menu.
8. **Ma pile à lire** — `/pile-a-lire` (stockée dans le navigateur, sans compte).
9. **Pages légales** — mentions légales, confidentialité, conditions (avec la mention Amazon Partenaires).

Menu principal : Auteurs · Pays · Conseils · Ma pile à lire. Les fiches livre, auteur et pays sont liées entre elles.

## Fiche livre (`/livre/[titre]`)

Du haut vers le bas :

1. Couverture
2. Titre et auteur (lien vers la fiche auteur)
3. Pays de l'auteur (lien vers la fiche pays)
4. Genre : roman, nouvelles, poésie, théâtre, essai, récit, jeunesse
5. Bouton « Acheter sur Amazon · prix »
6. Résumé (3 à 5 phrases, sans dévoiler la fin)
7. « Pourquoi le lire » : 2 ou 3 raisons courtes
8. Citation courte (2 lignes maximum)
9. Fiche technique : éditeur, année, nombre de pages, ISBN, format (poche ou grand format)
10. Prix littéraires reçus
11. Thèmes (chaque thème mène à une liste de livres)
12. Public : adulte, ado ou jeunesse
13. Bouton « Ajouter à ma pile à lire »
14. « Du même auteur »
15. « Vous aimerez aussi » (même pays ou même thème)
16. Conseils liés (articles qui parlent du livre)

## Fiche BD (`/bd/[titre]`)

Même contenu que la fiche livre, avec deux différences :

1. Scénariste et dessinateur distingués (chacun avec sa fiche auteur).
2. Deux ou trois planches, si l'éditeur l'autorise.

## Fiche auteur (`/auteur/[nom]`)

1. Photo (seulement si elle est libre de droits, par exemple sur Wikimedia Commons avec crédit ; sinon, initiales)
2. Nom, années (naissance, et décès le cas échéant)
3. Pays d'origine (lien vers la fiche pays) ; pour la diaspora : « né à Paris, d'origine camerounaise »
4. Biographie (4 à 6 phrases)
5. « Par où commencer » : un livre conseillé, avec bouton Amazon
6. Ses livres présents sur le site (cartes)
7. Ses autres titres (liste simple, sans fiche)
8. Prix littéraires reçus
9. Thèmes récurrents (liens vers les listes par thème)
10. « Auteurs proches » (même pays ou mêmes thèmes)
11. Conseils liés

## Fiche pays (`/pays/[pays]`)

Une page n'existe que si le pays a au moins un livre sur le site (comme Keur Cook).

1. Nom du pays et position sur la carte
2. Présentation de sa littérature (3 à 5 phrases : grandes figures, langues, périodes)
3. « Par où commencer » : 3 livres conseillés
4. Auteurs du pays
5. Livres du pays
6. BD du pays
7. Conseils liés

## Pages de liste

1. **Livres** (`/livres`)
   1. Recherche par titre, auteur ou thème
   2. Filtres : pays, genre, public, thème, époque (avant 1960 · 1960–1999 · depuis 2000)
   3. Tri : nouveautés (par défaut), titre, année
2. **BD** (`/bd`) : recherche, filtres pays et public, tri nouveautés
3. **Auteurs** (`/auteurs`) : ordre alphabétique, filtre pays, recherche par nom
4. **Pays** (`/pays`) : carte de l'Afrique subsaharienne (un point par pays qui a du contenu) et liste avec le nombre de livres
5. **Thème** (`/livres?theme=…`) : pas de page à part, c'est un filtre de la liste Livres

## Accueil (`/`)

1. Accroche : une phrase qui dit ce qu'est le site (« Les livres des auteurs d'Afrique subsaharienne, en français »)
2. Carte des pays (on clique sur un pays pour aller à sa fiche)
3. « À la une » : 3 à 5 livres choisis
4. Nouveautés : les dernières parutions ajoutées
5. Un carrousel par genre (romans, poésie, essais, jeunesse…)
6. BD : un carrousel
7. « Auteur à découvrir » : un auteur mis en avant, qui change régulièrement
8. Derniers conseils : les 3 derniers articles

Pas de newsletter au lancement (comme Keur Cook).

## Conseils (`/conseils`)

1. **Principe** : chaque article répond à une question que les gens tapent sur Google, et renvoie vers des fiches livres.
2. **Rythme** : un article chaque lundi (publication programmée, comme Keur Cook).
3. **Catégories** : Découvrir · Par pays · Par âge · Auteurs · Prix et actualité.
4. **Structure d'un article** :
   1. Titre sous forme de question
   2. Réponse courte en 2 ou 3 phrases, tout en haut
   3. Développement
   4. Livres cités, en cartes avec bouton Amazon
   5. Date de publication
   6. Articles liés
5. **Dix premiers sujets** :
   1. Par quel livre commencer pour découvrir la littérature africaine ?
   2. Quels romans africains lire au lycée ?
   3. Qui est Mohamed Mbougar Sarr ?
   4. Quelles BD africaines offrir à un enfant ?
   5. Quels livres lire pour comprendre l'histoire du Sénégal ?
   6. Qu'est-ce que la négritude ?
   7. Quels auteurs africains ont reçu le prix Goncourt ou le Renaudot ?
   8. Quels livres africains lire en vacances ?
   9. Qui sont les grandes autrices africaines d'aujourd'hui ?
   10. Quels livres jeunesse africains pour les 6–10 ans ?

## Ma pile à lire (`/pile-a-lire`)

1. Liste des livres et BD ajoutés (stockée dans le navigateur, sans compte)
2. Bouton Amazon sur chaque livre
3. Retirer un livre
4. « Partager ma liste » : lien qui contient les titres (WhatsApp, copie du lien)

## Pages légales

1. Mentions légales, confidentialité, conditions d'utilisation (reprises de Keur Cook)
2. Mention obligatoire Amazon, dans le pied de page et les conditions : « En tant que Partenaire Amazon, Keurbook réalise un bénéfice sur les achats remplissant les conditions requises. »

## Contenu au lancement

1. 60 livres et 10 BD, des classiques (Senghor, Hampâté Bâ, Kourouma…) aux contemporains
2. Environ 40 auteurs
3. Les pays qui ont au moins un livre
4. 8 conseils publiés au lancement, puis un chaque lundi
5. Pas d'autoédition au lancement (seulement des livres publiés chez un éditeur)
6. Rédaction : Claude rédige, le propriétaire relit

## Règles éditoriales

1. Résumés et biographies **écrits par nous** : jamais recopiés d'une quatrième de couverture ou d'un autre site.
2. Citations : 2 lignes au maximum, avec la source (droit de citation).
3. Couvertures : les vraies couvertures uniquement par les outils officiels Amazon Partenaires ou fournies par les éditeurs, jamais copiées d'un autre site. En attendant, chaque livre a une **couverture illustrée Keurbook** (illustration « collage wax » générée avec OpenArt à partir de notre résumé, titre et auteur posés par le site, signature « Keurbook ») ; la fiche précise : « Couverture illustrée par Keurbook. L'édition vendue sur Amazon a sa propre couverture. »
4. Photos d'auteurs : uniquement libres de droits, avec crédit.
5. Prix Amazon indicatifs, avec la date du relevé : le prix affiché par Amazon fait foi.
6. Livres francophones : écrits en français ou traduits en français (on indique le traducteur).

## Données (pour le développement)

1. **Livre** : titre, slug, type (livre ou BD), auteurs (avec rôle : auteur, scénariste, dessinateur, traducteur), genre, public, thèmes, résumé, raisons de le lire, citation, éditeur, année, pages, ISBN, format, prix littéraires, ASIN Amazon (= ISBN-10 pour un livre papier), prix indicatif, à la une (oui/non), date d'ajout.
2. **Auteur** : nom, slug, années, pays d'origine, lieu de naissance, biographie, photo et crédit, livre conseillé, autres titres, prix.
3. **Pays** : code, nom, « de … » (« du Sénégal »), présentation, position sur la carte.
4. **Conseil** : fichier Markdown (titre, date, catégorie, réponse courte, livres cités).
5. **SEO** : données structurées Google `Book`, `Person` et `Article`, sitemap, image de partage par page.
