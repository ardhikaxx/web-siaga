import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "SIAGA — Sistem Informasi Kesehatan Darurat Masyarakat",
  description: "Temukan rumah sakit terdekat saat darurat. Data 3.291+ RS seluruh Indonesia dari SIRS Kemenkes RI.",
  keywords: "rumah sakit, darurat, kesehatan, IGD, ambulans, Indonesia",
  openGraph: {
    title: "SIAGA — Cari Rumah Sakit Darurat di Indonesia",
    description: "Temukan rumah sakit terdekat saat darurat. Data 3.291+ RS seluruh Indonesia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${plusJakarta.variable} ${dmSerif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
