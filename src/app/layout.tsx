import type { Metadata } from "next";
import "./globals.css";
import { Vazirmatn } from "next/font/google";
import { Navbar } from "@/components/shared/navbar"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "MIX BAZAR",
  description: "Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
