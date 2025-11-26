'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BuyerHomePage() {
  const [stats, setStats] = useState({ totalQty: 0, fulfilledPct: 0 });
  const [buyerName, setBuyerName] = useState("Guest Buyer");

  useEffect(() => {
    const stored = localStorage.getItem("kh_profile");
    if (stored) {
      const p = JSON.parse(stored);
      if (p.name) setBuyerName(p.name);
    }

    fetch('/api/contracts')
      .then(res => res.json())
      .then((data: any[]) => {
        const total = data.reduce((acc, c) => acc + (Number(c.quantity) || 0), 0);
        const matched = data.filter(c => c.status !== 'CREATED').reduce((acc, c) => acc + (Number(c.quantity) || 0), 0);
        setStats({
          totalQty: total,
          fulfilledPct: total > 0 ? Math.round((matched / total) * 100) : 0
        });
      })
      .catch(console.error);
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-700 p-6 rounded-b-3xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div>
            <h1 className="text-2xl font-bold">Buyer Portal</h1>
            <p className="text-green-100 text-sm">Sourcing for {buyerName}</p>
          </div>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-700 font-bold shadow-md">
            {getInitials(buyerName)}
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-green-100">Total Market Volume</p>
              <p className="text-xl font-bold">{stats.totalQty.toLocaleString()} Quintals</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-green-100">Fulfilled</p>
              <p className="text-xl font-bold">{stats.fulfilledPct}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Market Overview */}
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <h3 className="font-bold text-gray-800 mb-1">Market Overview</h3>
          <p className="text-sm text-gray-600 mb-2">
            Oilseed forwards available across key mandis.
          </p>
          <p className="text-xs text-gray-500">
            Filter by crop, region and duration to find positions that match your book.
          </p>
        </div>

        {/* Action Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <i className="fa-solid fa-search"></i>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Find Contracts</h3>
              <p className="text-xs text-gray-500">Browse farmer forwards</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            See anonymised farmer contracts, then accept or mark interested.
          </p>
          <Link
            href="/market"
            className="block w-full bg-green-700 text-white text-center font-bold py-3 rounded-lg shadow-md hover:bg-green-800 transition"
          >
            View Marketplace
          </Link>
        </div>

        {/* Positions Placeholder */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">Your Positions</h3>
          <p className="text-sm text-gray-500">
            In this SIH demo, matched positions are shown in the farmer Contracts tab.
          </p>
        </div>
      </div>
    </div>
  );
}

