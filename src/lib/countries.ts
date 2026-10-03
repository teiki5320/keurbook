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
    more: [
      "Nazi Boni, né en 1909 dans l'ouest du pays, publie Crépuscule des temps anciens en 1962 : c'est souvent présenté comme le premier roman burkinabè. Il y fait revivre la société bwa, ses rites et ses croyances, avant l'arrivée des colonisateurs. D'autres romanciers ont pris le relais, comme Monique Ilboudo, qui publie Le Mal de peau en 1992 avant de devenir ministre de la Promotion des droits humains.",
      "Le journaliste Norbert Zongo, assassiné en 1998, a lui aussi écrit des romans, dont Le Parachutage, une satire du pouvoir. Mais le Burkina Faso est surtout un grand pays de scène et d'image : Ouagadougou accueille depuis 1969 le Fespaco, le grand festival du cinéma africain, et le théâtre y est très vivant. Les contes en mooré, en dioula ou en fulfuldé restent une source d'inspiration majeure pour les écrivains.",
    ],
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
    startWith: ["place-des-fetes", "solo-d-un-revenant"],
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
    startWith: ["le-monde-s-effondre", "l-autre-moitie-du-soleil", "ake-les-annees-d-enfance"],
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
    more: [
      "Le Ghana est l'un des berceaux de la littérature africaine de langue anglaise. Ayi Kwei Armah y publie en 1968 L'âge d'or n'est pas pour demain, roman sévère sur la corruption qui suit l'indépendance ; le roman a été traduit en français. Ama Ata Aidoo, romancière, dramaturge et ministre de l'Éducation, a fait entendre la voix des femmes ghanéennes, et le poète Kofi Awoonor a mêlé la poésie anglaise et les chants funèbres ewe.",
      "La diaspora ghanéenne compte aujourd'hui des romancières lues dans le monde entier. Yaa Gyasi, née au Ghana et élevée aux États-Unis, a connu un grand succès avec No Home, qui suit sept générations depuis la traite atlantique. Taiye Selasi, d'origine ghanéenne et nigériane, raconte dans Le Ravissement des innocents une famille dispersée entre Accra et l'Amérique. Pour un lecteur français, ces romans traduits sont une belle porte d'entrée.",
    ],
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
    more: [
      "Le Gabon compte peu d'écrivains par rapport à ses voisins, mais plusieurs voix fortes. Angèle Rawiri ouvre la voie en 1980 avec Elonga, premier roman d'une Gabonaise. Laurent Owondo publie Au bout du silence en 1985, et Justine Mintsa fait paraître Histoire d'Awu chez Gallimard en 2000, le portrait d'une femme fang prise entre tradition et vie moderne.",
      "Depuis les années 2000, la littérature gabonaise s'est ouverte au roman noir avec Janis Otsiemi, dont les polars racontent Libreville, ses trafics et ses petits arrangements, dans une langue pleine d'expressions locales. La romancière Bessora, née à Bruxelles d'un père gabonais, explore quant à elle les identités multiples. Et la bande dessinée a trouvé son ambassadeur avec Pahé, dont La Vie de Pahé fait rire les lecteurs des deux côtés de la Méditerranée.",
    ],
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
    startWith: ["notre-dame-du-nil", "tous-tes-enfants-disperses"],
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
    startWith: ["le-bal-des-princes"],
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
    more: [
      "Ngũgĩ wa Thiong'o, né en 1938 et mort en 2025, publie en 1964 Ne pleure pas, mon enfant, souvent cité comme le premier roman en anglais d'un auteur d'Afrique de l'Est. En 1977, sa pièce écrite en kikuyu avec Ngũgĩ wa Mĩriĩ, jouée par des paysans de son village, lui vaut d'être emprisonné sans procès. En prison, il écrit sur du papier toilette son premier roman en kikuyu, puis décide de ne plus écrire de fiction en anglais.",
      "Après lui, une nouvelle génération a fait du Kenya un foyer littéraire très actif. Binyavanga Wainaina, prix Caine en 2002, fonde la revue Kwani? et signe en 2005 un texte ironique devenu célèbre, Comment écrire sur l'Afrique, qui se moque des clichés des écrivains occidentaux. Le pays écrit aussi beaucoup en swahili, et Nairobi est devenue l'une des capitales de l'édition en Afrique de l'Est.",
    ],
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
    more: [
      "L'archipel des Comores a une longue tradition orale, en shikomori et en arabe, mais la littérature écrite en français y est récente. Le premier roman comorien en français, La République des imberbes de Mohamed Toihiri, paraît en 1985 : une satire du régime d'Ali Soilihi. Depuis, poètes, conteurs et romanciers ont fait connaître la vie des îles, entre tradition, religion et départs vers la France.",
      "Salim Hatubou, installé à Marseille où vit une importante communauté comorienne, a beaucoup fait pour transmettre les contes de l'archipel, notamment aux enfants. Ali Zamir est la révélation de ces dernières années : son premier roman, Anguille sous roche, paru en 2016, est une seule longue phrase portée par la voix d'une jeune femme. La question de Mayotte, de l'exil et de la traversée vers l'île voisine revient souvent dans ces livres.",
    ],
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
  {
    code: "TZ",
    slug: "tanzanie",
    name: "Tanzanie",
    of: "de Tanzanie",
    description:
      "La Tanzanie, née en 1964 de l'union du Tanganyika et de l'archipel de Zanzibar, est le grand pays de la langue swahilie. Une riche littérature y est écrite dans cette langue, portée au XXᵉ siècle par le poète Shaaban Robert, et nourrie par des siècles d'échanges autour de l'océan Indien. En langue anglaise, Abdulrazak Gurnah, né à Zanzibar et installé en Angleterre, raconte l'exil et la mémoire de la côte est-africaine. Son prix Nobel de littérature, en 2021, a fait découvrir ses romans à de nombreux lecteurs français.",
    more: [
      "La Tanzanie est d'abord le pays du swahili, langue d'une riche poésie ancienne venue de la côte et de Zanzibar. Au XXᵉ siècle, Shaaban Robert en devient le grand classique. Après l'indépendance, Euphrase Kezilahabi renouvelle le roman et la poésie en swahili, tandis qu'Ebrahim Hussein en fait une langue de théâtre. Ces auteurs restent malheureusement très peu traduits en français.",
      "La voix tanzanienne la plus connue des lecteurs français est celle d'Abdulrazak Gurnah, né à Zanzibar en 1948. Il quitte l'île à la fin des années 1960, après la révolution de 1964, et s'installe en Angleterre, où il écrit en anglais. Ses romans, comme Paradis, racontent les échanges entre l'Afrique de l'Est, l'Arabie et l'Inde, la colonisation et l'exil. Le prix Nobel de littérature, reçu en 2021, a fait traduire ou rééditer une grande partie de son œuvre.",
    ],
    startWith: ["paradis", "pres-de-la-mer"],
    lon: 34.9,
    lat: -6.4,
  },
  {
    code: "MZ",
    slug: "mozambique",
    name: "Mozambique",
    of: "du Mozambique",
    description:
      "Ancienne colonie portugaise, indépendante depuis 1975, le Mozambique écrit surtout en portugais, une langue que ses auteurs ont mêlée aux langues et aux récits du pays. Le poète José Craveirinha a été l'une des grandes voix de la lutte contre la colonisation. Mia Couto, dont les romans inventent une langue pleine de rêves et de contes, est aujourd'hui l'écrivain le plus traduit du pays, et Paulina Chiziane la première romancière à s'y être imposée. La longue guerre civile qui a suivi l'indépendance est au cœur de beaucoup de leurs livres.",
    startWith: ["terre-somnambule"],
    lon: 35.5,
    lat: -17.5,
  },
];
