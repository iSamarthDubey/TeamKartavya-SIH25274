'use client';

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShow(false);
    }
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-0 w-full px-4 z-40 flex justify-center">
      <div className="bg-green-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between w-full max-w-md border border-green-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-green-900 shadow-sm">
            <i className="fa-solid fa-wheat-awn text-xl"></i>
          </div>
          <div>
            <h3 className="font-bold text-sm">Install App</h3>
            <p className="text-xs text-green-300">Add to Home Screen</p>
          </div>
        </div>
        <button 
          onClick={handleInstall}
          className="bg-white text-green-900 px-4 py-2 rounded-lg font-bold text-xs shadow hover:bg-gray-100 transition"
        >
          Install
        </button>
        <button 
          onClick={() => setShow(false)}
          className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-sm"
        >
          <i className="fa-solid fa-times"></i>
        </button>
      </div>
    </div>
  );
}
