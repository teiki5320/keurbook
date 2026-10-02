/** Compléments du groupe 1 (voir docs/EXTRAS.md). */
import type { Adaptation, Quote } from "../../types";

export const facts: Record<string, string[]> = {
  "mariama-ba": [
    "En 1943, elle est reçue première au concours d'entrée de l'École normale de Rufisque, qui forme les institutrices d'Afrique-Occidentale française.",
    "Une rédaction écrite à l'école en 1947 est remarquée par le philosophe Emmanuel Mounier, qui la reprend en entier dans la revue Esprit.",
    "Au comité de lecture des Nouvelles Éditions africaines, Birago Diop salue le manuscrit d'« Une si longue lettre » d'une note restée célèbre : « Nous avons trouvé une Bête de plume ».",
    "À Gorée, un lycée de jeunes filles, la Maison d'éducation Mariama-Bâ, porte son nom.",
  ],
  "cheikh-hamidou-kane": [
    "Comme les cadets peuls, il était surnommé Samba, le prénom qu'il a donné au héros de « L'Aventure ambiguë ».",
    "Pour entrer au lycée, réservé alors aux enfants de colons, il apprend seul tout le programme de seconde et réussit l'examen d'entrée en première.",
    "En désaccord avec Senghor après l'arrestation de Mamadou Dia, il refuse la vice-présidence du Sénégal et s'exile douze ans.",
    "« Les Gardiens du temple », commencé vers 1966 sous le titre « Jours de colère », n'a paru qu'en 1995 : on lui avait conseillé d'attendre le départ de Senghor.",
  ],
  "ousmane-sembene": [
    "En 1962, il part se former au cinéma au studio Gorki de Moscou, où il assiste le réalisateur Mark Donskoï.",
    "Il signait « Sembène Ousmane », gardant l'ordre nom-prénom de l'administration coloniale pour en faire un geste de protestation.",
    "Son film « Ceddo » est interdit au Sénégal sous Senghor, officiellement parce que le wolof ne s'écrit pas avec deux « d ».",
    "Fidèle du Fespaco, il refusait d'y concourir pour laisser leur chance aux autres cinéastes africains.",
  ],
  "leopold-sedar-senghor": [
    "Il a écrit les paroles de l'hymne national du Sénégal, « Le Lion rouge ».",
    "Fait prisonnier par les Allemands en 1940, il passe deux ans dans des camps, où il écrit une partie des poèmes d'« Hosties noires ».",
    "Au lycée Louis-le-Grand, il se lie d'amitié avec un camarade promis lui aussi à la présidence de son pays : Georges Pompidou.",
    "En décembre 1980, il quitte la présidence de son plein gré, avant la fin de son mandat, et laisse la place à Abdou Diouf.",
  ],
  "mohamed-mbougar-sarr": [
    "Il a commencé une thèse sur Léopold Sédar Senghor, avant de l'interrompre pour se consacrer à l'écriture.",
    "Le mystérieux écrivain T. C. Elimane, au cœur de son roman couronné par le Goncourt, est inspiré de Yambo Ouologuem, à qui le livre est dédié.",
    "« La plus secrète mémoire des hommes » a dépassé 500 000 exemplaires dans l'année qui a suivi son prix Goncourt.",
  ],
  "fatou-diome": [
    "Enfant, elle allait à l'école de son propre chef, sans autorisation, jusqu'à ce que ses grands-parents acceptent de l'y inscrire.",
    "Grande lectrice de Voltaire, elle relit « Candide » presque chaque année.",
    "Étudiante à Strasbourg, elle a entrepris une thèse sur le voyage dans l'œuvre d'Ousmane Sembène.",
    "En 2023, elle est élue à l'Académie royale de langue et de littérature françaises de Belgique, au fauteuil de la Québécoise Marie-Claire Blais.",
  ],
  "boubacar-boris-diop": [
    "Dans les années 1980, il coécrit un scénario sur le massacre de Thiaroye, finalement écarté au profit du film d'Ousmane Sembène ; il a été publié en 2018.",
    "Il a lui-même traduit en français son roman wolof « Doomi Golo », paru sous le titre « Les Petits de la guenon ».",
    "C'est son séjour au Rwanda en 1998, a-t-il expliqué, qui lui a donné la force d'écrire en wolof.",
  ],
  "aminata-sow-fall": [
    "Le « bàttu » est, en wolof, la calebasse qui sert de sébile aux mendiants : il donne son titre à son roman le plus célèbre.",
    "Dans sa leçon inaugurale au Collège de France, Alain Mabanckou l'a présentée comme la plus grande romancière africaine.",
    "En 2015, l'Académie française lui décerne son Grand prix de la francophonie.",
  ],
  "david-diop": [
    "Il écrit au stylo, dans des carnets, avant de taper et de reprendre ses textes à l'ordinateur.",
    "Son arrière-grand-père français, qui avait fait la Grande Guerre sans jamais en parler, est à l'origine de sa curiosité pour ce conflit.",
    "« La Porte du voyage sans retour » s'inspire du botaniste Michel Adanson, qui explora le Sénégal au XVIIIe siècle.",
    "« Frère d'âme » a été traduit dans plus de trente langues.",
  ],
  "birago-diop": [
    "Revenu de son poste d'ambassadeur à Tunis, il reprend son métier et ouvre en 1964 une clinique vétérinaire à Dakar.",
    "Son poème « Souffles » a d'abord paru, dans une version courte, dans l'anthologie de la poésie nègre publiée par Senghor en 1948.",
  ],
  "ken-bugul": [
    "Enfant, elle se glissait au fond d'une classe de l'école voisine pour écouter les leçons, en « auditrice libre ».",
    "Son père avait 85 ans à sa naissance ; plus jeune que ses neveux, elle l'appelait « grand-père », comme tout le monde.",
    "En italien, « Riwan ou le chemin de sable » a paru sous le titre « La ventottesima moglie », « la vingt-huitième épouse ».",
    "Elle anime des ateliers d'écriture, notamment pour des élèves et des chômeurs en Afrique, et pour des détenus en France.",
  ],
  "marie-ndiaye": [
    "Lycéenne de 17 ans, elle est repérée par Jérôme Lindon, le patron des Éditions de Minuit, qui publie son premier roman.",
    "« Comédie classique », son deuxième livre, est un roman d'une seule phrase.",
    "Elle a coécrit les scénarios de « White Material » de Claire Denis et de « Saint Omer » d'Alice Diop.",
    "Son frère aîné est l'historien Pap Ndiaye, devenu ministre de l'Éducation nationale.",
  ],
  "felwine-sarr": [
    "Il est né, comme la romancière Fatou Diome, sur l'île de Niodior, dans le delta du Saloum.",
    "Il a cofondé la maison d'édition Jimsaan, coéditrice du roman de Mohamed Mbougar Sarr couronné par le Goncourt en 2021.",
    "Avec Bénédicte Savoy, il figure en 2021 dans la liste des cent personnes les plus influentes du monde établie par le magazine Time.",
  ],
  "cheikh-anta-diop": [
    "Étudiant à Paris, il suit à la fois les cours du philosophe Gaston Bachelard et ceux du physicien Frédéric Joliot-Curie.",
    "Faute de jury, sa thèse préparée dès 1951 n'est pas soutenue ; il n'obtient son doctorat qu'en 1960.",
    "En 1974, il défend ses thèses au colloque du Caire, organisé par l'Unesco pour son Histoire générale de l'Afrique.",
  ],
  "amadou-hampate-ba": [
    "En 1916, faute de pouvoir prouver son âge, il faillit être envoyé au front en Europe ; l'armée française le jugea finalement trop jeune.",
    "Pour avoir refusé d'entrer à l'École normale de Gorée en 1921, il est muté à Ouagadougou comme « écrivain temporaire à titre essentiellement précaire et révocable ».",
    "De 1962 à 1966, il est l'ambassadeur du Mali en Côte d'Ivoire.",
    "Un square du 10e arrondissement de Paris porte son nom.",
  ],
  "yambo-ouologuem": [
    "Mohamed Mbougar Sarr lui a dédié « La plus secrète mémoire des hommes », dont il a inspiré le héros, l'écrivain T. C. Elimane.",
    "Il a aussi publié des romans sous pseudonyme, dont « Les Mille et Une Bibles du sexe », signé Utto Rodolph.",
    "Retiré de la vente par son éditeur en 1972, « Le Devoir de violence » a été réédité par le Seuil en 2018.",
    "Chaque année, la Rentrée littéraire du Mali décerne un prix Yambo-Ouologuem à un auteur africain.",
  ],
};

export const quotes: Record<string, Quote> = {
  "une-si-longue-lettre": {
    text: "L'amitié a des grandeurs inconnues de l'amour. Elle se fortifie dans les difficultés, alors que les contraintes massacrent l'amour.",
    source: null,
  },
  "l-aventure-ambigue": {
    text: "Il faut aller apprendre chez eux l'art de vaincre sans avoir raison.",
    source: "Première partie, chapitre 3",
  },
  "les-gardiens-du-temple": {
    text: "Le courage et la générosité sont les deux visages d'une vertu unique.",
    source: null,
  },
  "les-bouts-de-bois-de-dieu": {
    text: "Le malheur, ce n'est pas seulement d'avoir faim et soif, le malheur, c'est de savoir qu'il y a des gens qui veulent que tu meures de faim.",
    source: null,
  },
  "chants-d-ombre": {
    text: "Femme nue, femme noire / Vêtue de ta couleur qui est vie, de ta forme qui est beauté !",
    source: "« Femme noire »",
  },
  "hosties-noires": {
    text: "Vous Tirailleurs Sénégalais, mes frères noirs à la main chaude sous la glace et la mort",
    source: "Poème liminaire",
  },
  ethiopiques: {
    text: "Le pouvoir ne s'obtient sans sacrifice, le pouvoir absolu exige le sang de l'être le plus cher.",
    source: "« Chaka »",
  },
  "la-belle-histoire-de-leuk-le-lievre": {
    text: "Dans la vie, ceux qui ont doivent donner à ceux qui n'ont pas, ceux qui peuvent doivent faire pour ceux qui ne peuvent pas, et ceux qui savent doivent enseigner ceux qui ne savent pas.",
    source: null,
  },
  "la-plus-secrete-memoire-des-hommes": {
    text: "Croiser un silencieux, un vrai silencieux, interroge toujours le sens — la nécessité — de sa propre parole, dont on se demande soudain si elle n'est pas un emmerdant babil, de la boue de langage.",
    source: null,
  },
  "le-ventre-de-l-atlantique": {
    text: "N'oublie jamais, chaque miette de vie doit servir à conquérir la dignité !",
    source: null,
  },
  ketala: {
    text: "On ne peut pas toujours emmener les siens avec soi, mais on part toujours avec sa mémoire.",
    source: null,
  },
  "inassouvies-nos-vies": {
    text: "Le français est une lame étincelante et, comme toute lame, c'est là où elle se fait fine qu'elle tranche.",
    source: null,
  },
  "les-veilleurs-de-sangomar": {
    text: "Gospel ou fado ? Seigneur, quel chant ramène les morts ?",
    source: null,
  },
  "marianne-porte-plainte": {
    text: "Un océan de savoir n'irriguera jamais un lac de prétention.",
    source: null,
  },
  "murambi-le-livre-des-ossements": {
    text: "Notre existence est brève, elle est un chapelet d'illusions qui crèvent comme de petites bulles dans nos entrailles.",
    source: null,
  },
  "la-greve-des-battu": {
    text: "La religion prescrit l'aide aux pauvres, mais elle ne leur dit pas de priver leur prochain de tout repos.",
    source: null,
  },
  "l-appel-des-arenes": {
    text: "La vie est devant toi, ma fille. Sache seulement qu'un séjour séculaire dans le fleuve ne fera jamais d'un bâton un crocodile.",
    source: null,
  },
  "l-ex-pere-de-la-nation": {
    text: "La moitié de notre personne nous appartient, et l'autre moitié à nos proches.",
    source: null,
  },
  "les-contes-d-amadou-koumba": {
    text: "Quand la mémoire va ramasser du bois mort, elle rapporte le fagot qu'il lui plaît.",
    source: null,
  },
  "les-nouveaux-contes-d-amadou-koumba": {
    text: "Le bonheur n'a pas besoin de s'étaler, ni de courir les sentiers pour attirer sur soi ses deux grands ennemis, l'œil et la langue.",
    source: null,
  },
  "le-baobab-fou": {
    text: "La résignation. C'était cela l'apprentissage de la femme à l'époque : un être qui acceptait tout.",
    source: null,
  },
  "trois-femmes-puissantes": {
    text: "Qui ayant connu une fois la tendresse peut de soi-même y renoncer ?",
    source: null,
  },
  "le-devoir-de-violence": {
    text: "Nos yeux boivent l'éclat du soleil, et, vaincus, s'étonnent de pleurer.",
    source: "Incipit",
  },
};

export const adaptations: Record<string, Adaptation[]> = {
  "une-si-longue-lettre": [{ kind: "film", title: "Une si longue lettre", year: 2025, by: "Angèle Diabang" }],
  "l-aventure-ambigue": [{ kind: "théâtre", title: "L'Aventure ambiguë", year: 2023, by: "Xavier Simonin" }],
  "la-greve-des-battu": [{ kind: "film", title: "Bàttu", year: 2000, by: "Cheick Oumar Sissoko" }],
  "papa-doit-manger": [{ kind: "théâtre", title: "Papa doit manger", year: 2003, by: "André Engel" }],
  "la-plus-secrete-memoire-des-hommes": [
    { kind: "théâtre", title: "La plus secrète mémoire des hommes", year: 2022, by: "Aristide Tarnagda" },
  ],
  "vie-et-enseignement-de-tierno-bokar": [{ kind: "théâtre", title: "Tierno Bokar", year: 2004, by: "Peter Brook" }],
};
