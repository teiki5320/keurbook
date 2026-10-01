import type { Country } from "./types";

/**
 * États souverains d'Afrique subsaharienne (classification ONU M49), codes ISO-2.
 * Mauritanie incluse, Soudan exclu ; territoires (Réunion, Mayotte, Sainte-Hélène…) non inclus.
 */
export const SUBSAHARAN_CODES = [
  // Afrique de l'Est
  "BI", "KM", "DJ", "ER", "ET", "KE", "MG", "MW", "MU", "MZ", "RW", "SC", "SO", "SS", "UG", "TZ", "ZM", "ZW",
  // Afrique centrale
  "AO", "CM", "CF", "TD", "CG", "CD", "GQ", "GA", "ST",
  // Afrique australe
  "BW", "SZ", "LS", "NA", "ZA",
  // Afrique de l'Ouest
  "BJ", "BF", "CV", "CI", "GM", "GH", "GN", "GW", "LR", "ML", "MR", "NE", "NG", "SN", "SL", "TG",
] as const;

export const COUNTRIES: Country[] = [
  {
    code: "SN",
    slug: "senegal",
    name: "Sénégal",
    of: "du Sénégal",
    description:
      "Le Sénégal occupe une place à part dans les lettres africaines : Léopold Sédar Senghor y a porté la négritude, et Birago Diop a fait entrer les contes wolofs dans la littérature écrite. Après les indépendances, Cheikh Hamidou Kane, Ousmane Sembène, Mariama Bâ et Aminata Sow Fall ont raconté la colonisation, les luttes sociales et la place des femmes. Aujourd'hui, Fatou Diome, Boubacar Boris Diop, David Diop et Mohamed Mbougar Sarr, prix Goncourt 2021, prolongent cette tradition. On y écrit surtout en français, mais aussi en wolof, langue dans laquelle Boubacar Boris Diop publie des romans.",
    startWith: ["une-si-longue-lettre", "l-aventure-ambigue", "la-plus-secrete-memoire-des-hommes"],
    lon: -14.5,
    lat: 14.5,
  },
  {
    code: "ML",
    slug: "mali",
    name: "Mali",
    of: "du Mali",
    description:
      "La littérature du Mali plonge ses racines dans une très riche tradition orale, portée par les griots et les grandes épopées de l'empire mandingue. Amadou Hampâté Bâ, qui a consacré sa vie à recueillir et transmettre cette mémoire peule et bambara, en est la grande figure. En 1968, Yambo Ouologuem bouscule tout le monde avec un roman provocateur sur l'histoire africaine, couronné par le prix Renaudot. Les écrivains maliens écrivent en français, en dialogue constant avec les langues nationales comme le bambara et le peul.",
    startWith: ["amkoullel-l-enfant-peul", "l-etrange-destin-de-wangrin", "le-devoir-de-violence"],
    lon: -2.0,
    lat: 17.5,
  },
  {
    code: "GN",
    slug: "guinee",
    name: "Guinée",
    of: "de Guinée",
    description:
      "La Guinée a donné à la littérature africaine l'un de ses livres les plus lus, L'Enfant noir de Camara Laye, récit d'une enfance en pays malinké paru en 1953. L'historien Djibril Tamsir Niane a transcrit l'épopée de Soundjata telle que la racontent les griots, rendant accessible à tous ce récit fondateur. Sous la dictature de Sékou Touré, beaucoup d'auteurs ont dû écrire en exil, comme Tierno Monénembo, prix Renaudot 2008. Le français y côtoie le malinké, le peul et le soussou, très présents dans les récits.",
    startWith: ["l-enfant-noir", "soundjata-ou-l-epopee-mandingue", "le-roi-de-kahel"],
    lon: -11.0,
    lat: 10.5,
  },
  {
    code: "CI",
    slug: "cote-d-ivoire",
    name: "Côte d'Ivoire",
    of: "de Côte d'Ivoire",
    description:
      "La Côte d'Ivoire compte deux géants : Bernard Dadié, pionnier du roman, du conte et du théâtre, et Ahmadou Kourouma, qui a réinventé le français en y faisant entendre le malinké. Les Soleils des indépendances, en 1968, a marqué un tournant en racontant les désillusions de l'après-colonisation. Véronique Tadjo explore les mythes et la mémoire, tandis que Gauz porte un regard plein d'humour sur l'Afrique et la France d'aujourd'hui. Le pays est aussi une terre de bande dessinée, avec la série Aya de Yopougon.",
    startWith: ["les-soleils-des-independances", "allah-n-est-pas-oblige", "climbie"],
    lon: -5.5,
    lat: 7.6,
  },
  {
    code: "MR",
    slug: "mauritanie",
    name: "Mauritanie",
    of: "de Mauritanie",
    description:
      "À la croisée du monde arabe et de l'Afrique de l'Ouest, la Mauritanie a une longue tradition de poésie orale et écrite en hassanya et en arabe. En français, sa littérature est plus récente et moins connue, mais elle s'est fait une place grâce à Mbarek Ould Beyrouk. Ses romans racontent le désert, la vie nomade et les bouleversements d'une société entre traditions et modernité. Pour un lecteur francophone, c'est la porte d'entrée idéale vers ce pays.",
    startWith: ["le-tambour-des-larmes"],
    lon: -10.5,
    lat: 20.3,
  },
  {
    code: "BF",
    slug: "burkina-faso",
    name: "Burkina Faso",
    of: "du Burkina Faso",
    description:
      "Au Burkina Faso, la littérature écrite en français naît avec Nazi Boni, dont le roman Crépuscule des temps anciens, paru en 1962, fait revivre le monde bwa d'avant la colonisation. Le pays reste très attaché à ses traditions orales, aux contes et au théâtre, un genre très vivant sur place. Les langues nationales, comme le mooré ou le dioula, nourrissent les récits. C'est une littérature encore discrète en France, qui mérite d'être découverte.",
    startWith: ["crepuscule-des-temps-anciens"],
    lon: -1.6,
    lat: 12.3,
  },
  {
    code: "BJ",
    slug: "benin",
    name: "Bénin",
    of: "du Bénin",
    description:
      "Le Bénin, ancien Dahomey, a été l'un des premiers foyers de la littérature africaine en français, avec Paul Hazoumé et son roman historique Doguicimi en 1938. Olympe Bhêly-Quenum a publié en 1960 Un piège sans fin, roman sombre sur la fatalité et l'injustice. Le pays a aussi vu naître de grands noms de la diaspora et du théâtre. Ses récits puisent souvent dans l'histoire des royaumes et dans les croyances vodun.",
    startWith: ["un-piege-sans-fin"],
    lon: 2.3,
    lat: 9.5,
  },
  {
    code: "TG",
    slug: "togo",
    name: "Togo",
    of: "du Togo",
    description:
      "Le Togo a une littérature en français plus récente, marquée par le théâtre et par des romanciers à la voix très libre. Sami Tchak, qui vit en France, en est aujourd'hui l'une des figures les plus connues, avec des romans audacieux sur le corps, la ville et l'exil. Ses livres, souvent crus et ironiques, tranchent avec une image sage de la littérature africaine. On y écrit en français, avec l'éwé et le kabiyè en toile de fond.",
    startWith: ["place-des-fetes"],
    lon: 1.0,
    lat: 8.6,
  },
  {
    code: "NG",
    slug: "nigeria",
    name: "Nigeria",
    of: "du Nigeria",
    description:
      "Pays le plus peuplé d'Afrique, le Nigeria est aussi une immense puissance littéraire, qui écrit surtout en anglais. Chinua Achebe a ouvert la voie en 1958 avec un roman devenu un classique mondial, et Wole Soyinka a été le premier Africain à recevoir le prix Nobel de littérature, en 1986. Chimamanda Ngozi Adichie incarne la génération suivante, lue dans le monde entier. Leurs livres sont largement traduits en français.",
    startWith: ["le-monde-s-effondre", "l-autre-moitie-du-soleil"],
    lon: 8.1,
    lat: 9.6,
  },
  {
    code: "GH",
    slug: "ghana",
    name: "Ghana",
    of: "du Ghana",
    description:
      "Premier pays d'Afrique subsaharienne à devenir indépendant, en 1957, le Ghana a une littérature de langue anglaise riche, portée notamment par Ayi Kwei Armah et Ama Ata Aidoo. Sa diaspora compte aujourd'hui des voix majeures, comme Yaa Gyasi, née au Ghana et élevée aux États-Unis. Son premier roman, traduit en français, relie l'histoire de la traite à l'Amérique contemporaine. C'est une bonne manière d'aborder ce pays en français.",
    startWith: ["no-home"],
    lon: -1.0,
    lat: 7.9,
  },
  {
    code: "CM",
    slug: "cameroun",
    name: "Cameroun",
    of: "du Cameroun",
    description:
      "Le Cameroun est l'une des grandes terres de la littérature africaine en français. Dans les années 1950, Mongo Beti et Ferdinand Oyono ont écrit des satires mordantes de la colonisation, toujours très lues. Calixthe Beyala, Léonora Miano, Hemley Boum et Djaïli Amadou Amal ont ensuite donné aux femmes une place centrale, tandis qu'Achille Mbembe s'est imposé comme un penseur majeur. Pays bilingue, français et anglais, le Cameroun compte aussi plus de deux cents langues, qui colorent ses romans.",
    startWith: ["une-vie-de-boy", "le-pauvre-christ-de-bomba", "les-impatientes"],
    lon: 12.5,
    lat: 5.7,
  },
  {
    code: "CF",
    slug: "centrafrique",
    name: "République centrafricaine",
    of: "de la République centrafricaine",
    description:
      "La littérature centrafricaine est peu connue en France, mais elle existe depuis les années 1960 avec des auteurs comme Pierre Makombo Bamboté. Étienne Goyémidé a publié en 1984 Le Silence de la forêt, roman sur la rencontre entre un fonctionnaire et le peuple pygmée aka. Plus récemment, Adrienne Yabouza a raconté la vie quotidienne et les crises du pays. Le sango, langue nationale parlée partout, résonne dans ces récits écrits en français.",
    startWith: [],
    lon: 20.9,
    lat: 6.6,
  },
  {
    code: "GA",
    slug: "gabon",
    name: "Gabon",
    of: "du Gabon",
    description:
      "La littérature gabonaise en français s'est développée surtout après l'indépendance. Angèle Rawiri, avec Elonga en 1980, a été la première romancière du pays. Plus récemment, Janis Otsiemi s'est fait un nom avec des romans policiers ancrés dans les rues de Libreville, et le dessinateur Pahé a raconté son enfance en bande dessinée. Les langues fang, punu ou myènè nourrissent contes et récits.",
    startWith: [],
    lon: 11.6,
    lat: -0.6,
  },
  {
    code: "CG",
    slug: "congo",
    name: "Congo",
    of: "du Congo",
    description:
      "Le Congo-Brazzaville a une littérature étonnamment riche pour un petit pays. Sony Labou Tansi y a inventé une langue exubérante pour dire la folie des dictatures, Henri Lopes et Emmanuel Dongala ont raconté l'histoire politique du pays. Alain Mabanckou, prix Renaudot 2006, est aujourd'hui l'un des écrivains africains les plus lus en France. Humour, satire et goût de la parole caractérisent cette littérature, où le lingala et le kituba affleurent souvent.",
    startWith: ["verre-casse", "la-vie-et-demie", "le-pleurer-rire"],
    lon: 15.2,
    lat: -0.7,
  },
  {
    code: "CD",
    slug: "rd-congo",
    name: "République démocratique du Congo",
    of: "de la République démocratique du Congo",
    description:
      "Immense pays aux centaines de langues, la RD Congo a une littérature marquée par l'histoire de la colonisation belge, des dictatures et des guerres. Une nouvelle génération d'écrivains, souvent installés à l'étranger, en fait une matière romanesque puissante. In Koli Jean Bofane raconte avec ironie la mondialisation vue depuis Kinshasa, et Fiston Mwanza Mujila écrit une prose rythmée comme la rumba. La RD Congo est aussi un grand pays de musique et de bande dessinée.",
    startWith: ["congo-inc", "tram-83"],
    lon: 23.6,
    lat: -2.9,
  },
  {
    code: "RW",
    slug: "rwanda",
    name: "Rwanda",
    of: "du Rwanda",
    description:
      "La littérature rwandaise en français est profondément marquée par le génocide des Tutsi de 1994. Scholastique Mukasonga, prix Renaudot 2012, en est la grande voix : ses livres font revivre les siens et racontent les persécutions qui ont précédé le génocide. D'autres écrivains, africains ou non, ont aussi pris la plume pour que cette histoire ne soit pas oubliée. Le kinyarwanda, langue commune à tout le pays, traverse ces récits.",
    startWith: ["notre-dame-du-nil"],
    lon: 29.9,
    lat: -2.0,
  },
  {
    code: "BI",
    slug: "burundi",
    name: "Burundi",
    of: "du Burundi",
    description:
      "Le Burundi est surtout connu des lecteurs français grâce à Gaël Faye, né à Bujumbura, dont le premier roman a reçu le prix Goncourt des lycéens en 2016. Ses livres racontent une enfance heureuse rattrapée par la guerre civile et par le génocide dans le Rwanda voisin. Le pays a aussi une riche tradition orale en kirundi : contes, poésie pastorale, chants. Sa littérature écrite en français reste peu connue et mérite d'être explorée.",
    startWith: ["petit-pays", "jacaranda"],
    lon: 29.9,
    lat: -3.4,
  },
  {
    code: "TD",
    slug: "tchad",
    name: "Tchad",
    of: "du Tchad",
    description:
      "Au Tchad, la littérature en français naît avec Joseph Brahim Seid, qui publie en 1962 Au Tchad sous les étoiles, recueil de contes et légendes. Le pays écrit en français et en arabe, et sa tradition orale reste très vivante. Des auteurs comme Koulsy Lamko, dramaturge et romancier, ou le poète Nimrod ont fait connaître cette littérature au-delà des frontières. Les guerres et l'exil y sont des thèmes récurrents.",
    startWith: [],
    lon: 18.7,
    lat: 15.4,
  },
  {
    code: "DJ",
    slug: "djibouti",
    name: "Djibouti",
    of: "de Djibouti",
    description:
      "Petit pays de la Corne de l'Afrique, Djibouti a une littérature en français peu abondante, mais portée par une voix majeure : Abdourahman A. Waberi. Poète, nouvelliste et romancier, il mêle humour, fable et réflexion politique. Autour de lui, la culture djiboutienne puise dans les traditions orales somalies et afar, riches en poésie. C'est une littérature à la croisée de l'Afrique et du monde arabe.",
    startWith: ["aux-etats-unis-d-afrique"],
    lon: 42.6,
    lat: 11.8,
  },
  {
    code: "KE",
    slug: "kenya",
    name: "Kenya",
    of: "du Kenya",
    description:
      "La littérature kényane est dominée par la figure de Ngũgĩ wa Thiong'o, qui a d'abord écrit en anglais avant de choisir d'écrire en kikuyu, sa langue maternelle, pour défendre les langues africaines. Ses romans et essais racontent la colonisation britannique, la révolte des Mau Mau et les dérives de l'indépendance. Le pays a aussi une scène littéraire contemporaine vivante, en anglais et en swahili. Plusieurs de ces livres sont traduits en français.",
    startWith: ["rever-en-temps-de-guerre"],
    lon: 37.9,
    lat: 0.2,
  },
  {
    code: "MG",
    slug: "madagascar",
    name: "Madagascar",
    of: "de Madagascar",
    description:
      "Madagascar a donné à la poésie en français l'un de ses grands précurseurs, Jean-Joseph Rabearivelo, mort en 1937, qui écrivait aussi en malgache. Après lui, Jacques Rabemananjara et Flavien Ranaivo ont fait entendre la voix de l'île. Aujourd'hui, Jean-Luc Raharimanana écrit sur la mémoire de l'insurrection de 1947 et sur les violences de l'histoire. Le malgache, langue commune à toute l'île, reste au cœur de cette littérature.",
    startWith: ["presque-songes", "nour-1947"],
    lon: 46.9,
    lat: -19.4,
  },
  {
    code: "MU",
    slug: "maurice",
    name: "Maurice",
    of: "de Maurice",
    description:
      "L'île Maurice, où l'on parle créole, français, anglais et langues indiennes, a une littérature en français d'une grande vitalité. Ananda Devi et Nathacha Appanah en sont les voix les plus connues : elles racontent la violence sociale, l'exil et les destins de femmes. Leurs livres montrent une île bien loin des cartes postales. Plusieurs de leurs romans ont été récompensés par des prix en France.",
    startWith: ["eve-de-ses-decombres", "tropique-de-la-violence"],
    lon: 57.6,
    lat: -20.3,
  },
  {
    code: "KM",
    slug: "comores",
    name: "Comores",
    of: "des Comores",
    description:
      "La littérature comorienne en français est jeune, mais elle s'affirme depuis les années 1980. Elle parle de l'insularité, de l'exil et des liens complexes avec Mayotte et la France. Ali Zamir s'est fait remarquer en 2016 avec un premier roman écrit d'un seul souffle. Le shikomori, langue des îles, et une riche tradition orale nourrissent ces récits.",
    startWith: ["anguille-sous-roche"],
    lon: 43.9,
    lat: -11.9,
  },
  {
    code: "ZA",
    slug: "afrique-du-sud",
    name: "Afrique du Sud",
    of: "d'Afrique du Sud",
    description:
      "La littérature sud-africaine, écrite en anglais, en afrikaans et dans plusieurs langues africaines, est traversée par l'histoire de l'apartheid. Nadine Gordimer et J. M. Coetzee ont tous deux reçu le prix Nobel de littérature, en 1991 et en 2003. L'autobiographie de Nelson Mandela est devenue un livre de référence dans le monde entier. Beaucoup de ces œuvres sont traduites en français.",
    startWith: ["disgrace", "un-long-chemin-vers-la-liberte"],
    lon: 24.7,
    lat: -29.0,
  },
];
