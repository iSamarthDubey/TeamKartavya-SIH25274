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
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm mb-4 flex items-center gap-3">
        <Link href="/buyer/home" className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></Link>
        <div>
          <h1 className="text-xl font-bold text-green-800">Marketplace</h1>
          <p className="text-xs text-gray-500">Open farmer forwards</p>
        </div>
      </div>

      <div className="p-4">
        {contracts.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
              <i className="fa-solid fa-inbox text-2xl"></i>
            </div>
            <p className="text-gray-800 font-bold">No open forwards</p>
            <p className="text-sm text-gray-500 mt-1">Check back later or create a contract as a farmer.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contracts.map((c) => (
              <Link
                key={c.id}
                href={`/market/${c.id}`}
                className="block bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{c.crop}</h3>
                    <p className="text-xs text-gray-500">Qty: {c.quantity} {c.unit}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                    OPEN
                  </span>
                </div>
                
                <div className="flex justify-between items-center border-t border-gray-100 pt-2 mt-2">
                  <div>
                    <p className="text-xs text-gray-400">Strike Price</p>
                    <p className="font-bold text-green-700">₹{c.strikePrice}/{c.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Delivery</p>
                    <p className="text-sm text-gray-600">{c.deliveryWindow}</p>
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

