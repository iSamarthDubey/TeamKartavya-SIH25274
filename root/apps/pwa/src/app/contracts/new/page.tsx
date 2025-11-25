'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewContractForm {
  crop: string;
  quantity: string;
  unit: string;
  targetPrice: string;
  deliveryWindow: string;
}

export default function NewContractPage() {
  const router = useRouter();
  const [form, setForm] = useState<NewContractForm>({
    crop: "Soybean",
    quantity: "",
    unit: "quintal",
    targetPrice: "",
    deliveryWindow: "Next 1 month",
  });

  function updateField<K extends keyof NewContractForm>(key: K, value: NewContractForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCreate() {
    if (!form.quantity || !form.targetPrice) {
      alert("Please enter quantity and target price.");
      return;
    }

    const res = await fetch("/api/contracts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        crop: form.crop,
        quantity: Number(form.quantity),
        unit: form.unit,
        targetPrice: Number(form.targetPrice),
        deliveryWindow: form.deliveryWindow,
      }),
    });

    if (!res.ok) {
      alert("Failed to create contract");
      return;
    }

    router.push("/contracts");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[420px] bg-white px-4 pb-20 pt-4">
      <header className="mb-3">
        <h1 className="text-lg font-semibold text-zinc-900">Create Forward Contract</h1>
        <p className="text-xs text-zinc-600">Fill crop, quantity, price & duration</p>
      </header>

      {/* Step 1: Crop & quantity */}
      <section className="space-y-2">
        <label className="block text-xs font-medium text-zinc-700">Crop</label>
        <select
          className="w-full rounded-xl border border-zinc-200 bg-white p-2 text-sm"
          value={form.crop}
          onChange={(e) => updateField("crop", e.target.value)}
        >
          <option value="Soybean">Soybean</option>
          <option value="Mustard">Mustard</option>
          <option value="Groundnut">Groundnut</option>
        </select>

        <label className="mt-3 block text-xs font-medium text-zinc-700">Quantity</label>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-xl border border-zinc-200 bg-white p-2 text-sm"
            placeholder="e.g. 50"
            value={form.quantity}
            onChange={(e) => updateField("quantity", e.target.value)}
            type="number"
            min={0}
          />
          <select
            className="rounded-xl border border-zinc-200 bg-white p-2 text-sm"
            value={form.unit}
            onChange={(e) => updateField("unit", e.target.value)}
          >
            <option value="quintal">quintal</option>
            <option value="kg">kg</option>
            <option value="tonne">tonne</option>
          </select>
        </div>

        {/* Step 2: Price & duration */}
        <label className="mt-3 block text-xs font-medium text-zinc-700">Target price (per unit)</label>
        <input
          className="w-full rounded-xl border border-zinc-200 bg-white p-2 text-sm"
          placeholder="e.g. ₹4250"
          value={form.targetPrice}
          onChange={(e) => updateField("targetPrice", e.target.value)}
          type="number"
          min={0}
        />

        <label className="mt-3 block text-xs font-medium text-zinc-700">Delivery window</label>
        <select
          className="w-full rounded-xl border border-zinc-200 bg-white p-2 text-sm"
          value={form.deliveryWindow}
          onChange={(e) => updateField("deliveryWindow", e.target.value)}
        >
          <option value="Next 1 month">Next 1 month</option>
          <option value="Next 2 months">Next 2 months</option>
          <option value="Next 3 months">Next 3 months</option>
        </select>

        {/* Preview & confirm */}
        <div className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-900">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Preview</p>
          <p className="mt-1">
            You are locking <span className="font-semibold">{form.quantity || "__"}</span> {form.unit} of {form.crop}
            {" "}
            at a target price of <span className="font-semibold">{form.targetPrice || "__"}</span> for
            {" "}
            <span className="font-semibold">{form.deliveryWindow}</span>.
          </p>
        </div>

        <button
          className="mt-3 w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
          onClick={handleCreate}
        >
          Create Contract
        </button>
      </section>
    </main>
  );
}
