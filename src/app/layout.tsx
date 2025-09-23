import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/site/NavBar";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "한국농림기상학회 학술대회",
  description: "한국농림기상학회 학술대회 홈페이지",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-gray-900">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
