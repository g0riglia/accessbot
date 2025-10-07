import { Roboto } from "next/font/google";
import { SITE_TITLE, LIGHT_TOKENS, DARK_TOKENS } from "@/utils/constants";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import UserSettingsProvider from "@/components/UserSettingsProvider";
import AuthProvider from "@/components/AuthProvider";
import { cookies } from "next/headers";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description:
    "AccessBot è l'app che semplifica l'accessibilità a scuola: consigli, strumenti e un chatbot pronto a rispondere alle tue domande.",
  keywords: [
    "accessibilità",
    "inclusione",
    "disabilità",
    "WCAG",
    "tecnologie assistive",
    "screen reader",
    "accessibilità digitale",
    "web accessibile",
    "Federico II",
    "SInAPSi",
    "educazione inclusiva",
  ],
  authors: [
    {
      name: "Raffaele Nini",
      url: "https://www.linkedin.com/in/raffaele-nini-b21703373/",
    },
    { name: "I.T.I. Augusto Righi - Napoli" },
  ],
  creator: "Raffaele Nini",
  publisher: "AccessBot",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/images/accessbot-logo.svg",
    shortcut: "/images/accessbot-logo.svg",
    apple: "/images/accessbot-logo.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://accessbot.netlify.app",
    title: SITE_TITLE,
    description:
      "AccessBot è l'app che semplifica l'accessibilità a scuola: consigli, strumenti e un chatbot pronto a rispondere alle tue domande.",
    siteName: SITE_TITLE,
    images: [
      {
        url: "/images/accessbot-logo.svg",
        width: 647,
        height: 548,
        alt: "AccessBot Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "AccessBot è l'app che semplifica l'accessibilità a scuola: consigli, strumenti e un chatbot pronto a rispondere alle tue domande.",
    images: ["/images/accessbot-logo.svg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f9" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

async function RootLayout({ children }) {
  const savedTheme = (await cookies()).get("color-theme");
  const theme = savedTheme?.value || "light";
  const colors = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

  return (
    <html
      lang="it"
      className={`${roboto.variable}`}
      data-color-theme={theme}
      style={colors}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Salta al contenuto principale
        </a>
        <UserSettingsProvider>
          <AuthProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Navbar />
          </AuthProvider>
        </UserSettingsProvider>
      </body>
    </html>
  );
}

export default RootLayout;
