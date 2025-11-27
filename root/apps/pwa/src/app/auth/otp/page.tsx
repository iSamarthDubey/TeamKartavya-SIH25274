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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(PHONE_STORAGE_KEY) || "";
    setPhone(stored);
  }, []);

  async function handleVerify() {
    if (typeof window === "undefined") return;

    if (code.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: code }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Invalid OTP");
        return;
      }

      // Store user session
      const profile: LocalProfile = {
        phone: data.user.phone,
        role: data.user.role,
        onboardingCompleted: data.user.onboarded
      };
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      window.localStorage.setItem("kh_user_id", data.user.id); // Store user ID for API calls

      // Route based on onboarding status
      if (data.user.onboarded) {
        router.push(data.user.role === "buyer" ? "/buyer/home" : "/");
      } else {
        router.push(data.user.role === "buyer" ? "/onboarding/buyer/business" : "/onboarding/basic");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen bg-white p-6">
      <div className="mt-10 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
        <p className="text-gray-500 text-sm">Sent to +91 {phone || "98765 43210"}</p>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <input 
            key={idx}
            type="text" 
            maxLength={1}
            value={code[idx] || ''}
            className="w-12 h-14 border-2 border-gray-200 rounded-lg text-center text-2xl font-bold focus:border-yellow-500 outline-none" 
            onChange={(e) => {
              const newCode = code.split('');
              newCode[idx] = e.target.value;
              setCode(newCode.join(''));
              // Auto-focus next input
              if (e.target.value && idx < 5) {
                const nextInput = (e.target as HTMLInputElement).parentElement?.children[idx + 1] as HTMLInputElement;
                nextInput?.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !code[idx] && idx > 0) {
                const prevInput = (e.target as HTMLInputElement).parentElement?.children[idx - 1] as HTMLInputElement;
                prevInput?.focus();
              }
            }}
          />
        ))}
      </div>

      <button 
        onClick={handleVerify} 
        disabled={loading || code.length !== 6}
        className="w-full bg-green-700 text-white font-bold py-3 rounded-lg shadow-md hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Verifying..." : "Verify & Login"}
      </button>
      <p className="text-center text-xs text-gray-400 mt-4">Resend OTP in 20s</p>
    </div>
  );
}

