'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

const ROLE_STORAGE_KEY = "kh_role";

type Role = 'farmer' | 'buyer';

export function BottomNav() {
  const [role, setRole] = useState<Role>('farmer');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(ROLE_STORAGE_KEY) as Role | null;
    if (stored === 'buyer' || stored === 'farmer') {
      setRole(stored);
    }
  }, []);

  if (role === 'buyer') {
    // Buyer tabs: Home, Forecast, Contracts, Market, Profile
    return (
      <nav className="fixed inset-x-0 bottom-0 mx-auto flex max-w-[420px] items-center justify-between border-t border-zinc-200 bg-white px-4 py-2 text-[11px] text-zinc-600">
        <Link href="/buyer/home" className="flex flex-1 flex-col items-center justify-center gap-0.5">
          <span className="text-xs font-semibold text-emerald-700">Home</span>
        </Link>
        <Link href="/forecast" className="flex flex-1 flex-col items-center justify-center gap-0.5">
          <span>Forecast</span>
        </Link>
        <Link href="/contracts" className="flex flex-1 flex-col items-center justify-center gap-0.5">
          <span>Contracts</span>
        </Link>
        <Link href="/market" className="flex flex-1 flex-col items-center justify-center gap-0.5">
          <span>Market</span>
        </Link>
        <Link href="/profile" className="flex flex-1 flex-col items-center justify-center gap-0.5">
          <span>Profile</span>
        </Link>
      </nav>
    );
  }

  // Farmer tabs: Home, Forecast, Contracts, Sandbox, Profile
  return (
    <nav className="fixed inset-x-0 bottom-0 mx-auto flex max-w-[420px] items-center justify-between border-t border-zinc-200 bg-white px-4 py-2 text-[11px] text-zinc-600">
      <Link href="/" className="flex flex-1 flex-col items-center justify-center gap-0.5">
        <span className="text-xs font-semibold text-emerald-700">Home</span>
      </Link>
      <Link href="/forecast" className="flex flex-1 flex-col items-center justify-center gap-0.5">
        <span>Forecast</span>
      </Link>
      <Link href="/contracts" className="flex flex-1 flex-col items-center justify-center gap-0.5">
        <span>Contracts</span>
      </Link>
      <Link href="/sandbox" className="flex flex-1 flex-col items-center justify-center gap-0.5">
        <span>Sandbox</span>
      </Link>
      <Link href="/profile" className="flex flex-1 flex-col items-center justify-center gap-0.5">
        <span>Profile</span>
      </Link>
    </nav>
  );
}

