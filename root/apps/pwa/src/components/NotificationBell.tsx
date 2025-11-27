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
      className="relative"
    >
      <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
        <i className="fa-solid fa-bell text-white text-lg"></i>
      </div>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-yellow-400 text-green-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}
