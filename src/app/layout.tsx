import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://luckyme.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Lucky Angelo — Full-Stack Developer",
    template: "%s | Lucky Angelo"
  },
  description:
    "Full-stack developer specializing in JavaScript frameworks. Building scalable, high-performance applications with a focus on clean code and exceptional user experiences.",
  keywords: [
    "Full-Stack Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "NestJS",
    "Philippines",
    "Lucky Angelo",
    "Lucky Angelo Rabosa"
  ],
  authors: [{ name: "Lucky Angelo Rabosa", url: BASE_URL }],
  creator: "Lucky Angelo Rabosa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Lucky Angelo Portfolio",
    title: "Lucky Angelo — Full-Stack Developer",
    description:
      "Full-stack developer specializing in JavaScript frameworks. Building scalable, high-performance applications with a focus on clean code and exceptional user experiences.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Lucky Angelo — Full-Stack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky Angelo — Full-Stack Developer",
    description:
      "Full-stack developer specializing in JavaScript frameworks. Building scalable, high-performance applications with a focus on clean code and exceptional user experiences.",
    images: [`${BASE_URL}/og-image.png`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: BASE_URL
  },
  verification: {
    google: "0Wswv5jFr3O5VaRBfBZGV7yNFLe5GmDWb3gVGmfn5us"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
