"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, LineChart, Shield, BookOpen, User } from "lucide-react";

const tabs = [
  { name: "Home", icon: Home, path: "/home" },
  { name: "Market", icon: LineChart, path: "/market" },
  { name: "Hedge", icon: Shield, path: "/hedge" },
  { name: "Learn", icon: BookOpen, path: "/learn" },
  { name: "Profile", icon: User, path: "/profile" },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav 
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm 
                 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] 
                 py-2 flex justify-between px-4 z-50 border-t"
    >
      {tabs.map(({ name, icon: Icon, path }) => {
        const active = pathname.startsWith(path);

        return (
          <button
            key={name}
            onClick={() => router.push(path)}
            className={`flex flex-col items-center justify-center transition-all duration-200
              ${active ? "text-white bg-[#2FA44F] px-4 py-2 rounded-2xl scale-110" : "text-gray-500"}
            `}
          >
            <Icon size={22} className={active ? "text-white" : "text-gray-500"} />
            <span className="mt-1 text-xs font-medium">{name}</span>
          </button>
        );
      })}
    </nav>
  );
}


/*
"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, LineChart, Shield, BookOpen, User } from "lucide-react";

const tabs = [
  { name: "Home", icon: Home, path: "/home" },
  { name: "Market", icon: LineChart, path: "/market" },
  { name: "Hedge", icon: Shield, path: "/hedge" },
  { name: "Learn", icon: BookOpen, path: "/learn" },
  { name: "Profile", icon: User, path: "/profile" },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.07)] border-t border-gray-200 rounded-t-2xl py-2 flex justify-around z-50 backdrop-blur-md">
      {tabs.map(({ name, icon: Icon, path }) => {
        const active = pathname.startsWith(path);

        return (
          <button
            key={name}
            onClick={() => router.push(path)}
            className="flex flex-col items-center justify-center space-y-1"
          >
            {/* Icon container }
            <div
              className={`flex items-center justify-center w-11 h-11 rounded-2xl transition-all ${
                active ? "bg-[#2FA44F]" : "bg-transparent"
              }`}
            >
              <Icon size={22} className={active ? "text-white" : "text-gray-500"} />
            </div>

            {/* Label }
            <span
              className={`text-[11px] font-medium transition ${
                active ? "text-[#2FA44F]" : "text-gray-500"
              }`}
            >
              {name}
            </span>
          </button>
        );
      })}
    </div>
  );
}


-------------
"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, LineChart, Shield, BookOpen, User } from "lucide-react";

const tabs = [
  { name: "Home", icon: Home, path: "/home" },
  { name: "Market", icon: LineChart, path: "/market" },
  { name: "Hedge", icon: Shield, path: "/hedge" },
  { name: "Learn", icon: BookOpen, path: "/learn" },
  { name: "Profile", icon: User, path: "/profile" },
  
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t rounded-t-2xl shadow-md py-2 flex justify-around">
      {tabs.map(({ name, icon: Icon, path }) => {
        const active = pathname.startsWith(path);

        return (
          <button
            key={name}
            onClick={() => router.push(path)}
            className={`flex flex-col items-center text-xs font-medium transition ${active ? "text-white bg-[#2FA44F] px-4 py-2 rounded-2xl" : "text-gray-500"}`}
          >
            <Icon size={20} className={active ? "text-white" : "text-gray-500"} />
            {name}
          </button>
        );
      })}
    </div>
  );
}
*/