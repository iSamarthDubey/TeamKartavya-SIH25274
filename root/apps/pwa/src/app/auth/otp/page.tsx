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
  const [code, setCode] = useState("4205");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(PHONE_STORAGE_KEY) || "";
    setPhone(stored);
  }, []);

  function handleVerify() {
    if (typeof window === "undefined") return;

    const role = (window.localStorage.getItem(ROLE_STORAGE_KEY) || "farmer") as "farmer" | "buyer";
    if (code.length !== 4) {
      alert("Please enter the 4-digit OTP.");
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
    <div className="h-screen bg-white p-6">
      <div className="mt-10 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
        <p className="text-gray-500 text-sm">Sent to +91 {phone || "98765 43210"}</p>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        {['4', '2', '0', '5'].map((digit, idx) => (
          <input 
            key={idx}
            type="text" 
            defaultValue={digit} 
            className="w-12 h-14 border-2 border-gray-200 rounded-lg text-center text-2xl font-bold focus:border-yellow-500 outline-none" 
            onChange={(e) => {
              const newCode = code.split('');
              newCode[idx] = e.target.value;
              setCode(newCode.join(''));
            }}
          />
        ))}
      </div>

      <button onClick={handleVerify} className="w-full bg-green-700 text-white font-bold py-3 rounded-lg shadow-md hover:bg-green-800 transition">
        Verify & Login
      </button>
      <p className="text-center text-xs text-gray-400 mt-4">Resend OTP in 20s</p>
    </div>
  );
}

