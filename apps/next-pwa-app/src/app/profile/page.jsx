"use client";

import { useState } from "react";
import TopIconCard from "@/components/TopIconCard";
import PrimaryButton from "@/components/PrimaryButton";
import SelectableCard from "@/components/SelectableCard";

import { useRouter } from "next/navigation";


const CROPS = [
  { id: "soybean", label: "Soybean / सोयाबीन", emoji: "🌱" },
  { id: "groundnut", label: "Groundnut / मूंगफली", emoji: "🥜" },
  { id: "mustard", label: "Mustard / सरसों", emoji: "🌼" },
  { id: "sunflower", label: "Sunflower / सूरजमुखी", emoji: "🌻" },
  { id: "sesame", label: "Sesame / तिल", emoji: "🌾" },
];

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedCrops, setSelectedCrops] = useState([]);

  const router = useRouter(); // <-- initialize router

  const toggleCrop = (id) => {
    setSelectedCrops((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const isValid = fullName.trim() && district.trim() && selectedCrops.length;

  const handleComplete = () => {
    if (!isValid) return;
    // TODO: send profile to backend & then redirect to dashboard
    // router.push("/dashboard");
    alert("Profile saved (wire backend later)");
    
    // After saving redirect to /home
    router.push("/home");
  };

  return (
<main className="min-h-screen w-full max-w-sm mx-auto bg-[#F7FFF9] px-6 flex flex-col items-center justify-center">
      <TopIconCard>✅</TopIconCard>

      <section className="mt-6 text-center">
        <h1 className="text-2xl font-semibold text-[#111827]">
          Complete Your Profile
        </h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          Help us serve you better
        </p>
      </section>

      <section className="mt-8 space-y-5">
        {/* Full name */}
        <div>
          <label className="block text-sm font-semibold text-[#111827] mb-2">
            Full Name / पूरा नाम
          </label>
          <input
            type="text"
            className="w-full rounded-2xl bg-white shadow-md px-4 py-3 outline-none text-[#111827]"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-semibold text-[#111827] mb-2">
            District / जिला
          </label>
          <input
            type="text"
            className="w-full rounded-2xl bg-white shadow-md px-4 py-3 outline-none text-[#111827]"
            placeholder="Enter your district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>

        {/* Crops */}
        <div>
          <h2 className="text-sm font-semibold text-[#111827] mb-2">
            Crops Grown / उगाई गई फसलें
          </h2>

          <div className="mt-2">
            {CROPS.map((crop) => (
              <SelectableCard
                key={crop.id}
                label={crop.label}
                emoji={crop.emoji}
                selected={selectedCrops.includes(crop.id)}
                onClick={() => toggleCrop(crop.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="mt-6">
        <PrimaryButton disabled={!isValid} onClick={handleComplete}>
          Complete Setup / सेटअप पूर्ण करें
        </PrimaryButton>
      </div>
    </main>
  );
}
