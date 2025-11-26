'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PROFILE_STORAGE_KEY = "kh_profile";
const ROLE_STORAGE_KEY = "kh_role";
const PHONE_STORAGE_KEY = "kh_phone";
const HOME_TUTORIAL_KEY = "kh_home_tutorial_seen";

interface LocalProfile {
  phone?: string;
  role?: 'farmer' | 'buyer';
  name?: string;
  village?: string;
  district?: string;
  state?: string;
  crops?: string[];
  farmSizeNumber?: string;
  farmSizeUnit?: string;
  isFpoMember?: boolean;
  fpoName?: string;
  experienceMode?: 'beginner' | 'expert';
  onboardingCompleted?: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<LocalProfile | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) {
      setProfile({});
      return;
    }
    try {
      setProfile(JSON.parse(raw));
    } catch {
      setProfile({});
    }
  }, []);

  function resetApp() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
      window.localStorage.removeItem(ROLE_STORAGE_KEY);
      window.localStorage.removeItem(PHONE_STORAGE_KEY);
      window.localStorage.removeItem(HOME_TUTORIAL_KEY);
    }
    router.replace('/splash');
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[420px] bg-white px-4 pb-20 pt-4">
      <header className="mb-3">
        <h1 className="text-lg font-semibold text-zinc-900">Profile</h1>
        <p className="text-xs text-zinc-600">Your basic details &amp; app mode</p>
      </header>

      <section className="space-y-3 text-sm">
        <div className="rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Basic info</p>
          <p className="mt-1 text-sm font-semibold text-zinc-900">{profile?.name || 'Farmer'}</p>
          <p className="mt-0.5 text-xs text-zinc-600">
            {profile?.village || 'Village'}, {profile?.district || 'District'}, {profile?.state || 'State'}
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-500">Phone: +91 {profile?.phone || '—'}</p>
        </div>

        <div className="rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Farm &amp; crops</p>
          <p className="mt-1 text-xs text-zinc-700">
            Crops: {profile?.crops && profile.crops.length > 0 ? profile.crops.join(', ') : 'Not set'}
          </p>
          <p className="mt-0.5 text-xs text-zinc-700">
            Farm size: {profile?.farmSizeNumber || '—'} {profile?.farmSizeUnit || ''}
          </p>
          <p className="mt-0.5 text-xs text-zinc-700">
            FPO member: {profile?.isFpoMember ? 'Yes' : 'No/Not set'}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">App mode</p>
          <p className="mt-1 text-sm font-semibold text-zinc-900">
            {profile?.experienceMode === 'expert' ? 'Expert mode' : 'Beginner mode'}
          </p>
          <p className="mt-0.5 text-xs text-zinc-600">
            You can reset onboarding to choose again.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-100 bg-white p-4 text-xs text-zinc-700 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Reset</p>
          <p className="mt-1">
            This will clear your local profile &amp; role on this device only, and take you back to the
            splash screen.
          </p>
          <button
            onClick={resetApp}
            className="mt-3 w-full rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 shadow-sm"
          >
            Clear local data &amp; restart
          </button>
        </div>
      </section>
    </main>
  );
}

