/** Compléments du groupe 5 (voir docs/EXTRAS.md). */
import type { Adaptation, Quote } from "../../types";

export const facts: Record<string, string[]> = {
  "beata-umubyeyi-mairesse": [
    "Le titre de son premier recueil, Ejo, est un mot kinyarwanda qui veut dire à la fois « hier » et « demain ».",
    "Le convoi qui l'a sauvée en juin 1994 était réservé aux moins de 12 ans : à 15 ans, elle y est montée avec sa mère, cachées au fond d'un camion.",
    "Les arbres du Rwanda reviennent d'un livre à l'autre : le jacaranda dans Ejo et Tous tes enfants dispersés, l'arbre corail et le ficus dans Consolée.",
  ],
  "marguerite-abouet": [
    "Pendant qu'elle écrivait les premiers Aya, elle travaillait comme assistante juridique en banlieue parisienne ; elle n'a quitté ce métier qu'après le succès de la série.",
    "Elle prête sa voix au personnage de l'Africaine dans le film d'animation Le Chat du rabbin (2011), de Joann Sfar et Antoine Delesvaux.",
    "En 2008, elle fonde l'association Des livres pour tous, qui ouvre des bibliothèques pour les enfants des quartiers populaires de Côte d'Ivoire.",
    "En 2012, elle siège au grand jury du festival d'Angoulême, aux côtés d'Art Spiegelman, président du jury.",
  ],
  pahe: [
    "Sur la chaîne gabonaise TV Plus, il croquait l'actualité en direct pendant le journal de 20 heures.",
    "C'est au festival de la caricature de Yaoundé, en 2003, qu'il rencontre l'éditeur suisse Pierre Paquet, qui publiera La Vie de Pahé.",
    "En 2012, Jeune Afrique le range parmi les « 50 qui font le Gabon ».",
  ],
  "joelle-esso": [
    "Musicienne, elle a signé la bande originale du film Les Saignantes (2005) du cinéaste camerounais Jean-Pierre Bekolo.",
    "Choriste de métier, elle a notamment accompagné sur scène la chanteuse Carole Fredericks.",
    "Pour Petit Joss, qui raconte son école primaire de Douala dans les années 1970, elle a recueilli les souvenirs de ses anciens camarades de classe.",
  ],
  "didier-kassai": [
    "Son père ne voulait pas qu'il devienne dessinateur et vérifiait ses cahiers : enfant, il dessinait en cachette dans sa chambre ou à même la terre devant la maison.",
    "Quand son père a perdu son emploi, ce sont ses commandes d'illustrations qui ont fait vivre toute la famille.",
    "Une affiche qu'il a dessinée pour Médecins sans frontières a fait son effet : un homme armé l'a lue devant un centre de santé et a posé son fusil avant d'entrer.",
  ],
  "barly-baruti": [
    "Il a été le décorateur du film La vie est belle (1987), avec Papa Wemba, puis en a tiré une bande dessinée.",
    "Avec Chaos debout à Kinshasa, il fait revivre le célèbre combat de boxe entre Mohamed Ali et George Foreman, disputé à Kinshasa en 1974.",
  ],
  "christophe-ngalle-edimo": [
    "Une de ses histoires courtes, Enfants, illustrée par Fifi Mukuna, a été exposée au Studio Museum de Harlem, à New York, dans une exposition consacrée à la BD africaine.",
  ],
  "simon-pierre-mbumbo": [
    "En 1998, au festival de Libreville, il rencontre un responsable du festival d'Angoulême et décide de partir étudier l'art et l'informatique à Angoulême.",
    "Il fait partie des fondateurs de L'Afrique dessinée, l'association d'auteurs africains de BD créée à Paris en 2001.",
  ],
  "pat-masioni": [
    "Avant de se consacrer au dessin, il est sorti diplômé en architecture de l'Académie des beaux-arts de Kinshasa.",
    "De 1987 à 2001, il a illustré de nombreux romans de Zamenga Batukezanga, l'un des écrivains les plus populaires du Congo.",
    "Son épisode de la série américaine Unknown Soldier a reçu en 2010 le Glyph Comics Award de la meilleure histoire, prix qui distingue les auteurs de BD noirs.",
  ],
  "eyoum-ngangue": [
    "En 1999, il cofonde à Paris l'association Journalistes africains en exil, qu'il préside.",
    "Installé en France, il est devenu responsable de la rubrique culture de l'hebdomadaire Pèlerin.",
  ],
  "faustin-titi": [
    "Il fait partie des fondateurs de L'Afrique dessinée, l'association d'auteurs africains de BD créée à Paris en 2001.",
    "Avant Une éternité à Tanger, il avait déjà été récompensé avec Eyoum Ngangué par le prix italien Africa e Mediterraneo pour Le Flic de Gnasville, un projet de BD sur la corruption.",
  ],
  "serge-diantantu": [
    "En 1997, il lance en France sa propre revue, La Cloche : elle n'a que trois numéros, mais il y dessine ses premières pages sur Simon Kimbangu et y crée la petite Djily.",
    "Il a illustré Il fut un jour à Gorée (2006), où Joseph N'Diaye, conservateur de la Maison des esclaves de Gorée, raconte l'esclavage aux enfants.",
    "Il vivait entièrement de son art grâce aux albums qu'il vendait lui-même dans les salons où il était invité.",
  ],
  "adjim-danngar": [
    "Vers dix ou douze ans, il fabriquait des appareils photo en argile pour « photographier » ses proches, puis les dessinait de mémoire dans sa chambre.",
    "Au Tchad, ses caricatures montraient les puissants avec des mouches tournant autour de la tête en guise de couronne royale.",
  ],
  "didier-viode": [
    "En 2014, ses albums sur l'immigration ont été exposés au Musée de l'histoire de l'immigration, à Paris.",
    "Sa peinture figure dans l'exposition When We See Us, panorama de la peinture figurative panafricaine montré au Cap en 2022 puis à Bruxelles en 2025.",
  ],
  "hallain-paluku": [
    "En 2026, il fait revivre Dadou, le héros de son dessin animé Bana Boul, dans un fanzine de BD diffusé à Kinshasa, à Goma et en Belgique.",
  ],
};

export const quotes: Record<string, Quote> = {
  "aya-de-yopougon": { text: "Appelez-moi Patron tout simplement, on est entre nous.", source: "Bonaventure Sissoko" },
  "aya-de-yopougon-tome-2": {
    text: "Aya, les hommes sont plus compliqués que les femmes, sache-le !",
    source: "Fanta, la mère d'Aya",
  },
  "aya-de-yopougon-tome-3": { text: "Moi vivante, jamais ! Il faudra me tuer d'abord, Koffi !", source: "Alphonsine" },
  "aya-de-yopougon-tome-5": {
    text: "Toutes les questions ont des réponses. Mais toutes les réponses ne sont pas bonnes à dire.",
    source: "Ignace",
  },
  "aya-de-yopougon-tome-7": {
    text: "Vous n'avez toujours pas trouvé une femme à épouser, beau comme vous êtes ? Ça vous aiderait pourtant pour vos papiers.",
    source: "une fonctionnaire de la préfecture, à Innocent",
  },
  consolee: {
    text: "Une marelle pour toutes les petites filles bigarrées, en équilibre entre le ciel et la terre.",
    source: "chapitre « Consolée 1954 »",
  },
  "culbuter-le-malheur": {
    text: "Que peut la poésie, que peuvent les mots pour dire les trente années empoisonnées à jamais par ces trois petits mois ? Si peu. Et pourtant.",
    source: "prologue",
  },
  "le-convoi": { text: "Quinze ans pour m'autoriser enfin à écrire cette histoire.", source: null },
};

export const adaptations: Record<string, Adaptation[]> = {
  "aya-de-yopougon": [
    { kind: "animation", title: "Aya de Yopougon", year: 2013, by: "Marguerite Abouet et Clément Oubrerie" },
  ],
  "la-vie-de-pahe": [{ kind: "animation", title: "Le Monde de Pahé", year: 2010, by: "Paul Leluc" }],
};
