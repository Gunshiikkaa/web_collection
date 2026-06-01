import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AuraCraft | Custom Interactive Websites & Premium Digital Experiences",
  description: "Not Just Websites. Memories You Can Interact With. Premium bespoke digital experiences crafted for love stories, relationships, birthdays, anniversaries, and unforgettable moments.",
  keywords: ["interactive website", "relationship gift website", "custom digital experience", "birthday cake website", "heart lock website", "personalized spotify website", "creative agency", "Awwwards website"],
  authors: [{ name: "AuraCraft Studio" }],
  openGraph: {
    title: "AuraCraft | Custom Interactive Websites & Premium Digital Experiences",
    description: "Not Just Websites. Memories You Can Interact With. Premium bespoke digital experiences crafted for love stories, birthdays, and special occasions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraCraft | Custom Interactive Websites & Premium Digital Experiences",
    description: "Not Just Websites. Memories You Can Interact With.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-background text-foreground antialiased selection:bg-pink-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
