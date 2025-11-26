'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PROFILE_STORAGE_KEY = "kh_profile";

interface LocalProfile {
  phone?: string;
  role?: "farmer" | "buyer";
  name?: string;
  village?: string;
  district?: string;
  state?: string;
}

export default function OnboardingBasicPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<LocalProfile>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) {
      try {
        setProfile(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
  }, []);

  function update<K extends keyof LocalProfile>(key: K, value: LocalProfile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  async function handleNext() {
    if (typeof window !== "undefined") {
      // Update profile with onboarded flag
      const updatedProfile = { ...profile, onboardingCompleted: true };
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
      
      // Save to database
      const userId = window.localStorage.getItem("kh_user_id");
      if (userId && profile.name && profile.district) {
        try {
          await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              name: profile.name,
              location: profile.district,
              crops: ['soybean'],
            }),
          });
        } catch (error) {
          console.error('Failed to save profile:', error);
        }
      }
    }
    router.push("/");
  }

  return (
    <div className="h-screen bg-white p-6">
      <div className="mt-4 mb-6">
        <h2 className="text-2xl font-bold text-green-800">Setup Profile</h2>
        <p className="text-gray-500 text-sm">Tell us about your farm.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-500">Full Name</label>
          <input 
            type="text" 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 mt-1" 
            value={profile.name || ""}
            placeholder="Enter your name"
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500">District</label>
          <select 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 mt-1"
            value={profile.district || ""}
            onChange={(e) => update("district", e.target.value)}
          >
            <option value="" disabled>Select District</option>
            <option>Indore, MP</option>
            <option>Dewas, MP</option>
            <option>Ujjain, MP</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500">Primary Crop</label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="border-2 border-yellow-500 bg-yellow-50 p-3 rounded-lg text-center cursor-pointer">
              <i className="fa-solid fa-leaf text-green-600 mb-1"></i>
              <div className="text-sm font-bold">Soybean</div>
            </div>
            <div className="border border-gray-200 p-3 rounded-lg text-center text-gray-400 cursor-pointer">
              <i className="fa-solid fa-seedling mb-1"></i>
              <div className="text-sm">Mustard</div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleNext} className="w-full bg-yellow-500 text-green-900 font-bold py-3 rounded-lg mt-8 shadow-md">
        Complete Setup
      </button>
    </div>
  );
}

