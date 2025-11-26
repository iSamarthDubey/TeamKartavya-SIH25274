'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SandboxPage() {
  const router = useRouter();
  const [balance, setBalance] = useState(1000000);
  const [level, setLevel] = useState("Lvl 1 Rookie");
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    const storedBalance = localStorage.getItem("sandbox_balance");
    if (storedBalance) setBalance(parseInt(storedBalance));
    
    const t = JSON.parse(localStorage.getItem("sandbox_trades") || "[]");
    setTrades(t);
    if (t.length > 5) setLevel("Lvl 2 Trader");
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 pb-20">
      <header className="bg-purple-800 text-white p-5 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.push('/')} className="text-purple-200"><i className="fa-solid fa-arrow-left"></i></button>
          <h1 className="text-xl font-bold">Sandbox Mode</h1>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-purple-200 text-xs">Virtual Balance</p>
            <h2 className="text-3xl font-bold">₹{balance.toLocaleString('en-IN')}</h2>
          </div>
          <div className="text-right">
            <span className="bg-purple-600 px-2 py-1 rounded text-xs font-bold">{level}</span>
          </div>
        </div>
      </header>

      <div className="p-5 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100 text-center">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fa-solid fa-graduation-cap text-xl"></i>
          </div>
          <h3 className="font-bold text-gray-800">Learn Risk-Free</h3>
          <p className="text-xs text-gray-500 mt-1">Practice trading without losing real money. Try creating a contract now.</p>
        </div>

        <h3 className="font-bold text-gray-700 text-sm">Practice History</h3>
        {trades.length === 0 ? (
          <div className="text-center py-8 opacity-50">
            <i className="fa-solid fa-box-open text-4xl text-gray-300 mb-2"></i>
            <p className="text-sm text-gray-400">No practice trades yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {trades.map((t: any) => (
              <div key={t.id} className="bg-white p-3 rounded-lg shadow-sm border border-purple-100 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800">{t.crop}</p>
                  <p className="text-xs text-gray-500">{t.quantity} Qtl @ ₹{t.price}</p>
                </div>
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">VIRTUAL</span>
              </div>
            ))}
          </div>
        )}

        <button onClick={() => router.push('/contracts/new?mode=sandbox')} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow-md">
          Start New Practice Trade
        </button>
      </div>
    </div>
  );
}
