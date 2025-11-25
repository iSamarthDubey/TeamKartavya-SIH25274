"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";
import TopIconCard from "@/components/TopIconCard";

const slides = [
  {
    title: "AI Price Forecast",
    subtitle: "Know tomorrow's price today",
    icon: "📈",
  },
  // later you can push more slides here
];

export default function FeaturesPage() {
  const router = useRouter();
  const currentIndex = 0; // only one slide for now

  const handleNext = () => {
    // if more slides later, change logic here
    router.push("/auth/phone");
  };

  return (
    
<main className="min-h-screen w-full max-w-sm mx-auto bg-[#F7FFF9] px-6 flex flex-col items-center justify-center">
      <TopIconCard>{slides[currentIndex].icon}</TopIconCard>

      <section className="mt-10 text-center px-6">
        <h1 className="text-2xl font-semibold text-[#111827]">
          {slides[currentIndex].title}
        </h1>
        <p className="mt-4 text-lg text-[#4B5563]">
          {slides[currentIndex].subtitle}
        </p>
      </section>

      {/* Pagination dots (3-style, but only first filled now) */}
      <div className="mt-10 flex justify-center gap-2">
        <span className="h-2 w-8 rounded-full bg-[#2DA45E]" />
        <span className="h-2 w-2 rounded-full bg-[#D1D5DB]" />
        <span className="h-2 w-2 rounded-full bg-[#D1D5DB]" />
      </div>

      <div className="mt-auto mb-4">
        <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
      </div>
    </main>
  );
}
