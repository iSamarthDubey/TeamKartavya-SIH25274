'use client';

import { useRouter } from "next/navigation";

export default function MyContractsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm flex items-center gap-4 mb-4">
        <button onClick={() => router.push('/')} className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="font-bold text-lg">My Contracts</h2>
      </div>

      <div className="p-4 space-y-3">
        <div onClick={() => router.push('/contracts/123')} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500 cursor-pointer">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-gray-800">Soybean</h3>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">PENDING</span>
          </div>
          <div className="text-sm text-gray-600 flex justify-between">
            <span>50 Quintal @ ₹4,800</span>
            <span>₹2,40,000</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-right">Created: Today</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500 opacity-70">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-gray-800">Mustard</h3>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold">SETTLED</span>
          </div>
          <div className="text-sm text-gray-600 flex justify-between">
            <span>20 Quintal @ ₹5,100</span>
            <span>₹1,02,000</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-right">Settled: 10 Nov 2025</p>
        </div>
      </div>
    </div>
  );
}
