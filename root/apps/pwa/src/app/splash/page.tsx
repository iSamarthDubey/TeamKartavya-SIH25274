'use client';

import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  return (
    <div className="h-screen bg-green-900 text-white flex flex-col items-center justify-center p-6 relative">
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-10" 
        style={{ backgroundImage: "radial-gradient(#EAB308 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      ></div>
      
      <div className="z-10 text-center space-y-6">
        <div className="w-24 h-24 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-4">
          <i className="fa-solid fa-wheat-awn text-5xl text-green-900"></i>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-1">Krishi Hedge</h1>
          <p className="text-green-300">Smart Price Protection</p>
        </div>
        
        <div className="space-y-3 w-full pt-10">
          <button 
            onClick={() => router.push('/auth/login')} 
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95"
          >
            Continue as Farmer
          </button>
          <button 
            onClick={() => router.push('/auth/buyer-login')} 
            className="w-full bg-transparent border border-green-500 text-green-100 font-semibold py-4 rounded-xl hover:bg-green-800 transition"
          >
            Continue as Buyer
          </button>
        </div>
        
        <div className="pt-8">
          <span className="text-xs bg-green-800 px-3 py-1 rounded-full text-green-300 border border-green-700">SIH 2025 Prototype</span>
        </div>
      </div>
    </div>
  );
}
