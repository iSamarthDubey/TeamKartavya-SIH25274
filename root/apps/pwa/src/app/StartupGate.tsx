'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PROFILE_STORAGE_KEY = "kh_profile";
const ROLE_STORAGE_KEY = "kh_role";

export function StartupGate() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const role = window.localStorage.getItem(ROLE_STORAGE_KEY);
    const rawProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    let onboardingCompleted = false;

    if (rawProfile) {
      try {
        const parsed = JSON.parse(rawProfile) as { onboardingCompleted?: boolean };
        onboardingCompleted = !!parsed.onboardingCompleted;
      } catch {
        onboardingCompleted = false;
      }
    }

    // If we don't know the role yet, start at splash.
    if (!role) {
      router.replace("/splash");
      return;
    }

    // If role is set but onboarding not completed, resume role-specific onboarding.
    if (!onboardingCompleted) {
      if (role === "buyer") {
        router.replace("/onboarding/buyer/business");
      } else {
        router.replace("/onboarding/basic");
      }
      return;
    }

    // If buyer onboarding is done, send directly to buyer home shell.
    if (role === "buyer") {
      router.replace("/buyer/home");
    }
  }, [router]);

  // This component only handles redirects; it renders nothing.
  return null;
}

