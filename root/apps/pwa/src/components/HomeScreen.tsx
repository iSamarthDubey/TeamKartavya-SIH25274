'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const phone = window.localStorage.getItem("kh_phone");
      if (!phone) {
        router.replace('/splash');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen pb-20 relative bg-gray-50">
      <header className="bg-green-800 text-white p-5 rounded-b-3xl shadow-lg pb-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold text-xs">KH</div>
            <span className="font-bold">Krishi Hedge</span>
          </div>
          <i className="fa-solid fa-bell"></i>
        </div>
        <h1 className="text-2xl font-bold">Namaste, Ram Kishan</h1>
        <p className="text-green-200 text-sm">Market is volatile today.</p>
      </header>

      <div className="px-5 -mt-6 space-y-4">
        
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Soybean (Indore)</p>
              <h3 className="text-2xl font-bold text-gray-800">₹4,850 <span className="text-sm text-gray-400 font-normal">/qtl</span></h3>
            </div>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
              <i className="fa-solid fa-arrow-down"></i> ₹120
            </span>
          </div>
        </div>

        <div onClick={() => router.push('/forecast')} className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-xl shadow-sm cursor-pointer active:scale-95 transition">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-wand-magic-sparkles text-blue-600"></i>
            <h3 className="font-bold text-blue-900 text-sm">AI Price Prediction</h3>
          </div>
          <p className="text-xs text-blue-800 mb-3">Price likely to drop to <strong>₹4,600</strong> in 15 days.</p>
          <div className="w-full h-1 bg-blue-200 rounded-full overflow-hidden">
            <div className="bg-blue-600 w-3/4 h-full"></div>
          </div>
          <div className="text-[10px] text-blue-400 mt-1 text-right">85% Confidence</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => router.push('/contracts/new')} className="bg-yellow-500 text-green-900 p-4 rounded-xl shadow-md font-bold text-left flex flex-col justify-between h-28 active:scale-95 transition">
            <i className="fa-solid fa-file-signature text-2xl opacity-80"></i>
            <span>Create<br/>Forward Contract</span>
          </button>
          <button onClick={() => router.push('/sandbox')} className="bg-purple-100 text-purple-900 p-4 rounded-xl shadow-sm border border-purple-200 font-bold text-left flex flex-col justify-between h-28 active:scale-95 transition">
            <i className="fa-solid fa-gamepad text-2xl opacity-80"></i>
            <span>Sandbox<br/>(Practice)</span>
          </button>
        </div>

        <h3 className="font-bold text-gray-700 mt-2">Recent Contracts</h3>
        <div onClick={() => router.push('/contracts/123')} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer">
          <div>
            <div className="font-bold text-gray-800">50 Qtl Soybean</div>
            <div className="text-xs text-gray-500">Exp: 20 Dec 2025</div>
          </div>
          <div className="text-right">
            <span className="block font-bold text-green-700">₹4,800</span>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
