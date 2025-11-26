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
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] z-50 animate-in slide-in-from-bottom-6 fade-in duration-700">
      <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 text-white p-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
             <img src="/icon.png" alt="App Icon" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm text-white leading-tight">Krishi Hedge</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Add to Home Screen</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
            <button 
            onClick={() => setShow(false)}
            className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
            <i className="fa-solid fa-xmark text-xs"></i>
            </button>
            <button 
            onClick={handleInstall}
            className="bg-white text-slate-900 px-3.5 py-1.5 rounded-lg font-bold text-xs shadow-lg hover:bg-slate-100 active:scale-95 transition-all"
            >
            Install
            </button>
        </div>
      </div>
    </div>
  );
}
