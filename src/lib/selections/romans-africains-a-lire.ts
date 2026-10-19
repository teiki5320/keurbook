import type { Selection } from "./types";

/** Sélection « Les 10 romans africains à lire absolument » : textes écrits par nous à partir des fiches du site. */
export const romansAfricainsALire: Selection = {
  slug: "romans-africains-a-lire",
  title: "Les 10 romans africains à lire absolument",
  titleItalic: "à lire absolument",
  description:
    "Notre sélection de dix grands romans d'Afrique subsaharienne, des classiques aux prix récents : pourquoi les lire et par où commencer.",
  unit: "romans",
  updated: "2026-10-19",
  intro: [
    "Choisir dix romans parmi tous ceux d'Afrique subsaharienne est forcément injuste. Voici notre sélection : des classiques étudiés en classe et des romans récents salués par de grands prix, de la Guinée au Burundi.",
    "Ils sont rangés par date de parution, du plus ancien au plus récent : l'ordre n'est pas un classement. Filtrez selon votre envie, comparez-en deux ou trois, puis ouvrez la fiche ou le livre sur Amazon.",
  ],
  envies: {
    commencer: "Pour commencer",
    rire: "Pour rire et réfléchir",
    colonisation: "Comprendre la colonisation",
    aujourdhui: "Les voix d'aujourd'hui",
  },
  items: [
    {
      slug: "l-enfant-noir",
      envie: "commencer",
      why: "Camara Laye se souvient de son enfance à Kouroussa, en Haute-Guinée, entre un père forgeron dont le travail de l'or tient presque de la magie et une mère aux pouvoirs mystérieux. On y découvre la vie d'un village malinké dans les années 1930, puis le moment où l'école éloigne peu à peu l'enfant des siens. Court, simple et tendre, c'est une très bonne première lecture.",
    },
    {
      slug: "une-vie-de-boy",
      envie: "commencer",
      why: "Toundi, devenu le boy du commandant de Dangan, note dans un cahier tout ce qu'il voit chez ses maîtres. Son regard faussement naïf montre, avec beaucoup d'ironie, l'absurdité du monde colonial. Le roman est court et se lit presque d'une traite.",
    },
    {
      slug: "le-monde-s-effondre",
      envie: "colonisation",
      why: "Okonkwo, homme respecté d'un village igbo du Nigeria, voit l'ordre ancien vaciller avec l'arrivée des missionnaires et de l'administration britannique. Chinua Achebe décrit cette société de l'intérieur, sans l'embellir. Son héros, orgueilleux et tragique, ne s'oublie pas. Écrit en anglais, le livre se lit ici en traduction française.",
    },
    {
      slug: "l-aventure-ambigue",
      envie: "colonisation",
      why: "Samba Diallo, élève d'une école coranique au pays des Diallobé, est envoyé à l'école des Blancs, jusqu'à Paris. Le roman pose une question toujours actuelle : que perd-on en gagnant un autre savoir ? La langue est belle, presque méditative.",
    },
    {
      slug: "les-soleils-des-independances",
      envie: "rire",
      why: "Fama, dernier prince d'une lignée malinké, a tout perdu avec les indépendances et vit des aumônes des funérailles. Ahmadou Kourouma en tire une satire mordante des lendemains des indépendances, avec un héros pathétique et attachant. Il écrit dans un français nourri des tournures du malinké, qui a renouvelé la langue du roman africain.",
    },
    {
      slug: "une-si-longue-lettre",
      envie: "commencer",
      why: "Pendant son deuil, Ramatoulaye écrit à son amie Aïssatou et revient sur leurs mariages, leurs espoirs et la blessure de la polygamie. C'est une voix de femme qui parle franchement du mariage et de la liberté. Court et bouleversant, le livre est lu dans les lycées de toute l'Afrique francophone.",
    },
    {
      slug: "verre-casse",
      envie: "rire",
      why: "Dans un bar de Pointe-Noire, un vieil habitué remplit un cahier avec les histoires extravagantes des clients. Le texte tient en une longue phrase presque sans point, drôle et virtuose, où se cachent des dizaines de titres de livres à retrouver. C'est le roman qui a fait connaître Alain Mabanckou au grand public.",
    },
    {
      slug: "notre-dame-du-nil",
      envie: "aujourdhui",
      why: "Au début des années 1970, dans un lycée catholique réservé aux filles de l'élite rwandaise, les tensions du pays s'invitent dans les dortoirs. Ce huis clos entre adolescentes, tendu et captivant, montre comment la haine se prépare, bien avant le génocide des Tutsi. Un roman essentiel pour comprendre le Rwanda.",
    },
    {
      slug: "petit-pays",
      envie: "aujourdhui",
      why: "Gabriel, dix ans, vit à Bujumbura entre son père français, sa mère rwandaise et ses copains de l'impasse. En 1993, le Burundi bascule dans la violence et le paradis de l'enfance se fissure. Raconté à hauteur d'enfant, le livre est à la fois lumineux et bouleversant.",
    },
    {
      slug: "la-plus-secrete-memoire-des-hommes",
      envie: "aujourdhui",
      why: "Un jeune écrivain sénégalais part sur les traces d'un auteur disparu après un scandale, de Paris au Sénégal et jusqu'en Argentine. Entre roman policier et roman d'idées, l'enquête traverse un siècle d'histoire. C'est aussi un bel hommage à la littérature et aux écrivains qu'elle a oubliés.",
    },
  ],
  highlights: [
    { slug: "l-enfant-noir", label: "Le classique", verdict: "Un classique étudié au collège, simple et émouvant, avec un portrait magnifique d'un père et d'une mère." },
    { slug: "petit-pays", label: "Un roman d'aujourd'hui", verdict: "Un premier roman bouleversant, lu par des millions de lecteurs : l'enfance et la guerre racontées à hauteur d'enfant." },
    { slug: "verre-casse", label: "Pour rire", verdict: "Un roman drôle et virtuose, sans aucun point final avant la fin, truffé de titres de livres à retrouver." },
  ],
  guide: [
    {
      q: "Quelle envie ?",
      a: "Pour une première lecture courte : [L'Enfant noir](/livre/l-enfant-noir), [Une vie de boy](/livre/une-vie-de-boy) ou [Une si longue lettre](/livre/une-si-longue-lettre). Pour rire en réfléchissant : [Verre Cassé](/livre/verre-casse) ou [Les Soleils des indépendances](/livre/les-soleils-des-independances). Les filtres de la sélection suivent ces envies.",
    },
    {
      q: "Quel pays, quelle époque ?",
      a: "Ces dix romans viennent de huit pays, de la Guinée au Burundi, et couvrent près de soixante-dix ans, de 1953 à 2021. Les [pages Pays](/pays) situent chaque auteur et proposent d'autres livres du même pays.",
    },
    {
      q: "Court ou long ?",
      a: "Nos fiches conseillent une édition de poche pour neuf d'entre eux. [Une si longue lettre](/livre/une-si-longue-lettre) compte 164 pages et [L'Aventure ambiguë](/livre/l-aventure-ambigue) 191 ; [La plus secrète mémoire des hommes](/livre/la-plus-secrete-memoire-des-hommes) est un grand roman de 576 pages.",
    },
  ],
  faq: [
    {
      q: "Comment avez-vous choisi ces dix romans ?",
      a: "Nous avons retenu des romans présentés sur Keurbook, reconnus par les lecteurs et souvent par de grands prix littéraires, en mêlant classiques et livres récents et en variant les pays. C'est notre sélection, pas un classement officiel : ils sont rangés par date de parution.",
    },
    {
      q: "Par quel livre commencer ?",
      a: "Pour une première lecture courte, [L'Enfant noir](/livre/l-enfant-noir) ou [Une si longue lettre](/livre/une-si-longue-lettre). Pour un roman d'aujourd'hui, [Petit pays](/livre/petit-pays). Pour rire, [Verre Cassé](/livre/verre-casse). Pour comprendre la colonisation, [Le monde s'effondre](/livre/le-monde-s-effondre) ou [L'Aventure ambiguë](/livre/l-aventure-ambigue).",
    },
    {
      q: "Ces livres sont-ils tous écrits en français ?",
      a: "Neuf ont été écrits en français. Le monde s'effondre, de Chinua Achebe, a été écrit en anglais : on le lit en traduction française.",
    },
    {
      q: "Pourquoi aucun prix n'est affiché ?",
      a: "Les prix changent souvent : le prix du jour est sur la page du livre chez Amazon. Notre sélection est un choix de lecture, pas un comparatif de prix.",
    },
    {
      q: "Pourquoi des liens vers Amazon ?",
      a: "Keurbook ne vend rien. Le bouton mène au livre sur Amazon.fr ; si vous l'achetez par ce lien, Keurbook touche une petite commission, sans que le prix change pour vous.",
    },
  ],
};
