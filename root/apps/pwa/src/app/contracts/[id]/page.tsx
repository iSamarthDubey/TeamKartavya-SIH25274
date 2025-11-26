'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContractDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    fetch('/api/contracts')
      .then(res => res.json())
      .then((data: any[]) => {
        const found = data.find(c => c.id === params.id);
        setContract(found);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">Loading...</div>;
  if (!contract) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">Contract not found</div>;

  async function handleDelete() {
    if (!confirm("Are you sure you want to cancel this contract?")) return;
    
    try {
      const res = await fetch(`/api/contracts/${contract.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/contracts');
      } else {
        alert("Failed to delete");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className={`p-3 text-center text-xs font-bold border-b ${contract.status === 'CREATED' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-green-100 text-green-800 border-green-200'}`}>
        {contract.status === 'CREATED' ? (
          <span><i className="fa-solid fa-spinner fa-spin mr-1"></i> WAITING FOR BUYER MATCH</span>
        ) : (
          <span><i className="fa-solid fa-check mr-1"></i> MATCHED WITH BUYER</span>
        )}
      </div>

      <div className="bg-white p-4 shadow-sm flex items-center gap-4 mb-4">
        <button onClick={() => router.push('/contracts')} className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="font-bold text-lg">Contract #{contract.id.slice(-6)}</h2>
      </div>

      <div className="p-4 space-y-4">
        
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute -right-6 -top-6 bg-green-100 w-24 h-24 rounded-full flex items-end justify-center pb-4 rotate-45">
            <i className="fa-solid fa-shield-halved text-green-600 text-xl"></i>
          </div>
          
          <div className="grid grid-cols-2 gap-y-4 text-sm mb-4">
            <div>
              <span className="block text-xs text-gray-400 uppercase">Crop</span>
              <span className="font-bold text-gray-800">{contract.crop}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-400 uppercase">Quantity</span>
              <span className="font-bold text-gray-800">{contract.quantity} {contract.unit}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-400 uppercase">Strike Price</span>
              <span className="font-bold text-gray-800">₹{contract.strikePrice}/{contract.unit}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-400 uppercase">Expiry</span>
              <span className="font-bold text-gray-800">{contract.deliveryWindow}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 pt-3 flex items-center justify-between">
            <button className="text-red-500 text-xs font-bold flex items-center gap-1">
              <i className="fa-solid fa-file-pdf"></i> Download PDF
            </button>
            <span className="text-xs text-gray-400 italic">Digitally Signed</span>
          </div>
        </div>

        <div className="bg-gray-900 text-gray-300 p-4 rounded-xl text-xs font-mono">
          <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold uppercase tracking-wider">
            <i className="fa-solid fa-link"></i> Blockchain Proof
          </div>
          <div className="mb-1 text-gray-500">Transaction Hash (Polygon):</div>
          <div className="break-all text-white bg-gray-800 p-2 rounded mb-3">
            {contract.anchorTxHash || '0x71C9...8a2B9d4e1'}
          </div>
          <button className="w-full border border-gray-600 text-gray-300 py-2 rounded hover:bg-gray-800">
            View on Explorer <i className="fa-solid fa-external-link-alt ml-1"></i>
          </button>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 flex gap-3">
          {contract.status === 'CREATED' && (
            <button 
              onClick={handleDelete}
              className="flex-1 bg-red-100 text-red-600 font-bold py-3 rounded-lg"
            >
              Cancel Order
            </button>
          )}
          <button className="flex-1 bg-gray-200 text-gray-500 font-bold py-3 rounded-lg cursor-not-allowed">
            Mark as Settled
          </button>
        </div>
      </div>
    </div>
  );
}
