import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import LocaleProvider from "@/components/LocaleProvider";
import portfolioConfig from "@/config/portfolio.config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: portfolioConfig.name,
};

function generateThemeStyles() {
  const { primary, secondary, light, dark } = portfolioConfig.theme;
  return `
    :root {
      --background: ${light.background};
      --background-secondary: ${light.backgroundSecondary};
      --foreground: ${light.foreground};
      --foreground-secondary: ${light.foregroundSecondary};
      --border: ${light.border};
      --card: ${light.card};
      --primary: ${primary};
      --secondary: ${secondary};
    }
    [data-theme="dark"] {
      --background: ${dark.background};
      --background-secondary: ${dark.backgroundSecondary};
      --foreground: ${dark.foreground};
      --foreground-secondary: ${dark.foregroundSecondary};
      --border: ${dark.border};
      --card: ${dark.card};
    }
  `;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={portfolioConfig.defaultLocale} suppressHydrationWarning className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: generateThemeStyles() }} />
      </head>
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
          <ThemeProvider>
            <Navbar />
            <main className="pt-20 flex flex-col flex-1">
              {children}
            </main>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
