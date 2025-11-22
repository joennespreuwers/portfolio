import type { Metadata } from "next";
import { Inter, Tinos } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tinos = Tinos({
  variable: "--font-tinos",
  subsets: ["latin"],
  weight: ["400","700"],
});


export const metadata: Metadata = {
  title: "Joenne Spreuwers | Cinematographer & Photographer",
  description: "19-year-old freelance cinematographer and photographer capturing moments through video and photography. Based in Belgium, specializing in storytelling through visual media.",
  keywords: ["cinematographer", "photographer", "videographer", "Belgium", "studio3000", "freelance", "visual storytelling"],
  authors: [{ name: "Joenne Spreuwers" }],
  openGraph: {
    title: "Joenne Spreuwers | Cinematographer & Photographer",
    description: "Freelance cinematographer and photographer capturing moments through video and photography",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joenne Spreuwers | Cinematographer & Photographer",
    description: "Freelance cinematographer and photographer capturing moments through video and photography",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${inter.variable} ${tinos.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
