"use client";

import { useEffect, useState } from "react";
import AuthForm from "./AuthForm";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(() => {
    try {
      if (typeof window === "undefined") return null;
      const raw = window.localStorage?.getItem("kh_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    // Sync changes across tabs (storage event) or custom event in same tab.
    function onStorage() {
      try {
        const raw = window.localStorage?.getItem("kh_user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch (e) {
        setUser(null);
      }
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("kh_user_change", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("kh_user_change", onStorage);
    };
  }, []);

  function onAuth(u: any) {
    setUser(u);
  }

  if (!user) {
    return <AuthForm onAuth={onAuth} />;
  }

  return <>{children}</>;
}
