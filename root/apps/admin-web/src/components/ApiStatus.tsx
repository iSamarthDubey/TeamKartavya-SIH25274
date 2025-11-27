"use client";

import { useEffect, useState } from "react";

export default function ApiStatus() {
  const [connected, setConnected] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const candidates = [process.env.NEXT_PUBLIC_PWA_API_BASE, process.env.NEXT_PUBLIC_BASE_URL, "http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"].filter(Boolean) as string[];
    (async () => {
      for (const base of candidates) {
        try {
          const res = await fetch(`${base}/api/contracts`);
          if (res.ok) {
            setConnected(true);
            setChecked(true);
            return;
          }
        } catch (_) {}
      }
      setConnected(false);
      setChecked(true);
    })();
  }, []);

  if (!checked) return <div className="text-xs text-gray-500">Checking API...</div>;
  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <span className={`h-2 w-2 rounded-full ${connected ? "bg-green-500" : "bg-gray-300"}`} />
      <span className={connected ? "text-green-600 font-medium" : "text-gray-500 font-medium"}>{connected ? "API connected" : "API unavailable"}</span>
    </div>
  );
}
