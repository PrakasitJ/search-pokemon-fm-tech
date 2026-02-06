import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/global.css";
import { ApolloWrapper } from "@/components/Providers/ApolloWrapper";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Pokedex",
  description: "Advanced Pokemon Search & Strategy Guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100 dark:bg-black min-h-screen flex flex-col`}
      >
        <ApolloWrapper>
            <Navbar />
            <main className="flex-1 w-full">
                {children}
            </main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
