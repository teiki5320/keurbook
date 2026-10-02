/** Compléments du groupe 4 (voir docs/EXTRAS.md). */
import type { Adaptation, Quote } from "../../types";

export const facts: Record<string, string[]> = {
  raharimanana: [
    "En 1989, sa pièce Le Prophète et le Président est interdite à Tananarive sous la pression des autorités ; deux mois plus tard, il part étudier en France.",
    "Avant de se consacrer à l'écriture, il a longtemps enseigné le français en Seine-Saint-Denis.",
    "Dans Portraits d'insurgés, ses textes dialoguent avec les photographies du Malgache Pierrot Men, autour de l'insurrection de 1947.",
  ],
  "ali-zamir": [
    "Il a écrit Anguille sous roche au Caire, entre 2009 et 2010, six ans avant sa parution.",
    "En 2017, il est le premier écrivain accueilli en résidence par Montpellier Méditerranée Métropole : il y écrit Mon étincelle.",
    "Le narrateur de Jouissance n'est pas un personnage comme les autres : c'est un livre, qui raconte ses aventures de lecteur en lecteur.",
  ],
  "ngugi-wa-thiongo": [
    "Baptisé James Ngugi, il rejette ce prénom jugé colonial et adopte vers 1970 le nom de Ngũgĩ wa Thiong'o.",
    "En prison, il écrit sur du papier toilette le premier roman moderne en kikuyu, Caitaani Mũtharaba-inĩ (Le Diable sur la croix).",
    "Ne pleure pas, mon enfant, paru en 1964, est le premier roman en anglais publié par un écrivain d'Afrique de l'Est.",
    "Sa nouvelle La Révolution debout (2016) a été traduite dans plus de cent langues, un record pour un texte africain.",
  ],
  "j-m-coetzee": [
    "Sa thèse de doctorat est une analyse stylistique de la prose de Samuel Beckett, menée à l'aide d'un ordinateur.",
    "En 1970, il occupe un bâtiment de l'université de Buffalo avec d'autres enseignants contre la guerre du Vietnam, ce qui contribue à l'échec de sa demande de résidence aux États-Unis.",
    "Pour résister à la domination de l'anglais, il a fait paraître La Mort de Jésus et Le Polonais d'abord en espagnol, avant l'anglais.",
    "Il est connu pour fuir les cérémonies de remise de prix.",
  ],
  "nelson-mandela": [
    "Son prénom xhosa, Rolihlahla, signifie familièrement « fauteur de troubles » ; « Nelson » lui a été donné à l'école.",
    "À Robben Island, il rédige en secret le manuscrit de ses mémoires, qui sort clandestinement vers Londres ; des pages saisies le privent d'études pendant quatre ans.",
    "Il est resté sur la liste de surveillance antiterroriste des États-Unis jusqu'en 2008.",
    "Depuis 2009, l'ONU célèbre le 18 juillet, jour de sa naissance, en invitant chacun à consacrer 67 minutes aux autres.",
  ],
  "chinua-achebe": [
    "Le titre Things Fall Apart (Le monde s'effondre) vient d'un vers du poème « The Second Coming » de W. B. Yeats.",
    "En 1957, il envoie l'unique manuscrit du roman à une agence de dactylographie londonienne qui le laisse dormir des mois : sa supérieure à la radio va le réclamer.",
    "En 2004 puis en 2011, il refuse une haute distinction nationale du Nigeria pour protester contre la situation politique du pays.",
    "C'est lui qui a recommandé à son éditeur londonien les premiers romans d'un jeune étudiant kényan, Ngũgĩ wa Thiong'o.",
  ],
  "chimamanda-ngozi-adichie": [
    "À Nsukka, elle a grandi dans une maison du campus qu'avait occupée avant elle Chinua Achebe.",
    "Avant l'écriture, elle a étudié la médecine et la pharmacie pendant un an et demi.",
    "En 2013, Beyoncé a repris des extraits de sa conférence « Nous sommes tous des féministes » dans sa chanson « Flawless ».",
    "En Suède, le texte de Nous sommes tous des féministes a été distribué à tous les lycéens de 16 ans.",
  ],
  "yaa-gyasi": [
    "C'est en lisant Le Chant de Salomon de Toni Morrison, à 17 ans, qu'elle décide de devenir écrivaine.",
    "Elle a commencé No Home en travaillant pour une jeune entreprise de technologie à San Francisco.",
    "Pour ce premier roman, l'éditeur américain Knopf lui a versé une avance de plus d'un million de dollars.",
  ],
  "wole-soyinka": [
    "En 1965, il est arrêté pour avoir pris d'assaut une radio et remplacé le discours enregistré d'un Premier ministre par une bande dénonçant une fraude électorale.",
    "En 1961, il tient un petit rôle dans Okonkwo, la première adaptation radiophonique du roman d'Achebe Le monde s'effondre.",
    "Étudiant à Ibadan, il fonde avec des camarades la National Association of Seadogs, première confrérie étudiante du Nigeria.",
    "En 1984, un tribunal nigérian interdit Cet homme est mort, ses notes de prison.",
  ],
  "abdulrazak-gurnah": [
    "Quand l'Académie suédoise l'appelle en 2021, il est dans sa cuisine et croit d'abord à une farce.",
    "Sa langue maternelle est le swahili ; il écrit en anglais, en y glissant des mots swahilis, arabes et allemands.",
    "Depuis 1987, il participe à la revue littéraire britannique Wasafiri, consacrée aux littératures du monde.",
  ],
  "mia-couto": [
    "Il a choisi le surnom « Mia » parce que, enfant, il adorait les chats.",
    "Un jury de la Foire du livre du Zimbabwe a classé Terre somnambule parmi les douze meilleurs livres africains du XXᵉ siècle.",
    "Il est membre correspondant de l'Académie brésilienne des lettres depuis 1998.",
  ],
  nimrod: [
    "Il affirme qu'« il est temps de considérer le français comme une langue africaine ».",
    "Philosophe de formation, il enseigne la philosophie à l'université de Picardie Jules-Verne, à Amiens.",
  ],
  "wilfried-nsonde": [
    "En 2010, il fait partie des dix écrivains embarqués dans le Transsibérien des écrivains « Blaise Cendrars ».",
    "En 2016, il est le sixième écrivain invité à enseigner à l'université de Berne.",
  ],
  "max-lobe": [
    "Arrivé en Suisse en 2004, il étudie d'abord la communication et le journalisme à Lugano, en Suisse italienne.",
    "Il vit à Genève, dans le quartier des Pâquis, celui de la rue qui donne son titre à son roman 39, rue de Berne.",
  ],
  "werewere-liking": [
    "Essentiellement autodidacte, elle commence par la poésie et le chant en 1966, puis la peinture en 1968.",
    "Elle a inventé le mot « misovire » (celle qui n'aime pas les hommes) pour l'héroïne d'Elle sera de jaspe et de corail.",
    "Le village Ki-Yi a formé de nombreux artistes, dont les chanteuses Dobet Gnahoré et Manou Gallo.",
  ],
  "francis-bebey": [
    "Son nom, Bebey, signifie « les marées » en douala : un symbole de ce qui ne passe pas.",
    "Il a composé la musique de Yaaba, le film d'Idrissa Ouédraogo primé au Festival de Cannes en 1989.",
    "Le groupe Arcade Fire a repris la flûte de son « Coffee Cola Song » dans « Everything Now », jouée par son fils Patrick.",
  ],
};

export const quotes: Record<string, Quote> = {
  "l-hibiscus-pourpre": {
    text: "Une gorgée d'amour, l'appelait-il, parce qu'on partage les petites choses qu'on aime avec les gens qu'on aime.",
    source: null,
  },
  "l-autre-moitie-du-soleil": {
    text: "Tu ne peux pas écrire un scénario dans ta tête et te forcer à le suivre. Il faut que tu arrêtes de te tourmenter.",
    source: null,
  },
  americanah: {
    text: "C'était si facile de mentir à des inconnus, de créer avec eux les différentes versions de nos vies que l'on a imaginées.",
    source: null,
  },
  "nous-sommes-tous-des-feministes": {
    text: "Je considère comme féministe un homme ou une femme qui dit, oui, la question du genre telle qu'elle existe aujourd'hui pose problème et nous devons le régler, nous devons faire mieux.",
    source: null,
  },
  "chere-ijeawele": {
    text: "Voici ce qui devrait être ton postulat féministe de base : je compte. Je compte autant.",
    source: null,
  },
  "notes-sur-le-chagrin": {
    text: "Le chagrin n'est pas vaporeux ; il a du corps, il est oppressant, c'est chose opaque.",
    source: null,
  },
  "no-home": {
    text: "C'est le problème de l'histoire. Nous ne pouvons pas connaître ce que nous n'avons ni vu, ni entendu, ni expérimenté par nous-mêmes.",
    source: null,
  },
  "au-coeur-de-ce-pays": {
    text: "Ce n'est pas la parole qui fait de l'homme un homme, mais la parole des autres.",
    source: null,
  },
  "en-attendant-les-barbares": {
    text: "Quel oiseau a le cœur à chanter, dans un buisson d'épines ?",
    source: null,
  },
  "michael-k-sa-vie-son-temps": {
    text: "Je suis comme une femme dont les enfants ont quitté la maison, pensa-t-il ; il ne reste plus qu'à mettre de l'ordre et à écouter le silence.",
    source: null,
  },
  foe: {
    text: "Je vous demande de vous en souvenir : ce n'est pas parce qu'un homme porte la marque du naufrage qu'au fond de son cœur il est un naufragé.",
    source: null,
  },
  "scenes-de-la-vie-d-un-jeune-garcon": {
    text: "Est-ce que c'est cela l'amour, cette générosité sans contrainte, ce sentiment d'être enfin compris, de ne pas avoir à faire semblant ?",
    source: null,
  },
  "l-homme-ralenti": {
    text: "Nous avons des enfants pour nous apprendre à aimer et à servir. Par le truchement de nos enfants nous devenons les serviteurs du temps.",
    source: null,
  },
  "les-interpretes": {
    text: "Le diplôme ne fait pas le diplômé.",
    source: null,
  },
  "cet-homme-est-mort": {
    text: "L'homme continue de mourir en tous ceux qui se taisent face à la tyrannie.",
    source: null,
  },
  "pres-de-la-mer": {
    text: "Je suis un réfugié, un demandeur d'asile. Ces mots ne sont pas simples, même si l'habitude qu'on a de les entendre les fait apparaître comme tels.",
    source: null,
  },
  "l-accordeur-de-silences": {
    text: "Les morts ne meurent pas lorsqu'ils cessent de vivre, mais quand nous les vouons à l'oubli.",
    source: null,
  },
  "le-fils-d-agatha-moudio": {
    text: "Le temps qui vient n'est pas derrière, il est devant.",
    source: null,
  },
  "elle-sera-de-jaspe-et-de-corail": {
    text: "Les émotions étant l'énergie motrice de la vie, plus elles seront puissantes, plus la vie sera exaltante.",
    source: null,
  },
};

export const adaptations: Record<string, Adaptation[]> = {
  "anguille-sous-roche": [{ kind: "théâtre", title: "Anguille sous roche", year: 2019, by: "Guillaume Barbot" }],
  disgrace: [{ kind: "film", title: "Disgrace", year: 2008, by: "Steve Jacobs" }],
  "michael-k-sa-vie-son-temps": [
    { kind: "théâtre", title: "Life & Times of Michael K", year: 2021, by: "Lara Foot" },
  ],
  "un-long-chemin-vers-la-liberte": [
    { kind: "film", title: "Mandela : Un long chemin vers la liberté", year: 2013, by: "Justin Chadwick" },
  ],
  "le-monde-s-effondre": [
    { kind: "série", title: "Things Fall Apart", year: 1987, by: "David Orere" },
    { kind: "théâtre", title: "Things Fall Apart", year: 1999, by: "Biyi Bandele" },
  ],
  "l-autre-moitie-du-soleil": [{ kind: "film", title: "Half of a Yellow Sun", year: 2013, by: "Biyi Bandele" }],
  "la-mort-et-l-ecuyer-du-roi": [
    { kind: "théâtre", title: "Death and the King's Horseman", year: 2009, by: "Rufus Norris" },
    { kind: "film", title: "Elesin Oba, The King's Horseman", year: 2022, by: "Biyi Bandele" },
  ],
  "terre-somnambule": [{ kind: "film", title: "Terra Sonâmbula", year: 2007, by: "Teresa Prata" }],
  "un-fleuve-appele-temps-une-maison-appelee-terre": [
    {
      kind: "film",
      title: "Um Rio Chamado Tempo, Uma Casa Chamada Terra",
      year: 2005,
      by: "José Carlos de Oliveira",
    },
  ],
  "le-coeur-des-enfants-leopards": [
    { kind: "théâtre", title: "Le Cœur des enfants léopards", year: 2011, by: "Dieudonné Niangouna" },
  ],
};
