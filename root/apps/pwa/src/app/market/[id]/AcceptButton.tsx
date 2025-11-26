'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AcceptButton({ contractId }: { contractId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleAccept() {
    if (!confirm("Are you sure you want to accept this contract?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/contracts/${contractId}/accept`, {
        method: 'POST',
      });
      
      if (res.ok) {
        alert("Contract accepted successfully!");
        router.push('/buyer/home');
        router.refresh();
      } else {
        alert("Failed to accept contract");
      }
    } catch (e) {
      console.error(e);
      alert("Error accepting contract");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAccept}
      disabled={loading}
      className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg shadow-md hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span><i className="fa-solid fa-spinner fa-spin mr-2"></i> Executing Trade...</span>
      ) : (
        "Execute Trade"
      )}
    </button>
  );
}
