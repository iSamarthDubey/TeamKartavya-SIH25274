import Link from "next/link";
import { getForecastSummary } from "../lib/forecast";

export default async function Home() {
  const summary = await getForecastSummary();

  const cropName = summary.cropName;
  const todayPrice = summary.currentPriceText;
  const changeText = summary.changeText;

  const forecastSummary = summary.mainSummary;
  const forecastRange = summary.rangeText;

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50">
      <main className="flex min-h-screen w-full max-w-[420px] flex-col justify-between bg-white px-4 pb-16 pt-4">
        {/* Top App Bar */}
        <header className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              Krishi Hedge
            </p>
            <h1 className="text-lg font-semibold text-zinc-900">
              Smart Price Shield
            </h1>
          </div>
          <button className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700">
            EN / हिंदी
          </button>
        </header>

        {/* Scrollable content area */}
        <section className="flex-1 space-y-3 overflow-y-auto pb-4">
          {/* Today price strip */}
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              Today&apos;s mandi price
            </p>
            <p className="mt-1 text-sm font-semibold">{cropName}</p>
            <div className="mt-1 flex items-baseline justify-between">
              <p className="text-base font-bold">{todayPrice}</p>
              <span className="text-xs font-semibold text-emerald-700">{changeText}</span>
            </div>
          </div>

          {/* Forecast card */}
          <div className="rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Price outlook (next 90 days)
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-900">{forecastSummary}</p>
            <p className="mt-1 text-xs text-zinc-600">{forecastRange}</p>

            {/* Simple segmented view for 7 / 30 / 90 days */}
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
          </div>

          {/* Recommended action */}
          <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm text-orange-900">
            <p className="text-xs font-medium uppercase tracking-wide text-orange-700">
              Suggested hedge
            </p>
            <p className="mt-1 text-sm font-semibold">
              Lock around <span className="font-bold">60%</span> of your expected harvest with a forward
              contract.
            </p>
            <p className="mt-1 text-xs text-orange-800">
              This can reduce loss if prices fall sharply before harvest.
            </p>
            <Link
              href="/contracts/new"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Create Forward Contract
            </Link>
          </div>

          {/* Quick links */}
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
              href="/sandbox"
              className="rounded-2xl border border-zinc-100 bg-white px-3 py-3 text-left shadow-sm"
            >
              <p className="text-[11px] font-medium text-zinc-500">Practice</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">Sandbox</p>
              <p className="mt-0.5 text-[11px] text-zinc-600">Try hedging without risk</p>
            </Link>
            <Link
              href="/education"
              className="rounded-2xl border border-zinc-100 bg-white px-3 py-3 text-left shadow-sm col-span-2"
            >
              <p className="text-[11px] font-medium text-zinc-500">Learn</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">Hedging basics</p>
              <p className="mt-0.5 text-[11px] text-zinc-600">Short lessons in simple Hindi & English</p>
            </Link>
          </div>
        </section>

        {/* Bottom nav bar */}
        <nav className="fixed inset-x-0 bottom-0 mx-auto flex max-w-[420px] items-center justify-between border-t border-zinc-200 bg-white px-6 py-2 text-[11px] text-zinc-600">
          <Link href="/" className="flex flex-1 flex-col items-center justify-center gap-0.5">
            <span className="text-xs font-semibold text-emerald-700">Home</span>
          </Link>
          <Link href="/contracts" className="flex flex-1 flex-col items-center justify-center gap-0.5">
            <span>Contracts</span>
          </Link>
          <Link href="/sandbox" className="flex flex-1 flex-col items-center justify-center gap-0.5">
            <span>Sandbox</span>
          </Link>
          <Link href="/education" className="flex flex-1 flex-col items-center justify-center gap-0.5">
            <span>Learn</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
