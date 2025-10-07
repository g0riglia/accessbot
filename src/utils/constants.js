import {
  MessageCircle,
  Tool,
  Flag,
  BarChart2,
  User,
  Volume2,
  AlignLeft,
  BookOpen,
  Moon,
  Zap,
} from "react-feather";

export const SITE_TITLE = "AccessBot";

export const NAVBAR_BUTTONS = [
  {
    icon: <MessageCircle />,
    route: "/assistant",
    label: "Assistente",
  },
  {
    icon: <Tool />,
    route: "/tools",
    label: "Strumenti",
  },
  {
    icon: <Flag />,
    route: "/paths",
    label: "Percorsi",
  },
  {
    icon: <BarChart2 />,
    route: "/impact",
    label: "Impatto",
  },
  {
    icon: <User />,
    route: "/user",
    label: "Profilo",
  },
];

//FAQ
export const FAQ = [
  {
    title: "Cos'è l'accessibilità?",
    content:
      "Puoi spiegarmi in modo semplice che cos’è l’accessibilità digitale e perché è importante nella vita di tutti i giorni?",
  },
  {
    title: "Legge Stanca",
    content:
      "Mi puoi raccontare in cosa consiste la Legge Stanca e quali sono i suoi obiettivi principali per l’accessibilità in Italia?",
  },
  {
    title: "Strumenti Utili",
    content:
      "Quali sono gli strumenti digitali più comuni che aiutano le persone con disabilità nella vita quotidiana?",
  },
  {
    title: "Supporti a Scuola",
    content:
      "Che tipo di supporti possono richiedere gli studenti con difficoltà o disabilità a scuola per migliorare l’apprendimento?",
  },
  {
    title: "Accessibilità web",
    content:
      "Quali sono le linee guida più importanti da seguire per rendere un sito web davvero accessibile a tutti gli utenti?",
  },
];

// Settings
export const SETTINGS = [
  {
    name: "vocalFeedback",
    icon: <Volume2 />,
    title: "Feedback Vocale del Bot",
    description:
      "L'assistente legge ad alta voce solo le proprie risposte, indipendente dalle impostazioni del dispositivo.",
  },
  {
    name: "simplifyAnswers",
    icon: <AlignLeft />,
    title: "Semplifica Risposte",
    description:
      "Riduce il testo delle risposte rendendole più dirette e comprensibili.",
  },
  {
    name: "explainBetterMode",
    icon: <BookOpen />,
    title: 'Modalità "Spiega Meglio"',
    description:
      "L'assistente aggiunge esempi, paragoni o spiegazioni più dettagliate.",
  },
  {
    name: "reduceAnimations",
    icon: <Zap />,
    title: "Riduci Animazioni",
    description:
      "Disattiva le animazioni e transizioni per ridurre distrazioni e migliorare le performance.",
  },
  {
    name: "darkMode",
    icon: <Moon />,
    title: "Modalità scura / contrasto elevato",
    description:
      "Si attiva la modalità scura (che coincide con quella ad alto contrasto) per il sito.",
  },
];

// Learning Paths
export const LEARNING_PATHS = [
  {
    id: 1,
    slug: "dispositivo-accessibile",
    title: "Il tuo dispositivo, ma più accessibile",
    description:
      "Dai font più leggibili alla modalità contrasto elevato: impara a rendere ogni dispositivo adatto a te.",
    tags: ["Guida", "Interattivo", "Quiz"],
    lessons: 6,
    image: "/images/accessible-device.jpeg",
    imageAlt: "Smartphone con icona dell'accessibilità dentro.",
  },
  {
    id: 2,
    slug: "web-for-everyone",
    title: "Web for Everyone",
    description:
      "Scopri buone pratiche per creare, scrivere e condividere contenuti inclusivi online — dai colori alle descrizioni alternative, fino ai link accessibili.",
    tags: ["Guida", "Quiz", "Simulazione"],
    lessons: 6,
    image: "/images/accessible-web.jpeg",
    imageAlt: "Computer con il simbolo del web dentro.",
  },
  {
    id: 3,
    slug: "accessibilita-basi",
    title: "Accessibilità: le basi",
    description:
      "Cos'è davvero l'accessibilità? Chi ne ha bisogno? E perché riguarda tutti? Il percorso perfetto per capire il linguaggio, le leggi e la filosofia dietro un mondo più inclusivo.",
    tags: ["Guida", "Video", "Info"],
    lessons: 4,
    image: "/images/accessibility-bases.jpeg",
    imageAlt: "Un libro aperto con una lampadina accesa che fluttua sopra.",
  },
  {
    id: 4,
    slug: "strumenti-che-aiutano",
    title: "Strumenti che aiutano",
    description:
      "Dalle app con riconoscimento vocale ai lettori Braille digitali: un viaggio tra le soluzioni che rendono tutto più semplice.",
    tags: ["Interattivo", "Guida", "Video"],
    lessons: 5,
    image: "/images/accessible-tools.jpeg",
    imageAlt: "Ingranaggio con un device al suo interno.",
  },
  {
    id: 5,
    slug: "comunicare-accessibile",
    title: "Comunicare in modo accessibile",
    description:
      "Come scrivere, parlare e presentare in modo inclusivo. Dalle email ai social, impara piccole abitudini per farti capire da tutti.",
    tags: ["Guida", "Quiz", "Simulazione"],
    lessons: 4,
    image: "/images/accessible-communication.jpeg",
    imageAlt: "Icona di un messaggio con all'interno un megafono.",
  },
  {
    id: 6,
    slug: "accessibilita-quotidiano",
    title: "Accessibilità e quotidiano",
    description:
      "Piccole azioni per un grande impatto: migliora segnaletica, audio nei video e leggibilità dei post.",
    tags: ["Info", "Interattivo", "Video"],
    lessons: 3,
    image: "/images/everyday-accessibility.jpeg",
    imageAlt: "Una casa stilizzata sovrapposta ad un calendario.",
  },
];

// Context for Gemini
export const DOCUMENT_CONTEXT =
  "Sei un assistente virtuale specializzato in accessibilità nel mondo e universitaria. Il tuo compito è rispondere solo a domande riguardanti l’accessibilità, ad esempio per studenti con disabilità o bisogni speciali che vogliono studiare all'Università degli Studi di Napoli Federico II. Conosci i servizi offerti dal Centro SInAPSi della Federico II, le normative e i diritti degli studenti con disabilità. Fornisci risposte chiare, utili e rispettose, evitando argomenti che non riguardano l’accessibilità o l’inclusione universitaria. Rispondi anche a domande più generiche sull'accessibilità in generale. Se te lo chiedono, le informazioni del centro Sinapsi sono le seguenti: 'telefonando al numero 081 679946 il lunedì e martedì dalle 9.00 alle 13.00, il mercoledi dalle 12.00 alle 14.00, il venerdì dalle ore 9.00 alle ore 13.00 o email accoglienza.sinapsi@unina.it'. Quando rispondi, dai risposte breve e che indirizzino ad altre possibili domande.";

// Color tokens for light and dark themes
export const LIGHT_TOKENS = {
  "--color-primary": "#1E88E5",
  "--color-primary-hover": "#1E88E5",
  "--color-primary-lighter": "#8fc5f45f",
  "--color-background": "#faf9f9",
  "--color-surface": "white",
  "--color-text": "black",
  "--color-text-secondary": "rgb(129, 129, 129)",
  "--color-input-bg": "rgb(236, 232, 232)",
  "--color-text-muted": "#666",
  "--color-border": "black",
  "--color-shadow": "rgb(224, 223, 223)",
  "--color-shadow-strong": "rgba(0, 0, 0, 0.1)",
  "--color-message-user": "#d3d1d1",
  "--color-black": "black",
};

export const DARK_TOKENS = {
  "--color-primary": "#1E88E5",
  "--color-primary-hover": "#1E88E5",
  "--color-primary-lighter": "#8fc5f45f",
  "--color-background": "#1a1a1a",
  "--color-surface": "#2d2d2d",
  "--color-text": "white",
  "--color-text-secondary": "#e0e0e0",
  "--color-input-bg": "rgb(107, 107, 107)",
  "--color-text-muted": "#999",
  "--color-border": "#444",
  "--color-shadow": "rgba(0, 0, 0, 0.3)",
  "--color-shadow-strong": "rgba(0, 0, 0, 0.5)",
  "--color-message-user": "#d3d1d1",
  "--color-black": "black",
};
