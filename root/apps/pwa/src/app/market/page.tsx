import Link from "next/link";

interface MarketContract {
  id: string;
  crop: string;
  quantity: number;
  unit: string;
  strikePrice: number;
  deliveryWindow: string;
  status: string;
}

async function fetchContracts(): Promise<MarketContract[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/contracts`, {
    // Avoid caching so new forwards show up.
    cache: 'no-store',
  }).catch(() => null as any);

  if (!res || !res.ok) return [];
  const data = (await res.json()) as MarketContract[];
  return data.filter((c) => c.status === 'CREATED');
}

export default async function MarketPage() {
  const contracts = await fetchContracts();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 p-4 shadow-lg mb-4 flex items-center gap-3 text-white">
        <Link href="/buyer/home" className="text-slate-300 hover:text-white"><i className="fa-solid fa-arrow-left"></i></Link>
        <div>
          <h1 className="text-xl font-bold">Marketplace</h1>
          <p className="text-xs text-slate-400">Live Order Book</p>
        </div>
      </div>

      <div className="p-4">
        {contracts.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <i className="fa-solid fa-inbox text-2xl"></i>
            </div>
            <p className="text-slate-800 font-bold">No open forwards</p>
            <p className="text-sm text-slate-500 mt-1">Check back later or create a contract as a farmer.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contracts.map((c) => (
              <Link
                key={c.id}
                href={`/market/${c.id}`}
                className="block bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-blue-500 transition group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition">{c.crop}</h3>
                    <p className="text-xs text-slate-500">ID: {c.id.substring(0, 8)}...</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                    OPEN
                  </span>
                </div>
                
                <div className="flex justify-between items-end mt-3">
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold">Quantity</p>
                    <p className="text-lg font-bold text-slate-700">{c.quantity} {c.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase font-bold">Ask Price</p>
                    <p className="text-lg font-bold text-slate-900">₹{c.strikePrice}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

