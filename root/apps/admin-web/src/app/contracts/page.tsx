import ContractsListClient from "@/components/ContractsListClient";
import Header from "@/components/Header";
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

export default async function ContractsListPage() {
  const contracts = await fetchContracts();
  const runtimeContracts = contracts.length === 0 ? dummyContracts : contracts;
  return (
    <main className="overview-container">
      <Header title="Contracts" subtitle="Manage and audit all farmer forward contracts." />

      <ContractsListClient contracts={runtimeContracts} showTabs />
    </main>
  );
}
