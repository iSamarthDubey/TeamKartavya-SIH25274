"use client";

import { useRouter } from "next/navigation";

export default function HedgeActionCard({ type, title, subtitle, iconBg, iconEmoji, href }) {
  const router = useRouter();

  return (
    <button
      onClick={() => href && router.push(href)}
      className="mt-4 w-full rounded-3xl bg-white px-5 py-5 text-left shadow-md border border-gray-100"
    >
      <div className="flex items-start gap-4">
        <div className={`mt-1 flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}>
          <span className="text-2xl">{iconEmoji}</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#111827]">{title}</p>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </button>
  );
}
