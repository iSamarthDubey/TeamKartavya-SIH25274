'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BuyerHomePage() {
  const router = useRouter();
  const [stats, setStats] = useState({ totalQty: 0, fulfilledPct: 0 });
  const [buyerName, setBuyerName] = useState("Institutional Buyer");
  const [positions, setPositions] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("kh_buyer_profile");
    if (stored) {
      const p = JSON.parse(stored);
      if (p.name) setBuyerName(p.name);
    } else {
      // If no buyer profile, redirect to login
      router.replace('/auth/buyer-login');
    }

    fetch('/api/contracts')
      .then(res => res.json())
      .then((data: any[]) => {
        const total = data.reduce((acc, c) => acc + (Number(c.quantity) || 0), 0);
        const matched = data.filter(c => c.status !== 'CREATED');
        const matchedQty = matched.reduce((acc, c) => acc + (Number(c.quantity) || 0), 0);
        
        setStats({
          totalQty: total,
          fulfilledPct: total > 0 ? Math.round((matchedQty / total) * 100) : 0
        });
        setPositions(matched);
      })
      .catch(console.error);
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-b-3xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div>
            <h1 className="text-2xl font-bold">Buyer Portal</h1>
            <p className="text-slate-400 text-sm">Sourcing for {buyerName}</p>
          </div>
          <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-blue-400 font-bold shadow-md">
            {getInitials(buyerName)}
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-400">Total Market Volume</p>
              <p className="text-xl font-bold text-white">{stats.totalQty.toLocaleString()} Quintals</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Fulfilled</p>
              <p className="text-xl font-bold text-blue-400">{stats.fulfilledPct}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Settlement Risk Widget */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-slate-800 text-sm">Settlement Risk</h3>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">LOW</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 w-1/5 h-full"></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Margin utilization is within safe limits.</p>
        </div>

        {/* Market Overview */}
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
          <h3 className="font-bold text-slate-800 mb-1">Liquidity Pool</h3>
          <p className="text-sm text-slate-600 mb-2">
            Oilseed forwards available across key mandis.
          </p>
          <p className="text-xs text-slate-500">
            Filter by crop, region and duration to find positions that match your book.
          </p>
        </div>

        {/* Action Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Order Book</h3>
              <p className="text-xs text-slate-500">Browse farmer forwards</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            See anonymised farmer contracts, then accept or mark interested.
          </p>
          <Link
            href="/market"
            className="block w-full bg-slate-900 text-white text-center font-bold py-3 rounded-lg shadow-md hover:bg-slate-800 transition"
          >
            View Marketplace
          </Link>
        </div>

        {/* Positions Placeholder */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-2">Your Positions</h3>
          {positions.length === 0 ? (
            <p className="text-sm text-slate-500">
              No active positions. Visit the marketplace to find contracts.
            </p>
          ) : (
            <div className="space-y-3">
              {positions.map((p) => (
                <div key={p.id} className="border border-slate-100 rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-800">{p.crop}</p>
                    <p className="text-xs text-slate-500">{p.quantity} {p.unit} @ ₹{p.strikePrice}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                    FULFILLED
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

