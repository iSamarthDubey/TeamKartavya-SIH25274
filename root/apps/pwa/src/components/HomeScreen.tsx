'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const [name, setName] = useState("Farmer");
  const [forecast, setForecast] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const phone = window.localStorage.getItem("kh_phone");
      if (!phone) {
        router.replace('/splash');
      }
      const profile = window.localStorage.getItem("kh_profile");
      if (profile) {
        try {
          const p = JSON.parse(profile);
          if (p.name) setName(p.name);
        } catch (e) {}
      }
    }
  }, [router]);

  useEffect(() => {
    // Fetch Forecast & Market Price
    fetch('/api/forecast')
      .then(res => res.json())
      .then(data => setForecast(data))
      .catch(console.error);

    // Fetch Recent Contracts
    fetch('/api/contracts')
      .then(res => res.json())
      .then(data => setContracts(data.slice(0, 2))) // Show top 2
      .catch(console.error);
  }, []);

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
        <h1 className="text-2xl font-bold">Namaste, {name}</h1>
        <p className="text-green-200 text-sm">Market is {forecast?.trend || 'volatile'} today.</p>
      </header>

      <div className="px-5 -mt-6 space-y-4">
        
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">{forecast?.crop || 'Soybean'} (Indore)</p>
              <h3 className="text-2xl font-bold text-gray-800">₹{forecast?.currentPrice?.toLocaleString() || '...'} <span className="text-sm text-gray-400 font-normal">/qtl</span></h3>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${forecast?.trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              <i className={`fa-solid ${forecast?.trend === 'down' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i> {forecast?.change || '0'}%
            </span>
          </div>
        </div>

        <div onClick={() => router.push('/forecast')} className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-xl shadow-sm cursor-pointer active:scale-95 transition">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-wand-magic-sparkles text-blue-600"></i>
            <h3 className="font-bold text-blue-900 text-sm">AI Price Prediction</h3>
          </div>
          <p className="text-xs text-blue-800 mb-3">Price likely to {forecast?.trend === 'down' ? 'drop' : 'rise'} to <strong>₹{forecast?.predictedPrice?.toLocaleString() || '...'}</strong> in 30 days.</p>
          <div className="w-full h-1 bg-blue-200 rounded-full overflow-hidden">
            <div className="bg-blue-600 w-3/4 h-full"></div>
          </div>
          <div className="text-[10px] text-blue-400 mt-1 text-right">{forecast?.confidence || '85'}% Confidence</div>
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
        {contracts.length === 0 ? (
          <div className="text-center py-4 text-gray-400 text-xs">No active contracts. Create one above!</div>
        ) : (
          contracts.map(c => (
            <div key={c.id} onClick={() => router.push(`/contracts/${c.id}`)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer">
              <div>
                <div className="font-bold text-gray-800">{c.quantity} Qtl {c.crop}</div>
                <div className="text-xs text-gray-500">Exp: {c.deliveryWindow}</div>
              </div>
              <div className="text-right">
                <span className="block font-bold text-green-700">₹{c.strikePrice}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${c.status === 'CREATED' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                  {c.status === 'CREATED' ? 'PENDING' : 'MATCHED'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
