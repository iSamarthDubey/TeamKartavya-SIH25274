"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";
import TopIconCard from "@/components/TopIconCard";
// We don't import PrimaryButton here because we need a custom white one for this page
import BottomNav from "@/components/BottomNav";

export default function HomePage() {
  const router = useRouter();

  return (
<main className="min-h-screen w-full bg-[#29A35A] px-6 pb-24 flex flex-col justify-center items-center">      <div className="w-full max-w-md bg-transparent">
        <TopIconCard>🌱</TopIconCard>

        <div className="mt-10 text-center text-white">
          <h1 className="text-4xl font-semibold tracking-wide leading-tight">
            KRISHI{" "}
            <span className="block">HEDGE</span>
          </h1>
          <p className="mt-6 text-lg">
            Smart Price Shield<br />for Every Farmer
          </p>
          <p className="mt-3 text-sm">
            हर किसान के लिए स्मार्ट मूल्य सुरक्षा
          </p>
        </div>

        <div className="mt-12 mb-6 px-4">
          <PrimaryButton onClick={() => router.push("/language")}>
            Get Started
          </PrimaryButton>
        </div>
      </div>
    </main>
    
  );
}
