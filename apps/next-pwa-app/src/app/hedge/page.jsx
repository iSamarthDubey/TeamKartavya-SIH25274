"use client";

import BottomNav from "@/components/BottomNav";
import HedgeActionCard from "@/components/HedgeActionCard";

export default function HedgePage() {
  return (
    <>
      <main className="min-h-screen bg-[#F7FFF9] px-6 pb-28 pt-8 overflow-y-auto">
        {/* Header */}
        <section className="rounded-b-[36px] bg-gradient-to-b from-[#2BA55E] to-[#1E8748] px-5 pb-6 pt-8 text-white shadow-md">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/15">
              ←
            </button>
            <div>
              <h1 className="text-2xl font-semibold leading-tight">Hedge Contracts</h1>
              <p className="mt-1 text-sm text-white/80">Connect Buyers &amp; Sellers</p>
            </div>
          </div>
        </section>

        <section className="mt-7 pb-4">
          <HedgeActionCard
            type="buy"
            title="I Want to Buy"
            subtitle="Browse farmer listings"
            iconBg="bg-[#E4F0FF]"
            iconEmoji="👥"
            href="/hedge/buy"
          />
          <HedgeActionCard
            type="sell"
            title="I Want to Sell"
            subtitle="Create your listing"
            iconBg="bg-[#E7F7EB]"
            iconEmoji="🌱"
            href="/hedge/sell"
          />
        </section>
      </main>

      <BottomNav />
    </>
  );
}
