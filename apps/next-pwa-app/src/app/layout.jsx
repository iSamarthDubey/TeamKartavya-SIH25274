// app/layout.jsx

import "./globals.css";
import MobileContainer from "../components/MobileContainer";

import ClientWrapper from "./ClientWrapper";


export const metadata = {
  title: "Krishi Hedge",
  description: "Smart Price Shield for Every Farmer",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#29A35A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* PWA Essential */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#29A35A" />

        {/* iOS / Android full screen app mode */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Prevent zooming to keep app-like feel */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>

      {/* Page always centered and phone-sized */}
<body className="bg-[#F4E2D7] flex justify-center items-start min-h-screen">
        {/* Center App like real mobile app */}
        <MobileContainer>
          {children}
        </MobileContainer>
      </body>

    </html>
  );
}


/*
import "./globals.css";
import MobileContainer from "../components/MobileContainer";


export const metadata = {
  title: "Krishi Hedge",
  description: "Smart Price Shield for Every Farmer",
  manifest: "/manifest.json", // Link your manifest here
};

// Add Viewport settings to disable zooming and fix scaling
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFFFFF",
};

import "./globals.css";
import MobileContainer from "../components/MobileContainer";

export const metadata = {
  title: "Krishi Hedge",
  description: "Smart Price Shield for Every Farmer",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#29A35A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* PWA Essential }
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#29A35A" />

        {/* iOS / Android full screen app mode }
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Prevent zooming to keep app-like feel }
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>

      {/* Page always centered and phone-sized }
      <body className="bg-[#29A35A] w-full min-h-screen flex justify-center items-start">
        <MobileContainer>{children}</MobileContainer>
      </body>
    </html>
  );
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 1. We removed 'flex justify-center' and 'bg-[#EDEFEA]' }
      <body className="bg-white min-h-screen w-full">
        {/* 2. We removed 'max-w-sm', 'shadow-xl', and 'border' }
        <div className="w-full min-h-screen relative overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  )};

  
-----------------
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#EDEFEA] flex justify-center">
        
        {/* 📱 Mobile App Container }
        <div className="w-full max-w-sm min-h-screen bg-white shadow-xl border border-gray-200 relative overflow-hidden">
          {children}
        </div>

      </body>
    </html>
  );
}

*/

/*
import './globals.css';

export const metadata = {
  title: 'Krishi Hedge',
  description: 'Smart Price Shield for Every Farmer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F3F6F8] flex justify-center">
        {/* Mobile container }
        <div className="min-h-screen w-full max-w-md bg-[#F7FFF9] shadow-sm">
          {children}
        </div>
      </body>
    </html>
  );
}
*/

/*import "./globals.css";

export const metadata = {
  title: "Next PWA App",
  description: "Mobile app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  );
}
*/