"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminContract } from "@/types";
import ContractsTable from "@/components/ContractsTable";

const STATUS_MAP: Record<string, string> = {
  All: "",
  Created: "CREATED",
  Matched: "MATCHED_WITH_BUYER_DEMO",
  Settled: "SETTLED",
  Disputed: "DISPUTED",
};

type Props = {
  contracts: AdminContract[];
  showTabs?: boolean;
};

export default function ContractsListClient({ contracts, showTabs = false }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("Status");
  const [crop, setCrop] = useState<string>("Crop");
  const [liveRows, setLiveRows] = useState<AdminContract[]>(contracts);
  const [activeTab, setActiveTab] = useState<keyof typeof STATUS_MAP>("All");

  useEffect(() => {
    setLiveRows(contracts);
  }, [contracts]);

  const crops = useMemo(() => {
    return Array.from(new Set((liveRows.length ? liveRows : contracts).map((c) => c.crop))).filter(Boolean);
  }, [contracts, liveRows]);

  const normalizedStatus = status === "Status" ? null : STATUS_MAP[status as keyof typeof STATUS_MAP] ?? status.toUpperCase();
  const normalizedCrop = crop === "Crop" ? null : crop;
  const normalizedTabStatus = STATUS_MAP[activeTab] || null;

  const finalStatusFilter = normalizedTabStatus || normalizedStatus;

  const filteredForExport = useMemo(() => {
    return (liveRows.length ? liveRows : contracts).filter((c) => {
      if (finalStatusFilter && c.status !== finalStatusFilter) return false;
      if (normalizedCrop && c.crop !== normalizedCrop) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return c.id.toLowerCase().includes(q) || c.crop.toLowerCase().includes(q) || c.status.toLowerCase().includes(q);
    });
  }, [contracts, liveRows, finalStatusFilter, normalizedCrop, query]);

  function exportFilteredCSV() {
    const rowsToExport = filteredForExport;
    const csvArray: string[] = ["id,crop,quantity,unit,strike_price,delivery_window,status,createdAt"];
    rowsToExport.forEach((r) => {
      const row = [r.id, r.crop, r.quantity?.toString() ?? "", r.unit ?? "", r.strikePrice?.toString() ?? "", `"${r.deliveryWindow || ""}"`, r.status, r.createdAt];
      csvArray.push(row.join(","));
    });
    const csv = csvArray.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contracts.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="contracts-card">
      <header>
        <div className="card-headline">
          <div>
            <p className="eyebrow">Live data</p>
            <h3>All Contracts</h3>
          </div>
          <button onClick={exportFilteredCSV} className="export-all-button">
            <svg width="20" 
    height="20" 
    className="mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5 5 5-5M12 14V3" />
            </svg>
            Export All
          </button>
        </div>

        {showTabs && (
          <div className="contract-tabs">
            {Object.keys(STATUS_MAP).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`contract-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab as keyof typeof STATUS_MAP)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        <div className="contracts-toolbar">
          <div className="toolbar-input">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z" />
            </svg>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
          </div>

          <div className="toolbar-select">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Status</option>
              <option>Created</option>
              <option>Matched</option>
              <option>Settled</option>
              <option>Disputed</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </div>

          <div className="toolbar-select">
            <select value={crop} onChange={(e) => setCrop(e.target.value)}>
              <option>Crop</option>
              {crops.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </header>

      <div className="contracts-table-wrapper">
        <ContractsTable
          contracts={contracts}
          showToolbar={false}
          externalQuery={query}
          externalStatus={normalizedStatus}
          externalCrop={normalizedCrop}
          onRowsChange={setLiveRows}
        />
      </div>
    </div>
  );
}