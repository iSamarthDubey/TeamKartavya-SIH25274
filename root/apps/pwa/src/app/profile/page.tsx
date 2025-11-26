'use client';

import { useRouter } from "next/navigation";

const PROFILE_STORAGE_KEY = "kh_profile";
const ROLE_STORAGE_KEY = "kh_role";
const PHONE_STORAGE_KEY = "kh_phone";
const HOME_TUTORIAL_KEY = "kh_home_tutorial_seen";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
      window.localStorage.removeItem(ROLE_STORAGE_KEY);
      window.localStorage.removeItem(PHONE_STORAGE_KEY);
      window.localStorage.removeItem(HOME_TUTORIAL_KEY);
    }
    router.push('/splash');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm flex items-center gap-4 mb-4">
        <button onClick={() => router.push('/')} className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="font-bold text-lg">Profile</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold text-2xl">
                RK
            </div>
            <div>
                <h3 className="font-bold text-lg">Ram Kishan</h3>
                <p className="text-gray-500 text-sm">+91 98765 43210</p>
                <p className="text-gray-500 text-xs">Indore, MP</p>
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

