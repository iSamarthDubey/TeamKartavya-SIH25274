'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PROFILE_STORAGE_KEY = "kh_profile";
const ROLE_STORAGE_KEY = "kh_role";

export function StartupGate() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function checkOnboardingStatus() {
      const role = window.localStorage.getItem(ROLE_STORAGE_KEY);
      const userId = window.localStorage.getItem("kh_user_id");
      const rawProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      let onboardingCompleted = false;

      // Check localStorage first
      if (rawProfile) {
        try {
          const parsed = JSON.parse(rawProfile) as { onboardingCompleted?: boolean };
          onboardingCompleted = !!parsed.onboardingCompleted;
        } catch {
          onboardingCompleted = false;
        }
      }

      // If we have userId, also check database for most recent status
      if (userId) {
        try {
          const response = await fetch(`/api/profile?userId=${userId}`);
          if (response.ok) {
            const userData = await response.json();
            if (userData.onboarded !== undefined) {
              onboardingCompleted = userData.onboarded;
              // Update localStorage with fresh data
              if (rawProfile) {
                const parsed = JSON.parse(rawProfile);
                parsed.onboardingCompleted = userData.onboarded;
                window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(parsed));
              }
            }
          }
        } catch (error) {
          console.error('Failed to check onboarding status:', error);
        }
      }

      // If we don't know the role yet, start at splash.
      if (!role) {
        router.replace("/splash");
        setChecking(false);
        return;
      }

      // If role is set but onboarding not completed, resume role-specific onboarding.
      if (!onboardingCompleted) {
        if (role === "buyer") {
          router.replace("/onboarding/buyer/business");
        } else {
          router.replace("/onboarding/basic");
        }
        setChecking(false);
        return;
      }

      // If buyer onboarding is done, send directly to buyer home shell.
      if (role === "buyer") {
        router.replace("/buyer/home");
      }
      setChecking(false);
    }

    checkOnboardingStatus();
  }, [router]);

  // Show nothing while checking
  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}

