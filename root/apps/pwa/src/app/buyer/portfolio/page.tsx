'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BuyerPortfolioPage() {
  const router = useRouter();
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contracts?role=buyer')
      .then(res => res.json())
      .then((data: any[]) => {
        // Filter for matched contracts (simulating buyer's portfolio)
        const matched = data.filter(c => c.status !== 'CREATED');
        setPositions(matched);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 p-6 text-white shadow-lg">
        <h1 className="text-xl font-bold">Portfolio</h1>
        <p className="text-slate-400 text-xs">Active Positions & Settlements</p>
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
          <div className="text-center text-slate-400 py-10">Loading positions...</div>
        ) : positions.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <i className="fa-solid fa-folder-open text-2xl"></i>
            </div>
            <h3 className="text-slate-800 font-bold">No Active Positions</h3>
            <p className="text-slate-500 text-sm mb-4">Your order book is empty.</p>
            <button 
              onClick={() => router.push('/market')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-blue-700"
            >
              Go to Market
            </button>
          </div>
        ) : (
          positions.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Forward</span>
                  <h3 className="font-bold text-slate-800 text-lg mt-1">{p.crop}</h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Strike Price</p>
                  <p className="font-bold text-slate-800">₹{p.strikePrice}/qtl</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-100 pt-3">
                <div>
                  <p className="text-slate-400 text-xs">Quantity</p>
                  <p className="font-bold text-slate-700">{p.quantity} {p.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs">Delivery By</p>
                  <p className="font-bold text-slate-700">30 Days</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                  <i className="fa-solid fa-check-circle"></i> Margin Locked
                </span>
                <button className="text-blue-600 text-xs font-bold hover:underline">
                  View Contract
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
