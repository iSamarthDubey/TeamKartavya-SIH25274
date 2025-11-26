'use client';

import { useRouter } from "next/navigation";

export default function ForecastPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-white p-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-40">
        <button onClick={() => router.push('/')} className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="font-bold text-lg">Price Forecast</h2>
      </div>
      
      <div className="p-4">
        <div className="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
               <i className="fa-solid fa-filter text-gray-400"></i>
               <span className="font-bold text-sm">Soybean</span>
          </div>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">30 Days</span>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-2 h-64 relative mb-4 flex items-center justify-center">
             <div className="w-full h-full p-4 relative">
                <div className="absolute bottom-10 left-0 w-full h-px bg-gray-300"></div> <div className="absolute top-0 left-10 w-px h-full bg-gray-300"></div> <svg className="w-full h-full overflow-visible">
                    <path d="M40,150 Q100,100 180,180 T300,200" fill="none" stroke="#EF4444" strokeWidth="3" />
                    <circle cx="40" cy="150" r="4" fill="#15803D" /> <circle cx="300" cy="200" r="4" fill="#EF4444" /> </svg>
                <div className="absolute top-10 right-0 bg-white shadow p-2 rounded text-xs border border-gray-100">
                    <span className="block text-gray-400">Predicted (Dec 15)</span>
                    <span className="block font-bold text-red-600">₹4,600 ▼</span>
                </div>
             </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <h4 className="font-bold text-blue-900 text-sm mb-1">AI Insight</h4>
          <p className="text-xs text-blue-800 leading-relaxed">
            Based on historical data and current monsoon patterns, prices are expected to fall by 8-10% in the next 3 weeks.
            <br/><br/>
            <strong>Recommendation:</strong> Create a forward contract now to lock in current rates.
          </p>
        </div>

        <button onClick={() => router.push('/contracts/new')} className="w-full bg-yellow-500 text-green-900 font-bold py-4 rounded-xl shadow-md mt-6">
          Create Forward Contract
        </button>
      </div>
    </div>
  );
}

