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
    <div className="h-screen bg-white p-6">
      <div className="mt-10 mb-8">
        <button onClick={() => router.push('/splash')} className="text-gray-400 mb-4"><i className="fa-solid fa-arrow-left"></i> Back</button>
        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        <p className="text-gray-500 text-sm">Enter your mobile number to access your farm dashboard.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mobile Number</label>
          <div className="flex items-center border-b-2 border-gray-200 py-2 focus-within:border-yellow-500 transition">
            <span className="text-lg font-bold text-gray-400 mr-2">+91</span>
            <input 
              type="tel" 
              className="w-full outline-none text-lg font-bold text-gray-800" 
              placeholder="98765 43210" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleNext} className="w-full bg-green-700 text-white font-bold py-3 rounded-lg mt-6 shadow-md hover:bg-green-800 transition">
          Send OTP
        </button>
      </div>
    </div>
  );
}

