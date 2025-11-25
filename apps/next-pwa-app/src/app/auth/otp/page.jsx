"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import TopIconCard from "@/components/TopIconCard";

const OTP_LENGTH = 6;

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("").length !== OTP_LENGTH) return;
    // TODO: verify OTP via API
    router.push("/profile");
  };

  const filled = otp.join("").length === OTP_LENGTH;

  return (
<main className="min-h-screen w-full max-w-sm mx-auto bg-[#F7FFF9] px-6 flex flex-col items-center justify-center">
      <TopIconCard>✨</TopIconCard>

      <section className="mt-8 text-center">
        <h1 className="text-2xl font-semibold text-[#111827]">Enter OTP</h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          Code sent to +91 7047117774
        </p>
      </section>

      <section className="mt-10 flex justify-center gap-3">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            type="tel"
            maxLength={1}
            className="h-14 w-12 rounded-2xl bg-white shadow-md text-center text-lg font-semibold outline-none"
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
          />
        ))}
      </section>

      <div className="mt-10">
        <PrimaryButton disabled={!filled} onClick={handleVerify}>
          Verify / सत्यापित करें
        </PrimaryButton>
      </div>

      <button className="mt-4 text-center text-sm text-[#10B981]">
        Resend OTP / OTP फिर से भेजें
      </button>
    </main>
  );
}
