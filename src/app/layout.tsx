import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUREUM — Luxury Coffee Experience",
  description: "Indulge in the art of premium coffee. Handcrafted beverages, curated pairings, and an elevated café experience.",
  keywords: ["luxury coffee", "premium cafe", "artisan coffee", "coffee builder"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
