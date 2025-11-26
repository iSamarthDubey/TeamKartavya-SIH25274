'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PROFILE_STORAGE_KEY = "kh_profile";

interface LocalProfile {
  crops?: string[];
  farmSizeNumber?: string;
  farmSizeUnit?: string;
  isFpoMember?: boolean;
  fpoName?: string;
}

const CROP_OPTIONS = ["Soybean", "Mustard", "Groundnut"];

export default function OnboardingFarmPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<LocalProfile>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setProfile({
          crops: parsed.crops || [],
          farmSizeNumber: parsed.farmSizeNumber || "",
          farmSizeUnit: parsed.farmSizeUnit || "acre",
          isFpoMember: parsed.isFpoMember ?? false,
          fpoName: parsed.fpoName || "",
        });
      } catch {
        // ignore
      }
    }
  }, []);

  function toggleCrop(crop: string) {
    setProfile((prev) => {
      const list = new Set(prev.crops || []);
      if (list.has(crop)) list.delete(crop);
      else list.add(crop);
      return { ...prev, crops: Array.from(list) };
    });
  }

  function update<K extends keyof LocalProfile>(key: K, value: LocalProfile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function handleNext() {
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      const base = raw ? JSON.parse(raw) : {};
      const merged = { ...base, ...profile };
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(merged));
    }
    router.push("/onboarding/mode");
  }

  return (
    <main className="flex min-h-screen justify-center bg-zinc-50">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col bg-white px-4 pb-10 pt-6">
        <header className="mb-4">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Step 2 of 3
          </p>
          <h1 className="text-lg font-semibold text-zinc-900">What do you grow?</h1>
          <p className="mt-1 text-xs text-zinc-600">Select your main oilseed crops and farm size.</p>
        </header>

        <section className="space-y-4 text-sm">
          <div>
            <p className="text-xs font-medium text-zinc-700">Crops</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {CROP_OPTIONS.map((crop) => {
                const selected = profile.crops?.includes(crop);
                return (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => toggleCrop(crop)}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      selected ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-zinc-200 bg-white text-zinc-700"
                    }`}
                  >
                    {crop}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-zinc-700">Farm size</label>
              <input
                className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
                value={profile.farmSizeNumber || ""}
                onChange={(e) => update("farmSizeNumber", e.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="e.g. 5"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700">Unit</label>
              <select
                className="mt-1 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
                value={profile.farmSizeUnit || "acre"}
                onChange={(e) => update("farmSizeUnit", e.target.value)}
              >
                <option value="acre">acre</option>
                <option value="hectare">hectare</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-700">Are you part of an FPO?</p>
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => update("isFpoMember", true)}
                className={`flex-1 rounded-full border px-3 py-1 ${
                  profile.isFpoMember ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-zinc-200 bg-white text-zinc-700"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => update("isFpoMember", false)}
                className={`flex-1 rounded-full border px-3 py-1 ${
                  profile.isFpoMember === false ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-zinc-200 bg-white text-zinc-700"
                }`}
              >
                No
              </button>
            </div>

            {profile.isFpoMember && (
              <div>
                <label className="block text-xs font-medium text-zinc-700">FPO name</label>
                <input
                  className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
                  value={profile.fpoName || ""}
                  onChange={(e) => update("fpoName", e.target.value)}
                  placeholder="Name of FPO"
                />
              </div>
            )}
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

