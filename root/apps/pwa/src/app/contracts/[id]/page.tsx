'use client';

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getForecastSummary, type ForecastSummary } from "../../../lib/forecast";

interface StoredContract {
  id: string;
  crop: string;
  quantity: number;
  unit: string;
  strikePrice: number;
  deliveryWindow: string;
  status: string;
  createdAt: string;
  pdfUrl?: string;
  anchorTxHash?: string;
  anchorExplorerUrl?: string;
}

export default function ContractDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [contract, setContract] = useState<StoredContract | null>(null);
  const [forecast, setForecast] = useState<ForecastSummary | null>(null);

  useEffect(() => {
    if (!params?.id) return;
    fetch("/api/contracts")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: StoredContract[]) => {
        const found = (data || []).find((c) => c.id === params.id);
        setContract(found || null);
      })
      .catch(() => setContract(null));
  }, [params?.id]);

  useEffect(() => {
    // For now, use the same overall forecast summary used on Home.
    getForecastSummary()
      .then(setForecast)
      .catch(() => setForecast(null));
  }, []);

  const createdAtText = useMemo(() => {
    if (!contract?.createdAt) return "";
    try {
      return new Date(contract.createdAt).toLocaleString();
    } catch {
      return contract.createdAt;
    }
  }, [contract?.createdAt]);

  if (!contract) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[420px] bg-white px-4 pb-20 pt-4">
        <header className="mb-3 flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700"
          >
            Back
          </button>
          <h1 className="text-lg font-semibold text-zinc-900">Contract</h1>
        </header>
        <div className="rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
          <p className="text-zinc-700">Contract not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[420px] bg-white px-4 pb-20 pt-4">
      <header className="mb-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zinc-900">{contract.crop}</h1>
          <p className="text-xs text-zinc-600">Created at {createdAtText}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
          {contract.status}
        </span>
      </header>

      {/* Summary */}
      <section className="mb-3 rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[11px] text-zinc-500">Quantity</p>
            <p className="text-sm font-semibold text-zinc-900">{contract.quantity} {contract.unit}</p>
          </div>
          <div>
            <p className="text-[11px] text-zinc-500">Target price</p>
            <p className="text-sm font-semibold text-zinc-900">₹{contract.strikePrice} / {contract.unit}</p>
          </div>
          <div>
            <p className="text-[11px] text-zinc-500">Delivery window</p>
            <p className="text-sm font-semibold text-zinc-900">{contract.deliveryWindow}</p>
          </div>
        </div>
      </section>

      {/* Forecast snippet */}
      <section className="mb-3 rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
        <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Current model outlook</p>
        <p className="mt-1 text-sm text-zinc-900">
          {forecast?.mainSummary || "Model expects moderate movement in the next month."}
        </p>
        <p className="mt-0.5 text-[11px] text-zinc-600">
          {forecast?.rangeText || "Range and uncertainty bands will be shown here from the ML service."}
        </p>
      </section>

      {/* Links: PDF & Blockchain proof */}
      <section className="mb-3 space-y-2">
        <button
          className="w-full rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm"
          onClick={async () => {
            if (!contract?.id) return;
            // Call PDF stub to ensure pdfUrl exists (points to /sample-contract.pdf)
            await fetch(`/api/contracts/${contract.id}/pdf`, { method: "POST" }).catch(() => {});
            // Open the static sample for demo
            window.open(`/sample-contract.pdf`, "_blank");
          }}
        >
          View e-contract (PDF)
        </button>
        <button
          className="w-full rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm"
          onClick={async () => {
            if (!contract?.id) return;
            try {
              const res = await fetch(`/api/contracts/${contract.id}/anchor`, { method: "POST" });
              if (!res.ok) {
                alert("Unable to fetch blockchain proof right now.");
                return;
              }
              const data = await res.json();
              if (data.explorerUrl) {
                window.open(data.explorerUrl, "_blank");
              } else {
                alert("Explorer URL not available.");
              }
            } catch {
              alert("Error contacting anchor service.");
            }
          }}
        >
          View blockchain proof (Mumbai)
        </button>
      </section>

      {/* Quick P&L simulator (simple, static scenarios for now) */}
      <section className="mb-6 rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
        <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Quick P&L check</p>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px]">
          <div className="rounded-xl bg-zinc-50 px-2 py-2">
            <p className="font-semibold text-zinc-900">Price −10%</p>
            <p className="mt-1 text-[10px] text-zinc-600">Loss without hedge ↓</p>
          </div>
          <div className="rounded-xl bg-zinc-50 px-2 py-2">
            <p className="font-semibold text-zinc-900">Price −20%</p>
            <p className="mt-1 text-[10px] text-zinc-600">Bigger loss without hedge</p>
          </div>
          <div className="rounded-xl bg-zinc-50 px-2 py-2">
            <p className="font-semibold text-zinc-900">Price +10%</p>
            <p className="mt-1 text-[10px] text-zinc-600">Upside is capped</p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-zinc-600">
          We’ll compute exact hedged vs unhedged income using forecast + your quantity.
        </p>
      </section>
    </main>
  );
}
