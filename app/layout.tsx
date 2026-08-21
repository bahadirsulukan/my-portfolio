import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bahadir Sulukan — Cloud & DevOps",
  description:
    "Computer science student at Hochschule Darmstadt focused on Cloud & DevOps — AWS, Docker, CI/CD, PostgreSQL — and modern web engineering with React and Next.js.",
  icons: {
    icon: "/favicon.ico?v=4",
    shortcut: "/favicon.ico?v=4",
    apple: "/favicon.ico?v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=4" />
        <link rel="shortcut icon" href="/favicon.ico?v=4" />
        <meta name="theme-color" content="#080808" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
