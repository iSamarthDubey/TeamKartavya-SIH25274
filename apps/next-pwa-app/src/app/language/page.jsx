"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import TopIconCard from "@/components/TopIconCard";
import PrimaryButton from "@/components/PrimaryButton";
import SelectableCard from "@/components/SelectableCard";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
];

export default function LanguagePage() {
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;
    // later: save language to global state / localStorage
    router.push("/role");
  };

  return (
<main className="min-h-screen w-full max-w-sm mx-auto bg-[#F7FFF9] px-6 flex flex-col items-center justify-center">
      <TopIconCard>🌱</TopIconCard>

      <section className="mt-8">
        <h1 className="text-center text-2xl font-semibold text-[#111827]">
          Choose Your<br />Language
        </h1>
      </section>

      <section className="mt-8 space-y-2">
        {LANGUAGES.map((lang) => (
          <SelectableCard
            key={lang.code}
            label={lang.label}
            selected={selected === lang.code}
            onClick={() => setSelected(lang.code)}
          />
        ))}
      </section>

      <div className="mt-8 sticky bottom-4">
        <PrimaryButton disabled={!selected} onClick={handleContinue}>
          Continue
        </PrimaryButton>
      </div>
    </main>
  );
}
