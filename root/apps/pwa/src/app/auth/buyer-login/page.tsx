'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BuyerLoginPage() {
  const router = useRouter();
  const [orgName, setOrgName] = useState("");
  const [buyerType, setBuyerType] = useState("Institutional");

  function handleLogin() {
    if (!orgName.trim()) {
      alert("Please enter your Organization Name");
      return;
    }
    
    const profile = {
      name: orgName,
      type: buyerType,
      joined: new Date().toISOString()
    };
    
    localStorage.setItem("kh_buyer_profile", JSON.stringify(profile));
    router.push("/buyer/home");
  }

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="mt-10 mb-8">
        <button onClick={() => router.push('/splash')} className="text-gray-400 mb-4"><i className="fa-solid fa-arrow-left"></i> Back</button>
        <h2 className="text-2xl font-bold text-gray-800">Buyer Portal</h2>
        <p className="text-gray-500 text-sm">Identify your organization to access the marketplace.</p>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Organization Name</label>
          <input 
            type="text" 
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none font-bold text-gray-800 transition" 
            placeholder="e.g. ITC Limited, BigBasket" 
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Buyer Type</label>
          <div className="grid grid-cols-2 gap-3">
            {['Institutional', 'Retail Chain', 'Mandi Agent', 'Exporter'].map((type) => (
              <button
                key={type}
                onClick={() => setBuyerType(type)}
                className={`p-3 rounded-lg border-2 text-sm font-bold transition ${
                  buyerType === type 
                    ? 'border-green-600 bg-green-50 text-green-800' 
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleLogin} 
        className="w-full bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-900 transition active:scale-95"
      >
        Enter Marketplace
      </button>
    </div>
  );
}
