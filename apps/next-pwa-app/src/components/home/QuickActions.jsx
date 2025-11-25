"use client";

import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  return (
    <section className="mt-7">
      <h2 className="text-xl font-semibold text-[#111827]">Quick Actions</h2>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => router.push("/hedge")}
          className="flex-1 rounded-3xl bg-[#2BA55E] px-4 py-4 text-center text-white shadow-md"
        >
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            🛡️
          </div>
          <p className="text-xs">Start</p>
          <p className="text-sm font-semibold">Hedge</p>
        </button>

        <button
          onClick={() => router.push("/learn")}
          className="flex-1 rounded-3xl bg-[#2563EB] px-4 py-4 text-center text-white shadow-md"
        >
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            📘
          </div>
          <p className="text-xs">Learn</p>
          <p className="text-sm font-semibold">Mode</p>
        </button>

        <button
          onClick={() => router.push("/main_profile")}
          className="flex-1 rounded-3xl bg-[#FACC15] px-4 py-4 text-center text-white shadow-md"
        >
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/25">
            📦
          </div>
          <p className="text-xs">My</p>
          <p className="text-sm font-semibold">Contracts</p>
        </button>
      </div>
    </section>
  );
}
