"use client";

import BottomNav from "@/components/BottomNav";
import ContractCard from "@/components/ContractCard";

const contracts = [
  {
    crop: "Soybean",
    id: "HC2024001",
    quantity: "50 Q",
    price: 4900,
    date: "15 Nov 2024",
    status: "Active",
    statusColor: "bg-emerald-500",
  },
  {
    crop: "Groundnut",
    id: "HC2024002",
    quantity: "30 Q",
    price: 5200,
    date: "28 Oct 2024",
    status: "Settled",
    statusColor: "bg-sky-500",
  },
  {
    crop: "Mustard",
    id: "HC2024003",
    quantity: "40 Q",
    price: 5650,
    date: "02 Nov 2024",
    status: "Pending",
    statusColor: "bg-amber-500",
  },
];

export default function ProfilePage() {
  return (
    <>
      <main className="min-h-screen bg-[#F7FFF9] px-6 pb-28 pt-8 overflow-y-auto">
        {/* Header */}
        <section className="rounded-b-[36px] bg-gradient-to-b from-[#2BA55E] to-[#1E8748] px-5 pb-7 pt-8 text-white shadow-md">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/15">
              ←
            </button>
            <h1 className="text-2xl font-semibold">Profile</h1>
          </div>

          {/* Profile summary card */}
          <div className="mt-5 rounded-3xl bg-white px-5 py-4 text-[#111827] shadow-md">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2BA55E] text-2xl text-white">
                  👤
                </div>
                <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-xs text-white">
                  ✔
                </div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold">Ramesh Kumar</div>
                <div className="mt-1 text-sm text-gray-600">+91 98765 43210</div>
                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                  📍 Nagpur, Maharashtra
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 text-center text-sm text-gray-600">
              <div>
                <div className="text-lg font-semibold text-[#111827]">5</div>
                <div className="text-xs">Contracts</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-[#111827]">₹2.4L</div>
                <div className="text-xs">Total Value</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-[#111827]">3</div>
                <div className="text-xs">Active</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contract history */}
        <section className="mt-7">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#111827]">
              Contract History
            </h2>
            <button className="text-xs font-medium text-[#22A34C]">View All</button>
          </div>

          {contracts.map((c) => (
            <ContractCard key={c.id} {...c} />
          ))}
        </section>

        {/* Account section */}
        <section className="mt-7 mb-3">
          <p className="text-xs font-semibold text-gray-500">ACCOUNT</p>

          <div className="mt-3 rounded-3xl bg-white shadow-md">
            <button className="flex w-full items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#E4F0FF]">
                  👤
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Personal Details</p>
                  <p className="text-xs text-gray-500">व्यक्तिगत विवरण</p>
                </div>
              </div>
              <span className="text-lg text-gray-400">›</span>
            </button>
            <div className="h-[1px] w-full bg-gray-100" />
            <button className="flex w-full items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#E7F7EB]">
                  📍
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Location Settings</p>
                </div>
              </div>
              <span className="text-lg text-gray-400">›</span>
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
