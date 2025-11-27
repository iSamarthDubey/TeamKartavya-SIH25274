"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.body.classList.add("no-topnav");
    return () => {
      document.body.classList.remove("no-topnav");
    };
  }, []);

  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="brand">
          <span>KH</span>
          <p>Krishi Hedge Admin</p>
        </div>
        <h1>Page not found</h1>
        <p>The page you are looking for doesn’t exist or was moved.</p>
        <Link href="/" className="primary-action">
          Go back home
        </Link>
      </div>
    </div>
  );
}

