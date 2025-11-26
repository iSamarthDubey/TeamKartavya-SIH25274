'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PROFILE_STORAGE_KEY = "kh_profile";
const ROLE_STORAGE_KEY = "kh_role";
const PHONE_STORAGE_KEY = "kh_phone";
const HOME_TUTORIAL_KEY = "kh_home_tutorial_seen";
const BANK_STORAGE_KEY = "kh_bank";

export default function ProfilePage() {
  const router = useRouter();
  const [isBuyer, setIsBuyer] = useState(false);
  const [profile, setProfile] = useState<any>({
    name: "Loading...",
    phone: "...",
    district: "..."
  });
  const [bank, setBank] = useState<any>(null);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [bankForm, setBankForm] = useState({ account: "", ifsc: "" });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if buyer
      const buyerProfile = window.localStorage.getItem("kh_buyer_profile");
      if (buyerProfile) {
        setIsBuyer(true);
        const p = JSON.parse(buyerProfile);
        setProfile({
          name: p.name || "Institutional Buyer",
          phone: "Corporate Account",
          district: p.type || "Institutional"
        });
        return;
      }

      const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      const phone = window.localStorage.getItem(PHONE_STORAGE_KEY);
      const storedBank = window.localStorage.getItem(BANK_STORAGE_KEY);
      
      if (storedBank) setBank(JSON.parse(storedBank));

      if (stored) {
        const p = JSON.parse(stored);
        setProfile({
          name: p.name || "Farmer",
          phone: p.phone || phone || "Not set",
          district: p.district || "Not set"
        });
      } else {
        setProfile({
          name: "Guest Farmer",
          phone: phone || "Not set",
          district: "India"
        });
      }
    }
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      router.replace('/splash');
    }
  };

  if (isBuyer) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        <div className="bg-slate-900 p-6 text-white shadow-lg mb-6">
          <h1 className="text-2xl font-bold">Corporate Profile</h1>
          <p className="text-slate-400 text-sm">Manage organization settings</p>
        </div>

        <div className="px-4 space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 text-2xl font-bold">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{profile.name}</h2>
                <p className="text-slate-500 text-sm">{profile.district}</p>
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Account Type</span>
                <span className="font-bold text-slate-800">Corporate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">KYC Status</span>
                <span className="font-bold text-green-600 flex items-center gap-1">
                  <i className="fa-solid fa-check-circle"></i> Verified
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">Settings</h3>
            <button onClick={handleLogout} className="w-full text-left py-3 text-red-600 font-bold flex items-center gap-2">
              <i className="fa-solid fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  const saveBank = () => {
    if (!bankForm.account || !bankForm.ifsc) return alert("Please fill all fields");
    const newBank = { ...bankForm, verified: true };
    setBank(newBank);
    localStorage.setItem(BANK_STORAGE_KEY, JSON.stringify(newBank));
    setIsEditingBank(false);
  };

  // handleLogout is already defined above for Buyer, reusing logic here would be cleaner but for now let's just remove the duplicate declaration and use the one that clears everything.
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm flex items-center gap-4 mb-4">
        <button onClick={() => router.push('/')} className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="font-bold text-lg">Profile</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 relative">
            <button 
                onClick={() => router.push('/onboarding/basic')}
                className="absolute top-4 right-4 text-green-600 text-sm font-bold"
            >
                Edit
            </button>
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold text-2xl">
                {profile.name.charAt(0)}
            </div>
            <div>
                <h3 className="font-bold text-lg">{profile.name}</h3>
                <p className="text-gray-500 text-sm">+91 {profile.phone}</p>
                <p className="text-gray-500 text-xs">{profile.district}</p>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">Bank Details</h3>
                {bank ? (
                  <div>
                    <p className="font-bold text-gray-800">{bank.account}</p>
                    <p className="text-xs text-gray-500">{bank.ifsc}</p>
                    <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded mt-1 inline-block">
                      <i className="fa-solid fa-check-circle mr-1"></i> Verified
                    </span>
                    <button onClick={() => { setBank(null); localStorage.removeItem(BANK_STORAGE_KEY); }} className="block text-red-500 text-xs mt-2">Remove</button>
                  </div>
                ) : isEditingBank ? (
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Account Number" 
                      className="w-full border p-2 rounded text-sm"
                      value={bankForm.account}
                      onChange={e => setBankForm({...bankForm, account: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="IFSC Code" 
                      className="w-full border p-2 rounded text-sm"
                      value={bankForm.ifsc}
                      onChange={e => setBankForm({...bankForm, ifsc: e.target.value})}
                    />
                    <div className="flex gap-2">
                      <button onClick={saveBank} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Save</button>
                      <button onClick={() => setIsEditingBank(false)} className="text-gray-500 text-sm">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">No bank account linked</p>
                    <button onClick={() => setIsEditingBank(true)} className="text-green-600 text-xs font-bold mt-2">+ Add Bank Account</button>
                  </>
                )}
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button className="w-full p-4 text-left border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-700"><i className="fa-solid fa-language w-8 text-gray-400"></i> Language</span>
                <span className="text-gray-400 text-sm">English <i className="fa-solid fa-chevron-right ml-2"></i></span>
            </button>
            <button className="w-full p-4 text-left border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-700"><i className="fa-solid fa-bell w-8 text-gray-400"></i> Notifications</span>
                <div className="w-10 h-5 bg-green-500 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
            </button>
            <button onClick={handleLogout} className="w-full p-4 text-left flex justify-between items-center text-red-500">
                <span className="font-bold"><i className="fa-solid fa-sign-out-alt w-8"></i> Logout</span>
            </button>
        </div>
      </div>
    </div>
  );
}

