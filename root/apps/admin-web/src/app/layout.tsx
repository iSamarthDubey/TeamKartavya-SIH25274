import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-zinc-50 antialiased">{children}</body>
    </html>
  );
}

