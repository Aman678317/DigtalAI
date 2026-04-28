import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURA GOLF | Premium Golf Performance & Charity",
  description: "Improve your game, win big, and support charities you love. Join the modern golf revolution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground bg-mesh`}>
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <footer className="border-t border-white/10 py-12 px-6 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} AURA GOLF. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
