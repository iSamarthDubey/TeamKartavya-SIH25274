"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_PWA_API_BASE ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:3000";

const CROPS = ["Maize", "Wheat", "Paddy", "Soybean", "Mustard"];
const UNITS = ["kg", "quintal", "tonne"];

export default function NewContractPage() {
  const [crop, setCrop] = useState(CROPS[0]);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState(UNITS[0]);
  const [targetPrice, setTargetPrice] = useState("");
  const [deliveryStart, setDeliveryStart] = useState("");
  const [deliveryEnd, setDeliveryEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const deliveryWindow = deliveryStart && deliveryEnd ? `${deliveryStart} - ${deliveryEnd}` : deliveryStart || deliveryEnd;

    try {
      const priceValue = Number(targetPrice) || 0;
      const res = await fetch(`${API_BASE}/api/contracts`, {
        method: "POST",
        body: JSON.stringify({
          crop,
          quantity,
          unit,
          targetPrice: priceValue,
          deliveryWindow,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data?.error || "Could not create");
      } else {
        const newContract = await res.json();
        router.push(`/contracts/${newContract.id}`);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="new-contract-layout">
      <Link href="/" className="back-link">
        ← Back to Dashboard
      </Link>
      <div className="page-lead">
        <h1>Create New Forward</h1>
        <p>Set up a new crop forward contract for a farmer.</p>
      </div>

      <section className="new-contract-card">
        <form onSubmit={submit} className="contract-form">
          <div className="form-grid">
            <label className="form-field">
              <span>Crop</span>
              <select value={crop} onChange={(e) => setCrop(e.target.value)}>
                {CROPS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Quantity</span>
              <div className="input-with-addon">
                <input type="number" min={0} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} placeholder="0.00" required />
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                  {UNITS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="form-field full">
              <span>Strike Price (₹)</span>
              <input type="number" min={0} value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} placeholder="e.g. 2400" required />
              <small>↗ Market rate is approx ₹2200</small>
            </label>

            <div className="form-field full">
              <span>Delivery Window</span>
              <div className="date-grid">
                <input type="date" value={deliveryStart} onChange={(e) => setDeliveryStart(e.target.value)} required />
                <input type="date" value={deliveryEnd} onChange={(e) => setDeliveryEnd(e.target.value)} required />
              </div>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button type="button" onClick={() => router.back()} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="primary-action" disabled={loading}>
              {loading ? "Creating..." : "Create Contract"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
