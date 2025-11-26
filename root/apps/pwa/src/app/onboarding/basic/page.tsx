'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PROFILE_STORAGE_KEY = "kh_profile";

interface LocalProfile {
  phone?: string;
  role?: "farmer" | "buyer";
  name?: string;
  village?: string;
  district?: string;
  state?: string;
}

export default function OnboardingBasicPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<LocalProfile>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) {
      try {
        setProfile(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
  }, []);

  function update<K extends keyof LocalProfile>(key: K, value: LocalProfile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function handleNext() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    }
    router.push("/onboarding/farm");
  }

  return (
    <main className="flex min-h-screen justify-center bg-zinc-50">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col bg-white px-4 pb-10 pt-6">
        <header className="mb-4">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Step 1 of 3
          </p>
          <h1 className="text-lg font-semibold text-zinc-900">Tell us about you</h1>
          <p className="mt-1 text-xs text-zinc-600">This helps us personalise prices and tips for your mandi.</p>
        </header>

        <section className="space-y-3 text-sm">
          <div>
            <label className="block text-xs font-medium text-zinc-700">Name</label>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
              value={profile.name || ""}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700">Village</label>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
              value={profile.village || ""}
              onChange={(e) => update("village", e.target.value)}
              placeholder="Village name"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-zinc-700">District</label>
              <input
                className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
                value={profile.district || ""}
                onChange={(e) => update("district", e.target.value)}
                placeholder="District"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-zinc-700">State</label>
              <input
                className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
                value={profile.state || ""}
                onChange={(e) => update("state", e.target.value)}
                placeholder="State"
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className="mt-4 w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Next
          </button>
        </section>
      </div>
    </main>
  );
}

