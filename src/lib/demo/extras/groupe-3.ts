/** Compléments du groupe 3 (voir docs/EXTRAS.md). */
import type { Adaptation, Quote } from "../../types";

export const facts: Record<string, string[]> = {
  "djaili-amadou-amal": [
    "Son prénom lui a été inspiré par une chanson de la grande chanteuse égyptienne Oum Kalthoum, « Amal Hayati ».",
    "Les Impatientes est la version retravaillée d'un roman d'abord paru au Cameroun en 2017 : Munyal, les larmes de la patience.",
    "En 2020, elle devient la première Africaine à figurer parmi les finalistes du prix Goncourt.",
    "En 2022, l'université Sorbonne-Nouvelle la nomme docteure honoris causa pour son œuvre et son combat pour les femmes.",
  ],
  "patrice-nganang": [
    "Son premier livre publié n'est pas un roman mais un recueil de poèmes, Elobi, paru en 1995.",
    "Le chien Mboudjak, narrateur de Temps de chien, donne son nom à un roman paru en 2022 : Mboudjak, les aventures du chien-philosophe.",
    "Docteur de l'université de Francfort, il a aussi enseigné les études germaniques au Vassar College, aux États-Unis.",
  ],
  "hemley-boum": [
    "Son premier roman, Le Clan des femmes, est d'abord né en ligne, écrit au fil d'un blog.",
    "Avant de publier, elle a travaillé sept ans à Douala pour une entreprise internationale.",
    "Enfant, elle lisait surtout des auteurs européens : les écrivains africains manquaient même dans les bibliothèques, a-t-elle raconté.",
    "En 2024, Le Rêve du pêcheur reçoit le tout premier prix littéraire décerné par l'association des anciens de Sciences Po.",
  ],
  "achille-mbembe": [
    "Son oncle, Pierre Yem Mback, a été tué en 1958 aux côtés du dirigeant indépendantiste Ruben Um Nyobè, dont il a ensuite publié les écrits.",
    "Son mémoire de maîtrise sur les violences de la décolonisation au Cameroun n'a jamais pu être soutenu publiquement : le sujet faisait peur.",
    "Il a forgé la notion de « nécropolitique », le pouvoir de décider qui peut vivre et qui doit mourir, reprise dans le monde entier.",
    "En 2024, il reçoit le prix Holberg, l'une des plus hautes distinctions internationales en sciences humaines.",
  ],
  "alain-mabanckou": [
    "Il a découvert la lecture avec les romans policiers San-Antonio et SAS que son père adoptif, réceptionniste d'hôtel, lui rapportait.",
    "En 2015-2016, il devient le premier écrivain à occuper la chaire annuelle de création artistique du Collège de France.",
    "Il a produit un album de rumba congolaise, Black Bazar, en 2012, du nom de son roman.",
    "Il a fait partie en 2022 du jury du Booker Prize, le grand prix littéraire britannique.",
  ],
  "sony-labou-tansi": [
    "De son vrai nom Marcel Ntsoni, il a choisi son pseudonyme en hommage au poète congolais Tchicaya U Tam'si.",
    "Sa carte de visite résumait son projet : « Métier : Homme. Fonction : Révolté ».",
    "Depuis 2003, un prix Sony-Labou-Tansi récompense des pièces de théâtre francophones.",
    "La plupart de ses manuscrits sont conservés à la Bibliothèque francophone multimédia de Limoges, et consultables en ligne.",
  ],
  "emmanuel-dongala": [
    "Chimiste de métier, il a étudié aux États-Unis à l'Oberlin College avant de soutenir sa thèse à Montpellier.",
    "En 1981, il cofonde à Brazzaville une troupe de théâtre, le Théâtre de l'Éclair.",
    "Quand la guerre civile l'oblige à fuir en 1997, son ami l'écrivain Philip Roth l'aide à trouver un poste dans une université américaine.",
  ],
  "henri-lopes": [
    "Il a écrit les paroles des « Trois Glorieuses », l'hymne national de la République populaire du Congo de 1970 à 1991.",
    "Candidat en 2002 au poste de secrétaire général de la Francophonie, il se retire la veille du vote.",
    "Avant la politique, il a été professeur d'histoire à l'École normale supérieure d'Afrique centrale, à Brazzaville.",
  ],
  "in-koli-jean-bofane": [
    "À Kinshasa, avant l'exil, il a travaillé dans la publicité et fondé sa propre maison d'édition.",
    "Son tout premier livre est un album pour la jeunesse publié chez Gallimard, Pourquoi le lion n'est plus le roi des animaux.",
  ],
  "fiston-mwanza-mujila": [
    "En 2009, il remporte la médaille d'or de littérature aux Jeux de la Francophonie, à Beyrouth.",
    "Il raconte que la lecture des romans de Sony Labou Tansi a été pour lui un « choc » qui lui a ouvert un autre chemin.",
    "La traduction anglaise de La Danse du vilain a été finaliste du National Book Award américain en 2024.",
  ],
  "scholastique-mukasonga": [
    "Arrivée en France, elle a dû repasser son diplôme d'assistante sociale, celui obtenu au Burundi n'étant pas reconnu.",
    "Le lycée de Notre-Dame du Nil s'inspire de celui de Kigali où elle a été élève, avant d'en être chassée en 1973.",
    "Elle est membre du jury du prix Femina depuis 2021.",
  ],
  "gael-faye": [
    "Avant de se consacrer à la musique et à l'écriture, il a travaillé deux ans à Londres dans un fonds d'investissement.",
    "Il a été sacré révélation scène aux Victoires de la musique en 2018.",
    "Petit pays a été traduit dans plus de trente langues.",
  ],
  "abdourahman-a-waberi": [
    "De 1996 à 2005, il a été professeur d'anglais dans des lycées professionnels de Normandie.",
    "Il a été pensionnaire de la Villa Médicis, à Rome, en 2010-2011.",
    "La traduction américaine d'Aux États-Unis d'Afrique est préfacée par le romancier Percival Everett.",
    "En 2005, le magazine Lire le compte parmi les « 50 écrivains de demain ».",
  ],
  "ananda-devi": [
    "À 15 ans, elle remporte un concours de nouvelles qui publie son texte La Cité Attlee.",
    "Elle a grandi entre le français, le créole, l'anglais et le télougou, la langue de ses ancêtres indiens.",
    "Avant de s'installer près de Genève, elle a vécu plusieurs années à Brazzaville, au Congo.",
    "Elle est la lauréate 2024 du prix Neustadt, surnommé le « Nobel américain ».",
  ],
  "nathacha-appanah": [
    "Ses ancêtres, des travailleurs indiens engagés, sont arrivés à l'île Maurice en 1872 : elle le raconte dans La Mémoire délavée.",
    "Elle traduit aussi de l'anglais, par exemple le roman Indigne de l'Américain Alexander Maksik.",
    "En 2025, La Nuit au cœur remporte à la fois le prix Femina, le Goncourt des lycéens et le Renaudot des lycéens.",
  ],
  "jean-joseph-rabearivelo": [
    "Né Joseph-Casimir Rabe, il s'est rebaptisé Jean-Joseph pour avoir les mêmes initiales que Jean-Jacques Rousseau.",
    "Sa mère a vendu ses dernières rizières et ses bijoux pour qu'il puisse s'acheter des livres.",
    "Il a traduit en malgache Baudelaire, Rimbaud, Rilke ou Whitman.",
    "Léopold Sédar Senghor l'appelait le « prince des poètes malgaches ».",
  ],
};

export const quotes: Record<string, Quote> = {
  "les-impatientes": { text: "J’ai piétiné mes rêves pour mieux embrasser mes devoirs.", source: null },
  "walaande-l-art-de-partager-un-mari": {
    text: "L'aune du bonheur et du malheur est différente pour chacun et l'on ne peut jamais en juger de l'extérieur.",
    source: null,
  },
  "coeur-du-sahel": { text: "On accouche une fois, on reste mère toute sa vie !", source: null },
  "l-invention-du-beau-regard": { text: "C’est dans l’adversité que l’héroïsme des petites gens éclôt.", source: null },
  "les-maquisards": { text: "La raison d’être du colonialisme, c’est l’exploitation des richesses.", source: null },
  "les-jours-viennent-et-passent": { text: "Ici, comme ailleurs, les enfants sont cruels.", source: null },
  "critique-de-la-raison-negre": {
    text: "De l’acharnement colonial à diviser, à classifier, à hiérarchiser et à différencier, il est resté quelque chose, des entailles, voire des lésions.",
    source: null,
  },
  "black-bazar": { text: "N’ouvre ta bouche que lorsque ce que tu dis est plus beau que le silence.", source: null },
  "la-vie-et-demie": { text: "J'écris pour qu'il fasse peur en moi.", source: "Avertissement" },
  "l-ante-peuple": { text: "Le pouvoir absolu assure absolument le déséquilibre social.", source: null },
  "les-sept-solitudes-de-lorsa-lopez": {
    text: "Les larmes d’un homme sont pour une femme plus fortes que tous les vins du monde.",
    source: null,
  },
  "jazz-et-vin-de-palme": {
    text: "En Afrique, le temps est toujours en avance ; nous avons beau nous presser, il est toujours devant nous.",
    source: null,
  },
  "le-feu-des-origines": { text: "Toute fin porte en elle un espoir, celui d’un commencement.", source: null },
  tribaliques: { text: "Si tu ne fais pas la politique, tu la subiras.", source: null },
  "inyenzi-ou-les-cafards": { text: "Nous avions été choisis pour survivre.", source: null },
  "la-femme-aux-pieds-nus": {
    text: "On avait tué nos vaches et brûlé nos veaux dans les étables. Est-on encore un homme si l'on n'a plus son troupeau ?",
    source: null,
  },
  "petit-pays": {
    text: "Je pensais être exilé de mon pays. En revenant sur les traces de mon passé, j’ai compris que je l’étais de mon enfance. Ce qui me paraît bien plus cruel encore.",
    source: null,
  },
  jacaranda: { text: "Les civils ne savent pas que la paix n'est qu'une guerre suspendue.", source: null },
  "cahier-nomade": { text: "Qui pèle un oignon n’a pas fini de pleurer.", source: null },
  "passage-des-larmes": { text: "Les fantômes font leur nid dans les fractures de l'histoire.", source: null },
  "la-vie-de-josephin-le-fou": { text: "Le ciel c’est toujours trop loin et trop froid.", source: null },
  "tropique-de-la-violence": { text: "C'est une vie magnifique que d'être un baobab sur une plage.", source: null },
  "la-nuit-au-coeur": {
    text: "La littérature exerce sur moi un pouvoir immense et c’est ici ma faiblesse, c’est ici mon secret.",
    source: null,
  },
};

export const adaptations: Record<string, Adaptation[]> = {
  "johnny-chien-mechant": [{ kind: "film", title: "Johnny Mad Dog", year: 2008, by: "Jean-Stéphane Sauvaire" }],
  "notre-dame-du-nil": [{ kind: "film", title: "Notre-Dame du Nil", year: 2019, by: "Atiq Rahimi" }],
  "petit-pays": [
    { kind: "film", title: "Petit Pays", year: 2020, by: "Éric Barbier" },
    { kind: "BD", title: "Petit pays", year: 2024, by: "Marzena Sowa et Sylvain Savoia" },
    { kind: "théâtre", title: "Gahugu Gato (Petit pays)", year: 2024, by: "Frédéric Fisbach et Dida Nibagwire" },
  ],
  "tropique-de-la-violence": [
    { kind: "BD", title: "Tropique de la violence", year: 2019, by: "Gaël Henry" },
    { kind: "film", title: "Tropique de la violence", year: 2022, by: "Manuel Schapira" },
  ],
  "eve-de-ses-decombres": [
    { kind: "film", title: "Les Enfants de Troumaron", year: 2013, by: "Harrikrisna et Sharvan Anenden" },
  ],
  "tram-83": [{ kind: "théâtre", title: "Tram 83", year: 2018, by: "Julie Kretzschmar" }],
};
