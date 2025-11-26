import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krishi Hedge - Smart Price Protection",
  description: "Empowering farmers with ML-driven price forecasting and forward contracts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
