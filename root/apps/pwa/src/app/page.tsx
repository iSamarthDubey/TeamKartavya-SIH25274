import Link from "next/link";
import { getForecastSummary } from "../lib/forecast";
import { StartupGate } from "./StartupGate";
import { HomeTutorialOverlay } from "./HomeTutorialOverlay";
import { BottomNav } from "./BottomNav";

export default async function Home() {
  const summary = await getForecastSummary();

  const cropName = summary.cropName;
  const todayPrice = summary.currentPriceText;
  const changeText = summary.changeText;

  const forecastSummary = summary.mainSummary;
  const forecastRange = summary.rangeText;

  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-b from-[#16a34a] via-[#4ade80] to-[#f7faf7]">
      <StartupGate />
      <HomeTutorialOverlay />
      <main className="flex min-h-screen w-full max-w-[420px] flex-col justify-between bg-white/95 px-4 pb-20 pt-4 shadow-[0_24px_60px_rgba(22,163,74,0.35)] backdrop-blur-sm">
        {/* Hero header */}
        <header className="mb-4 rounded-2xl bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#bbf7d0] px-4 py-3 text-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide opacity-90">Krishi Hedge</p>
              <h1 className="mt-0.5 text-lg font-semibold">Smart Price Shield</h1>
              <p className="mt-1 text-[11px] opacity-90">Welcome farmer, here is today&apos;s mandi outlook.</p>
            </div>
            <div className="text-right text-[11px]">
              <p className="font-semibold">Today</p>
              <p className="text-xs font-bold">{todayPrice}</p>
              <p className="mt-0.5 text-[10px] text-emerald-950 bg-emerald-100/80 px-2 py-0.5 rounded-full inline-block">
                {changeText}
              </p>
            </div>
          </div>
          <div className="mt-3 h-10 w-full rounded-xl bg-emerald-100/40">
            {/* simple fake line area, can be replaced with real chart */}
          </div>
        </header>

        {/* Scrollable content area */}
        <section className="flex-1 space-y-4 overflow-y-auto pb-4">
          {/* Primary action grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <Link
              href="/contracts/new"
              className="rounded-2xl bg-emerald-50 px-3 py-3 text-left shadow-sm"
            >
              <p className="text-[11px] font-medium text-emerald-700">Start hedge</p>
              <p className="mt-1 text-sm font-semibold text-emerald-900">Create contract</p>
              <p className="mt-0.5 text-[11px] text-emerald-800">Lock price for part of harvest.</p>
            </Link>
            <Link
              href="/forecast"
              className="rounded-2xl bg-white px-3 py-3 text-left shadow-sm border border-emerald-50"
            >
              <p className="text-[11px] font-medium text-emerald-700">AI forecast</p>
              <p className="mt-1 text-sm font-semibold text-emerald-900">Price outlook</p>
              <p className="mt-0.5 text-[11px] text-emerald-800">See next 7 / 30 / 90 day view.</p>
            </Link>
            <Link
              href="/sandbox"
              className="rounded-2xl bg-slate-900 px-3 py-3 text-left text-slate-50 shadow-sm"
            >
              <p className="text-[11px] font-medium text-emerald-200">Virtual trading</p>
              <p className="mt-1 text-sm font-semibold">Practice safely</p>
              <p className="mt-0.5 text-[11px] text-slate-200">Try hedging with virtual crops.</p>
            </Link>
            <Link
              href="/market"
              className="rounded-2xl bg-white px-3 py-3 text-left shadow-sm border border-amber-100"
            >
              <p className="text-[11px] font-medium text-amber-600">FPO market</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">See offers</p>
              <p className="mt-0.5 text-[11px] text-zinc-600">Browse forwards from FPOs.</p>
            </Link>
          </div>

          {/* Forecast summary card */}
          <Link
            href="/forecast"
            className="block rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Price outlook (next 90 days)
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-900">{forecastSummary}</p>
            <p className="mt-1 text-xs text-zinc-600">{forecastRange}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              {summary.horizons.map((horizon) => (
                <div
                  key={horizon.label}
                  className={
                    "rounded-xl px-2 py-2 " +
                    (horizon.label === "30 days" ? "bg-emerald-50" : "bg-zinc-50")
                  }
                >
                  <p className="text-[10px] font-medium text-zinc-500">{horizon.label}</p>
                  <p className="mt-1 text-xs font-semibold text-zinc-900">{horizon.text}</p>
                </div>
              ))}
            </div>
          </Link>

          {/* Learning & profile shortcuts */}
          <div className="mt-1 grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/contracts"
              className="rounded-2xl border border-zinc-100 bg-white px-3 py-3 text-left shadow-sm"
            >
              <p className="text-[11px] font-medium text-zinc-500">My hedges</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">Contracts</p>
              <p className="mt-0.5 text-[11px] text-zinc-600">Track status & payouts</p>
            </Link>
            <Link
              href="/education"
              className="rounded-2xl border border-zinc-100 bg-white px-3 py-3 text-left shadow-sm"
            >
              <p className="text-[11px] font-medium text-zinc-500">Learn</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">Hedging basics</p>
              <p className="mt-0.5 text-[11px] text-zinc-600">Short lessons in simple Hindi & English</p>
            </Link>
            <Link
              href="/profile"
              className="col-span-2 block rounded-2xl border border-zinc-100 bg-white px-3 py-3 text-left text-xs shadow-sm"
            >
              <p className="text-[11px] font-medium text-zinc-500">Profile &amp; settings</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">View details &amp; reset app</p>
              <p className="mt-0.5 text-[11px] text-zinc-600">See your crops, village and mode; clear data on this device.</p>
            </Link>
          </div>
        </section>

        <BottomNav />
      </main>
    </div>
  );
}
