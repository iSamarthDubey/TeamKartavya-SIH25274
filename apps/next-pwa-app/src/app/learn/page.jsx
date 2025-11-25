"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";



export default function LearnPage() {
const [tab, setTab] = useState("sim");

  return (
    <>
      <main className="min-h-screen bg-[#F7FFF9] px-6 pb-28 pt-8 overflow-y-auto">
        {/* Blue header */}
        <section className="rounded-b-[36px] bg-[#2563EB] px-5 pb-6 pt-8 text-white shadow-md">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/15">
              ←
            </button>
            <div>
              <h1 className="text-2xl font-semibold leading-tight">
                Learn &amp; Practice
              </h1>
              <p className="mt-1 text-sm text-white/85">Simulated Trading</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setTab("sim")}
              className={`flex-1 rounded-3xl px-4 py-3 text-sm font-semibold shadow-md ${
                tab === "sim" ? "bg-white text-[#2563EB]" : "bg-[#315FEF] text-white/90"
              }`}
            >
              Simulated Trading
            </button>
            <button
              onClick={() => setTab("tutorials")}
              className={`flex-1 rounded-3xl px-4 py-3 text-sm font-semibold shadow-md ${
                tab === "tutorials" ? "bg-white text-[#2563EB]" : "bg-[#315FEF] text-white/90"
              }`}
            >
              Tutorials
            </button>
          </div>
        </section>

        {/* Simulated Trading content */}
        {tab === "sim" && (
          <section className="mt-7">
            {/* Virtual balance */}
            <div className="rounded-3xl bg-[#FACC15] px-5 py-4 shadow-md">
              <p className="text-sm text-[#111827]">Virtual Balance</p>
              <p className="mt-2 text-3xl font-semibold text-[#111827]">₹10,000</p>
            </div>

            {/* Current price + chart card */}
            <div className="mt-5 rounded-3xl bg-white px-5 py-4 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current Price</p>
                  <p className="mt-1 text-2xl font-semibold text-[#111827]">₹4,850</p>
                </div>
                <span className="rounded-full bg-[#E0F8E5] px-3 py-1 text-xs font-medium text-emerald-700">
                  ● LIVE
                </span>
              </div>

              <div className="mt-4 h-28 rounded-2xl bg-[#F2F7FF] px-3 py-3">
                <div className="flex h-full items-end justify-between">
                  {[2, 5, 4, 7, 9, 8].map((v, i) => (
                    <div key={i} className="flex w-[12%] flex-col items-center">
                      <div
                        className="w-[3px] rounded-full bg-[#2BA55E]"
                        style={{ height: `${v * 8}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Buy / Sell buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="rounded-3xl border border-gray-200 bg-white py-5 text-center shadow-md">
                <div className="text-xl">📈</div>
                <div className="mt-2 text-sm font-semibold text-[#111827]">BUY</div>
              </button>
              <button className="rounded-3xl border border-gray-200 bg-white py-5 text-center shadow-md">
                <div className="text-xl">📉</div>
                <div className="mt-2 text-sm font-semibold text-[#111827]">SELL</div>
              </button>
            </div>

            <div className="mt-5 rounded-3xl bg-[#E7F0FF] px-5 py-4 text-center text-sm font-medium text-[#2563EB] shadow-md">
              Practice makes perfect!
            </div>
          </section>
        )}

        {tab === "tutorials" && (
          <section className="mt-7 text-sm text-gray-600">
            {/* placeholder list – you can later replace with real content */}
            <p className="text-base font-semibold text-[#111827] mb-3">Tutorials</p>
            <ul className="space-y-3">
              <li className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                What is hedging and why it matters?
              </li>
              <li className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                How AI price forecast works
              </li>
            </ul>
          </section>
        )}
      </main>

      <BottomNav />
    </>
  );
}
