import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Shippori_Mincho } from "next/font/google";
import { Ambient } from "@/components/Ambient";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/data/site";
import "../styles/globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
// Headings: a Mincho (Japanese serif) typeface; only its Latin glyphs are downloaded.
const serif = Shippori_Mincho({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-serif", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s by ${site.name}` },
  description: site.description,
  // The plain-text summary for AI assistants is linked from every page.
  alternates: { canonical: site.url, types: { "text/plain": "/llms.txt" } },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    "Fərid Hüseynov",
    "software engineer",
    "backend engineer",
    "Java",
    "Spring Boot",
    "C#",
    "ASP.NET",
    "Azerbaijan",
    "UNEC",
  ],
  // Allow full snippets and large previews, which search results and AI answers can quote.
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
  openGraph: {
    type: "profile",
    firstName: "Farid",
    lastName: "Huseynov",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101218" },
    { media: "(prefers-color-scheme: light)", color: "#f4eee1" },
  ],
};

// Dark is the default. Apply a saved "light" choice before first paint to avoid a flash.
const themeScript = `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Ambient />
        <CommandPalette />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
