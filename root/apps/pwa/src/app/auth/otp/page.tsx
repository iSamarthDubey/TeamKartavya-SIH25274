'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PHONE_STORAGE_KEY = "kh_phone";
const PROFILE_STORAGE_KEY = "kh_profile";
const ROLE_STORAGE_KEY = "kh_role";

interface LocalProfile {
  phone: string;
  role?: "farmer" | "buyer";
  onboardingCompleted?: boolean;
}

export default function OtpPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(PHONE_STORAGE_KEY) || "";
    setPhone(stored);
  }, []);

  function handleVerify() {
    if (typeof window === "undefined") return;

    const role = (window.localStorage.getItem(ROLE_STORAGE_KEY) || "farmer") as "farmer" | "buyer";
    if (code.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    const existingRaw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    let profile: LocalProfile = existingRaw ? JSON.parse(existingRaw) : { phone };
    if (!profile.phone) profile.phone = phone;
    profile.role = role;
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));

    // Route based on role.
    if (role === "buyer") {
      router.push("/onboarding/buyer/business");
    } else {
      router.push("/onboarding/basic");
    }
  }

  return (
    <main className="flex min-h-screen justify-center bg-zinc-50">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col bg-white px-4 pb-10 pt-6">
        <header className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            OTP verification
          </p>
          <h1 className="text-lg font-semibold text-zinc-900">Enter the 6-digit code</h1>
          <p className="mt-1 text-xs text-zinc-600">
            We sent an SMS code to +91 {phone || "your number"}.
          </p>
        </header>

        <section className="space-y-4">
          <div className="flex gap-2">
            <input
              className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-center text-lg tracking-[0.4em]"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
              inputMode="numeric"
              maxLength={6}
            />
          </div>

          <p className="text-[11px] text-zinc-500">For demo, any 6 digits will continue.</p>

          <button
            onClick={handleVerify}
            className="mt-2 w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Verify &amp; Continue
          </button>
        </section>
      </div>
    </main>
  );
}

