import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Lalezar } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const lalezar = Lalezar({
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-lalezar",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ejbari.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hamed Ejbari | Health & Tech",
    template: "%s | Hamed Ejbari",
  },
  description: "Health teacher and systems engineer based in Zahedan. I teach human health and build reliable, self-hosted systems.",
  authors: [{ name: "Hamed Ejbari", url: siteUrl }],
  creator: "Hamed Ejbari",
  publisher: "Hamed Ejbari",
  keywords: ["Hamed Ejbari", "health teacher", "Zahedan", "system engineer", "Linux", "Python", "portfolio"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Hamed Ejbari",
    locale: "en_US",
    title: "Hamed Ejbari | Health & Tech",
    description: "Health teacher and systems engineer based in Zahedan.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Hamed Ejbari — Health & Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hamed138282",
    title: "Hamed Ejbari | Health & Tech",
    description: "Health teacher and systems engineer based in Zahedan.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    shortcut: "/favicon.svg",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hamed Ejbari",
  url: siteUrl,
  jobTitle: "Health Teacher",
  address: { "@type": "PostalAddress", addressLocality: "Zahedan", addressCountry: "IR" },
  sameAs: ["https://github.com/Hamed-Ej", "https://t.me/hamedejbari", "https://instagram.com/hamedejbary", "https://x.com/hamed138282"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${jetbrains.variable} ${lalezar.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://ghchart.rshah.org" />
        <link rel="dns-prefetch" href="https://ghchart.rshah.org" />
        <link rel="preconnect" href="https://www.google.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-mono bg-background text-foreground">
        <ThemeProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-foreground text-background px-3 py-1 text-xs uppercase tracking-widest z-[100]">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="max-w-5xl mx-auto px-6 flex-grow w-full">
            {children}
          </main>
          <footer className="border-t border-gray-200 dark:border-transparent mt-20">
            <div className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center text-xs text-gray-400 tracking-widest uppercase">
              <span>&copy; {new Date().getFullYear()} Hamed Ejbari</span>
              <span>Zahedan, Iran</span>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

