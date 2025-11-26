import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import InstallPrompt from "@/components/InstallPrompt";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "Krishi Hedge - SIH 2025 Prototype",
  description: "Smart Price Protection for Farmers",
  manifest: "/manifest.json",
  themeColor: "#166534",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
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
        <script src="https://cdn.jsdelivr.net/npm/chart.js" async></script>
      </head>
      <body
        className={`${notoSans.variable} font-sans antialiased bg-gray-200`}
      >
        <div className="flex justify-center min-h-screen">
          <div className="w-full max-w-md bg-gray-50 min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
            <ServiceWorkerRegister />
            {children}
            <InstallPrompt />
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
