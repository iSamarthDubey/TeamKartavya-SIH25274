'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

const PHONE_STORAGE_KEY = "kh_phone";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(PHONE_STORAGE_KEY) || "";
  });

  function handleNext() {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PHONE_STORAGE_KEY, phone);
    }
    // In a real app we would call /api/auth/send-otp here.
    router.push("/auth/otp");
  }

  return (
    <main className="flex min-h-screen justify-center bg-zinc-50">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col bg-white px-4 pb-10 pt-6">
        <header className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Login
          </p>
          <h1 className="text-lg font-semibold text-zinc-900">Enter your mobile number</h1>
          <p className="mt-1 text-xs text-zinc-600">We will send a one-time password (OTP).</p>
        </header>

        <section className="space-y-3">
          <label className="block text-xs font-medium text-zinc-700">Mobile number</label>
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
            <span className="text-sm font-medium text-zinc-700">+91</span>
            <input
              className="flex-1 border-none bg-transparent text-sm outline-none"
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              maxLength={10}
              inputMode="numeric"
            />
          </div>

          <button
            onClick={handleNext}
            className="mt-4 w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Send OTP
          </button>
        </section>
      </div>
    </main>
  );
}

