"use client";

import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault(); // stop Chrome auto banner
      console.log("🟢 beforeinstallprompt fired");
      setDeferredPrompt(event);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const outcome = await deferredPrompt.userChoice;
    console.log("Install result:", outcome);

    setDeferredPrompt(null);
    setCanInstall(false);
  };

  if (!canInstall) return null;

  return (
    <button
      onClick={install}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 18px",
        background: "#29A35A",
        color: "white",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0px 3px 10px rgba(0,0,0,0.25)"
      }}
    >
      📲 Install App
    </button>
  );
}
