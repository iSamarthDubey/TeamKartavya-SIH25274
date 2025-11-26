'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide on public pages
  // We hide it on splash, auth pages, and onboarding
  if (pathname === '/splash' || pathname.startsWith('/auth') || pathname.startsWith('/onboarding')) {
    return null;
  }

  const isBuyer = pathname.startsWith('/buyer') || pathname.startsWith('/market');

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  if (isBuyer) {
    return (
      <nav className="fixed bottom-0 w-full max-w-md bg-slate-900 border-t border-slate-800 flex justify-around py-3 pb-5 z-50 text-slate-400">
        <button 
            onClick={() => router.push('/buyer/home')} 
            className={`${isActive('/buyer/home') ? 'text-blue-400 font-bold' : 'hover:text-slate-200'} flex flex-col items-center text-xs`}
        >
            <i className="fa-solid fa-building-columns text-xl mb-1"></i>Dashboard
        </button>
        
        <button 
            onClick={() => router.push('/market')} 
            className={`${isActive('/market') ? 'text-blue-400 font-bold' : 'hover:text-slate-200'} flex flex-col items-center text-xs`}
        >
            <i className="fa-solid fa-globe text-xl mb-1"></i>Market
        </button>
        
        <button 
            onClick={() => router.push('/buyer/portfolio')} 
            className={`${isActive('/buyer/portfolio') ? 'text-blue-400 font-bold' : 'hover:text-slate-200'} flex flex-col items-center text-xs`}
        >
            <i className="fa-solid fa-briefcase text-xl mb-1"></i>Portfolio
        </button>
        
        <button 
            onClick={() => router.push('/profile')} 
            className={`${isActive('/profile') ? 'text-blue-400 font-bold' : 'hover:text-slate-200'} flex flex-col items-center text-xs`}
        >
            <i className="fa-solid fa-user-tie text-xl mb-1"></i>Profile
        </button>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around py-3 pb-5 z-50">
        <button 
            onClick={() => router.push('/')} 
            className={`${isActive('/') ? 'text-green-700 font-bold' : 'text-gray-400'} flex flex-col items-center text-xs`}
        >
            <i className="fa-solid fa-home text-xl mb-1"></i>Home
        </button>
        
        <button 
            onClick={() => router.push('/forecast')} 
            className={`${isActive('/forecast') ? 'text-green-700 font-bold' : 'text-gray-400'} flex flex-col items-center text-xs`}
        >
            <i className="fa-solid fa-chart-line text-xl mb-1"></i>Forecast
        </button>
        
        <div className="w-12"></div> 
        
        <button 
            onClick={() => router.push('/contracts')} 
            className={`${isActive('/contracts') ? 'text-green-700 font-bold' : 'text-gray-400'} flex flex-col items-center text-xs`}
        >
            <i className="fa-solid fa-file-contract text-xl mb-1"></i>Contracts
        </button>
        
        <button 
            onClick={() => router.push('/profile')} 
            className={`${isActive('/profile') ? 'text-green-700 font-bold' : 'text-gray-400'} flex flex-col items-center text-xs`}
        >
            <i className="fa-solid fa-user text-xl mb-1"></i>Profile
        </button>
        
        <button 
            onClick={() => router.push('/contracts/new')} 
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white w-14 h-14 rounded-full shadow-lg border-4 border-gray-100 flex items-center justify-center"
        >
            <i className="fa-solid fa-plus text-xl"></i>
        </button>
    </nav>
  );
}
