import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import AuthGate from "@/components/Auth/AuthGate";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "Krishi Hedge Admin",
  description: "Admin dashboard for contracts and exposures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={`${notoSans.variable} font-sans min-h-screen bg-gray-50 antialiased`}>
        <TopNav />
        <div className="max-w-7xl mx-auto min-h-screen px-4 sm:px-6 py-8"><AuthGate>{children}</AuthGate></div>
        <Footer />
      </body>
    </html>
  );
}

