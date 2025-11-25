'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

interface StoredContract {
  id: string;
  crop: string;
  quantity: number;
  unit: string;
  strikePrice: number;
  deliveryWindow: string;
  status: string;
  createdAt: string;
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<StoredContract[]>([]);

  useEffect(() => {
    fetch("/api/contracts")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setContracts((data || []) as StoredContract[]))
      .catch(() => setContracts([]));
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[420px] bg-white px-4 pb-20 pt-4">
      <header className="mb-3">
        <h1 className="text-lg font-semibold text-zinc-900">My Contracts</h1>
        <p className="text-xs text-zinc-600">Track status & payouts</p>
      </header>

      {contracts.length === 0 ? (
        <div className="rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
          <p className="text-zinc-700">No contracts yet.</p>
          <p className="mt-1 text-xs text-zinc-500">Create your first forward contract to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contracts.map((c) => (
            <Link
              key={c.id}
              href={`/contracts/${c.id}`}
              className="block rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-zinc-900">
                  {c.crop} • {c.quantity} {c.unit}
                </p>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                  {c.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-600">
                Target price: <span className="font-semibold">₹{c.strikePrice}</span> per {c.unit}
              </p>
              <p className="mt-0.5 text-[11px] text-zinc-500">Delivery: {c.deliveryWindow}</p>
              <p className="mt-0.5 text-[10px] text-zinc-400">
                Created at {new Date(c.createdAt).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
