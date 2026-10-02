/**
 * Lot 01 : fiches ajoutées en octobre 2026 (voir docs/REDACTION.md).
 * Chaque lot est écrit séparément ; src/lib/demo/index.ts les rassemble.
 * Les six premières fiches servent d'essai aux couvertures tirées de planches (2 et 4 illustrations par image).
 */
import type { Author, Book } from "../../types";

type Saisie = Omit<Book, "kind" | "subtitle" | "originalLanguage" | "amazonAsin" | "priceCents" | "cover" | "addedAt" | "isPublished" | "featured" | "quote"> &
  Partial<Pick<Book, "subtitle" | "originalLanguage">>;

const livre = (b: Saisie): Book => ({
  kind: "livre",
  subtitle: null,
  originalLanguage: null,
  quote: null,
  amazonAsin: null,
  priceCents: null,
  cover: null,
  featured: false,
  addedAt: "2026-10-02",
  isPublished: true,
  ...b,
});

const auteur = (name: string, authorSlug: string) => ({ role: "auteur" as const, name, authorSlug });

/** Livres et BD de ce lot. */
export const livres: Book[] = [
  livre({
    slug: "un-chant-ecarlate",
    title: "Un chant écarlate",
    contributors: [auteur("Mariama Bâ", "mariama-ba")],
    genre: "roman",
    audience: "adulte",
    themes: ["amour", "famille", "tradition", "identite"],
    summary:
      "Mireille, fille d'un diplomate français, et Ousmane, brillant étudiant sénégalais issu d'un quartier populaire de Dakar, s'aiment contre l'avis de leurs familles. Elle quitte tout pour l'épouser et s'installer au Sénégal. Mais le couple doit vivre entre deux mondes : la mère d'Ousmane, les amis, les traditions et le regard des autres pèsent chaque jour un peu plus. Mariama Bâ interroge ce que l'amour peut contre les attentes d'une famille et d'une société.",
    whyRead: [
      "Le second et dernier roman de Mariama Bâ, publié après sa mort.",
      "Un couple mixte au cœur de Dakar, raconté sans fard.",
      "Une réflexion toujours actuelle sur l'amour face aux traditions.",
    ],
    year: 1981,
    publisher: "Le Serpent à plumes",
    pages: null,
    isbn: null,
    format: "poche",
    awards: [],
  }),
  livre({
    slug: "xala",
    title: "Xala",
    contributors: [auteur("Ousmane Sembène", "ousmane-sembene")],
    genre: "roman",
    audience: "adulte",
    themes: ["politique", "humour", "tradition", "independances"],
    summary:
      "À Dakar, au lendemain des indépendances, El Hadji Abdou Kader Bèye est un homme d'affaires prospère, membre de la nouvelle élite du pays. Pour affirmer sa réussite, il épouse une troisième femme, bien plus jeune que lui. Mais le soir des noces, il est frappé du « xala », une impuissance qu'il croit due à un mauvais sort. Sa quête d'un remède devient une satire mordante de la bourgeoisie africaine qui a pris la place des colons.",
    whyRead: [
      "Une satire féroce et drôle des nouvelles élites africaines.",
      "Adapté au cinéma par Sembène lui-même en 1975.",
      "Un roman court, vif, qui se lit d'une traite.",
    ],
    year: 1973,
    publisher: "Présence africaine",
    pages: null,
    isbn: null,
    format: null,
    awards: [],
    adaptations: [{ kind: "film", title: "Xala", year: 1975, by: "Ousmane Sembène" }],
  }),
  livre({
    slug: "le-docker-noir",
    title: "Le Docker noir",
    contributors: [auteur("Ousmane Sembène", "ousmane-sembene")],
    genre: "roman",
    audience: "adulte",
    themes: ["exil", "travail", "identite"],
    summary:
      "Diaw Falla, docker sénégalais sur le port de Marseille, consacre ses nuits à écrire un roman. Une romancière française s'approprie son manuscrit et le publie sous son nom, avec succès. Quand Diaw est jugé pour la mort de cette femme, le procès devient celui d'un travailleur noir face à la justice et à la presse. Ce premier roman, nourri de la vie de Sembène lui-même, dit la condition des ouvriers africains en France.",
    whyRead: [
      "Le premier roman de Sembène, inspiré de ses années de docker à Marseille.",
      "Un regard rare sur les travailleurs africains en France dans les années 1950.",
      "Une réflexion sur qui a le droit d'écrire et d'être lu.",
    ],
    year: 1956,
    publisher: "Présence africaine",
    pages: null,
    isbn: null,
    format: null,
    awards: [],
  }),
  livre({
    slug: "o-pays-mon-beau-peuple",
    title: "Ô pays, mon beau peuple !",
    contributors: [auteur("Ousmane Sembène", "ousmane-sembene")],
    genre: "roman",
    audience: "adulte",
    themes: ["colonisation", "tradition", "amour", "famille"],
    summary:
      "Après la guerre, Oumar Faye revient dans son village de Casamance avec Isabelle, sa jeune épouse européenne. Il rêve de moderniser l'agriculture et de libérer les paysans de la mainmise des commerçants coloniaux. Mais il se heurte à la fois aux intérêts des Blancs installés et aux résistances de sa propre famille, qui accepte mal son mariage. Un roman sur l'espoir d'une Afrique qui veut décider de son avenir.",
    whyRead: [
      "Un portrait vivant de la Casamance à la fin de l'époque coloniale.",
      "Un héros qui veut changer les choses, entre deux mondes.",
      "Le deuxième roman de Sembène, déjà engagé et généreux.",
    ],
    year: 1957,
    publisher: "Pocket",
    pages: null,
    isbn: null,
    format: "poche",
    awards: [],
  }),
  livre({
    slug: "chants-d-ombre",
    title: "Chants d'ombre",
    contributors: [auteur("Léopold Sédar Senghor", "leopold-sedar-senghor")],
    genre: "poesie",
    audience: "adulte",
    themes: ["identite", "exil", "enfance", "tradition"],
    summary:
      "Premier recueil de Senghor, Chants d'ombre rassemble des poèmes écrits pendant ses années d'études et d'enseignement en France. Le poète, loin du Sénégal, se souvient du royaume d'enfance de Joal, des nuits sereres, des voix des griots et des femmes de son village. On y trouve notamment le célèbre poème « Femme noire ». C'est l'acte de naissance poétique de la négritude chez Senghor.",
    whyRead: [
      "Le premier recueil de Senghor, avec le poème « Femme noire ».",
      "La nostalgie de l'enfance sénégalaise, vue depuis l'exil.",
      "Une porte d'entrée idéale dans la poésie de la négritude.",
    ],
    year: 1945,
    publisher: "Seuil",
    pages: null,
    isbn: null,
    format: null,
    awards: [],
  }),
  livre({
    slug: "terre-ceinte",
    title: "Terre ceinte",
    contributors: [auteur("Mohamed Mbougar Sarr", "mohamed-mbougar-sarr")],
    genre: "roman",
    audience: "adulte",
    themes: ["politique", "guerre", "spiritualite", "famille"],
    summary:
      "Kalep, petite ville du Sahel, vit sous le joug d'un groupe djihadiste qui impose sa loi par la terreur. Un jeune couple y est exécuté pour s'être aimé. Dans l'ombre, un petit groupe d'habitants décide de résister en diffusant un journal clandestin, tandis que les mères des victimes s'écrivent des lettres. Le premier roman de Mohamed Mbougar Sarr montre comment des gens ordinaires tiennent face à l'oppression.",
    whyRead: [
      "Le premier roman du futur prix Goncourt 2021.",
      "Un récit fort sur la résistance face au fanatisme.",
      "Prix Ahmadou-Kourouma et Grand prix du roman métis 2015.",
    ],
    year: 2014,
    publisher: "Présence africaine",
    pages: null,
    isbn: null,
    format: null,
    awards: [
      { name: "Prix Ahmadou-Kourouma", year: 2015 },
      { name: "Grand prix du roman métis", year: 2015 },
    ],
  }),
];

/** Nouveaux auteurs de ce lot (vide si le lot ne complète que des auteurs déjà présents). */
export const auteurs: Author[] = [];

/** Photos libres de droits des nouveaux auteurs (fichiers : public/authors/). */
export const photos: Record<string, { photo: string; credit: string; source: string }> = {};

/** Livres de ce lot qui ont leur illustration Keurbook (public/illustrations/<slug>.webp). */
export const illustres: string[] = ["un-chant-ecarlate", "xala", "le-docker-noir", "o-pays-mon-beau-peuple", "chants-d-ombre", "terre-ceinte"];
