import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: '300',
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Estate, Reimagined.",
  description: "Crafting the art & edge of selling beautifully. Your listings. Cinematic. Branded. Effortless.",
  icons: {
    icon: '/ettra-icon-32.png',
    shortcut: '/ettra-icon-32.png',
    apple: '/ettra-icon-180.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
