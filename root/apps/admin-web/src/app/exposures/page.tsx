import Header from "@/components/Header";
import CropChart from "@/components/CropChart";
import type { AdminContract } from "@/types";
import dummyContracts from "@/data/dummyContracts";

async function resolveApiBase(): Promise<string> {
  const candidates = [process.env.NEXT_PUBLIC_PWA_API_BASE, process.env.NEXT_PUBLIC_BASE_URL, "http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"].filter(Boolean);
  for (const base of candidates) {
    try {
      const res = await fetch(`${base}/api/contracts`, { cache: "no-store" });
      if (res.ok) return base as string;
    } catch (_) {}
  }
  return (process.env.NEXT_PUBLIC_PWA_API_BASE || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
}

async function fetchContracts(): Promise<AdminContract[]> {
  const base = await resolveApiBase();
  const res = await fetch(`${base}/api/contracts`, { cache: "no-store" }).catch(() => null as any);
  if (!res || !res.ok) return [];
  return (await res.json()) as AdminContract[];
}

const highlightCards = [
  {
    title: "Exposure Chart",
    body: "Detailed visualization of long/short positions would go here using Recharts or Chart.js.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6 text-emerald-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-10" />
      </svg>
    ),
  },
  {
    title: "Regional Heatmap",
    body: "Map visualization showing concentration of risk by district.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6 text-indigo-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    ),
  },
];

export default async function AdminExposuresPage() {
  const contracts = await fetchContracts();
  const runtimeContracts = contracts.length === 0 ? dummyContracts : contracts;
  return (
    <main className="overview-container">
      <Header title="Risk & Exposures" subtitle="Detailed breakdown of platform risk across crops and regions." />
      <section className="exposure-highlights">
        {highlightCards.map((card) => (
          <article key={card.title} className="exposure-card">
            <div className="exposure-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <button type="button" className="ghost-link">
              View details →
            </button>
          </article>
        ))}
      </section>

      <section className="exposure-breakdown">
        <div>
          <h3>Exposure by Crop</h3>
          <p className="muted">Relative outstanding quantity per commodity.</p>
        </div>
        <CropChart contracts={runtimeContracts} />
      </section>
    </main>
  );
}
