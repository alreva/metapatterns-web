import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MetaPatterns Web",
  description: "A Next.js app with SSG, TypeScript, and Tailwind CSS dark mode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50`}
      >
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
            <div className="container mx-auto flex h-14 items-center px-4">
              <div className="mr-4 flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <span className="font-bold text-slate-900 dark:text-slate-50">
                    MetaPatterns
                  </span>
                </a>
              </div>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-50 text-slate-600 dark:text-slate-400"
                  href="/about"
                >
                  About
                </a>
                <a
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-50 text-slate-600 dark:text-slate-400"
                  href="/blog"
                >
                  Blog
                </a>
                <a
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-50 text-slate-600 dark:text-slate-400"
                  href="/contact"
                >
                  Contact
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 dark:border-slate-800 py-6 md:py-0">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-slate-600 dark:text-slate-400 md:text-left">
                Built with Next.js, TypeScript, and Tailwind CSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}