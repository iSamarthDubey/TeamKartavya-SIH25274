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
  const [loading, setLoading] = useState(false);

  async function handleNext() {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to send OTP");
        return;
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem(PHONE_STORAGE_KEY, phone);
        // In dev mode, show OTP in console for easy testing
        if (data.otp) {
          console.log("🔐 OTP:", data.otp);
          alert(`OTP sent! (Dev mode: ${data.otp})`);
        } else {
          alert("OTP sent to your mobile number!");
        }
      }
      router.push("/auth/otp");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
        <button 
          onClick={handleNext} 
          disabled={loading}
          className="w-full bg-green-700 text-white font-bold py-3 rounded-lg mt-6 shadow-md hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
}

