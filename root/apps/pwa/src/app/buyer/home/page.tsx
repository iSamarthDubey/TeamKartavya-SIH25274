import Link from "next/link";
import { BottomNav } from "../../BottomNav";

export default function BuyerHomePage() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50">
      <main className="flex min-h-screen w-full max-w-[420px] flex-col justify-between bg-white px-4 pb-16 pt-4">
        <header className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Krishi Hedge</p>
            <h1 className="text-lg font-semibold text-zinc-900">Buyer overview</h1>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">
            Buyer mode
          </span>
        </header>

        <section className="flex-1 space-y-3 overflow-y-auto pb-4 text-xs">
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Market overview</p>
            <p className="mt-1 text-sm font-semibold text-zinc-900">
              Oilseed forwards available across key mandis.
            </p>
            <p className="mt-1 text-[11px] text-emerald-900">
              Filter by crop, region and duration to find positions that match your book.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-white px-4 py-3 text-sm shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Next action</p>
            <p className="mt-1 text-sm font-semibold text-zinc-900">Browse available forwards</p>
            <p className="mt-1 text-[11px] text-zinc-600">
              See anonymised farmer contracts, then accept or mark interested.
            </p>
            <Link
              href="/market"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              View marketplace
            </Link>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-white px-4 py-3 text-sm shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Your positions</p>
            <p className="mt-1 text-[11px] text-zinc-600">
              In this SIH demo, matched positions are shown in the farmer Contracts tab; you can extend this
              later to a dedicated buyer positions view.
            </p>
          </div>
        </section>

        <BottomNav />
      </main>
    </div>
  );
}

