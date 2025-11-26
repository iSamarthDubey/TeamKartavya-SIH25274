'use client';

import { useEffect, useState } from "react";
import { getNotifications, getUnreadCount } from "@/lib/notifications";
import { useRouter } from "next/navigation";

export function NotificationBell() {
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadUnreadCount();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  async function loadUnreadCount() {
    try {
      const profileRaw = localStorage.getItem('kh_profile');
      if (!profileRaw) return;
      
      const profile = JSON.parse(profileRaw);
      const notifications = await getNotifications(profile.phone);
      setUnreadCount(getUnreadCount(notifications));
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }

  return (
    <button
      onClick={() => router.push('/notifications')}
      className="relative p-2 text-gray-600 hover:text-gray-800"
    >
      <i className="fa-solid fa-bell text-xl"></i>
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}
