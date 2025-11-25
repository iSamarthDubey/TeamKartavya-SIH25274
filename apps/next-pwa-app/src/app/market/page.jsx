"use client";

import BottomNav from "@/components/BottomNav";
import HomePriceCard from "@/components/HomePriceCard";

const prices = [
  { crop: "Soybean", price: 4850, changePct: 2.5, subtitle: "सोयाबीन" },
  { crop: "Groundnut", price: 5200, changePct: 1.8, subtitle: "मूंगफली" },
  { crop: "Mustard", price: 5650, changePct: 1.2, subtitle: "सरसों" },
];

export default function MarketPage() {
  return (
    <>
      <main className="min-h-screen bg-[#F7FFF9] px-6 pb-28 pt-8 overflow-y-auto">
        {/* Green header */}
        <section className="rounded-b-[36px] bg-gradient-to-b from-[#2BA55E] to-[#1E8748] px-5 pb-6 pt-8 text-white shadow-md">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/15">
              ←
            </button>
            <div>
              <h1 className="text-2xl font-semibold leading-tight">Live Market Prices</h1>
              <p className="mt-1 text-sm text-white/80">Updated every 5 minutes</p>
            </div>
          </div>

          <div className="mt-5 rounded-3xl bg-white/15 px-4 py-3 text-sm text-white">
            <div className="flex items-center gap-2">
              <span>🕒</span>
              <span>Last updated: 2 min ago</span>
            </div>
          </div>
        </section>

        {/* Today's prices */}
        <section className="mt-7">
          <h2 className="text-xl font-semibold text-[#111827]">Today's Prices</h2>
          {prices.map((p) => (
            <HomePriceCard key={p.crop} {...p} />
          ))}
        </section>

        {/* Price trend card */}
        <section className="mt-7 mb-3">
          <div className="rounded-3xl bg-white px-5 py-4 shadow-md">
            <h3 className="text-lg font-semibold text-[#111827]">
              Price Trend (7 Days)
            </h3>

            {/* fake chart */}
            <div className="mt-4 h-40 rounded-2xl bg-gradient-to-b from-[#E6F4EA] to-white px-3 py-3">
              <div className="flex h-full items-end justify-between">
                {[75, 80, 78, 82, 85, 87, 85].map((v, i) => (
                  <div key={i} className="flex w-[10%] flex-col items-center">
                    <div
                      className="w-[3px] rounded-full bg-[#2BA55E]"
                      style={{ height: `${v}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-gray-500">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            Source: NCDEX/Agmarknet
          </p>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
