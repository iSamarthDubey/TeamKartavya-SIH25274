'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PROFILE_STORAGE_KEY = "kh_profile";

interface LocalProfile {
  experienceMode?: "beginner" | "expert";
  onboardingCompleted?: boolean;
}

export default function OnboardingModePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<LocalProfile>({ experienceMode: "beginner" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setProfile({
          experienceMode: parsed.experienceMode || "beginner",
          onboardingCompleted: parsed.onboardingCompleted || false,
        });
      } catch {
        // ignore
      }
    }
  }, []);

  function chooseMode(mode: "beginner" | "expert") {
    setProfile((prev) => ({ ...prev, experienceMode: mode }));
  }

  function finish() {
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      const base = raw ? JSON.parse(raw) : {};
      const merged = { ...base, experienceMode: profile.experienceMode, onboardingCompleted: true };
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(merged));
    }
    router.push("/");
  }

  return (
    <main className="flex min-h-screen justify-center bg-zinc-50">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col bg-white px-4 pb-10 pt-6">
        <header className="mb-4">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Step 3 of 3
          </p>
          <h1 className="text-lg font-semibold text-zinc-900">Choose your mode</h1>
          <p className="mt-1 text-xs text-zinc-600">
            You can switch later in Profile. Beginner mode shows more guidance.
          </p>
        </header>

        <section className="space-y-3 text-sm">
          <button
            type="button"
            onClick={() => chooseMode("beginner")}
            className={`w-full rounded-2xl border px-4 py-3 text-left shadow-sm ${
              profile.experienceMode === "beginner"
                ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                : "border-zinc-200 bg-white text-zinc-900"
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wide">
              Beginner mode
            </p>
            <p className="mt-1 text-xs text-zinc-700">
              Simple wording, more explanation, safer defaults.
            </p>
          </button>

          <button
            type="button"
            onClick={() => chooseMode("expert")}
            className={`w-full rounded-2xl border px-4 py-3 text-left shadow-sm ${
              profile.experienceMode === "expert"
                ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                : "border-zinc-200 bg-white text-zinc-900"
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wide">
              Expert mode
            </p>
            <p className="mt-1 text-xs text-zinc-700">
              More numbers, less explanation, faster decisions.
            </p>
          </button>

          <button
            onClick={finish}
            className="mt-4 w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Finish setup &amp; go to app
          </button>
        </section>
      </div>
    </main>
  );
}

