# Améliorations techniques de Keurbook

keurbook.com · Next.js 16 (export statique, React 19, Tailwind CSS 4) · hébergé sur Cloudflare Pages · mis en ligne par GitHub Actions (`wrangler pages deploy`) · liste faite le 28 octobre 2026.

## Par où commencer

1. **Retirer le script e-mail de Cloudflare (point 15).** Si l'adresse e-mail du site est écrite dans la page, Cloudflare ajoute un script `email-decode` qui bloque l'affichage. C'est presque gratuit à corriger et le gain se voit sur toutes les pages (environ 1 s de moins sur téléphone, mesuré ici).
2. **Garder les pages HTML en cache chez Cloudflare (point 2).** Sans règle, chaque visite redemande la page au serveur : sur Keurbook, la réponse prenait de 0,6 à 2,8 s, contre 0,2 s depuis la règle. Le réglage prend 5 minutes dans le tableau de bord, sans toucher au code.
3. **Mettre la vraie date de chaque page dans le sitemap (point 7).** Si toutes les pages portent la même date, Google ne sait pas lesquelles ont changé. C'est utile à tout site qui a beaucoup de pages et peu de pages indexées.

## A. Mise en ligne

1. **Publication automatique vérifiée avant l'envoi**
   - Ce qui est fait : à chaque envoi sur `main`, GitHub Actions lance le lint, la vérification des types, les tests et la construction, puis publie le dossier `out/` sur Cloudflare Pages. Rien n'est publié si une étape échoue. Les clés Cloudflare ne sont données qu'à l'étape de publication.
   - À quoi ça sert : une erreur de code ou de contenu ne peut pas arriver en ligne.
   - Comment savoir si un autre site en a besoin : ouvrir son fichier de publication dans `.github/workflows/` et voir s'il lance les tests avant de publier.
   - Où regarder : `.github/workflows/deploy.yml`, `package.json` (scripts `lint`, `typecheck`, `test`, `build`).
   - État : fait et vérifié.

2. **Pages HTML gardées 10 minutes en cache chez Cloudflare**
   - Ce qui est fait : une règle de cache Cloudflare (« Pages HTML en cache 10 min ») garde les pages sans point dans l'adresse pendant 10 minutes. Les erreurs et redirections (codes 300 et plus) ne sont jamais gardées. 10 minutes a été tapé à la main : le menu de l'offre gratuite commence à 2 heures.
   - À quoi ça sert : réponse du serveur en 0,2 s au lieu de 0,6 à 2,8 s. Une page republiée apparaît en 10 minutes au plus.
   - Comment savoir si un autre site en a besoin : `curl -sI https://<site>/ | grep -i cf-cache-status`. Si la réponse est « DYNAMIC » deux fois de suite, la page n'est pas gardée.
   - Où regarder : `docs/INFRA.md` (section Hébergement). Le réglage est dans le tableau de bord Cloudflare (Caching → Cache Rules), pas dans le code.
   - État : fait et vérifié (HIT au 2e passage, page à jour moins de 10 minutes après une mise en ligne).

3. **Publications programmées sans intervention**
   - Ce qui est fait : le site se reconstruit seul chaque lundi, mercredi et vendredi vers 0 h 15, ce qui publie les articles datés du jour. Il se reconstruit aussi 2 fois par jour après la veille actus. Une étape réactive la tâche, car GitHub coupe les tâches programmées après 60 jours sans activité.
   - À quoi ça sert : des articles écrits à l'avance paraissent à leur date, sans oubli.
   - Comment savoir si un autre site en a besoin : le site publie-t-il des contenus datés à l'avance ? Si oui, son fichier de publication contient-il un `schedule` et l'étape « Garder la publication programmée active » ?
   - Où regarder : `.github/workflows/deploy.yml` (blocs `schedule` et dernière étape), `tests/conseils.test.ts` (« un article daté du futur n'est pas publié »).
   - État : fait et vérifié.

4. **Bouton « Maintenance »**
   - Ce qui est fait : depuis l'onglet Actions de GitHub, un bouton met le site en pause, avec un message, ou le rouvre. Pendant la pause, les pages sont en `noindex`.
   - À quoi ça sert : couper le site proprement en cas de problème, sans toucher au code.
   - Comment savoir si un autre site en a besoin : chercher un fichier `maintenance.yml` dans `.github/workflows/`.
   - Où regarder : `.github/workflows/maintenance.yml`, `content/maintenance.json`, `src/components/layout/MaintenanceScreen.tsx`, `src/app/(site)/layout.tsx`.
   - État : fait, non vérifié (pas déclenché pendant cette relecture).

5. **Redirections et adresses techniques fermées à Google**
   - Ce qui est fait : redirections permanentes (301) des anciennes adresses (`/cgv`, `/livre`, `/auteur`, `/favicon.ico`). Les adresses `*.pages.dev` de Cloudflare reçoivent `X-Robots-Tag: noindex`.
   - À quoi ça sert : pas de page en double dans Google, pas de lien cassé.
   - Comment savoir si un autre site en a besoin : `curl -sI https://<projet>.pages.dev/ | grep -i x-robots-tag` doit répondre `noindex`.
   - Où regarder : `public/_redirects`, `public/_headers` (fin du fichier).
   - État : fait et vérifié.

## B. Google et référencement

6. **Titre, description, adresse canonique et aperçu de partage sur chaque page**
   - Ce qui est fait : une seule fonction fabrique les métadonnées de chaque page. Le titre est raccourci au-delà d'environ 60 caractères, la description est coupée vers 155, l'adresse canonique est donnée, et `max-image-preview:large` est indiqué pour Google Discover.
   - À quoi ça sert : des résultats Google propres et pas de page vue en double.
   - Comment savoir si un autre site en a besoin : sur 3 pages, `curl -s <page> | grep -o '<link rel="canonical"[^>]*>'` et vérifier que chaque page a un titre différent.
   - Où regarder : `src/lib/metadata.ts`, `src/app/layout.tsx`.
   - État : fait et vérifié (983 pages contrôlées le 28 octobre 2026 : aucune sans titre, description ni canonique).

7. **Vraie date de dernière modification dans le sitemap**
   - Ce qui est fait : un registre garde, pour chaque page, une empreinte de son contenu et la date du jour où elle a changé. Il est reconstruit depuis l'historique git. Une page absente du registre prend la date de son dernier commit.
   - À quoi ça sert : Google voit quelles pages ont vraiment changé. Avant, 835 pages portaient toutes la même date.
   - Comment savoir si un autre site en a besoin : `curl -s https://<site>/sitemap.xml | grep -o '<lastmod>[^<]*' | sort | uniq -c | sort -rn | head`. Si presque toutes les pages ont la même date, il en a besoin.
   - Où regarder : `src/lib/lastmod.ts`, `src/lib/lastmod.json`, `scripts/lastmod.mjs` (`--historique` pour tout reconstruire), `src/app/sitemap.ts`, `tests/lastmod.test.ts`.
   - État : fait et vérifié.

8. **Données structurées (schema.org)**
   - Ce qui est fait : WebSite et Organization sur l'accueil, Book sur les fiches, Person (avec le pays) sur les auteurs, Article sur les conseils, NewsArticle sur les actus, BreadcrumbList (fil d'Ariane) et ItemList (listes). Le caractère « < » est neutralisé dans le JSON.
   - À quoi ça sert : des résultats enrichis possibles dans Google.
   - Comment savoir si un autre site en a besoin : `curl -s <page> | grep -c 'application/ld+json'`, puis passer la page dans le test des résultats enrichis de Google.
   - Où regarder : `src/lib/json-ld.ts`, `src/app/(site)/page.tsx`, `src/app/(site)/auteur/[slug]/page.tsx`, `src/app/(site)/conseils/[slug]/page.tsx`, `src/app/(site)/actus/[slug]/page.tsx`.
   - État : fait, non vérifié (pas repassé dans l'outil de test de Google pendant cette relecture).

9. **IndexNow pour Bing et les autres moteurs**
   - Ce qui est fait : chaque lundi et à la demande, un script lit le sitemap publié et signale toutes ses pages en une seule requête. La clé IndexNow est publique par conception : elle est publiée dans un fichier .txt à la racine du site.
   - À quoi ça sert : Bing découvre les pages sans attendre son passage.
   - Comment savoir si un autre site en a besoin : chercher `scripts/indexnow.mjs` et `.github/workflows/indexnow.yml`. Dans Bing Webmaster Tools, la rubrique IndexNow montre les pages reçues.
   - Où regarder : `scripts/indexnow.mjs`, `.github/workflows/indexnow.yml`, le fichier .txt de clé dans `public/`.
   - État : fait et vérifié (982 pages reçues par Bing le 28 octobre 2026, réponse 200).

10. **Grandes listes lisibles par Google sans tout charger**
    - Ce qui est fait : /livres et /bd affichent 48 livres puis un bouton « Afficher plus ». La liste complète de A à Z reste dans la page en liens texte, dans un bloc repliable. Les filtres se recopient dans l'adresse (`?pays=`, `?genre=`…) pour partager une recherche.
    - À quoi ça sert : /livres passe de 4,3 Mo à 1,3 Mo, et Google voit quand même un lien vers chaque fiche.
    - Comment savoir si un autre site en a besoin : une page de liste pèse plus de 1 Mo, ou affiche des centaines d'images d'un coup.
    - Où regarder : `src/components/browse/BooksBrowser.tsx`, `src/components/browse/AllTitles.tsx`, `src/lib/config.ts` (`PAGE_SIZE`).
    - État : fait et vérifié.

11. **Pages sans intérêt pour Google mises en noindex**
    - Ce qui est fait : la page 404, la « pile à lire » (propre à chaque visiteur) et la page de secours des actus sont en `noindex` et absentes du sitemap.
    - À quoi ça sert : Google ne gaspille pas son temps sur des pages vides ou personnelles.
    - Comment savoir si un autre site en a besoin : `curl -s https://<site>/page-inexistante | grep -i noindex`.
    - Où regarder : `src/app/not-found.tsx`, `src/app/(site)/pile-a-lire/page.tsx`, `src/app/(site)/actus/article/page.tsx`.
    - État : fait et vérifié.

12. **Actus écrites dans la page au moment de la construction**
    - Ce qui est fait : les actus sont lues sur la veille pendant la construction et écrites dans le HTML, puis remplacées dans le navigateur par la version du jour. Chaque actu a sa propre page `/actus/<adresse>`, jamais supprimée. Si la veille ne répond pas, la construction continue avec 0 article.
    - À quoi ça sert : Google et les lecteurs sans JavaScript voient les actus ; une page indexée ne disparaît jamais.
    - Comment savoir si un autre site en a besoin : `curl -s https://<site>/actus | grep -c '/actus/'`. Si le résultat est 0 alors que des actus s'affichent dans le navigateur, elles arrivent seulement après coup.
    - Où regarder : `scripts/veille-articles.mjs`, `scripts/veille-entites.mjs`, `src/components/actus/BlocActus.tsx`, `src/components/actus/BlocActusClient.tsx`, `src/lib/veille.ts`, `tests/articles.test.ts`, `tests/veille.test.ts`.
    - État : fait et vérifié.

13. **Âge des actus calculé dans le navigateur**
    - Ce qui est fait : « il y a 3 h » n'est affiché qu'une fois la page montée (`useSyncExternalStore`), jamais écrit pendant la construction.
    - À quoi ça sert : évite une erreur React (#418) qui apparaissait une heure après chaque mise en ligne, et un âge faux.
    - Comment savoir si un autre site en a besoin : ouvrir la console du navigateur sur une page avec une date relative, plus d'une heure après la mise en ligne.
    - Où regarder : `src/components/actus/LienSource.tsx`.
    - État : fait et vérifié.

## C. Vitesse

14. **Styles écrits dans la page**
    - Ce qui est fait : le CSS (environ 12 Ko compressé) est écrit dans le HTML au lieu d'un fichier séparé.
    - À quoi ça sert : un aller-retour réseau de moins avant l'affichage, surtout sur téléphone.
    - Comment savoir si un autre site en a besoin : dans Lighthouse, la ligne « Éliminer les ressources qui bloquent le rendu » cite un fichier `.css`.
    - Où regarder : `next.config.ts` (`experimental.inlineCss`). Option expérimentale de Next.js : à vérifier à chaque mise à jour de Next.
    - État : fait et vérifié.

15. **Plus de script e-mail de Cloudflare**
    - Ce qui est fait : chaque adresse e-mail est entourée de `<!--email_off-->` et `<!--email_on-->`. Cloudflare ne la masque plus et n'ajoute plus son script `email-decode`, qui bloquait l'affichage.
    - À quoi ça sert : environ 1 s de moins avant l'affichage sur téléphone (mesuré avec Lighthouse).
    - Comment savoir si un autre site en a besoin : `curl -s https://<site>/ | grep -c email-decode`. Tout résultat au-dessus de 0 signale le problème.
    - Où regarder : `src/components/layout/EmailLink.tsx` (utilisé dans l'en-tête, le pied de page, l'écran de maintenance et les pages légales).
    - État : fait et vérifié.

16. **Images en plusieurs tailles, choisies par le navigateur**
    - Ce qui est fait : à chaque construction, `sharp` crée des versions réduites en webp : couvertures en 300 et 400 px, portraits en 200 et 400 px, images d'articles en 400 et 800 px. Une version déjà à jour n'est pas refaite. Les pages donnent `srcset` et `sizes`.
    - À quoi ça sert : un téléphone ne télécharge plus une image de 1200 px pour l'afficher en 150 px.
    - Comment savoir si un autre site en a besoin : `curl -s <page> | grep -c srcset` donne 0, ou Lighthouse signale « Dimensionner correctement les images ».
    - Où regarder : `scripts/vignettes.mjs`, `src/lib/images.ts`, `src/components/book/BookCover.tsx`, `src/components/book/AuthorAvatar.tsx`, `src/components/conseils/ConseilCard.tsx`, `tests/lastmod.test.ts` (partie « Vignettes d'images »), `.gitignore`.
    - État : fait et vérifié.

17. **Premières images chargées tout de suite, les autres plus tard**
    - Ce qui est fait : les premières couvertures d'une page sont chargées en priorité (props `priority` et `eager`), les suivantes en chargement différé.
    - À quoi ça sert : la plus grande image visible arrive plus vite (mesure LCP).
    - Comment savoir si un autre site en a besoin : Lighthouse signale l'image principale comme « chargée en différé ».
    - Où regarder : `src/components/book/BookCard.tsx`, `src/components/book/BookCover.tsx`, `src/components/browse/BooksBrowser.tsx`.
    - État : fait et vérifié.

18. **Animation 3D lancée après l'affichage**
    - Ce qui est fait : la carte animée (three.js) ne se charge qu'après la fin du chargement de la page, quand le navigateur est libre (`requestIdleCallback`, sinon au bout de 1,5 s).
    - À quoi ça sert : le texte et les images s'affichent d'abord, sans attendre la grosse bibliothèque 3D.
    - Comment savoir si un autre site en a besoin : un composant lourd (carte, 3D, vidéo) est-il importé directement dans une page ?
    - Où regarder : `src/components/map/IdleParticles.tsx`, `src/components/map/CountryMap.tsx`, `src/components/carousel/CountryCarousel.tsx`.
    - État : fait et vérifié.

19. **Pas de préchargement des très grosses pages**
    - Ce qui est fait : les liens vers /livres, /bd, /auteurs et /pays, et ceux du menu, ont `prefetch={false}`.
    - À quoi ça sert : Next.js ne télécharge plus en avance plus de 100 Ko par page visitée pour des pages que le visiteur n'ouvrira peut-être pas.
    - Comment savoir si un autre site en a besoin : dans l'onglet Réseau du navigateur, des fichiers `.txt` de grosses pages se chargent sans clic.
    - Où regarder : `src/components/layout/Section.tsx` (`isHeavyList`), `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`.
    - État : fait et vérifié.

20. **Cache long pour les fichiers qui ne changent pas**
    - Ce qui est fait : fichiers de build mis en cache un an (`immutable`), images mises en cache une semaine.
    - À quoi ça sert : une deuxième visite ne retélécharge presque rien.
    - Comment savoir si un autre site en a besoin : `curl -sI https://<site>/_next/static/<un fichier>.js | grep -i cache-control`.
    - Où regarder : `public/_headers`.
    - État : fait et vérifié.

## D. Accessibilité

21. **Base d'accessibilité contrôlée par Lighthouse**
    - Ce qui est fait : lien « Aller au contenu », un seul titre principal (h1) par page, titres dans l'ordre (h2 caché pour les grilles), boutons et lettres d'au moins 24 px de côté, animation d'apparition sans fondu (le texte à demi transparent faisait échouer le contraste).
    - À quoi ça sert : site utilisable au clavier et au lecteur d'écran ; note d'accessibilité Lighthouse à 100 sur 8 pages testées.
    - Comment savoir si un autre site en a besoin : `npx lighthouse@12.6.0 <page> --only-categories=accessibility`.
    - Où regarder : `src/app/layout.tsx` (lien d'évitement), `src/app/globals.css` (`reveal`), `src/components/browse/AuthorsBrowser.tsx`, `src/components/carousel/Coverflow.tsx`, `src/components/carousel/CountryCarousel.tsx`.
    - État : fait et vérifié.

## E. Monétisation et liens partenaires (Amazon, AdSense…)

22. **Liens Amazon centralisés**
    - Ce qui est fait : une seule fonction fabrique tous les liens Amazon. Elle mène à la fiche Amazon si l'ASIN est connu, sinon à une recherche par ISBN, sinon par titre et auteur, toujours avec l'identifiant partenaire. La mention obligatoire est écrite une seule fois dans le code. Pas de prix affiché.
    - À quoi ça sert : aucun lien sans identifiant partenaire, et la mention est toujours la même.
    - Comment savoir si un autre site en a besoin : `grep -rn "amazon\.fr" src` montre-t-il des liens écrits à la main à plusieurs endroits ?
    - Où regarder : `src/lib/amazon.ts`, `src/components/book/AmazonButton.tsx`. Règles du programme Partenaires (mention, prix) : à vérifier sur le site d'Amazon.
    - État : fait et vérifié.

23. **ASIN contrôlés par les tests**
    - Ce qui est fait : un test vérifie que chaque ASIN correspond à l'ISBN de l'édition de la fiche, et que le n° 1 de chaque top 10 a un lien Amazon direct.
    - À quoi ça sert : pas de lien vers le mauvais livre.
    - Comment savoir si un autre site en a besoin : le site a-t-il des ASIN écrits à la main sans aucun test ?
    - Où regarder : `tests/top10.test.ts` (« ASIN Amazon vérifiés »).
    - État : fait et vérifié.

24. **AdSense prêt, sans gêner tant qu'il n'y a pas d'annonce**
    - Ce qui est fait : script AdSense dans la page, `ads.txt` publié, 4 emplacements nommés, chacun marqué « Publicité ». Un emplacement disparaît s'il n'a pas d'annonce ou si un bloqueur est actif. Aucune annonce sur l'accueil, les listes, les pages légales ni la 404. Une annonce est placée au milieu des longs articles, loin du bouton Amazon.
    - À quoi ça sert : rien à changer le jour où AdSense valide le site.
    - Comment savoir si un autre site en a besoin : `curl -s https://<site>/ads.txt` et chercher la balise `google-adsense-account` dans la page.
    - Où regarder : `src/components/ads/AdSlot.tsx`, `src/lib/config.ts` (`ADSENSE_CLIENT`, `ADSENSE_SLOTS`), `src/app/layout.tsx`, `public/ads.txt`, `tests/conseils.test.ts` (« Emplacement d'annonce au milieu d'un article »), `docs/PUBLICITE.md`.
    - État : commencé, pas fini (site refusé le 21 octobre 2026, nouvel examen demandé le 22 octobre ; aucune annonce affichée pour l'instant).

## F. Réseaux sociaux et partage (images de partage, Pinterest…)

25. **Images de partage**
    - Ce qui est fait : chaque fiche livre partage sa couverture. Les pages sans image propre partagent une image par défaut de 1200 × 630 px. Un test exige une image de partage pour chaque top 10.
    - À quoi ça sert : un aperçu propre sur WhatsApp, Facebook ou X.
    - Comment savoir si un autre site en a besoin : `curl -s <page> | grep -o '<meta property="og:image"[^>]*>'`.
    - Où regarder : `src/lib/metadata.ts` (`DEFAULT_SHARE_IMAGES`), `public/brand/`, `tests/top10.test.ts` (« image de partage présente »).
    - État : fait et vérifié.

26. **Pile à lire partageable**
    - Ce qui est fait : la pile à lire est gardée dans le navigateur du visiteur (localStorage, sans compte). Elle peut être partagée par une adresse (`?l=…`) ou un bouton WhatsApp.
    - À quoi ça sert : fidéliser sans compte ni base de données.
    - Comment savoir si un autre site en a besoin : le site propose-t-il une liste de favoris ?
    - Où regarder : `src/lib/pile.ts`, `src/components/pile/PileList.tsx`, `src/components/pile/PileButton.tsx`.
    - État : fait, non vérifié (pas retesté pendant cette relecture).

27. **Pinterest**
    - Rien de particulier : aucun compte ni code Pinterest pour Keurbook (`docs/MARKETING.md`).

## G. Sécurité et vie privée (en-têtes, cookies, consentement)

28. **En-têtes de sécurité**
    - Ce qui est fait : politique de sécurité du contenu (CSP) limitée au site, à AdSense, à Cloudflare Web Analytics et à la veille. Elle s'accompagne de HSTS, `nosniff`, `X-Frame-Options`, d'une politique de référent et de l'interdiction de la caméra, du micro et de la position.
    - À quoi ça sert : un script étranger ne peut pas se charger, et le site ne peut pas être affiché dans un cadre d'un autre site.
    - Comment savoir si un autre site en a besoin : `curl -sI https://<site>/ | grep -i -E "content-security-policy|strict-transport"`.
    - Où regarder : `public/_headers`.
    - État : fait et vérifié.

29. **Consentement aux cookies et « Gérer mes cookies »**
    - Ce qui est fait : le bandeau de consentement est celui de Google, réglé dans AdSense. Le lien « Gérer mes cookies » du pied de page le rouvre. Sans bandeau (bloqueur, hors Europe), le lien mène à la partie Cookies de la politique de confidentialité.
    - À quoi ça sert : le visiteur peut changer d'avis à tout moment.
    - Comment savoir si un autre site en a besoin : ouvrir le site en Europe dans une fenêtre privée, puis cliquer sur « Gérer mes cookies ».
    - Où regarder : `src/components/ads/CookieSettingsLink.tsx`, `src/app/(legal)/confidentialite/page.tsx`. Exigences légales exactes du bandeau : à vérifier.
    - État : fait, non vérifié (le bandeau n'apparaît qu'une fois les annonces activées).

30. **Mesure d'audience sans cookie**
    - Ce qui est fait : Cloudflare Web Analytics, ajouté par Cloudflare (rien dans le code), autorisé dans la CSP.
    - À quoi ça sert : des statistiques de visite sans bandeau supplémentaire.
    - Comment savoir si un autre site en a besoin : `curl -s https://<site>/ | grep -c cloudflareinsights`.
    - Où regarder : `public/_headers`, `docs/INFRA.md`.
    - État : fait et vérifié.

## H. Applications (si le site a une app iOS ou Android)

Rien de particulier : Keurbook n'a pas d'application.

## I. Méthode : outils de contrôle, tests, tâches automatiques

31. **Tests de contenu et de structure**
    - Ce qui est fait : `npm test` vérifie entre autres les adresses uniques, les liens internes vers des pages existantes, les dates de publication à l'heure de Paris, l'absence de prix et de notes dans les tops, les ASIN, le format des actus, le registre des dates et les vignettes.
    - À quoi ça sert : une erreur de contenu bloque la mise en ligne au lieu d'arriver sur le site.
    - Comment savoir si un autre site en a besoin : `npm test` existe-t-il, et est-il lancé par le fichier de publication ?
    - Où regarder : `tests/*.test.ts` (7 fichiers), `.github/workflows/deploy.yml`.
    - État : fait et vérifié.

32. **Consignes du dépôt pour les routines**
    - Ce qui est fait : `CLAUDE.md` donne les vérifications à lancer, la règle de mise à jour des fiches `docs/INFRA.md`, `docs/MARKETING.md` et `docs/PUBLICATION.md`, et l'étape `npx tsx scripts/lastmod.mjs` après chaque changement de contenu.
    - À quoi ça sert : les tâches automatiques du matin suivent les mêmes règles que le travail à la main.
    - Comment savoir si un autre site en a besoin : son `CLAUDE.md` dit-il quoi lancer avant un envoi ?
    - Où regarder : `CLAUDE.md`, `docs/INFRA.md`, `docs/MARKETING.md`, `docs/PUBLICATION.md`.
    - État : fait, non vérifié (la consigne `lastmod` date du 28 octobre 2026, les routines ne l'ont pas encore appliquée).

33. **Mesure de vitesse reproductible**
    - Ce qui est fait : Lighthouse 12.6.0 lancé sur le site construit et servi en local avec compression (`npx serve@14.2.4 out`). La mesure en ligne varie trop d'un essai à l'autre (de 55 à 96).
    - À quoi ça sert : comparer avant et après une correction sans le bruit du réseau.
    - Comment savoir si un autre site en a besoin : deux mesures PageSpeed de suite donnent des notes très différentes.
    - Où regarder : rien dans le dépôt (méthode seulement). Notes du 28 octobre 2026, sur téléphone : accueil 89, fiche 94, /livres 85, /bd 90, /actus 89, pays 93, conseils 93, auteur 92.
    - État : fait et vérifié.

## Points faibles connus

1. **Registre des dates : réglé le 28 octobre 2026.** Il dépendait d'une commande manuelle ; il est maintenant recalculé avant chaque construction (`prebuild`), avec la date du commit qui a changé la page.
2. **Cache de 10 minutes.** Une page republiée peut rester à l'ancienne version 10 minutes, et le cache n'est pas vidé à la mise en ligne. Seules les adresses de `keurbook.com` sont concernées, pas `www.keurbook.com`.
3. **AdSense pas encore validé.** Le bandeau de consentement et les annonces n'ont jamais été vus en vrai : leur effet sur la vitesse (environ 165 Ko de script) reste à mesurer.
4. **`inlineCss` est une option expérimentale de Next.js.** Elle peut changer ou disparaître à une mise à jour : à vérifier à chaque nouvelle version.
5. **Mesures de vitesse en ligne instables.** Le temps de réponse de Cloudflare Pages variait beaucoup avant la règle de cache, et Google n'a pas encore assez de visites pour donner la vitesse réelle (Signaux Web essentiels).
6. **Indexation lente.** Google : 679 pages indexées sur environ 980, 294 « détectées, non indexées » (28 octobre 2026). Bing : 49 pages indexées. Peu de liens viennent d'autres sites.
7. **Actus écrites automatiquement.** Elles dépendent de leurs sources : un chiffre faux dans la source peut passer (corrigé à la main le 28 octobre 2026, règle ajoutée dans la consigne de la veille).
8. **Pas de test automatique des données structurées ni de l'accessibilité.** Lighthouse et l'outil de test de Google sont lancés à la main ; rien ne bloque une régression.
