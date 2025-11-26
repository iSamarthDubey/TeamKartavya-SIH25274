import Link from "next/link";

interface MarketContractDetail {
  id: string;
  crop: string;
  quantity: number;
  unit: string;
  strikePrice: number;
  deliveryWindow: string;
  status: string;
}

async function fetchContract(id: string): Promise<MarketContractDetail | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/contracts`, {
    cache: 'no-store',
  }).catch(() => null as any);

  if (!res || !res.ok) return null;
  const data = (await res.json()) as MarketContractDetail[];
  return data.find((c) => c.id === id) || null;
}

interface PageProps {
  params: { id: string };
}

export default async function MarketContractDetailPage({ params }: PageProps) {
  const contract = await fetchContract(params.id);

  if (!contract) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[420px] bg-white px-4 pb-20 pt-4 text-sm">
        <header className="mb-3 flex items-center gap-2">
          <Link
            href="/market"
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700"
          >
            Back
          </Link>
          <h1 className="text-lg font-semibold text-zinc-900">Forward</h1>
        </header>
        <div className="rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
          <p className="text-zinc-700">Forward not found.</p>
        </div>
      </main>
    );
  }

  async function acceptForward() {
    "use server";
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/contracts/${contract.id}/accept`, {
      method: 'POST',
    }).catch(() => null as any);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[420px] bg-white px-4 pb-20 pt-4 text-sm">
      <header className="mb-3 flex items-center gap-2">
        <Link
          href="/market"
          className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700"
        >
          Back
        </Link>
        <h1 className="text-lg font-semibold text-zinc-900">Forward details</h1>
      </header>

      <section className="space-y-3 text-sm">
        <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Contract</p>
          <p className="mt-1 text-sm font-semibold text-zinc-900">
            {contract.crop} • {contract.quantity} {contract.unit}
          </p>
          <p className="mt-1 text-xs text-zinc-700">
            Strike price: ₹{contract.strikePrice} / {contract.unit}
          </p>
          <p className="mt-0.5 text-xs text-zinc-700">Window: {contract.deliveryWindow}</p>
          <p className="mt-0.5 text-[11px] text-zinc-500">
            Farmer details are hidden in this demo; admin can see full KYC on the dashboard.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-100 bg-white p-4 text-xs text-zinc-700 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Actions</p>
          <p className="mt-1">
            For SIH, "Accept" will simply mark this forward as "MATCHED WITH BUYER (demo)".
          </p>
          <form action={acceptForward} className="mt-3 space-y-2">
            <button
              type="submit"
              className="w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Accept forward (demo)
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

