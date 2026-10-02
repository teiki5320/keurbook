/** Compléments du groupe 2 (voir docs/EXTRAS.md). */
import type { Adaptation, Quote } from "../../types";

export const facts: Record<string, string[]> = {
  "camara-laye": [
    "Après l'indépendance de la Guinée, il devient le premier ambassadeur de son pays au Ghana.",
    "Le Maître de la parole s'appuie sur la récitation de l'épopée de Soundiata que lui a faite le griot Babou Condé.",
    "Le philosophe Kwame Anthony Appiah voit dans Le Regard du roi l'un des plus grands romans africains de la période coloniale.",
  ],
  "tierno-monenembo": [
    "En 1969, pour fuir le régime de Sékou Touré, il quitte la Guinée et gagne le Sénégal à pied.",
    "Il était en résidence d'écrivain à Cuba quand il a appris qu'il recevait le prix Renaudot 2008.",
    "L'Aîné des orphelins est né de son voyage au Rwanda en 1998, avec d'autres écrivains africains venus « écrire par devoir de mémoire » après le génocide.",
    "Le Terroriste noir raconte la vie d'Addi Bâ, un Guinéen devenu héros de la Résistance dans les Vosges, fusillé par les Allemands.",
  ],
  "djibril-tamsir-niane": [
    "Soundjata ou l'Épopée mandingue transcrit le récit du griot Mamadou Kouyaté, derrière lequel Niane disait s'effacer.",
    "Ses écrits lui valent la prison sous Sékou Touré, de 1961 à 1964, avant son exil au Sénégal.",
    "De 1965 à 1973, il dirige la mission archéologique guinéo-polonaise à Niani, l'ancienne capitale supposée de l'empire du Mali.",
    "Rentré en Guinée en 1990, il y fonde la Société africaine d'édition et de communication, première maison d'édition privée du pays.",
  ],
  "ahmadou-kourouma": [
    "Son nom, Kourouma, signifie « guerrier » en malinké.",
    "Tirailleur, il refuse de participer à la répression de manifestants du RDA : il est envoyé en Indochine par mesure disciplinaire.",
    "Grand sportif, il est champion de saut en longueur en Indochine, puis champion de saut en hauteur à l'université de Lyon.",
    "Allah n'est pas obligé répond à des enfants rencontrés en Afrique de l'Est, qui lui avaient demandé d'écrire sur les guerres qu'ils avaient vécues.",
  ],
  "veronique-tadjo": [
    "Adolescente, elle devient la première Ivoirienne ceinture noire de taekwondo.",
    "Au début des années 1980, elle traverse le Sahara de la France à la Côte d'Ivoire : ce voyage lui inspire son premier recueil, Latérite.",
    "En 1998, elle part au Rwanda avec d'autres écrivains africains pour « écrire par devoir de mémoire » : il en sortira L'Ombre d'Imana.",
    "Mamy Wata et le Monstre figure parmi les 100 meilleurs livres africains du XXe siècle, l'un des quatre livres pour enfants retenus.",
  ],
  "bernard-dadie": [
    "Élève à l'école William-Ponty, il écrit sa première pièce, Assémien Déhylé, jouée à Dakar en 1936 devant le gouverneur général.",
    "Journaliste militant à la fin des années 1940, il signe sous de nombreux pseudonymes, dont « Le Veilleur ».",
    "Son poème « Sèche tes pleurs » a fourni les paroles de « Dry Your Tears, Afrika », chant composé par John Williams pour le film Amistad de Steven Spielberg (1997).",
  ],
  gauz: [
    "Le titre Debout-payé désigne les métiers où l'on est payé pour rester debout, comme celui de vigile, qu'il a exercé deux ans à Paris.",
    "Traduit en anglais sous le titre Standing Heavy, Debout-payé figure en 2023 dans la dernière sélection de l'International Booker Prize.",
    "Il a coécrit avec Éliane de Latour le scénario du film Après l'océan (2006), présenté au festival de Berlin.",
    "En 2022, il fonde sa propre maison d'édition en Côte d'Ivoire, les éditions Srèlè.",
  ],
  "mbarek-ould-beyrouk": [
    "Le journal qu'il fonde en 1988, Mauritanie demain, est le premier journal indépendant du pays.",
    "Le Tambour des larmes a été traduit en anglais sous le titre The Desert and the Drum.",
  ],
  "nazi-boni": [
    "Crépuscule des temps anciens fait revivre le pays bwa d'avant la colonisation et la guerre du Bani-Volta, grande révolte contre les Français.",
    "L'université de Bobo-Dioulasso porte aujourd'hui son nom : université Nazi-Boni.",
  ],
  "olympe-bhely-quenum": [
    "Un piège sans fin a été traduit en anglais par Dorothy Blair sous le titre Snares Without End (1981).",
    "Pour le bicentenaire de Pouchkine, dont un ancêtre était africain, il a comparé ses contes au récit africain traditionnel.",
    "Il a annoncé léguer sa bibliothèque de plus de dix mille livres aux enfants du Bénin, par l'intermédiaire de la fondation Zinsou.",
  ],
  "sami-tchak": [
    "Son premier roman, Femme infidèle, paraît à Lomé en 1988 sous son vrai nom, Sadamba Tcha-Koura, présenté comme l'un des rares auteurs masculins féministes.",
    "Place des fêtes se compose de 73 courts chapitres.",
    "Il dit avoir été marqué par la littérature d'Amérique latine, notamment La Ville et les Chiens de Mario Vargas Llosa.",
  ],
  "kossi-efoui": [
    "Dans Le Carrefour, sa première pièce, il refuse de dire si ses personnages sont noirs ou africains : ce sont d'abord des corps.",
    "Depuis 2006, il écrit pour le Théâtre Inutile, une compagnie d'Amiens dirigée par Nicolas Saelens.",
  ],
  "mongo-beti": [
    "Son nom de plume, Beti, est celui de son peuple, les Béti du sud du Cameroun.",
    "Son premier roman, Ville cruelle, paraît en 1954 sous un autre pseudonyme : Eza Boto.",
    "Il a éreinté L'Enfant noir de Camara Laye dans un article resté célèbre, « Afrique noire, littérature rose ».",
    "De 1966 à 1994, il enseigne les lettres classiques au lycée Corneille de Rouen.",
  ],
  "ferdinand-oyono": [
    "Étudiant à Paris dans les années 1950, il est aussi comédien, au théâtre et à la télévision.",
    "Ambassadeur aux Nations unies, il préside en 1975 une séance du Conseil de sécurité.",
    "De 1977 à 1978, il préside le conseil d'administration de l'UNICEF.",
  ],
  "calixthe-beyala": [
    "En 1998, elle lance le Collectif Égalité, qui réclame une meilleure place pour les Noirs à la télévision française.",
    "En 2010, elle écrit et réalise un documentaire sur Manu Dibango, Manu Dibango, Tempo d'Afrique, diffusé sur France 5.",
    "En 1994, elle présente la série documentaire Rêves d'Afrique sur France Télévisions.",
  ],
  "leonora-miano": [
    "Pour mettre en scène sa pièce Révélation en 2018, elle choisit le Japonais Satoshi Miyagi, dont la culture est éloignée de l'histoire de la traite.",
    "En 2015, elle dirige Volcaniques, une anthologie du plaisir écrite par douze autrices du monde noir.",
    "Depuis 2021, un prix littéraire porte son nom : le prix Frontières-Léonora Miano, qui récompense un roman sur le thème des frontières.",
  ],
};

export const quotes: Record<string, Quote> = {
  // Camara Laye (Wikiquote FR)
  "l-enfant-noir": {
    text: "Chez nous, on ne parle guère des défunts qu'on a beaucoup aimés ; on a le cœur trop lourd sitôt qu'on évoque leur souvenir.",
    source: "chapitre 3",
  },
  dramouss: { text: "Un être humain vaut plus que tous les comptes en banque de la terre.", source: null },
  // Djibril Tamsir Niane
  "soundjata-ou-l-epopee-mandingue": { text: "Le monde est vieux, mais l'avenir sort du passé.", source: null },
  // Tierno Monénembo
  "les-ecailles-du-ciel": {
    text: "Il n'a pas une âme comme tout le monde le griot. Son âme à lui, c'est la parole.",
    source: "chapitre 1",
  },
  "l-aine-des-orphelins": { text: "Y a toujours de la vie qui reste, même quand le diable est passé !", source: null },
  // Ahmadou Kourouma
  "les-soleils-des-independances": {
    text: "La plus belle harmonie, ce n'est ni l'accord des tambours, ni l'accord des xylophones, ni l'accord des trompettes, c'est l'accord des hommes.",
    source: null,
  },
  "en-attendant-le-vote-des-betes-sauvages": {
    text: "Le proverbe est le cheval de la parole ; quand la parole se perd, c’est grâce au proverbe qu’on la retrouve.",
    source: null,
  },
  "allah-n-est-pas-oblige": {
    text: "Allah dans sa bonté ne laisse jamais vide une bouche qu’il a créée.",
    source: "Birahima",
  },
  // Véronique Tadjo
  "l-ombre-d-imana": {
    text: "Se souvenir. Témoigner. C'est ce qui nous reste pour combattre le passé et restaurer notre humanité.",
    source: null,
  },
  "reine-pokou": { text: "La puissance porte toujours un masque grimaçant.", source: null },
  "a-vol-d-oiseau": {
    text: "Je réarrange le puzzle, déplace les moments, récupère les souvenirs. Tu vis ta vie, je vis la mienne. Il y a mille histoires, mille saisons du cœur.",
    source: "chapitre 20",
  },
  // Bernard Dadié
  climbie: {
    text: "C’est toujours en blanc que les morts s’habillent pour vivre dans la ville où nul ne meurt.",
    source: null,
  },
  "un-negre-a-paris": {
    text: "Ce ne sont pas toujours les porteurs de tam-tams qui sont les bons danseurs.",
    source: null,
  },
  "les-voix-dans-le-vent": { text: "La vérité ne meurt pas. Elle triomphe de tous les mensonges.", source: null },
  // Gauz
  "debout-paye": { text: "Les malheurs sont toujours bien plus bruyants que les bonheurs.", source: null },
  "camarade-papa": {
    text: "Toute cause est d’avance perdue si elle ne s’exprime que par la bouche d’un seul.",
    source: null,
  },
  "black-manoo": { text: "La fête n'a pas de limite tant qu'il fait nuit.", source: null },
  // Olympe Bhêly-Quenum
  "un-piege-sans-fin": { text: "La compréhension est à la source de toute amitié vraie et durable.", source: null },
  "la-naissance-d-abikou": {
    text: "Il n'est pas facile à un peuple de faire valoir sa culture, tant que politiquement et économiquement, il n'est pas maître de lui et de ses affaires.",
    source: null,
  },
  // Sami Tchak
  "la-fete-des-masques": { text: "La grande littérature vient à bout de tous les fantômes existentiels.", source: null },
  // Kossi Efoui
  "la-fabrique-de-ceremonies": { text: "Le style, ça se fabrique. Le talent, c’est des foutaises.", source: null },
  // Ferdinand Oyono
  "le-vieux-negre-et-la-medaille": {
    text: "Il faut savoir durer sur cette terre, c’est une chance parfois pénible.",
    source: null,
  },
  "chemin-d-europe": { text: "La vérité n’a jamais plaidé en faveur d'un pauvre type.", source: null },
  // Calixthe Beyala
  "c-est-le-soleil-qui-m-a-brulee": {
    text: "Malgré les étoiles qui trouent le ciel, les ténèbres gagnent.",
    source: null,
  },
  "maman-a-un-amant": { text: "Ma grand-mère avait raison : le silence indique les hiérarchies.", source: null },
  "seul-le-diable-le-savait": { text: "La laideur appartient à ceux qui la définissent.", source: null },
  "amours-sauvages": { text: "Tout ce que le soleil a vu, les hommes finissent par le savoir.", source: null },
  "femme-nue-femme-noire": {
    text: "Chez nous, les rires comme les pleurs ont la force d'un fleuve en crue.",
    source: null,
  },
  // Léonora Miano
  "la-saison-de-l-ombre": {
    text: "Révéler son nom à quelqu'un, c'est lui confier une part précieuse de soi-même, se dénuder devant lui.",
    source: null,
  },
  "tels-des-astres-eteints": {
    text: "Le racisme véritable, pour Amandla, consistait en deux choses : le pouvoir de détruire l’autre, la mise en œuvre de cette capacité.",
    source: null,
  },
  "crepuscule-du-tourment": {
    text: "On a beau écouter, on n’entend que ce qui est au fond de soi.",
    source: null,
  },
};

export const adaptations: Record<string, Adaptation[]> = {
  "l-enfant-noir": [
    { kind: "film", title: "L'Enfant noir", year: 1995, by: "Laurent Chevallier" },
    { kind: "BD", title: "L'Enfant noir", year: 2010, by: "Camara Anzoumana" },
  ],
  "allah-n-est-pas-oblige": [
    { kind: "théâtre", title: "Allah n'est pas obligé", year: 2004, by: "René Georges" },
    { kind: "animation", title: "Allah n'est pas obligé", year: 2025, by: "Zaven Najjar" },
  ],
  "une-vie-de-boy": [{ kind: "théâtre", title: "Houseboy", year: 2021, by: "William Kentridge" }],
  "le-vieux-negre-et-la-medaille": [
    { kind: "théâtre", title: "Le Vieux Nègre et la médaille", year: 2022, by: "Jacobin Yarro" },
  ],
};
