"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import TopIconCard from "@/components/TopIconCard";

export default function PhoneLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const isValid = phone.replace(/\D/g, "").length === 10;

  const handleSendOtp = () => {
    if (!isValid) return;
    // TODO: call API to send OTP
    router.push("/auth/otp");
  };

  return (
<main className="min-h-screen w-full max-w-sm mx-auto bg-[#F7FFF9] px-6 flex flex-col items-center justify-center">
      <TopIconCard>📞</TopIconCard>

      <section className="mt-8 text-center">
        <h1 className="text-2xl font-semibold text-[#111827]">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          Enter your mobile number to continue
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <label className="block text-sm font-semibold text-[#111827]">
          Mobile Number / मोबाइल नंबर
        </label>

        <div className="flex gap-3">
          <div className="flex items-center justify-center rounded-2xl bg-white shadow-md px-4 text-[#111827] font-medium">
            +91
          </div>
          <input
            type="tel"
            maxLength={10}
            className="flex-1 rounded-2xl bg-white shadow-md px-4 py-3 outline-none text-[#111827]"
            placeholder="Enter 10-digit number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </section>

      <div className="mt-auto mb-4">
        <PrimaryButton disabled={!isValid} onClick={handleSendOtp}>
          Send OTP / OTP भेजें
        </PrimaryButton>
      </div>
    </main>
  );
}
