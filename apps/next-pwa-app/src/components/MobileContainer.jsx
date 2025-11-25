"use client";

export default function MobileContainer({ children }) {
  return (
    <div
      className="
      w-full 
      max-w-[430px]     /* Max phone width (iPhone Pro Max style) */
      min-h-screen 
      bg-white 
      shadow-xl 
      rounded-none
      overflow-hidden
      pb-[env(safe-area-inset-bottom)]
      "
    >
      {children}
    </div>
  );
}
