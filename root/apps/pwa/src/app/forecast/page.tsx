'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForecastPage() {
  const router = useRouter();
  const [forecast, setForecast] = useState<any>(null);
  const [horizon, setHorizon] = useState(30);

  useEffect(() => {
    fetch('/api/forecast')
      .then(res => res.json())
      .then(data => setForecast(data))
      .catch(console.error);
  }, []);

  const currentHorizon = forecast?.horizons?.find((h: any) => h.days === horizon);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-white p-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-40">
        <button onClick={() => router.push('/')} className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="font-bold text-lg">Price Forecast</h2>
      </div>
      
      <div className="p-4">
        <div className="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
               <i className="fa-solid fa-filter text-gray-400"></i>
               <span className="font-bold text-sm">{forecast?.crop || 'Soybean'}</span>
          </div>
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            {[7, 30, 90].map(d => (
              <button 
                key={d}
                onClick={() => setHorizon(d)}
                className={`px-3 py-1 text-xs rounded ${horizon === d ? 'bg-blue-100 text-blue-700 font-bold' : 'text-gray-500'}`}
              >
                {d}D
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-2 h-64 relative mb-4 flex items-center justify-center">
             <div className="w-full h-full p-4 relative">
                <div className="absolute bottom-10 left-0 w-full h-px bg-gray-300"></div> <div className="absolute top-0 left-10 w-px h-full bg-gray-300"></div> 
                
                {/* Dynamic Chart Line */}
                <svg className="w-full h-full overflow-visible">
                    {/* Simple visualization: Start at current price (left), End at predicted (right) */}
                    <path 
                      d={`M40,150 Q150,${currentHorizon?.yhat > (forecast?.current_price || 4250) ? 100 : 200} 300,${currentHorizon?.yhat > (forecast?.current_price || 4250) ? 120 : 180}`} 
                      fill="none" 
                      stroke={currentHorizon?.yhat > (forecast?.current_price || 4250) ? "#15803D" : "#EF4444"} 
                      strokeWidth="3" 
                    />
                    <circle cx="40" cy="150" r="4" fill="#6B7280" /> 
                    <circle cx="300" cy={currentHorizon?.yhat > (forecast?.current_price || 4250) ? "120" : "180"} r="4" fill={currentHorizon?.yhat > (forecast?.current_price || 4250) ? "#15803D" : "#EF4444"} /> 
                </svg>

                <div className="absolute top-10 right-0 bg-white shadow p-2 rounded text-xs border border-gray-100">
                    <span className="block text-gray-400">Predicted ({horizon} Days)</span>
                    <span className={`block font-bold ${currentHorizon?.yhat > (forecast?.current_price || 4250) ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{currentHorizon?.yhat || '...'} {currentHorizon?.yhat > (forecast?.current_price || 4250) ? '▲' : '▼'}
                    </span>
                </div>
                <div className="absolute bottom-10 left-10 bg-white shadow p-1 rounded text-[10px] border border-gray-100">
                    Current: ₹{forecast?.current_price}
                </div>
             </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <h4 className="font-bold text-blue-900 text-sm mb-1">AI Insight ({horizon} Days)</h4>
          <p className="text-xs text-blue-800 leading-relaxed">
            {currentHorizon?.summary || 'Loading forecast...'}
            <br/><br/>
            <strong>Range:</strong> ₹{currentHorizon?.lower} - ₹{currentHorizon?.upper}
          </p>
        </div>

        <button onClick={() => router.push('/contracts/new')} className="w-full bg-yellow-500 text-green-900 font-bold py-4 rounded-xl shadow-md mt-6">
          Create Forward Contract
        </button>
      </div>
    </div>
  );
}

