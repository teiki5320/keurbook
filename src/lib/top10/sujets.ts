import type { Top10 } from "./types";

/** Date de mise à jour des tops (affichée en tête de page et dans le sitemap). */
export const TOP10_UPDATED = "2026-10-19";

/**
 * Les sujets de la page « Top 10 », dans l'ordre des onglets (le premier s'ouvre sur /top-10).
 * Uniquement des livres publiés du site ; les textes s'appuient sur leurs fiches.
 * Nouveau sujet : l'ajouter ici (10 livres exactement) ; page, onglet, sitemap et tests suivent.
 */
export const TOP10S: Top10[] = [
  {
    slug: "romans-africains-a-lire-absolument",
    tab: "Romans à lire absolument",
    title: "Top 10 des romans africains à lire absolument",
    description: "Notre top 10 des romans d'Afrique subsaharienne à lire absolument, des classiques de Chinua Achebe et Mariama Bâ aux Goncourt d'aujourd'hui.",
    intro:
      "Dix romans d'Afrique subsaharienne choisis parmi les fiches de Keurbook : des classiques étudiés en classe et des romans récents salués par de grands prix, de la Guinée au Burundi. Nous les avons numérotés de 1 à 10 : c'est notre classement, pas un palmarès officiel.",
    items: [
      {
        slug: "le-monde-s-effondre",
        why: "Okonkwo, homme respecté d'un village igbo du Nigeria, voit l'ordre ancien vaciller avec l'arrivée des missionnaires et de l'administration britannique. Chinua Achebe décrit cette société de l'intérieur, sans l'embellir. Son héros, orgueilleux et tragique, ne s'oublie pas. Écrit en anglais, le livre se lit ici en traduction française.",
      },
      {
        slug: "l-aventure-ambigue",
        why: "Samba Diallo, élève d'une école coranique au pays des Diallobé, est envoyé à l'école des Blancs, jusqu'à Paris. Le roman pose une question toujours actuelle : que perd-on en gagnant un autre savoir ? La langue est belle, presque méditative.",
      },
      {
        slug: "une-si-longue-lettre",
        why: "Pendant son deuil, Ramatoulaye écrit à son amie Aïssatou et revient sur leurs mariages, leurs espoirs et la blessure de la polygamie. C'est une voix de femme qui parle franchement du mariage et de la liberté. Court et bouleversant, le livre est lu dans les lycées de toute l'Afrique francophone.",
      },
      {
        slug: "les-soleils-des-independances",
        why: "Fama, dernier prince d'une lignée malinké, a tout perdu avec les indépendances et vit des aumônes des funérailles. Ahmadou Kourouma en tire une satire mordante des lendemains des indépendances, avec un héros pathétique et attachant. Il écrit dans un français nourri des tournures du malinké, qui a renouvelé la langue du roman africain.",
      },
      {
        slug: "l-enfant-noir",
        why: "Camara Laye se souvient de son enfance à Kouroussa, en Haute-Guinée, entre un père forgeron dont le travail de l'or tient presque de la magie et une mère aux pouvoirs mystérieux. On y découvre la vie d'un village malinké dans les années 1930, puis le moment où l'école éloigne peu à peu l'enfant des siens. Court, simple et tendre, c'est une très bonne première lecture.",
      },
      {
        slug: "petit-pays",
        why: "Gabriel, dix ans, vit à Bujumbura entre son père français, sa mère rwandaise et ses copains de l'impasse. En 1993, le Burundi bascule dans la violence et le paradis de l'enfance se fissure. Raconté à hauteur d'enfant, le livre est à la fois lumineux et bouleversant.",
      },
      {
        slug: "la-plus-secrete-memoire-des-hommes",
        why: "Un jeune écrivain sénégalais part sur les traces d'un auteur disparu après un scandale, de Paris au Sénégal et jusqu'en Argentine. Entre roman policier et roman d'idées, l'enquête traverse un siècle d'histoire. C'est aussi un bel hommage à la littérature et aux écrivains qu'elle a oubliés.",
      },
      {
        slug: "verre-casse",
        why: "Dans un bar de Pointe-Noire, un vieil habitué remplit un cahier avec les histoires extravagantes des clients. Le texte tient en une longue phrase presque sans point, drôle et virtuose, où se cachent des dizaines de titres de livres à retrouver. C'est le roman qui a fait connaître Alain Mabanckou au grand public.",
      },
      {
        slug: "une-vie-de-boy",
        why: "Toundi, devenu le boy du commandant de Dangan, note dans un cahier tout ce qu'il voit chez ses maîtres. Son regard faussement naïf montre, avec beaucoup d'ironie, l'absurdité du monde colonial. Le roman est court et se lit presque d'une traite.",
      },
      {
        slug: "notre-dame-du-nil",
        why: "Au début des années 1970, dans un lycée catholique réservé aux filles de l'élite rwandaise, les tensions du pays s'invitent dans les dortoirs. Ce huis clos entre adolescentes, tendu et captivant, montre comment la haine se prépare, bien avant le génocide des Tutsi. Un roman essentiel pour comprendre le Rwanda.",
      },
    ],
    start:
      "Pour une première lecture courte, [L'Enfant noir](/livre/l-enfant-noir) ou [Une si longue lettre](/livre/une-si-longue-lettre). Pour un roman d'aujourd'hui, [Petit pays](/livre/petit-pays). Pour rire, [Verre Cassé](/livre/verre-casse).",
    faq: [
      {
        q: "Comment avez-vous fait ce classement ?",
        a: "Nous avons retenu des romans présentés sur Keurbook, reconnus par les lecteurs et souvent par de grands prix littéraires, en mêlant classiques et livres récents et en variant les pays. L'ordre de 1 à 10 est notre choix : d'autres lecteurs le feraient autrement.",
      },
      {
        q: "Ces romans sont-ils tous écrits en français ?",
        a: "Neuf ont été écrits en français. [Le monde s'effondre](/livre/le-monde-s-effondre), de Chinua Achebe, a été écrit en anglais : on le lit en traduction française.",
      },
      {
        q: "Pourquoi aucun prix de vente n'est affiché ?",
        a: "Les prix changent souvent : le prix du jour est sur la page du livre chez Amazon. Keurbook ne vend rien ; si vous achetez par nos liens, nous touchons une petite commission, sans que le prix change pour vous.",
      },
    ],
  },
  {
    slug: "livres-africains-pour-commencer",
    tab: "Pour commencer",
    title: "Top 10 des livres d'auteurs africains pour commencer",
    description: "Notre top 10 des livres d'auteurs africains pour commencer : des romans accessibles, souvent primés, conseillés comme porte d'entrée dans chaque œuvre.",
    intro:
      "Sur Keurbook, chaque fiche d'auteur conseille un livre « Par où commencer ». Nous avons retenu dix de ces portes d'entrée, des romans accessibles et souvent primés, venus de sept pays. Ils sont numérotés selon notre préférence.",
    items: [
      { slug: "frere-d-ame" },
      { slug: "les-impatientes" },
      { slug: "allah-n-est-pas-oblige" },
      { slug: "le-ventre-de-l-atlantique" },
      { slug: "trois-femmes-puissantes" },
      { slug: "l-autre-moitie-du-soleil" },
      { slug: "temps-de-chien" },
      { slug: "congo-inc" },
      { slug: "le-roi-de-kahel" },
      { slug: "le-tambour-des-larmes" },
    ],
    start:
      "Si vous voulez un livre court et fort, commencez par [Frère d'âme](/livre/frere-d-ame) ou [Les Impatientes](/livre/les-impatientes). Pour rire tout en réfléchissant, [Temps de chien](/livre/temps-de-chien) ou [Congo Inc.](/livre/congo-inc).",
    faq: [
      {
        q: "Comment ces dix livres ont-ils été choisis ?",
        a: "Ce sont tous des livres que nos fiches d'auteurs conseillent pour commencer. Parmi eux, nous avons privilégié les romans récents, accessibles et reconnus par des prix littéraires.",
      },
      {
        q: "Faut-il déjà connaître la littérature africaine ?",
        a: "Non. Ces livres se lisent sans rien savoir au départ : c'est justement pour cela que nous les conseillons en premier. Chaque fiche d'auteur propose ensuite d'autres livres.",
      },
      {
        q: "Et les grands classiques ?",
        a: "Ils ont leur propre top 10 : voir les [grands classiques de la littérature africaine](/top-10/classiques-litterature-africaine) et les [romans africains à lire absolument](/top-10/romans-africains-a-lire-absolument).",
      },
    ],
  },
  {
    slug: "bd-africaines",
    tab: "BD",
    title: "Top 10 des BD africaines",
    description: "Notre top 10 des bandes dessinées africaines : Aya de Yopougon, Petit pays, Commissaire Kouamé et d'autres albums d'auteurs d'Afrique subsaharienne.",
    intro:
      "Dix bandes dessinées d'auteurs d'Afrique subsaharienne, choisies parmi les albums présentés sur Keurbook. Nous avons mêlé séries cultes, récits d'enfance, polar et albums sur l'histoire, pour les adolescents comme pour les adultes. Les numéros suivent notre préférence.",
    items: [
      { slug: "aya-de-yopougon" },
      { slug: "petit-pays-bd" },
      { slug: "commissaire-kouame-un-si-joli-jardin" },
      { slug: "la-vie-de-pahe" },
      { slug: "tempete-sur-bangui" },
      { slug: "madame-livingstone" },
      { slug: "rwanda-1994" },
      { slug: "malamine" },
      { slug: "les-dogues-noirs-de-l-empire-la-force-noire" },
      { slug: "akissi" },
    ],
    start:
      "Commencez par [Aya de Yopougon](/bd/aya-de-yopougon), le premier tome d'une série culte. Pour les plus jeunes, [Akissi](/bd/akissi) ; pour un récit d'enfance drôle, [La Vie de Pahé](/bd/la-vie-de-pahe).",
    faq: [
      {
        q: "Ces BD conviennent-elles aux enfants ?",
        a: "Pas toutes. [Akissi](/bd/akissi) est faite pour les jeunes lecteurs ; Aya de Yopougon, La Vie de Pahé, Petit pays et Les Dogues noirs de l'Empire conviennent aux adolescents ; les autres sont plutôt destinées aux adultes.",
      },
      {
        q: "Faut-il lire les séries dans l'ordre ?",
        a: "Pour les séries, mieux vaut commencer par le premier album : c'est celui que nous conseillons ici pour Aya de Yopougon, Tempête sur Bangui, Commissaire Kouamé, Akissi et Les Dogues noirs de l'Empire.",
      },
      {
        q: "Où trouver d'autres BD africaines ?",
        a: "Toutes les bandes dessinées du site sont sur la page [Toutes les BD](/bd), avec des filtres par pays et par public.",
      },
    ],
  },
  {
    slug: "classiques-litterature-africaine",
    tab: "Grands classiques",
    title: "Top 10 des grands classiques de la littérature africaine",
    description: "Notre top 10 des grands classiques de la littérature africaine parus avant 1980 : Hampâté Bâ, Sembène, Ouologuem, Mongo Beti, Sony Labou Tansi…",
    intro:
      "Dix livres parus avant 1980, qui ont marqué la littérature d'Afrique subsaharienne : romans, contes et épopée. Pour varier, nous n'y avons pas repris les classiques déjà présents dans notre top 10 des romans à lire absolument. Les numéros suivent notre préférence.",
    items: [
      { slug: "l-etrange-destin-de-wangrin" },
      { slug: "les-bouts-de-bois-de-dieu" },
      { slug: "le-devoir-de-violence" },
      { slug: "soundjata-ou-l-epopee-mandingue" },
      { slug: "le-pauvre-christ-de-bomba" },
      { slug: "la-vie-et-demie" },
      { slug: "les-contes-d-amadou-koumba" },
      { slug: "la-greve-des-battu" },
      { slug: "le-fils-d-agatha-moudio" },
      { slug: "climbie" },
    ],
    start:
      "Pour un classique drôle et facile d'accès, [L'Étrange Destin de Wangrin](/livre/l-etrange-destin-de-wangrin) ou [Le Fils d'Agatha Moudio](/livre/le-fils-d-agatha-moudio). Pour des textes courts, [Les Contes d'Amadou Koumba](/livre/les-contes-d-amadou-koumba).",
    faq: [
      {
        q: "Qu'appelez-vous un « grand classique » ?",
        a: "Ici, un livre paru avant 1980 qui a compté dans l'histoire de la littérature africaine : souvent primé, étudié en classe ou réédité depuis des décennies.",
      },
      {
        q: "Pourquoi L'Enfant noir ou Une si longue lettre n'y sont-ils pas ?",
        a: "Ils figurent déjà dans notre [top 10 des romans africains à lire absolument](/top-10/romans-africains-a-lire-absolument). Nous avons préféré faire découvrir d'autres classiques ici.",
      },
      {
        q: "Ces livres sont-ils difficiles à lire ?",
        a: "Pas forcément. Les contes de Birago Diop, Soundjata ou Le Fils d'Agatha Moudio se lisent facilement ; Le Devoir de violence et La Vie et demie sont plus exigeants.",
      },
    ],
  },
  {
    slug: "livres-autrices-africaines",
    tab: "Autrices",
    title: "Top 10 des livres d'autrices africaines",
    description: "Notre top 10 des livres d'autrices africaines : Mariama Bâ, Marie NDiaye, Léonora Miano, Djaïli Amadou Amal, Chimamanda Ngozi Adichie et d'autres.",
    intro:
      "Dix livres écrits par des femmes d'Afrique subsaharienne et de sa diaspora, choisis parmi les fiches de Keurbook. Nous avons mêlé classiques et romans récents, souvent primés, venus de cinq pays. Les numéros suivent notre préférence.",
    items: [
      { slug: "une-si-longue-lettre" },
      { slug: "trois-femmes-puissantes" },
      { slug: "la-saison-de-l-ombre" },
      { slug: "les-impatientes" },
      { slug: "l-autre-moitie-du-soleil" },
      { slug: "le-ventre-de-l-atlantique" },
      { slug: "les-maquisards" },
      { slug: "asseze-l-africaine" },
      { slug: "tropique-de-la-violence" },
      { slug: "reine-pokou" },
    ],
    start:
      "Pour commencer, [Une si longue lettre](/livre/une-si-longue-lettre), court et bouleversant, ou [Les Impatientes](/livre/les-impatientes). Pour un grand roman d'histoire, [La Saison de l'ombre](/livre/la-saison-de-l-ombre) ou [Les Maquisards](/livre/les-maquisards).",
    faq: [
      {
        q: "Comment avez-vous choisi ces dix livres ?",
        a: "Parmi les livres d'autrices présentés sur Keurbook, nous avons retenu ceux que leurs fiches conseillent ou que de grands prix ont distingués, en variant les époques et les pays.",
      },
      {
        q: "Ces livres sont-ils tous écrits en français ?",
        a: "Neuf ont été écrits en français. [L'Autre Moitié du soleil](/livre/l-autre-moitie-du-soleil), de Chimamanda Ngozi Adichie, a été écrit en anglais : on le lit en traduction française.",
      },
      {
        q: "Où découvrir ces autrices ?",
        a: "Chaque nom mène à une fiche d'auteur, avec sa biographie et ses autres livres. Tous les auteurs du site sont sur la page [Auteurs](/auteurs).",
      },
    ],
  },
  {
    slug: "romans-congo-cameroun",
    tab: "Congo et Cameroun",
    title: "Top 10 des romans du Congo et du Cameroun",
    description: "Notre top 10 des romans du Congo-Brazzaville, de la RD Congo et du Cameroun : Mabanckou, Sony Labou Tansi, Bofane, Mongo Beti, Léonora Miano…",
    intro:
      "Dix romans d'écrivains des deux Congo (Brazzaville et Kinshasa) et du Cameroun, trois grandes terres du roman africain. Nous n'y avons pas repris Verre Cassé ni Une vie de boy, déjà dans notre top 10 des romans à lire absolument. Les numéros suivent notre préférence.",
    items: [
      { slug: "memoires-de-porc-epic" },
      { slug: "temps-de-chien" },
      { slug: "l-interieur-de-la-nuit" },
      { slug: "la-vie-et-demie" },
      { slug: "congo-inc" },
      { slug: "mission-terminee" },
      { slug: "tram-83" },
      { slug: "les-honneurs-perdus" },
      { slug: "le-feu-des-origines" },
      { slug: "un-ocean-deux-mers-trois-continents" },
    ],
    start:
      "Pour rire, [Temps de chien](/livre/temps-de-chien) ou [Mission terminée](/livre/mission-terminee). Pour une fable noire, [Mémoires de porc-épic](/livre/memoires-de-porc-epic). Pour Kinshasa aujourd'hui, [Congo Inc.](/livre/congo-inc).",
    faq: [
      {
        q: "De quel Congo parlez-vous ?",
        a: "Des deux : le Congo-Brazzaville (Mabanckou, Sony Labou Tansi, Dongala, N'Sondé) et la République démocratique du Congo (Bofane, Mwanza Mujila). Chaque pays a sa page : [Congo](/pays/congo), [RD Congo](/pays/rd-congo) et [Cameroun](/pays/cameroun).",
      },
      {
        q: "Pourquoi réunir ces trois pays ?",
        a: "Ce sont trois pays d'Afrique centrale qui comptent parmi les grandes littératures du continent en français, avec beaucoup de livres sur Keurbook.",
      },
      {
        q: "Lequel lire en premier ?",
        a: "[Mémoires de porc-épic](/livre/memoires-de-porc-epic), prix Renaudot 2006, est une bonne porte d'entrée ; [Temps de chien](/livre/temps-de-chien) si vous voulez surtout rire.",
      },
    ],
  },
  {
    slug: "poesie-africaine",
    tab: "Poésie",
    title: "Top 10 des livres de poésie africaine",
    description: "Notre top 10 des recueils de poésie africaine : Senghor, Birago Diop, Rabearivelo, Bernard Dadié, Wole Soyinka, Véronique Tadjo et d'autres voix.",
    intro:
      "Dix recueils de poètes d'Afrique subsaharienne, des pionniers des années 1930 aux voix d'aujourd'hui, choisis parmi les livres de poésie présentés sur Keurbook. Nous avons varié les pays et les époques. Les numéros suivent notre préférence.",
    items: [
      { slug: "ethiopiques" },
      { slug: "leurres-et-lueurs" },
      { slug: "presque-songes" },
      { slug: "afrique-debout" },
      { slug: "cycles-sombres" },
      { slug: "kaidara" },
      { slug: "laterite" },
      { slug: "la-legende-de-l-errance" },
      { slug: "sur-les-berges-du-chari-district-nord-de-la-beaute" },
      { slug: "ishindenshin" },
    ],
    start:
      "Pour un premier recueil court, [Leurres et lueurs](/livre/leurres-et-lueurs) de Birago Diop ou [Latérite](/livre/laterite) de Véronique Tadjo. Pour la négritude, [Éthiopiques](/livre/ethiopiques) de Senghor.",
    faq: [
      {
        q: "Faut-il lire ces recueils d'une traite ?",
        a: "Non. Un recueil se lit poème par poème, dans l'ordre qu'on veut. Beaucoup de ces poèmes gagnent à être lus à voix haute.",
      },
      {
        q: "Ces poèmes sont-ils tous écrits en français ?",
        a: "La plupart. [Cycles sombres](/livre/cycles-sombres) de Wole Soyinka est traduit de l'anglais et [Kaïdara](/livre/kaidara) d'Amadou Hampâté Bâ vient du peul ; Rabearivelo a écrit [Presque-songes](/livre/presque-songes) en malgache et en français.",
      },
      {
        q: "Qu'est-ce que la négritude ?",
        a: "Un mouvement littéraire des années 1930, porté notamment par Léopold Sédar Senghor, qui revendique la fierté des cultures noires. Nous l'expliquons dans [Qu'est-ce que la négritude ?](/conseils/negritude).",
      },
    ],
  },
  {
    slug: "livres-africains-enfants",
    tab: "Pour enfants",
    title: "Top 10 des livres africains pour enfants",
    description: "Notre top 10 des livres africains pour enfants : contes, albums et premiers romans de Senghor, Bernard Dadié, Hampâté Bâ, Véronique Tadjo et d'autres.",
    intro:
      "Dix livres pour enfants d'auteurs d'Afrique subsaharienne : contes à lire le soir, albums illustrés et premiers romans. Nous les avons choisis parmi les livres jeunesse du site, avec de grands noms de la littérature. Les numéros suivent notre préférence.",
    items: [
      { slug: "la-belle-histoire-de-leuk-le-lievre" },
      { slug: "le-pagne-noir" },
      { slug: "le-taxi-brousse-de-papa-diop" },
      { slug: "mamy-wata-et-le-monstre" },
      { slug: "la-diablesse-et-son-enfant" },
      { slug: "petit-bodiel-et-autres-contes-de-la-savane" },
      { slug: "yacouba-chasseur-africain" },
      { slug: "trois-petits-cireurs" },
      { slug: "ma-soeur-etoile" },
      { slug: "pourquoi-le-lion-n-est-plus-le-roi-des-animaux" },
    ],
    start:
      "Pour les plus petits, un album : [Le Taxi-brousse de Papa Diop](/livre/le-taxi-brousse-de-papa-diop) ou [Mamy Wata et le Monstre](/livre/mamy-wata-et-le-monstre). Pour la lecture du soir, les contes du [Pagne noir](/livre/le-pagne-noir).",
    faq: [
      {
        q: "À partir de quel âge ?",
        a: "Les albums illustrés se lisent avec les plus petits. [La Diablesse et son enfant](/livre/la-diablesse-et-son-enfant) se lit dès 6 ans ; [Petit Bodiel](/livre/petit-bodiel-et-autres-contes-de-la-savane) et [Yacouba, chasseur africain](/livre/yacouba-chasseur-africain) à partir de 10 ans.",
      },
      {
        q: "Ces auteurs écrivent-ils aussi pour les adultes ?",
        a: "Oui, presque tous : Senghor, Bernard Dadié, Amadou Hampâté Bâ, Ahmadou Kourouma, Alain Mabanckou ou Marie NDiaye ont aussi une œuvre pour les adultes, présentée sur leur fiche.",
      },
      {
        q: "Et les BD pour enfants ?",
        a: "Elles sont dans notre [top 10 des BD africaines](/top-10/bd-africaines), avec par exemple [Akissi](/bd/akissi) pour les jeunes lecteurs.",
      },
    ],
  },
  {
    slug: "histoire-de-l-afrique",
    tab: "Histoire de l'Afrique",
    title: "Top 10 des livres d'histoire de l'Afrique",
    description: "Notre top 10 des livres sur l'histoire de l'Afrique : épopées, essais et témoignages, de l'empire du Mali à l'apartheid et au génocide des Tutsi.",
    intro:
      "Dix livres d'auteurs africains pour comprendre l'histoire du continent : épopées transmises par les griots, essais et témoignages, de l'empire du Mali au XIIIe siècle jusqu'à l'apartheid et au génocide des Tutsi. Nous les avons choisis parmi les essais et récits du site. Les numéros suivent notre préférence.",
    items: [
      { slug: "un-long-chemin-vers-la-liberte" },
      { slug: "soundjata-ou-l-epopee-mandingue" },
      { slug: "nations-negres-et-culture" },
      { slug: "l-empire-peul-du-macina" },
      { slug: "le-maitre-de-la-parole" },
      { slug: "main-basse-sur-le-cameroun" },
      { slug: "l-ombre-d-imana" },
      { slug: "histoire-synthetique-de-l-afrique-resistante" },
      { slug: "restituer-le-patrimoine-africain" },
      { slug: "critique-de-la-raison-negre" },
    ],
    start:
      "Pour un récit vivant, [Soundjata ou l'Épopée mandingue](/livre/soundjata-ou-l-epopee-mandingue) ou l'autobiographie de Nelson Mandela, [Un long chemin vers la liberté](/livre/un-long-chemin-vers-la-liberte). Pour un texte court, [L'Ombre d'Imana](/livre/l-ombre-d-imana).",
    faq: [
      {
        q: "Ces livres sont-ils des manuels d'histoire ?",
        a: "Non : ce sont des épopées, des témoignages et des essais, écrits par des auteurs africains. Ils racontent l'histoire de l'Afrique de l'intérieur, chacun avec son point de vue.",
      },
      {
        q: "Lesquels sont les plus faciles à lire ?",
        a: "Soundjata et Le Maître de la parole se lisent comme des récits ; L'Ombre d'Imana est court. Critique de la raison nègre et Nations nègres et culture sont plus exigeants.",
      },
      {
        q: "Pourquoi deux livres sur Soundjata ?",
        a: "Ce sont deux versions de la même épopée, recueillies auprès de griots différents par Djibril Tamsir Niane et par Camara Laye. Les lire l'une après l'autre montre comment vit la tradition orale.",
      },
    ],
  },
  {
    slug: "romans-africains-recents",
    tab: "Romans récents",
    title: "Top 10 des romans africains récents",
    description: "Notre top 10 des romans africains parus depuis 2015 : Gaël Faye, David Diop, Nathacha Appanah, Mohamed Mbougar Sarr, Hemley Boum et d'autres.",
    intro:
      "Dix romans d'auteurs d'Afrique subsaharienne et de sa diaspora parus depuis 2015, souvent salués par de grands prix. Nous n'y avons pas repris Petit pays ni La plus secrète mémoire des hommes, déjà dans notre top 10 des romans à lire absolument. Les numéros suivent notre préférence.",
    items: [
      { slug: "jacaranda" },
      { slug: "frere-d-ame" },
      { slug: "la-nuit-au-coeur" },
      { slug: "silence-du-choeur" },
      { slug: "camarade-papa" },
      { slug: "le-reve-du-pecheur" },
      { slug: "no-home" },
      { slug: "tous-tes-enfants-disperses" },
      { slug: "anguille-sous-roche" },
      { slug: "je-remercie-la-nuit" },
    ],
    start:
      "Pour un roman court, [Frère d'âme](/livre/frere-d-ame). Pour une grande saga, [Jacaranda](/livre/jacaranda) ou [No Home](/livre/no-home). Pour une voix insolente, [Anguille sous roche](/livre/anguille-sous-roche).",
    faq: [
      {
        q: "Qu'appelez-vous un roman récent ?",
        a: "Ici, un roman paru depuis 2015. Le plus récent de ce top, [La Nuit au cœur](/livre/la-nuit-au-coeur), est paru en 2025.",
      },
      {
        q: "Ces romans sont-ils tous écrits en français ?",
        a: "Neuf ont été écrits en français. [No Home](/livre/no-home), de Yaa Gyasi, a été écrit en anglais : on le lit en traduction française.",
      },
      {
        q: "Où trouver les autres nouveautés ?",
        a: "Tous les livres du site sont sur la page [Tous les livres](/livres), avec un filtre « Depuis 2000 ».",
      },
    ],
  },
];
