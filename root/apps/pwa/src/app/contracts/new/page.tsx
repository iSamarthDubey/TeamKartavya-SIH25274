'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateContractPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(50);
  const [price, setPrice] = useState(4800);

  async function handlePublish() {
    setLoading(true);
    try {
      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: 'Soybean',
          quantity,
          unit: 'Qtl',
          targetPrice: price,
          deliveryWindow: '30 Days'
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        // Wait a bit to show the loading animation
        setTimeout(() => {
           router.push(`/contracts/${data.id}`);
        }, 2000);
      } else {
        alert('Failed to create contract');
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      alert('Error creating contract');
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin mb-6"></div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Processing Contract</h3>
        <ul className="text-left text-sm text-gray-500 space-y-2 mt-4">
          <li className="flex items-center gap-2"><i className="fa-solid fa-check-circle text-green-500"></i> Saving details</li>
          <li className="flex items-center gap-2"><i className="fa-solid fa-check-circle text-green-500"></i> Generating PDF E-Contract</li>
          <li className="flex items-center gap-2"><i className="fa-solid fa-circle-notch fa-spin text-yellow-500"></i> Anchoring to Blockchain...</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm flex items-center gap-4">
        <button onClick={() => router.push('/')} className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="font-bold text-lg">New Contract</h2>
      </div>

      <div className="p-5 space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Crop</label>
          <div className="flex items-center bg-white p-3 rounded-lg border border-gray-200 mt-1">
            <i className="fa-solid fa-leaf text-green-600 mr-3"></i>
            <span className="font-bold">Soybean</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Quantity (Quintals)</label>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full text-3xl font-bold bg-transparent border-b-2 border-gray-300 py-2 focus:border-yellow-500 outline-none mt-1" 
          />
          <p className="text-xs text-gray-400 mt-1">Min: 10 Qtl • Max: 500 Qtl</p>
        </div>

        <div>
          <div className="flex justify-between">
            <label className="text-xs font-bold text-gray-500 uppercase">Strike Price / Qtl</label>
            <span className="text-xs font-bold text-green-600">Suggested: ₹4,800</span>
          </div>
          <div className="mt-3 bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-center mb-2">
              <span className="text-3xl font-bold text-gray-800">₹{price.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="4500" 
              max="5200" 
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-2">
              <span>₹4,500</span>
              <span>₹5,200</span>
            </div>
          </div>
        </div>

        <div className="bg-green-900 text-white p-4 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-2 border-b border-green-700 pb-2">
            <span className="text-xs text-green-300">Est. Earnings</span>
            <span className="font-bold text-lg">₹{(quantity * price).toLocaleString()}</span>
          </div>
          <p className="text-xs text-green-200 leading-tight">
            You are offering to sell <strong>{quantity} Qtl</strong> Soybean at <strong>₹{price.toLocaleString()}</strong>. This contract will be valid for 30 days.
          </p>
        </div>

        <button onClick={handlePublish} className="w-full bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold py-4 rounded-xl shadow-md">
          Publish Contract
        </button>
      </div>
    </div>
  );
}
