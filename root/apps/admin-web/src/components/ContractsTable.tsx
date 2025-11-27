"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AdminContract } from "@/types";

const DEFAULT_CANDIDATES = [
  process.env.NEXT_PUBLIC_PWA_API_BASE,
  process.env.NEXT_PUBLIC_BASE_URL,
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
].filter(Boolean) as string[];

function useResolvedApiBase() {
  const [apiBase, setApiBase] = useState(DEFAULT_CANDIDATES?.[0] ?? "http://localhost:3000");
  useEffect(() => {
    (async () => {
      for (const base of DEFAULT_CANDIDATES) {
        try {
          const res = await fetch(`${base}/api/contracts`);
          if (res.ok) {
            setApiBase(base);
            return;
          }
        } catch (_) {}
      }
    })();
  }, []);
  return apiBase;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type ContractsTableProps = {
  contracts: AdminContract[];
  showToolbar?: boolean;
  externalQuery?: string;
  externalStatus?: string | null;
  externalCrop?: string | null;
  onRowsChange?: (rows: AdminContract[]) => void;
};

export default function ContractsTable({ contracts, showToolbar = true, externalQuery, externalStatus, externalCrop, onRowsChange }: ContractsTableProps) {
  const API_BASE = useResolvedApiBase();
  const [rows, setRows] = useState<AdminContract[]>(contracts || []);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [cropFilter, setCropFilter] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [busyIds, setBusyIds] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const perPage = 10;

  useEffect(() => setRows(contracts || []), [contracts]);
  useEffect(() => {
    onRowsChange?.(rows);
  }, [rows, onRowsChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  const filtered = useMemo(() => {
    const effectiveQuery = externalQuery ?? query;
    const effectiveStatus = externalStatus ?? statusFilter;
    const effectiveCrop = externalCrop ?? cropFilter;

    return rows.filter((c) => {
      if (effectiveStatus && c.status !== effectiveStatus) return false;
      if (effectiveCrop && c.crop !== effectiveCrop) return false;
      if (!effectiveQuery) return true;
      const q = effectiveQuery.toLowerCase();
      return c.id.toLowerCase().includes(q) || c.crop.toLowerCase().includes(q) || c.status.toLowerCase().includes(q);
    });
  }, [rows, query, statusFilter, cropFilter, externalQuery, externalStatus, externalCrop]);

  useEffect(() => setPage(0), [query, statusFilter, cropFilter, externalQuery, externalStatus, externalCrop]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice(page * perPage, (page + 1) * perPage);

  function exportFilteredCSV() {
    if (!filtered.length) return;
    const csvArray: string[] = ["id,crop,quantity,unit,strikePrice,deliveryWindow,status,createdAt"];
    filtered.forEach((r) => {
      const row = [
        r.id,
        r.crop,
        (r.quantity ?? "").toString(),
        r.unit ?? "",
        (r.strikePrice ?? "").toString(),
        `"${r.deliveryWindow ?? ""}"`,
        r.status,
        r.createdAt,
      ];
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

  function statusClass(status: string) {
    if (status === "CREATED") return "status-badge created";
    if (status === "MATCHED_WITH_BUYER_DEMO") return "status-badge matched";
    return "status-badge settled";
  }

  async function acceptContract(id: string) {
    try {
      setBusyIds((prev) => [...prev, id]);
      const res = await fetch(`${API_BASE}/api/contracts/${id}/accept`, { method: "POST" });
      if (res?.ok) {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "MATCHED_WITH_BUYER_DEMO" } : r)));
      } else if (typeof window !== "undefined" && (window.location.hostname === "localhost" || process.env.NODE_ENV === "development")) {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "MATCHED_WITH_BUYER_DEMO" } : r)));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBusyIds((prev) => prev.filter((busyId) => busyId !== id));
    }
  }

  async function anchorContract(id: string) {
    try {
      setBusyIds((prev) => [...prev, id]);
      const res = await fetch(`${API_BASE}/api/contracts/${id}/anchor`, { method: "POST" });
      if (res?.ok) {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "SETTLED" } : r)));
      } else if (typeof window !== "undefined" && (window.location.hostname === "localhost" || process.env.NODE_ENV === "development")) {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "SETTLED" } : r)));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBusyIds((prev) => prev.filter((busyId) => busyId !== id));
    }
  }

  const toolbar = (
    <div className={`contracts-toolbar ${showToolbar ? "contracts-toolbar--inline" : ""}`}>
      <div className="toolbar-input">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z" />
        </svg>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
      </div>
      <div className="toolbar-select">
        <select value={statusFilter ?? ""} onChange={(e) => setStatusFilter(e.target.value || null)}>
          <option value="">Status</option>
          <option value="CREATED">Created</option>
          <option value="MATCHED_WITH_BUYER_DEMO">Matched</option>
          <option value="SETTLED">Settled</option>
          <option value="DISPUTED">Disputed</option>
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>
      <div className="toolbar-select">
        <select value={cropFilter ?? ""} onChange={(e) => setCropFilter(e.target.value || null)}>
          <option value="">Crop</option>
          {[...new Set(rows.map((r) => r.crop))].filter(Boolean).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>
      <button className="export-button" onClick={exportFilteredCSV}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5 5 5-5M12 14V3" />
        </svg>
        Export
      </button>
    </div>
  );

  return (
    <div>
      {showToolbar && toolbar}
      {filtered.length === 0 ? (
        <div className="empty-state">No contracts yet.</div>
      ) : (
        <>
          {isMobile ? (
            <div className="contracts-mobile-list">
              {pageItems.map((c) => {
                const createdDate = new Date(c.createdAt);
                const createdLabel = Number.isNaN(createdDate.getTime()) ? c.createdAt : createdDate.toLocaleDateString();
                return (
                  <div key={c.id} className="contracts-mobile-card">
                    <header>
                      <span className="mono-id">{c.id.slice(0, 8)}...</span>
                      <span className={statusClass(c.status)}>{c.status === "MATCHED_WITH_BUYER_DEMO" ? "MATCHED ..." : c.status}</span>
                    </header>
                    <div className="card-row">
                      <span>Crop</span>
                      <strong>{c.crop}</strong>
                    </div>
                    <div className="card-row">
                      <span>Quantity</span>
                      <strong>
                        {c.quantity} {c.unit}
                      </strong>
                    </div>
                    <div className="card-row">
                      <span>Strike</span>
                      <strong>{currencyFormatter.format(Number(c.strikePrice) || 0)}</strong>
                    </div>
                    <div className="card-row">
                      <span>Window</span>
                      <strong>{c.deliveryWindow}</strong>
                    </div>
                    <div className="card-row">
                      <span>Created</span>
                      <strong>{createdLabel}</strong>
                    </div>
                    <div className="action-buttons">
                      {c.status === "CREATED" && (
                        <button className="btn-pill primary" disabled={busyIds.includes(c.id)} onClick={() => acceptContract(c.id)}>
                          Accept
                        </button>
                      )}
                      {c.status !== "SETTLED" && (
                        <button className="btn-pill" disabled={busyIds.includes(c.id)} onClick={() => anchorContract(c.id)}>
                          Anchor
                        </button>
                      )}
                      <Link className="btn-pill" href={`/contracts/${c.id}`}>
                        View
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <table className="contracts-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Crop</th>
                  <th>Qty</th>
                  <th>Strike</th>
                  <th>Window</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((c) => {
                  const createdDate = new Date(c.createdAt);
                  const createdLabel = Number.isNaN(createdDate.getTime()) ? c.createdAt : createdDate.toLocaleDateString();
                  return (
                    <tr key={c.id}>
                      <td className="mono-id">
                        <Link href={`/contracts/${c.id}`} title={c.id}>
                          {c.id.slice(0, 8)}...
                        </Link>
                      </td>
                      <td>{c.crop}</td>
                      <td>
                        {c.quantity} {c.unit}
                      </td>
                      <td>{currencyFormatter.format(Number(c.strikePrice) || 0)}</td>
                      <td>{c.deliveryWindow}</td>
                      <td>
                        <span className={statusClass(c.status)}>{c.status === "MATCHED_WITH_BUYER_DEMO" ? "MATCHED ..." : c.status}</span>
                      </td>
                      <td>{createdLabel}</td>
                      <td>
                        <div className="action-buttons">
                          {c.status === "CREATED" && (
                            <button className="btn-pill primary" disabled={busyIds.includes(c.id)} onClick={() => acceptContract(c.id)}>
                              Accept
                            </button>
                          )}
                          {c.status !== "SETTLED" && (
                            <button className="btn-pill" disabled={busyIds.includes(c.id)} onClick={() => anchorContract(c.id)}>
                              Anchor
                            </button>
                          )}
                          <Link className="btn-pill" href={`/contracts/${c.id}`}>
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="contracts-table-footer">
            <span>Showing {Math.min(filtered.length, (page + 1) * perPage)} of {filtered.length} contracts</span>
            <div className="pagination">
              <button disabled={page <= 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>
                Prev
              </button>
              <span>
                Page {page + 1} / {pageCount}
              </span>
              <button disabled={page >= pageCount - 1} onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}>
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
