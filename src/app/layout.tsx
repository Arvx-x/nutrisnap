import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NutriScan",
  description: "Smart AI Nutrition Guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${rubik.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <div className="min-h-svh pb-20">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
