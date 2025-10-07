# 🤖 AccessBot - Accessibilità per Tutti

![AccessBot Logo](/public/images/accessbot-logo.svg)

**AccessBot** è un'app educativa che semplifica l'accessibilità digitale attraverso corsi interattivi, un assistente AI e strumenti pratici.

## 🎯 Caratteristiche

- **📚 6 Percorsi Formativi** completi con 28 lezioni totali
- **🤖 Assistente AI** powered by Google Gemini per risposte immediate
- **🎮 Componenti Interattivi**: Quiz, ThemesTester, TextFactory
- **📊 Dashboard Impatto** con dati reali sull'accessibilità mondiale
- **♿ Completamente Accessibile** secondo WCAG 2.1 Level AA
- **🔥 Firebase Integration** per tracking progresso utente
- **🎨 Animazioni Rispettose** con support per prefers-reduced-motion
- **🌓 Dark Mode** integrato

## 🚀 Getting Started

### Prerequisiti

- Node.js 20 o superiore
- npm o yarn
- Account Firebase (opzionale, per autenticazione)
- Google Gemini API Key (opzionale, per assistente)

### Installazione

```bash
# Clone il repository
git clone https://github.com/yourusername/accessbot.git

# Entra nella cartella
cd accessbot

# Installa le dipendenze
npm install

# Crea file .env.local e aggiungi le tue chiavi
cp .env.example .env.local

# Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

### Variabili d'Ambiente

Crea un file `.env.local` con:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_MEASUREMENT_ID=your_measurement_id
```

## 📚 Percorsi Disponibili

1. **Il tuo dispositivo, ma più accessibile** (6 lezioni)
2. **Web for Everyone** (6 lezioni)
3. **Accessibilità: le basi** (4 lezioni)
4. **Strumenti che aiutano** (5 lezioni)
5. **Comunicare in modo accessibile** (4 lezioni)
6. **Accessibilità e quotidiano** (3 lezioni)

## 🛠️ Tecnologie Utilizzate

- **Framework**: Next.js 15
- **UI**: React 19
- **Styling**: CSS Modules
- **Animations**: Framer Motion
- **Charts**: Recharts
- **AI**: Google Generative AI
- **Database**: Firebase Firestore
- **Auth**: Firebase Auth
- **Icons**: React Feather
- **Markdown**: next-mdx-remote
- **Code Highlighting**: Bright

## ♿ Accessibilità

AccessBot è progettato seguendo le linee guida WCAG 2.1 Level AA:

- ✅ Skip links per navigazione rapida
- ✅ ARIA labels completi
- ✅ Navigazione completa da tastiera
- ✅ Focus visibile su tutti gli elementi
- ✅ Contrasti di colore adeguati
- ✅ HTML semantico
- ✅ Support per screen reader
- ✅ Rispetto per prefers-reduced-motion
- ✅ Responsive design

## 🌐 Deploy su Netlify

### Deploy Automatico

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/accessbot)

### Deploy Manuale

```bash
# Build del progetto
npm run build

# Il build sarà in .next/
# Netlify lo deploierà automaticamente con il plugin Next.js
```

## 📖 Struttura Progetto

```
accessbot/
├── public/
│   ├── content/           # Lezioni MDX
│   └── images/            # Immagini e assets
├── src/
│   ├── app/               # Pages Next.js
│   ├── components/        # Componenti React
│   ├── hooks/             # Custom hooks
│   └── utils/             # Utility functions
├── firestore.rules        # Firebase security rules
├── netlify.toml           # Configurazione Netlify
└── package.json
```

## 👥 Crediti

Progetto realizzato nell'ambito del PCTO **"Include To Win"** da:

- **I.T.I. Augusto Righi** - Napoli
- **Centro SInAPSi** - Università Federico II
- **Micron Technology**

### 💻 Sviluppatore

**Raffaele Nini**

- 🔗 [LinkedIn](https://www.linkedin.com/in/raffaele-nini-b21703373/)
- 🎓 Studente I.T.I. Augusto Righi - Napoli

## 📄 Licenza

Progetto educativo sviluppato per promuovere l'accessibilità digitale.

## 🤝 Contribuire

Contributi, issue e feature request sono benvenuti! Sentiti libero di aprire una issue o pull request.

## 📞 Contatti

Per informazioni sul Centro SInAPSi:

- 📞 Tel: 081 679946
- 📧 Email: accoglienza.sinapsi@unina.it
- 🕐 Orari: Lun-Mar 9-13, Mer 12-14, Ven 9-13
