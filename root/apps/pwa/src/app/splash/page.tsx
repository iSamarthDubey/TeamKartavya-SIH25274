'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

const ROLE_STORAGE_KEY = "kh_role";
const LANGUAGE_STORAGE_KEY = "kh_lang";

export default function SplashPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";
  });

  function chooseRole(role: "farmer" | "buyer") {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ROLE_STORAGE_KEY, role);
    }
    router.push("/auth/login");
  }

  function toggleLanguage() {
    const next = language === "en" ? "hi" : "en";
    setLanguage(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    }
  }

  return (
    <main className="flex min-h-screen justify-center bg-gradient-to-b from-[#16a34a] via-[#4ade80] to-[#f7faf7]">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col rounded-none bg-white/90 px-4 pb-10 pt-6 shadow-[0_24px_60px_rgba(22,163,74,0.35)] backdrop-blur-sm">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-100">
              Krishi Hedge
            </p>
            <h1 className="text-xl font-semibold text-white drop-shadow-sm">
              Smart Price Shield for Every Farmer
            </h1>
          </div>
          <button
            onClick={toggleLanguage}
            className="rounded-full border border-white/60 bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur"
          >
            {language === "en" ? "EN / हिन्दी" : "हिन्दी / EN"}
          </button>
        </header>

        <section className="mt-6 space-y-4">
          <p className="text-sm font-medium text-emerald-900">
            Choose how you want to use Krishi Hedge today.
          </p>

          <button
            onClick={() => chooseRole("farmer")}
            className="w-full rounded-2xl bg-white/95 px-4 py-4 text-left text-sm font-semibold text-emerald-900 shadow-[0_18px_40px_rgba(22,163,74,0.28)] backdrop-blur-sm"
          >
            <span className="block text-xs font-medium uppercase tracking-wide text-emerald-600">
              Continue as
            </span>
            <span className="mt-1 block text-base">Farmer / FPO member</span>
            <span className="mt-1 block text-[11px] font-normal text-emerald-700">
              Get AI price forecasts, safe practice, and simple hedge guidance.
            </span>
          </button>

          <button
            onClick={() => chooseRole("buyer")}
            className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-4 text-left text-sm font-semibold text-emerald-900 shadow-[0_14px_32px_rgba(15,118,110,0.2)] backdrop-blur-sm"
          >
            <span className="block text-xs font-medium uppercase tracking-wide text-emerald-700">
              Continue as
            </span>
            <span className="mt-1 block text-base">Buyer / Trader</span>
            <span className="mt-1 block text-[11px] font-normal text-emerald-800">
              Discover farmer forwards, filter by crop and region, and match positions.
            </span>
          </button>
        </section>
      </div>
    </main>
  );
}
