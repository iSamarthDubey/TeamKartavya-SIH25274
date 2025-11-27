'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PROFILE_STORAGE_KEY = "kh_profile";

interface BuyerInterestSlice {
  buyerCrops?: string[];
  volumeBand?: string;
}

const CROP_OPTIONS = ["Soybean", "Mustard", "Groundnut"];
const VOLUME_OPTIONS = ["< 100 MT", "100–500 MT", "> 500 MT"];

export default function BuyerInterestOnboardingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<BuyerInterestSlice>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setProfile({ buyerCrops: parsed.buyerCrops || [], volumeBand: parsed.volumeBand || '' });
    } catch {
      // ignore
    }
  }, []);

  function toggleCrop(crop: string) {
    setProfile((prev) => {
      const set = new Set(prev.buyerCrops || []);
      if (set.has(crop)) set.delete(crop);
      else set.add(crop);
      return { ...prev, buyerCrops: Array.from(set) };
    });
  }

  function chooseVolume(v: string) {
    setProfile((prev) => ({ ...prev, volumeBand: v }));
  }

  async function finish() {
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      const base = raw ? JSON.parse(raw) : {};
      const merged = { ...base, ...profile, onboardingCompleted: true };
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(merged));
      
      // Save to database
      const userId = window.localStorage.getItem("kh_user_id");
      if (userId) {
        try {
          await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              name: base.name || 'Buyer',
              location: base.location || 'Not specified',
              crops: profile.buyerCrops || [],
            }),
          });
        } catch (error) {
          console.error('Failed to save buyer profile:', error);
        }
      }
    }
    router.replace('/buyer/home');
  }

  return (
    <main className="flex min-h-screen justify-center bg-zinc-50">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col bg-white px-4 pb-10 pt-6">
        <header className="mb-4">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Buyer setup</p>
          <h1 className="text-lg font-semibold text-zinc-900">Crops &amp; typical volume</h1>
          <p className="mt-1 text-xs text-zinc-600">We use this to pre-filter contracts for you.</p>
        </header>

        <section className="space-y-4 text-sm">
          <div>
            <p className="text-xs font-medium text-zinc-700">Crops of interest</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {CROP_OPTIONS.map((crop) => {
                const selected = profile.buyerCrops?.includes(crop);
                return (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => toggleCrop(crop)}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      selected ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-zinc-200 bg-white text-zinc-700'
                    }`}
                  >
                    {crop}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-zinc-700">Typical volume band</p>
            <div className="mt-2 space-y-2">
              {VOLUME_OPTIONS.map((opt) => {
                const selected = profile.volumeBand === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => chooseVolume(opt)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-xs shadow-sm ${
                      selected ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-zinc-200 bg-white text-zinc-900'
                    }`}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={finish}
            className="mt-4 w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Finish &amp; go to buyer home
          </button>
        </section>
      </div>
    </main>
  );
}

