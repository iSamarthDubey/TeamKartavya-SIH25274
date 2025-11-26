import Link from "next/link";
import AcceptButton from "./AcceptButton";

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/contracts/${id}`, {
    cache: 'no-store',
  }).catch(() => null as any);

  if (!res || !res.ok) return null;
  const data = (await res.json()) as MarketContractDetail;
  return data;
}

export default async function MarketContractDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const contract = await fetchContract(params.id);

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm mb-4 flex items-center gap-3">
          <Link href="/market" className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></Link>
          <h1 className="text-xl font-bold text-gray-800">Details</h1>
        </div>
        <div className="p-4">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-800 font-bold">Forward not found</p>
          </div>
        </div>
      </div>
    );
  }

  async function acceptForward() {
    "use server";
    if (!contract) return;
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/contracts/${contract.id}/accept`, {
      method: 'POST',
    }).catch(() => null as any);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm mb-4 flex items-center gap-3">
        <Link href="/market" className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></Link>
        <h1 className="text-xl font-bold text-green-800">Forward Details</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Crop</p>
              <h2 className="text-2xl font-bold text-gray-800">{contract.crop}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase font-bold">Quantity</p>
              <p className="text-xl font-bold text-gray-800">{contract.quantity} {contract.unit}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
            <div>
              <p className="text-xs text-gray-500">Strike Price</p>
              <p className="text-lg font-bold text-green-700">₹{contract.strikePrice}/{contract.unit}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Delivery Window</p>
              <p className="text-sm font-bold text-gray-700">{contract.deliveryWindow}</p>
            </div>
          </div>
          
          <div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800">
              <i className="fa-solid fa-info-circle mr-1"></i>
              Farmer details are hidden. Admin verifies KYC.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">Actions</h3>
          <p className="text-sm text-gray-600 mb-4">
            Accepting this forward will lock the price and notify the farmer.
          </p>
          <AcceptButton contractId={contract.id} />
        </div>
      </div>
    </div>
  );
}

