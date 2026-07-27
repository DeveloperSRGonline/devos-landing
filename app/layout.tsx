import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevOS — Next-Gen Developer Context & Knowledge System",
    template: "%s | DevOS",
  },
  description:
    "DevOS connects your code snippets, project notes, architecture specs, and AI prompts into a unified developer operating system.",
  keywords: [
    "developer tools",
    "context system",
    "knowledge management",
    "code snippets",
    "developer notes",
    "AI coding assistant",
  ],
  authors: [{ name: "DeveloperSRG" }],
  creator: "DeveloperSRG",
  openGraph: {
    title: "DevOS — Your development knowledge, finally connected.",
    description:
      "DevOS connects your code snippets, project notes, architecture specs, and AI prompts into a unified developer operating system.",
    url: "https://devos.vercel.app",
    siteName: "DevOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevOS — Next-Gen Developer Context & Knowledge System",
    description:
      "DevOS connects your code snippets, project notes, architecture specs, and AI prompts into a unified developer operating system.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}


