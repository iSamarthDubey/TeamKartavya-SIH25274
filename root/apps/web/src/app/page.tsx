import Link from "next/link";
import { ArrowRight, Shield, TrendingUp, Users, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-green-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold">
              <Shield size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Krishi Hedge</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-green-700 transition">Features</a>
            <a href="#how-it-works" className="hover:text-green-700 transition">How it Works</a>
            <a href="#team" className="hover:text-green-700 transition">Team</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href={process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3000"} className="text-sm font-semibold text-slate-600 hover:text-slate-900">
              Admin Login
            </Link>
            <Link 
              href={process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"} 
              className="bg-green-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-800 transition shadow-lg shadow-green-700/20"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-green-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live for SIH 2025 Prototype
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8">
            Smart Price Protection for <span className="text-green-700">Indian Farmers</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Secure your harvest's future with AI-driven price forecasting and direct buyer contracts. No more uncertainty, just guaranteed income.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href={process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"} 
              className="w-full sm:w-auto bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition shadow-xl shadow-green-700/20 flex items-center justify-center gap-2"
            >
              Get Started Now <ArrowRight size={20} />
            </Link>
            <Link 
              href="#docs" 
              className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition flex items-center justify-center gap-2"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Price Forecasting</h3>
              <p className="text-slate-600">Advanced ML models predict crop prices up to 6 months in advance, helping you decide when to sell.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Contracts</h3>
              <p className="text-slate-600">Lock in prices today with digital forward contracts. Guaranteed payment, zero market risk.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Direct Buyer Connect</h3>
              <p className="text-slate-600">Connect directly with corporate buyers and retailers. No middlemen, better margins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold">
              <Shield size={18} />
            </div>
            <span className="font-bold text-xl text-white">Krishi Hedge</span>
          </div>
          <div className="text-sm">
            © 2025 Team Kartavya. Built for Smart India Hackathon.
          </div>
        </div>
      </footer>
    </div>
  );
}
