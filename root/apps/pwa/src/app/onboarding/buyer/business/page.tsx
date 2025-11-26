'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PROFILE_STORAGE_KEY = "kh_profile";

interface BuyerProfileSlice {
  businessType?: 'trader' | 'processor' | 'fpo_aggregator';
}

export default function BuyerBusinessOnboardingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<BuyerProfileSlice>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setProfile({ businessType: parsed.businessType });
    } catch {
      // ignore
    }
  }, []);

  function choose(type: BuyerProfileSlice['businessType']) {
    setProfile({ businessType: type });
  }

  function next() {
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      const base = raw ? JSON.parse(raw) : {};
      const merged = { ...base, ...profile };
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(merged));
    }
    router.push('/onboarding/buyer/interest');
  }

  return (
    <main className="flex min-h-screen justify-center bg-zinc-50">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col bg-white px-4 pb-10 pt-6">
        <header className="mb-4">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Buyer setup</p>
          <h1 className="text-lg font-semibold text-zinc-900">What best describes you?</h1>
          <p className="mt-1 text-xs text-zinc-600">This helps us show the right kinds of forwards.</p>
        </header>

        <section className="space-y-3 text-sm">
          <button
            type="button"
            onClick={() => choose('trader')}
            className={`w-full rounded-2xl border px-4 py-3 text-left shadow-sm ${
              profile.businessType === 'trader'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : 'border-zinc-200 bg-white text-zinc-900'
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wide">Individual trader</p>
            <p className="mt-1 text-xs text-zinc-700">Buying for yourself or a small desk.</p>
          </button>

          <button
            type="button"
            onClick={() => choose('processor')}
            className={`w-full rounded-2xl border px-4 py-3 text-left shadow-sm ${
              profile.businessType === 'processor'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : 'border-zinc-200 bg-white text-zinc-900'
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wide">Processor / mill</p>
            <p className="mt-1 text-xs text-zinc-700">Buying for an oil mill / processing unit.</p>
          </button>

          <button
            type="button"
            onClick={() => choose('fpo_aggregator')}
            className={`w-full rounded-2xl border px-4 py-3 text-left shadow-sm ${
              profile.businessType === 'fpo_aggregator'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : 'border-zinc-200 bg-white text-zinc-900'
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wide">FPO aggregator</p>
            <p className="mt-1 text-xs text-zinc-700">Buying on behalf of farmers / FPO network.</p>
          </button>

          <button
            onClick={next}
            className="mt-4 w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Next
          </button>
        </section>
      </div>
    </main>
  );
}

