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
    <main className="flex min-h-screen justify-center bg-zinc-50">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col bg-white px-4 pb-10 pt-6">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              Krishi Hedge
            </p>
            <h1 className="text-lg font-semibold text-zinc-900">Smart Price Shield</h1>
          </div>
          <button
            onClick={toggleLanguage}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700"
          >
            {language === "en" ? "EN / हिन्दी" : "हिन्दी / EN"}
          </button>
        </header>

        <section className="mt-4 space-y-3">
          <p className="text-sm font-medium text-zinc-800">
            Choose how you want to use Krishi Hedge today.
          </p>
          <button
            onClick={() => chooseRole("farmer")}
            className="w-full rounded-2xl bg-emerald-600 px-4 py-4 text-left text-sm font-semibold text-white shadow-sm"
          >
            <span className="block text-xs font-medium uppercase tracking-wide text-emerald-100">
              Continue as
            </span>
            <span className="mt-1 block text-base">Farmer / FPO member</span>
            <span className="mt-1 block text-[11px] font-normal text-emerald-100">
              Get simple guidance, forecasts & safe practice first.
            </span>
          </button>

          <button
            onClick={() => chooseRole("buyer")}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-left text-sm font-semibold text-zinc-900 shadow-sm"
          >
            <span className="block text-xs font-medium uppercase tracking-wide text-zinc-500">
              Continue as
            </span>
            <span className="mt-1 block text-base">Buyer / Trader</span>
            <span className="mt-1 block text-[11px] font-normal text-zinc-500">
              Browse farmer forwards, filter by crop & region.
            </span>
          </button>
        </section>
      </div>
    </main>
  );
}

