"use client";

import BottomNav from "@/components/BottomNav";

export default function MainScreenLayout({ children }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {children}
      </div>

      {/* Stick Bottom Navigation */}
      <div className="absolute bottom-0 w-full">
        <BottomNav />
      </div>
    </div>
  );
}
