import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google"; // 1. Import Font
import "../globals.css";

// 2. Setup Font Plus Jakarta Sans (Untuk Teks Biasa/Paragraf)
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta", // Ini nama variabel buat Tailwind
});

// 3. Setup Font Playfair (Untuk Judul Besar/Elegan)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Cartenz Cocoa Clone",
  description: "Premium Cocoa Export from Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 4. Masukkan variabel font ke dalam body */}
      <body 
        suppressHydrationWarning={true}
        className={`${jakarta.variable} ${playfair.variable} font-sans antialiased bg-stone-50 text-stone-900`}
      >
        {children}
      </body>
    </html>
  );
}
