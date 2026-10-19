import type { Top10 } from "./types";

/** Date de mise à jour des tops (affichée en tête de page et dans le sitemap). */
export const TOP10_UPDATED = "2026-10-19";

/**
 * Les sujets de la page « Top 10 », dans l'ordre des onglets (le premier s'ouvre sur /top-10).
 * Uniquement des livres publiés du site ; chaque texte « Pourquoi le lire » est écrit pour l'angle du sujet,
 * à partir des faits de la fiche du livre. L'intro dit le critère du classement.
 * Doublons limités : un livre dans 2 onglets au plus, 2 livres en commun au plus entre deux onglets (voir les tests).
 * Nouveau sujet : l'ajouter ici (10 livres exactement) ; page, onglet, image de partage, sitemap et tests suivent.
 */
export const TOP10S: Top10[] = [
  {
    slug: "romans-africains-a-lire-absolument",
    tab: "Romans à lire absolument",
    title: "Top 10 des romans africains à lire absolument",
    description: "Notre top 10 des romans d'Afrique subsaharienne à lire absolument, des classiques de Chinua Achebe et Mariama Bâ aux Goncourt d'aujourd'hui.",
    intro:
      "Dix romans d'Afrique subsaharienne choisis parmi les fiches de Keurbook : des classiques étudiés en classe et des romans récents salués par de grands prix, de la Guinée au Burundi. Notre critère de classement est l'influence du livre, c'est-à-dire combien il a été lu et étudié : Le monde s'effondre, le roman africain le plus lu au monde, arrive donc en tête. C'est notre classement, pas un palmarès officiel.",
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
        a: "Nous avons retenu des romans présentés sur Keurbook, reconnus par les lecteurs et souvent par de grands prix, en mêlant classiques et livres récents et en variant les pays. Nous les avons classés selon leur influence : les plus lus et les plus étudiés d'abord. D'autres lecteurs feraient un autre ordre.",
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
      "Sur Keurbook, chaque fiche d'auteur conseille un livre « Par où commencer » : nous avons retenu dix de ces portes d'entrée, des romans accessibles venus de huit pays. Le classement suit le nombre de prix littéraires reçus par chaque livre, d'après sa fiche, puis notre préférence en cas d'égalité. Frère d'âme, couronné trois fois, arrive donc en tête.",
    items: [
      {
        slug: "frere-d-ame",
        why: "Un roman bref, qu'on lit d'une traite : la voix d'Alfa Ndiaye, tirailleur sénégalais dans les tranchées de 1914-1918, saisit dès la première page. Nul besoin de rien savoir avant pour entrer dans cette histoire d'amitié et de culpabilité. Goncourt des lycéens 2018 puis International Booker Prize 2021, c'est le livre conseillé pour découvrir David Diop.",
      },
      {
        slug: "allah-n-est-pas-oblige",
        why: "Birahima, une dizaine d'années, raconte sa vie d'enfant-soldat dans un français bien à lui, qu'il vérifie dans quatre dictionnaires. Cette voix drôle et terrible à la fois emporte le lecteur dès les premières lignes. Prix Renaudot et Goncourt des lycéens 2000, c'est le livre conseillé pour découvrir Ahmadou Kourouma.",
      },
      {
        slug: "temps-de-chien",
        why: "Le narrateur est un chien, Mboudjak, qui observe les clients d'un bar de Yaoundé : l'idée suffit à donner envie d'ouvrir le livre. Drôle et lucide, il fait entendre le Yaoundé populaire, sa langue et ses colères. Une satire politique qui ne se prend jamais au sérieux, Grand prix littéraire d'Afrique noire 2002.",
      },
      {
        slug: "congo-inc",
        why: "Isookanga, jeune Pygmée passionné de jeux en ligne, quitte sa forêt pour faire fortune à Kinshasa. L'intrigue, pleine d'humour, fait comprendre sans leçon comment la mondialisation se joue au Congo. Grand prix du roman métis et prix des Cinq Continents, c'est le livre conseillé pour découvrir In Koli Jean Bofane.",
      },
      {
        slug: "solo-d-un-revenant",
        why: "Un homme revient dans son pays après dix ans de massacres pour comprendre comment est mort son ami Mozaya : l'enquête tient jusqu'au bout. Kossi Efoui, homme de théâtre, écrit dans une langue poétique et envoûtante. Prix Ahmadou-Kourouma et prix des Cinq Continents 2009, c'est le livre conseillé pour découvrir cet auteur togolais.",
      },
      {
        slug: "trois-femmes-puissantes",
        why: "Trois récits, trois femmes entre la France et l'Afrique : on peut le lire histoire par histoire. Chacune, face à l'humiliation, trouve une manière de rester digne. Prix Goncourt 2009, c'est le livre conseillé pour découvrir l'écriture ample et précise de Marie NDiaye.",
      },
      {
        slug: "le-roi-de-kahel",
        why: "Un roman d'aventures inspiré d'une histoire vraie : à la fin du XIXe siècle, un Lyonnais part seul conquérir le Fouta-Djalon, en Guinée. Il se lit comme une aventure tout en montrant, avec ironie, les débuts de la colonisation vus des deux côtés. Prix Renaudot 2008, c'est le livre conseillé pour découvrir Tierno Monénembo.",
      },
      {
        slug: "eve-de-ses-decombres",
        why: "Un roman court, 160 pages dans l'édition conseillée, où quatre adolescents d'un quartier pauvre de Port-Louis prennent tour à tour la parole. Leurs voix rageuses et poétiques montrent l'île Maurice loin des clichés touristiques. Prix des Cinq Continents de la Francophonie 2006, c'est le livre conseillé pour découvrir Ananda Devi.",
      },
      {
        slug: "le-tambour-des-larmes",
        why: "Rayhana, jeune femme d'une tribu nomade, s'enfuit avec le tambour sacré de son clan pour retrouver son fils : une intrigue simple et forte. Le roman ouvre une porte rare sur la littérature mauritanienne. Prix Ahmadou-Kourouma 2016, c'est le livre conseillé pour découvrir Mbarek Ould Beyrouk.",
      },
      {
        slug: "le-ventre-de-l-atlantique",
        why: "Salie, installée à Strasbourg, tente de faire comprendre à son petit frère resté au Sénégal que l'Europe n'est pas le paradis qu'il imagine. Le roman est drôle et amer à la fois, porté par une écriture vive et pleine de tendresse. C'est le livre conseillé pour découvrir Fatou Diome.",
      },
    ],
    start:
      "Pour un livre court et fort, [Frère d'âme](/livre/frere-d-ame) ou [Ève de ses décombres](/livre/eve-de-ses-decombres). Pour rire tout en réfléchissant, [Temps de chien](/livre/temps-de-chien) ou [Congo Inc.](/livre/congo-inc).",
    faq: [
      {
        q: "Comment ces dix livres ont-ils été choisis ?",
        a: "Ce sont tous des livres que nos fiches d'auteurs conseillent pour commencer. Nous les avons classés selon le nombre de prix littéraires qu'ils ont reçus, puis selon notre préférence.",
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
      "Dix bandes dessinées d'auteurs d'Afrique subsaharienne, choisies parmi les albums présentés sur Keurbook : séries cultes, récits d'enfance, polar et albums sur l'histoire. Nous avons placé en tête les albums primés, puis classé les autres selon notre préférence. Aya de Yopougon, prix du premier album au festival d'Angoulême, est donc le n° 1.",
    items: [
      {
        slug: "aya-de-yopougon",
        why: "Le premier tome d'une série culte, prix du premier album au festival d'Angoulême 2006. Marguerite Abouet et Clément Oubrerie racontent l'Abidjan de la fin des années 1970, joyeux et quotidien, loin des clichés de guerre et de misère. Les dialogues sont savoureux, avec des expressions ivoiriennes expliquées en fin d'album. La série a été adaptée en film d'animation.",
      },
      {
        slug: "commissaire-kouame-un-si-joli-jardin",
        why: "Marguerite Abouet se lance dans le polar : un magistrat est retrouvé assassiné dans un hôtel de passe d'Abidjan, et le commissaire Kouamé mène l'enquête avec son adjoint Arsène. Le duo a des méthodes très particulières, et l'humour ne quitte jamais l'enquête. L'album a reçu le prix BD du polar SNCF 2019.",
      },
      {
        slug: "petit-pays-bd",
        why: "Le roman culte de Gaël Faye, mis en images par Marzena Sowa et Sylvain Savoia, les auteurs de la série Marzi. On suit Gabriel, une dizaine d'années, à Bujumbura, jusqu'à ce que la guerre civile au Burundi et le génocide au Rwanda brisent son enfance. Le dessin rend ce récit accessible aux adolescents.",
      },
      {
        slug: "la-vie-de-pahe",
        why: "Le dessinateur gabonais Pahé raconte sa propre enfance à Bitam, dans le nord du Gabon. Son trait de caricaturiste fait mouche à chaque page, entre école, famille et combines de gamin. Ce premier tome, adapté ensuite en dessin animé, se lit en famille, par les ados comme par les adultes.",
      },
      {
        slug: "tempete-sur-bangui",
        why: "Didier Kassaï a vécu la prise de Bangui par la rébellion de la Séléka, fin 2012, et la raconte jour après jour. Son dessin rend palpables la peur et les pillages. Ce témoignage de l'intérieur, publié avec le concours d'Amnesty International, fait comprendre une guerre dont on parle peu.",
      },
      {
        slug: "madame-livingstone",
        why: "En 1915, sur le lac Tanganyika, un aviateur belge et un guide métis qui se dit fils de l'explorateur Livingstone partent à la chasse d'un navire de guerre allemand. L'album éclaire un front méconnu de la Première Guerre mondiale, vécu depuis l'Afrique. Les aquarelles sont de Barly Baruti, figure majeure de la BD congolaise.",
      },
      {
        slug: "rwanda-1994",
        why: "L'album suit Mathilde et ses enfants pendant le génocide des Tutsi, en avril 1994. Les scénaristes ont passé de longs mois au Rwanda à recueillir des témoignages, et la fiction s'appuie sur des faits réels. Le dessin sobre de Pat Masioni, grand auteur congolais, raconte beaucoup avec peu de mots.",
      },
      {
        slug: "malamine",
        why: "Malamine est diplômé et cultivé, mais à Paris on ne voit d'abord en lui qu'un Africain. L'album, signé par un duo d'auteurs camerounais, montre avec justesse les humiliations ordinaires de l'immigration. Une BD qui fait réfléchir aux préjugés sans jamais faire la leçon.",
      },
      {
        slug: "les-dogues-noirs-de-l-empire-la-force-noire",
        why: "Août 1914 : pour sauver son village, Bakary s'engage chez les tirailleurs et reçoit l'ordre d'envahir le Togo voisin, colonie allemande. La Grande Guerre vue d'Afrique est un sujet rarement traité en BD. La ligne claire en couleurs la rend accessible aux adolescents.",
      },
      {
        slug: "akissi",
        why: "Pour les plus jeunes : Akissi, petite fille de Yopougon qui ne tient pas en place, enchaîne les bêtises dans de courtes histoires indépendantes. L'album se lit seul dès 6 ans. Marguerite Abouet, la scénariste d'Aya de Yopougon, y puise dans ses souvenirs d'enfance.",
      },
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
      "Dix livres parus avant 1980 qui ont marqué la littérature d'Afrique subsaharienne, sans reprendre les classiques déjà présents dans notre top 10 des romans à lire absolument. Nous avons placé en tête ceux qui ont reçu un grand prix littéraire, puis classé les autres selon notre préférence. Le Devoir de violence, premier roman africain couronné par le prix Renaudot, est donc le n° 1.",
    items: [
      {
        slug: "le-devoir-de-violence",
        why: "Le premier roman africain couronné par le prix Renaudot, en 1968. Yambo Ouologuem y raconte des siècles de règne par la terreur dans un royaume imaginaire, le Nakem, et bouscule l'image d'une Afrique précoloniale idéalisée. Provocant, le livre a fait scandale à sa sortie.",
      },
      {
        slug: "l-etrange-destin-de-wangrin",
        why: "Ce roman picaresque suit Wangrin, interprète au temps de l'Afrique-Occidentale française, qui joue des Blancs comme des Africains pour s'enrichir. Amadou Hampâté Bâ assure tenir cette histoire de la bouche même de son héros. Drôle et malicieux, c'est une satire fine de l'administration coloniale, Grand prix littéraire d'Afrique noire 1974.",
      },
      {
        slug: "la-greve-des-battu",
        why: "À Dakar, un haut fonctionnaire chasse les mendiants de la ville, puis découvre qu'il a besoin de leur aumône pour sa carrière. Aminata Sow Fall en tire une satire savoureuse du pouvoir et de l'hypocrisie sociale. Un classique des lettres sénégalaises, court et plein d'humour, Grand prix littéraire d'Afrique noire 1980.",
      },
      {
        slug: "le-fils-d-agatha-moudio",
        why: "Le premier roman de Francis Bebey, écrivain et grand musicien, Grand prix littéraire d'Afrique noire 1968. Mbenda, jeune pêcheur près de Douala, doit choisir entre l'épouse choisie par les anciens et Agatha Moudio, qu'il aime. La vie du village est racontée avec humour, tendresse et le sens du conte.",
      },
      {
        slug: "les-bouts-de-bois-de-dieu",
        why: "Une grande fresque inspirée de la grève des cheminots de la ligne Dakar-Niger, en 1947-1948. Ousmane Sembène, l'un des pères du cinéma africain, y suit ouvriers et familles de Bamako à Dakar. Les femmes, qui tiennent les foyers et prennent la parole, en sont les personnages les plus inoubliables.",
      },
      {
        slug: "soundjata-ou-l-epopee-mandingue",
        why: "La grande épopée de l'Afrique de l'Ouest : la vie de Soundjata Keïta, fondateur de l'empire du Mali au XIIIe siècle. Djibril Tamsir Niane a transcrit en français le récit du griot Mamadou Kouyaté. Entre histoire, magie et héroïsme, c'est le livre idéal pour découvrir la tradition orale mandingue.",
      },
      {
        slug: "le-pauvre-christ-de-bomba",
        why: "Jugé scandaleux à sa sortie, ce classique de la littérature camerounaise suit la tournée d'un missionnaire dans les années 1930, racontée par son jeune boy. Le regard naïf du narrateur rend la satire à la fois drôle et cruelle. Mongo Beti y montre les liens entre la mission et l'administration coloniale.",
      },
      {
        slug: "la-vie-et-demie",
        why: "Un chef-d'œuvre sur les dictatures : dans un pays imaginaire, un opposant exécuté refuse de mourir tout à fait et hante le tyran et sa descendance. Sony Labou Tansi y invente une langue explosive, qui ne ressemble à aucune autre. Un roman baroque qui fait rire et frémir à la fois.",
      },
      {
        slug: "les-contes-d-amadou-koumba",
        why: "Le recueil qui a fait entrer la tradition orale africaine en littérature : Birago Diop y met par écrit les contes du griot de sa famille. Leuk-le-Lièvre et Bouki-l'Hyène y croisent génies, rois et hommes ordinaires. Des contes courts, drôles ou cruels, à lire seul ou à raconter.",
      },
      {
        slug: "climbie",
        why: "Un roman d'apprentissage largement inspiré de la vie de Bernard Dadié, grande figure de la littérature et de la politique ivoiriennes. On y découvre l'école coloniale, qui punissait les enfants parlant leur langue maternelle, puis l'éveil à la lutte politique. Un témoignage sobre et sans haine.",
      },
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
      "Dix livres écrits par des femmes d'Afrique subsaharienne et de sa diaspora, choisis parmi les fiches de Keurbook, souvent primés et venus de cinq pays. Ils sont classés par date de parution, du plus ancien au plus récent, pour suivre comment ces voix se sont fait entendre. Le n° 1 est donc Une si longue lettre, roman pionnier de Mariama Bâ paru en 1979.",
    items: [
      {
        slug: "une-si-longue-lettre",
        why: "Le livre pionnier de ce top : en 1979, Mariama Bâ donne la parole à Ramatoulaye, une veuve qui écrit à son amie pendant son deuil. Sa voix parle franchement du mariage, de la polygamie et des espoirs des femmes instruites. Prix Noma 1980, le livre est lu dans les lycées de toute l'Afrique francophone.",
      },
      {
        slug: "asseze-l-africaine",
        why: "Calixthe Beyala suit Assèze du village camerounais à Douala, puis jusqu'à Paris, parmi les déracinés. Sa voix rend toute l'intensité d'une amitié-rivalité entre deux jeunes filles. Le roman a reçu le prix François-Mauriac de l'Académie française en 1994.",
      },
      {
        slug: "le-ventre-de-l-atlantique",
        why: "Fatou Diome écrit depuis les deux rives : Salie, installée à Strasbourg, voit son petit frère resté au Sénégal rêver de l'Europe. Ce regard de femme partagée entre deux pays rend le livre drôle et amer à la fois. Une écriture vive, pleine d'humour et de tendresse.",
      },
      {
        slug: "reine-pokou",
        why: "Véronique Tadjo reprend le mythe fondateur du peuple baoulé et en propose plusieurs versions, en variant les points de vue. Sa voix, entre poésie et conte, interroge le sacrifice et la violence faite au nom du peuple. Un texte bref, Grand prix littéraire d'Afrique noire 2005.",
      },
      {
        slug: "l-autre-moitie-du-soleil",
        why: "Chimamanda Ngozi Adichie raconte la guerre du Biafra, souvent oubliée, à travers des personnages qu'on suit pendant des années. Écrit en anglais, le roman se lit en traduction française. Il a reçu l'Orange Prize 2007 et a révélé son autrice.",
      },
      {
        slug: "trois-femmes-puissantes",
        why: "Marie NDiaye fait le portrait de trois femmes, entre la France et l'Afrique, qui refusent de plier face à l'humiliation. Son écriture ample et précise donne une grande force à ces trois récits. Prix Goncourt 2009.",
      },
      {
        slug: "la-saison-de-l-ombre",
        why: "Léonora Miano raconte le début de la traite atlantique depuis l'Afrique, du point de vue des mères de douze jeunes hommes disparus. Son écriture ample, presque incantatoire, donne la parole aux familles des disparus. Prix Femina 2013.",
      },
      {
        slug: "les-maquisards",
        why: "Hemley Boum raconte la lutte pour l'indépendance du Cameroun en pays bassa, sur plusieurs générations. Les femmes y tiennent une place centrale : elles nourrissent, cachent, transmettent et combattent. Une grande fresque sur une guerre longtemps passée sous silence, Grand prix littéraire d'Afrique noire 2015.",
      },
      {
        slug: "tropique-de-la-violence",
        why: "Nathacha Appanah fait se succéder plusieurs voix pour raconter Mayotte et ses enfants des rues, dont Moïse, adopté bébé par une infirmière venue de métropole. Le roman est court et intense, et chaque voix éclaire un point de vue. Prix Femina des lycéens 2016.",
      },
      {
        slug: "les-impatientes",
        why: "Djaïli Amadou Amal fait entendre trois femmes du nord du Cameroun à qui l'on répète un seul conseil : « munyal », patience. Leurs voix disent de l'intérieur la polygamie et le mariage forcé. Un roman court, direct et très fort, prix Goncourt des lycéens 2020.",
      },
    ],
    start:
      "Pour commencer, [Une si longue lettre](/livre/une-si-longue-lettre), court et bouleversant, ou [Les Impatientes](/livre/les-impatientes). Pour un grand roman d'histoire, [La Saison de l'ombre](/livre/la-saison-de-l-ombre) ou [Les Maquisards](/livre/les-maquisards).",
    faq: [
      {
        q: "Comment avez-vous choisi ces dix livres ?",
        a: "Parmi les livres d'autrices présentés sur Keurbook, nous avons retenu ceux que leurs fiches conseillent ou que de grands prix ont distingués, en variant les époques et les pays. Ils sont rangés par date de parution.",
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
      "Dix romans d'écrivains des deux Congo (Brazzaville et Kinshasa) et du Cameroun, sans reprendre Verre Cassé ni Une vie de boy, déjà dans notre top 10 des romans à lire absolument. Le classement suit le nombre de prix littéraires reçus par chaque livre, d'après sa fiche, puis notre préférence en cas d'égalité. L'Intérieur de la nuit, couronné par trois prix, arrive donc en tête.",
    items: [
      {
        slug: "l-interieur-de-la-nuit",
        why: "Le premier roman de la Camerounaise Léonora Miano, couronné en 2006 par trois prix, dont le prix Louis-Guilloux. Ayané revient dans son village d'un pays imaginaire d'Afrique centrale au moment où des combattants y imposent l'impensable. Une réflexion saisissante sur la violence et la responsabilité collective, premier volet de sa « Suite africaine ».",
      },
      {
        slug: "temps-de-chien",
        why: "À travers les yeux d'un chien, Mboudjak, c'est tout le Cameroun des années de crise qui parle, depuis un bar de Yaoundé. Patrice Nganang fait entendre le Yaoundé populaire, sa langue et ses colères. Prix Marguerite-Yourcenar 2001 et Grand prix littéraire d'Afrique noire 2002.",
      },
      {
        slug: "congo-inc",
        why: "Kinshasa dans toute sa démesure, vue par Isookanga, jeune Pygmée venu de la forêt pour faire fortune. In Koli Jean Bofane raconte avec un humour ravageur le pillage des richesses de la RD Congo. Grand prix du roman métis 2014 et prix des Cinq Continents 2015.",
      },
      {
        slug: "memoires-de-porc-epic",
        why: "Selon une croyance du Congo, chaque humain aurait un double animal : ici, c'est le porc-épic qui raconte. Alain Mabanckou mêle fable et roman noir, dans la même veine que Verre Cassé, et raconte les croyances congolaises avec humour. Prix Renaudot 2006.",
      },
      {
        slug: "mission-terminee",
        why: "Recalé au baccalauréat, Jean-Marie Medza est envoyé dans un village de brousse du Cameroun des années 1950 pour ramener une épouse en fuite. Mongo Beti en tire une comédie pleine de malice sur l'école coloniale et ses « évolués ». Prix Sainte-Beuve 1958.",
      },
      {
        slug: "tram-83",
        why: "Dans une ville minière qui a fait sécession, tout le monde finit au Tram 83, une boîte de nuit ouverte jour et nuit. Fiston Mwanza Mujila écrit ce premier roman comme on improvise un morceau de jazz. Remarqué dans le monde entier, il a reçu le Grand prix des associations littéraires 2015.",
      },
      {
        slug: "les-honneurs-perdus",
        why: "Saïda a grandi dans un quartier pauvre de Douala ; à cinquante ans passés, elle part pour Paris et découvre une autre façon d'être femme. Calixthe Beyala écrit dans une langue colorée et pleine d'humour, entre Douala et Belleville. Grand prix du roman de l'Académie française 1996.",
      },
      {
        slug: "le-feu-des-origines",
        why: "Par la vie de Mandala Mankunku, enfant aux yeux verts qui dépasse tous ses maîtres, Emmanuel Dongala raconte la première moitié du XXe siècle au Congo. On y voit la conquête coloniale depuis un village congolais. Une épopée au souffle de légende, Grand prix littéraire d'Afrique noire 1988.",
      },
      {
        slug: "un-ocean-deux-mers-trois-continents",
        why: "Au début du XVIIe siècle, un prêtre né au bord du fleuve Kongo part comme ambassadeur auprès du pape, à bord d'un navire négrier. Wilfried N'Sondé s'inspire d'un personnage historique méconnu pour raconter la traite atlantique. Un roman d'aventures, prix Ahmadou-Kourouma 2018.",
      },
      {
        slug: "la-vie-et-demie",
        why: "Sony Labou Tansi, écrivain du Congo-Brazzaville, imagine la Katamalanasie, un pays d'Afrique gouverné par un dictateur, le Guide Providentiel. Un opposant exécuté y refuse de mourir et hante le tyran sur plusieurs générations. Sa langue inventive et explosive fait rire et frémir à la fois.",
      },
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
      "Dix recueils de poètes d'Afrique subsaharienne, choisis parmi les livres de poésie présentés sur Keurbook, en variant les pays et les époques. Ils sont classés par date de parution, pour suivre près d'un siècle de poésie, des pionniers aux voix d'aujourd'hui. Le n° 1 est donc Presque-songes, recueil de 1934 du Malgache Jean-Joseph Rabearivelo.",
    items: [
      {
        slug: "presque-songes",
        why: "Le plus ancien recueil de ce top, et l'un des premiers grands livres de la poésie africaine d'expression française. Jean-Joseph Rabearivelo y écrit, en malgache et en français, des poèmes en prose où les hautes terres et les mythes de Madagascar deviennent des visions presque rêvées. Un recueil bref, à lire poème par poème.",
      },
      {
        slug: "afrique-debout",
        why: "Le premier recueil de Bernard Dadié, paru en 1950 alors qu'il militait contre le système colonial en Côte d'Ivoire. Ses poèmes appellent l'Afrique à se relever et à refuser la domination, avec colère mais aussi espoir et fraternité. Des vers simples et puissants, faits pour être dits.",
      },
      {
        slug: "ethiopiques",
        why: "Senghor y chante l'Afrique, ses paysages, ses rois et ses femmes, dans des poèmes faits pour être dits avec kôras, balafong et tam-tams. On y trouve « Chaka » et « À New York », un poème qui n'a pas pris une ride. L'un des recueils essentiels de la négritude, à lire à voix haute.",
      },
      {
        slug: "leurres-et-lueurs",
        why: "Le seul recueil de poèmes de Birago Diop, écrit sur plus de trente ans. Il contient « Souffles », où les morts vivent dans l'arbre, l'eau et le vent : l'un des poèmes les plus connus d'Afrique. Une poésie musicale et brève, idéale pour commencer.",
      },
      {
        slug: "cycles-sombres",
        why: "La poésie de Wole Soyinka réunie en français, dont « Idanre », long poème consacré à Ogun, dieu yoruba du fer et des routes. On y lit aussi des poèmes écrits en prison pendant la guerre du Biafra. Une poésie exigeante, mythique et politique, traduite de l'anglais.",
      },
      {
        slug: "kaidara",
        why: "Un grand poème initiatique de la tradition peule, recueilli, traduit et enrichi par Amadou Hampâté Bâ. Trois compagnons descendent au pays des génies nains et rencontrent Kaïdara, dieu de l'or et de la connaissance. Une réflexion sur le savoir, le pouvoir et la richesse, qui se lit comme une épopée.",
      },
      {
        slug: "laterite",
        why: "Le premier livre de Véronique Tadjo : des poèmes courts et lumineux, nés de la terre rouge d'Afrique de l'Ouest. Elle y parle d'amour et de paysages, mais aussi des injustices et des espoirs de son continent. Faciles à lire à voix haute, ils sont réédités en poche avec un second recueil.",
      },
      {
        slug: "la-legende-de-l-errance",
        why: "Avant ses romans, Alain Mabanckou était poète : ce long poème est l'adieu d'un fils exilé à sa mère, morte seule au Congo. Il reconstitue en vers les signes du deuil, comme on raconte une légende. On y entend déjà la douleur de l'absence qui traversera toute son œuvre.",
      },
      {
        slug: "sur-les-berges-du-chari-district-nord-de-la-beaute",
        why: "Pour la première fois, Nimrod inscrit dans un titre le nom qui le relie au Tchad : le Chari, fleuve qui se jette dans le lac Tchad. Ses poèmes en disent les paysages, les ciels et les pêcheurs, sans oublier la mémoire de l'esclavage ni la répression. Le Tchad du poète, entre beauté et blessures.",
      },
      {
        slug: "ishindenshin",
        why: "Le plus récent recueil du top, au carrefour des genres : une pièce de théâtre, des poèmes, des chansons et un essai, « Pourquoi je suis poète ! ». On y découvre Felwine Sarr poète et musicien, moins connu que l'essayiste. Un livre bref, à lire par fragments.",
      },
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
      "Dix livres pour enfants d'auteurs d'Afrique subsaharienne, choisis parmi les livres jeunesse du site : albums illustrés, contes à lire le soir et premiers romans. Ils sont classés selon l'âge du lecteur, du plus jeune au plus grand : les albums à lire aux petits d'abord, les romans pour les 10 ans et plus à la fin. Le n° 1 est donc une fable pour les tout-petits, Pourquoi le lion n'est plus le roi des animaux.",
    items: [
      {
        slug: "pourquoi-le-lion-n-est-plus-le-roi-des-animaux",
        why: "Pour les tout-petits : une petite mangouste ose désobéir au lion tout-puissant, et son audace change l'ordre des choses. Une fable drôle sur le pouvoir, à lire dès le plus jeune âge. C'est le tout premier livre d'In Koli Jean Bofane, l'auteur de Congo Inc.",
      },
      {
        slug: "mamy-wata-et-le-monstre",
        why: "Un album aux couleurs vives, illustré par Véronique Tadjo elle-même. Mamy Wata, la reine des eaux, part à la rencontre d'un monstre qui terrorise les villages, et découvre une histoire plus triste qu'on ne le croit. Une belle façon de présenter aux petits une grande figure des croyances d'Afrique de l'Ouest.",
      },
      {
        slug: "le-taxi-brousse-de-papa-diop",
        why: "Sène accompagne son oncle au volant d'un taxi-brousse entre Dakar et Saint-Louis, et chaque voyage est une aventure. Les illustrations éclatantes sont pleines de détails à observer avec l'enfant. Un classique de l'album jeunesse africain, réédité avec un CD.",
      },
      {
        slug: "ma-soeur-etoile",
        why: "Un album tendre, tiré des souvenirs d'enfance d'Alain Mabanckou : au Congo, un garçon unique se confie la nuit à une petite étoile qu'il appelle sa sœur. Les illustrations sont de Judith Gueyfier. Une jolie histoire sur la solitude, à lire avec les plus jeunes.",
      },
      {
        slug: "la-diablesse-et-son-enfant",
        why: "Un premier roman à lire seul ou à deux, dès 6 ans. Une diablesse aux pieds de chèvre cherche son enfant perdu, mais les villageois lui claquent la porte au nez. Marie NDiaye signe un conte doux et grave sur la rumeur et la peur de l'autre.",
      },
      {
        slug: "le-pagne-noir",
        why: "Des contes de Côte d'Ivoire qui se lisent en quelques minutes, parfaits pour le soir. Kacou Ananzè, l'araignée rusée et gourmande, y joue des tours à tous les animaux, souvent à ses dépens. Un classique des bibliothèques d'école, lu par des générations d'écoliers.",
      },
      {
        slug: "la-belle-histoire-de-leuk-le-lievre",
        why: "Le livre de lecture qui a appris à lire à des générations d'écoliers africains, écrit par Senghor et Abdoulaye Sadji. Leuk, le petit lièvre malin, déjoue les ruses de Bouki l'hyène au fil de courts chapitres illustrés. Il se lit toujours avec plaisir, à l'école comme en famille.",
      },
      {
        slug: "trois-petits-cireurs",
        why: "Un court roman pour les jeunes lecteurs : Mamou, Abel et Nyassa cirent des chaussures devant les grands hôtels et partagent chaque soir leurs gains. Francis Bebey raconte avec tendresse l'amitié et le courage d'enfants obligés de grandir trop vite. Une histoire pleine de dignité.",
      },
      {
        slug: "petit-bodiel-et-autres-contes-de-la-savane",
        why: "Pour les lecteurs à partir de 10 ans : Petit Bodiel, lièvre paresseux et gourmand, se sert de la ruse pour tromper des animaux bien plus grands que lui. Amadou Hampâté Bâ réunit des contes de la savane qui se moquent de la vanité et de l'avidité. Drôles et pleins de sagesse, ils se lisent en famille.",
      },
      {
        slug: "yacouba-chasseur-africain",
        why: "Le seul roman pour la jeunesse d'Ahmadou Kourouma, à partir de 10 ans. Mathieu, jeune Franco-Ivoirien en vacances à Abidjan, découvre une famille divisée sur l'initiation des garçons par Yacouba, chasseur et prêtre traditionnel. Une découverte de la Côte d'Ivoire d'aujourd'hui et des chasseurs malinké.",
      },
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
      "Dix livres d'auteurs africains pour comprendre l'histoire du continent, choisis parmi les essais et récits du site : épopées transmises par les griots, essais et témoignages. Ils sont classés selon l'époque qu'ils racontent, de la plus ancienne à la plus récente, pour lire l'histoire dans l'ordre. Le n° 1 est donc Nations nègres et culture, de Cheikh Anta Diop, qui remonte à l'Égypte ancienne.",
    items: [
      {
        slug: "nations-negres-et-culture",
        why: "Le livre qui remonte le plus loin : Cheikh Anta Diop y soutient que l'Égypte ancienne était une civilisation africaine noire, effacée par le regard colonial. Paru en 1954, il a changé le regard de toute une génération sur l'histoire africaine. Un classique de la pensée panafricaine, qui suscite encore des débats.",
      },
      {
        slug: "soundjata-ou-l-epopee-mandingue",
        why: "Pour le XIIIe siècle : la fondation de l'empire du Mali par Soundjata Keïta, telle que la racontait le griot Mamadou Kouyaté. Djibril Tamsir Niane l'a transcrite en français. L'épopée se lit comme un récit captivant, entre histoire, magie et héroïsme.",
      },
      {
        slug: "le-maitre-de-la-parole",
        why: "Une autre version, plus ample, de la même épopée de Soundjata, recueillie par Camara Laye auprès du griot Babou Condé, en Haute-Guinée. L'écrivain a gardé le souffle de la récitation, ses généalogies et ses chants. À lire après celle de Djibril Tamsir Niane, pour voir comment vit la tradition orale.",
      },
      {
        slug: "l-empire-peul-du-macina",
        why: "L'histoire de la Dina, l'État musulman fondé en 1818 par le marabout peul Sékou Amadou dans le delta intérieur du Niger. Amadou Hampâté Bâ et Jacques Daget la retracent jusqu'en 1853, surtout à partir des traditions orales. Un travail pionnier pour comprendre le Mali d'avant la colonisation.",
      },
      {
        slug: "histoire-synthetique-de-l-afrique-resistante",
        why: "Nazi Boni raconte l'histoire de l'Afrique du côté de ceux qui ont résisté, face aux invasions, à la traite et à la conquête coloniale. Rois, chefs de guerre et peuples entiers y sont les acteurs de leur propre histoire. Le livre, préfacé par l'historien Jean Suret-Canale, est paru après la mort de l'auteur.",
      },
      {
        slug: "un-long-chemin-vers-la-liberte",
        why: "L'autobiographie de Nelson Mandela, de son enfance au Transkei à ses vingt-sept années de prison. Un témoignage essentiel pour comprendre l'apartheid et la lutte pour l'abolir. Écrit en anglais, il se lit en traduction française ; le récit est simple, humain et souvent émouvant.",
      },
      {
        slug: "main-basse-sur-le-cameroun",
        why: "L'histoire cachée de l'indépendance du Cameroun : Mongo Beti y raconte comment l'UPC a été écartée du pouvoir au profit d'un régime soutenu par Paris. Ce pamphlet fut saisi et interdit en France à sa parution. Une plume de romancier au service du combat politique.",
      },
      {
        slug: "l-ombre-d-imana",
        why: "En 1998, quatre ans après le génocide des Tutsi, Véronique Tadjo se rend au Rwanda et rencontre rescapés, orphelins et prisonniers. Son récit court mêle témoignages, impressions de voyage et fiction. Un des grands livres du projet « Écrire par devoir de mémoire ».",
      },
      {
        slug: "critique-de-la-raison-negre",
        why: "Achille Mbembe retrace l'histoire du mot « nègre », de la traite atlantique à la colonisation et à nos sociétés mondialisées. Il relie l'histoire de l'esclavage aux débats d'aujourd'hui. Un essai majeur, exigeant mais éclairant, à lire par chapitres.",
      },
      {
        slug: "restituer-le-patrimoine-africain",
        why: "Le plus actuel : le texte de Felwine Sarr et Bénédicte Savoy, né de la mission confiée après l'annonce faite en 2017 à Ouagadougou par le président Macron. Il retrace les pillages de l'époque coloniale et propose des mesures pour rendre les œuvres. Ce texte a ouvert la voie aux restitutions au Bénin et au Sénégal.",
      },
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
      "Dix romans d'auteurs d'Afrique subsaharienne et de sa diaspora parus depuis 2015, sans reprendre Petit pays ni La plus secrète mémoire des hommes, déjà dans notre top 10 des romans à lire absolument. Le classement suit le nombre de prix littéraires reçus par chaque livre, d'après sa fiche, puis notre préférence en cas d'égalité. Frère d'âme, couronné trois fois dont par l'International Booker Prize, arrive donc en tête.",
    items: [
      {
        slug: "frere-d-ame",
        why: "Trois prix, dont l'International Booker Prize 2021 : le roman de David Diop a été salué en France comme à l'étranger. Il donne voix à Alfa Ndiaye, tirailleur sénégalais rongé par la culpabilité dans les tranchées de 1914-1918. Une voix hypnotique, qui répète et envoûte comme un chant.",
      },
      {
        slug: "la-nuit-au-coeur",
        why: "Salué en 2025 par le prix Femina, le Goncourt des lycéens et le Renaudot des lycéens. Nathacha Appanah y entrelace trois histoires de femmes prises dans l'emprise d'un compagnon violent, dont la sienne. Un texte courageux et nécessaire sur les violences conjugales.",
      },
      {
        slug: "silence-du-choeur",
        why: "Trois prix en 2018 pour ce grand roman choral : soixante-douze jeunes migrants africains attendent dans un village de Sicile qu'on statue sur leur demande d'asile. Mohamed Mbougar Sarr fait de ce village le miroir de toute l'Europe face aux migrations. C'est son deuxième roman, quatre ans avant son Goncourt.",
      },
      {
        slug: "camarade-papa",
        why: "Gauz revisite la colonisation de la Côte d'Ivoire avec deux voix étonnantes : un jeune Français de la fin du XIXe siècle et un petit garçon d'Amsterdam élevé par des parents communistes. Un roman drôle, inventif et très documenté. Grand prix littéraire d'Afrique noire et prix Ivoire 2018.",
      },
      {
        slug: "le-reve-du-pecheur",
        why: "Hemley Boum relie Zack, psychologue à Paris, à son grand-père pêcheur sur la côte camerounaise, dont la vie a été bouleversée par une compagnie forestière. Un grand roman sur les blessures qui passent d'une génération à l'autre. Prix Louis-Guilloux 2024 et prix des Cinq continents de la Francophonie 2025.",
      },
      {
        slug: "jacaranda",
        why: "Après Petit pays, Gaël Faye revient au Rwanda : Milan, élevé à Versailles par une mère rwandaise qui ne dit rien de son pays, découvre peu à peu son histoire. Le roman suit trente ans et plusieurs générations, entre mémoire du génocide et désir de vivre. Prix Renaudot 2024.",
      },
      {
        slug: "no-home",
        why: "Un premier roman salué dans le monde entier : deux demi-sœurs du XVIIIe siècle, l'une mariée à un gouverneur anglais, l'autre déportée en Amérique. Chaque chapitre suit un de leurs descendants, du Ghana à Harlem. Écrit en anglais, il se lit en traduction française ; PEN/Hemingway Award 2017.",
      },
      {
        slug: "tous-tes-enfants-disperses",
        why: "Trois générations d'une famille rwandaise, séparées par le génocide des Tutsi, cherchent à renouer entre Bordeaux et Butare. Beata Umubyeyi Mairesse écrit l'après-génocide avec une grande pudeur, en faisant entendre tour à tour leurs trois voix. Prix des Cinq Continents de la Francophonie 2020.",
      },
      {
        slug: "anguille-sous-roche",
        why: "Un roman entier en une seule phrase : Anguille, jeune femme d'Anjouan, raconte sa vie en luttant pour ne pas se noyer. Ali Zamir fait entendre une héroïne comorienne insolente et libre. Prix Senghor du premier roman francophone 2016.",
      },
      {
        slug: "je-remercie-la-nuit",
        why: "Véronique Tadjo raconte la crise électorale ivoirienne de 2010-2011 à travers deux amies étudiantes à Abidjan, que la violence sépare. Un roman sur l'amitié, l'exil et l'espoir d'une génération. Prix Ivoire 2025.",
      },
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
