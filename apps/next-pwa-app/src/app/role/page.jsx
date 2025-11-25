"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import SelectableCard from "@/components/SelectableCard";

export default function RolePage() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!role) return;
    // later: save role in global state / api
    router.push("/features");
  };

  return (
<main className="min-h-screen w-full max-w-sm mx-auto bg-[#F7FFF9] px-6 flex flex-col items-center justify-center">
      <div className="pt-12">
        <h1 className="text-center text-2xl font-semibold text-[#111827]">
          I am a…
        </h1>
      </div>

      <div className="mt-8 flex-1">
        <SelectableCard
          label="Farmer (Seller)"
          emoji="🌾"
          selected={role === "farmer"}
          onClick={() => setRole("farmer")}
        />
        <SelectableCard
          label="Buyer (FPO/Trader)"
          emoji="🏢"
          selected={role === "buyer"}
          onClick={() => setRole("buyer")}
        />
      </div>

      <div className="mt-4">
        <PrimaryButton disabled={!role} onClick={handleContinue}>
          Continue
        </PrimaryButton>
      </div>
    </main>
  );
}
