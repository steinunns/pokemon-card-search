import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header/Header"; // ✅ Import Header

const robotoMono = Roboto_Mono({
  subsets: ["latin"], // ✅ Keep subsets only
  variable: "--font-roboto-mono", // ✅ Ensure variable is correctly used
});

export const metadata: Metadata = {
  title: "Pokémon Card Search", // ✅ Fixed "Pókemon" typo (optional)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoMono.variable}>
        <Header /> {/* ✅ Now correctly imported */}
        {children}
      </body>
    </html>
  );
}
