'use client';

import { useState } from "react";

interface Scenario {
  id: string;
  name: string;
  description: string;
  startPrice: number;
  endPrice: number;
}

const SCENARIOS: Scenario[] = [
  {
    id: "crash",
    name: "Last year crash",
    description: "Simulated 20% price drop before harvest",
    startPrice: 4250,
    endPrice: 3400,
  },
  {
    id: "normal",
    name: "Normal year",
    description: "Price moves slightly up by harvest",
    startPrice: 4250,
    endPrice: 4550,
  },
];

function computePnl(quantityQuintal: number, scenario: Scenario, hedgeShare: number) {
  const qty = quantityQuintal;
  const start = scenario.startPrice;
  const end = scenario.endPrice;
  const strike = start; // simplification: hedge at today price

  const unhedgedIncome = qty * end;
  const hedgedQty = qty * hedgeShare;
  const unhedgedQty = qty - hedgedQty;

  const hedgedIncome = hedgedQty * strike + unhedgedQty * end;

  return { unhedgedIncome, hedgedIncome };
}

export default function SandboxPage() {
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [quantity, setQuantity] = useState<string>("50");
  const [hedgeShare, setHedgeShare] = useState<number>(0.6);

  const parsedQty = Number(quantity) || 0;
  const pnl = selected && parsedQty > 0
    ? computePnl(parsedQty, selected, hedgeShare)
    : null;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[420px] bg-white px-4 pb-20 pt-4">
      <header className="mb-3">
        <h1 className="text-lg font-semibold text-zinc-900">Sandbox</h1>
        <p className="text-xs text-zinc-600">Practice hedging without risk</p>
      </header>

      {/* Scenario cards */}
      <div className="space-y-2">
        {SCENARIOS.map((scenario) => (
          <button
            key={scenario.id}
            className={`w-full rounded-2xl border px-4 py-3 text-left text-sm shadow-sm ${
              selected?.id === scenario.id
                ? "border-emerald-500 bg-emerald-50"
                : "border-zinc-100 bg-white"
            }`}
            onClick={() => setSelected(scenario)}
          >
            <p className="font-semibold">{scenario.name}</p>
            <p className="mt-0.5 text-xs text-zinc-600">{scenario.description}</p>
            <p className="mt-1 text-[11px] text-zinc-500">
              From ₹{scenario.startPrice.toLocaleString()} → ₹{scenario.endPrice.toLocaleString()} per quintal
            </p>
          </button>
        ))}
      </div>

      {/* Inputs + result */}
      <section className="mt-4 rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Your farm</p>
        <div className="mt-2 flex items-center gap-2">
          <label className="text-xs text-zinc-700">Expected output</label>
          <input
            className="flex-1 rounded-xl border border-zinc-200 bg-white p-2 text-xs"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            min={0}
          />
          <span className="text-xs text-zinc-600">quintal</span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs">
          <label className="text-xs text-zinc-700">Hedge share</label>
          <button
            className={`flex-1 rounded-full border px-2 py-1 ${
              hedgeShare === 0.4 ? "border-emerald-500 bg-emerald-50" : "border-zinc-200 bg-white"
            }`}
            onClick={() => setHedgeShare(0.4)}
          >
            40%
          </button>
          <button
            className={`flex-1 rounded-full border px-2 py-1 ${
              hedgeShare === 0.6 ? "border-emerald-500 bg-emerald-50" : "border-zinc-200 bg-white"
            }`}
            onClick={() => setHedgeShare(0.6)}
          >
            60%
          </button>
          <button
            className={`flex-1 rounded-full border px-2 py-1 ${
              hedgeShare === 0.8 ? "border-emerald-500 bg-emerald-50" : "border-zinc-200 bg-white"
            }`}
            onClick={() => setHedgeShare(0.8)}
          >
            80%
          </button>
        </div>

        {pnl ? (
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-zinc-50 p-3">
              <p className="text-[11px] font-medium text-zinc-500">Without hedge</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">
                ₹{pnl.unhedgedIncome.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3">
              <p className="text-[11px] font-medium text-emerald-800">With hedge</p>
              <p className="mt-1 text-sm font-semibold text-emerald-900">
                ₹{pnl.hedgedIncome.toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-[11px] text-zinc-500">
            Select a scenario and enter your expected output to compare incomes.
          </p>
        )}
      </section>
    </main>
  );
}
