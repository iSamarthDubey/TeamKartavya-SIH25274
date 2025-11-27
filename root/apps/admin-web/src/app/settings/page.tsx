"use client";

import { useState } from "react";
import Header from "@/components/Header";

export default function AdminSettingsPage() {
  const [endpoint, setEndpoint] = useState("https://api.krishihedge.com/v1");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySummary, setNotifySummary] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <main className="overview-container max-w-4xl py-6">
      <Header title="Settings" subtitle="Configure application parameters." />
      <form onSubmit={handleSubmit} className="settings-card space-y-8">
        <section className="settings-section">
          <div>
            <h3>General Configuration</h3>
            <p>The base URL for backend services.</p>
          </div>
          <label className="settings-field">
            <span>API Endpoint</span>
            <input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
          </label>
        </section>

        <section className="settings-section">
          <div>
            <h3>Notifications</h3>
            <p>Pick when admins should be notified.</p>
          </div>
          <label className="settings-checkbox">
            <input type="checkbox" checked={notifyEmail} onChange={(e) => setNotifyEmail(e.target.checked)} />
            <span>Email on new contract creation</span>
          </label>
          <label className="settings-checkbox">
            <input type="checkbox" checked={notifySummary} onChange={(e) => setNotifySummary(e.target.checked)} />
            <span>Daily summary report</span>
          </label>
        </section>

        <div className="settings-actions">
          {status === "saved" && <span className="status-pill">Saved</span>}
          <button type="submit" className="primary-action">
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}
