'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Contract {
  id: string;
  crop: string;
  quantity: number;
  strikePrice: number;
  status: string;
  createdAt: string;
}

export default function MyContractsPage() {
  const router = useRouter();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = window.localStorage.getItem("kh_user_id");
      if (userId) {
        fetch(`/api/contracts?role=farmer&userId=${userId}`)
          .then(res => res.json())
          .then(data => {
            setContracts(data);
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm flex items-center gap-4 mb-4">
        <button onClick={() => router.push('/')} className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="font-bold text-lg">My Contracts</h2>
      </div>

      <div className="p-4 space-y-3">
        {loading ? (
           <div className="text-center py-10 text-gray-400">Loading contracts...</div>
        ) : contracts.length === 0 ? (
           <div className="text-center py-10 text-gray-400">No contracts found</div>
        ) : (
          contracts.map(contract => (
            <div key={contract.id} onClick={() => router.push(`/contracts/${contract.id}`)} className={`bg-white p-4 rounded-xl shadow-sm border-l-4 cursor-pointer ${contract.status === 'CREATED' ? 'border-yellow-500' : 'border-green-500'}`}>
              <div className="flex justify-between mb-2">
                <h3 className="font-bold text-gray-800">{contract.crop}</h3>
                <span className={`text-xs px-2 py-0.5 rounded font-bold ${contract.status === 'CREATED' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {contract.status === 'CREATED' ? 'PENDING' : contract.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 flex justify-between">
                <span>{contract.quantity} Quintal @ ₹{contract.strikePrice}</span>
                <span>₹{(contract.quantity * contract.strikePrice).toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-right">Created: {new Date(contract.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
