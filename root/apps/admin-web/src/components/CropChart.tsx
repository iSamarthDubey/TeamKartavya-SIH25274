import type { AdminContract } from "@/types";

export default function CropChart({ contracts }: { contracts: AdminContract[] }) {
  const totals: Record<string, number> = {};
  contracts.forEach((c) => (totals[c.crop] = (totals[c.crop] || 0) + (c.quantity || 0)));
  const items = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  if (items.length === 0) {
    return <div className="panel-card">No data yet.</div>;
  }

  const max = items[0][1] || 1;

  return (
    <div className="panel-card">
      <div className="panel-heading">Exposure by Crop</div>
      <div>
        {items.map(([crop, qty]) => (
          <div key={crop} className="exposure-row">
            <div className="exposure-label">{crop}</div>
            <div className="exposure-track">
              <div className="exposure-fill" style={{ width: `${(qty / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
