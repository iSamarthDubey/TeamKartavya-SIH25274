'use client';

import { useRouter } from "next/navigation";

export default function ContractDetailPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-yellow-100 text-yellow-800 p-3 text-center text-xs font-bold border-b border-yellow-200">
        <i className="fa-solid fa-spinner fa-spin mr-1"></i> WAITING FOR BUYER MATCH
      </div>

      <div className="bg-white p-4 shadow-sm flex items-center gap-4 mb-4">
        <button onClick={() => router.push('/')} className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="font-bold text-lg">Contract #KH-2025-88</h2>
      </div>

      <div className="p-4 space-y-4">
        
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute -right-6 -top-6 bg-green-100 w-24 h-24 rounded-full flex items-end justify-center pb-4 rotate-45">
            <i className="fa-solid fa-shield-halved text-green-600 text-xl"></i>
          </div>
          
          <div className="grid grid-cols-2 gap-y-4 text-sm mb-4">
            <div>
              <span className="block text-xs text-gray-400 uppercase">Crop</span>
              <span className="font-bold text-gray-800">Soybean</span>
            </div>
            <div>
              <span className="block text-xs text-gray-400 uppercase">Quantity</span>
              <span className="font-bold text-gray-800">50 Quintal</span>
            </div>
            <div>
              <span className="block text-xs text-gray-400 uppercase">Strike Price</span>
              <span className="font-bold text-gray-800">₹4,800/qtl</span>
            </div>
            <div>
              <span className="block text-xs text-gray-400 uppercase">Expiry</span>
              <span className="font-bold text-gray-800">24 Dec 2025</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 pt-3 flex items-center justify-between">
            <button className="text-red-500 text-xs font-bold flex items-center gap-1">
              <i className="fa-solid fa-file-pdf"></i> Download PDF
            </button>
            <span className="text-xs text-gray-400 italic">Digitally Signed</span>
          </div>
        </div>

        <div className="bg-gray-900 text-gray-300 p-4 rounded-xl text-xs font-mono">
          <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold uppercase tracking-wider">
            <i className="fa-solid fa-link"></i> Blockchain Proof
          </div>
          <div className="mb-1 text-gray-500">Transaction Hash (Polygon):</div>
          <div className="break-all text-white bg-gray-800 p-2 rounded mb-3">
            0x71C9...8a2B9d4e1
          </div>
          <button className="w-full border border-gray-600 text-gray-300 py-2 rounded hover:bg-gray-800">
            View on Explorer <i className="fa-solid fa-external-link-alt ml-1"></i>
          </button>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200">
          <button className="w-full bg-gray-200 text-gray-500 font-bold py-3 rounded-lg cursor-not-allowed">
            Mark as Settled (Inactive)
          </button>
        </div>
      </div>
    </div>
  );
}
