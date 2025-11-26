import { getForecastSummary } from "../../lib/forecast";
import Link from "next/link";

export default async function ForecastPage() {
  const summary = await getForecastSummary();

  const cropName = summary.cropName;
  const todayPrice = summary.currentPriceText;
  const forecastSummary = summary.mainSummary;
  const forecastRange = summary.rangeText;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[420px] bg-white px-4 pb-20 pt-4">
      <header className="mb-3">
        <h1 className="text-lg font-semibold text-zinc-900">Price forecast</h1>
        <p className="text-xs text-zinc-600">Next 90 days outlook for your crop</p>
      </header>

      <section className="space-y-3 text-sm">
        {/* Crop selector */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-3 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Crop</p>
          <p className="mt-1 text-sm font-semibold text-zinc-900">{cropName}</p>
          <p className="mt-0.5 text-[11px] text-zinc-600">
            For SIH demo, forecast is shown for a single mandi + crop.
          </p>
        </div>

        {/* Simple chart placeholder */}
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3 text-xs text-zinc-700 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Chart (demo)</p>
          <p className="mt-1 text-sm font-semibold text-zinc-900">{forecastSummary}</p>
          <p className="mt-0.5 text-[11px] text-zinc-600">{forecastRange}</p>
          <div className="mt-3 h-28 rounded-xl bg-gradient-to-r from-emerald-100 via-emerald-50 to-zinc-50" />
          <p className="mt-1 text-[11px] text-zinc-500">
            Replace this block with a real line chart using the ML horizons data.
          </p>
        </div>

        {/* Explanation */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-3 text-xs text-zinc-700 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">How to read this</p>
          <p className="mt-1">
            The model looks at recent mandi prices and patterns, then projects a likely range for the next
            7, 30 and 90 days. Bands show uncertainty &amp; risk. Use this as a guide, not a guarantee.
          </p>
        </div>

        {/* CTA into Create Contract */}
        <div className="mt-2 rounded-2xl bg-orange-50 p-3 text-sm text-orange-900">
          <p className="text-xs font-medium uppercase tracking-wide text-orange-700">Next step</p>
          <p className="mt-1 text-sm font-semibold">
            Lock a part of your harvest price using today's information.
          </p>
          <p className="mt-1 text-xs text-orange-800">
            You can start small (40–60%) and increase as you get comfortable.
          </p>
          <Link
            href="/contracts/new"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Create Forward Contract
          </Link>
        </div>
      </section>
    </main>
  );
}

