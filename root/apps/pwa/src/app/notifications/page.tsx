'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNotifications, markAsRead, type Notification } from "@/lib/notifications";

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      // Get user ID from localStorage
      const profileRaw = localStorage.getItem('kh_profile');
      if (!profileRaw) {
        router.push('/auth/login');
        return;
      }
      const profile = JSON.parse(profileRaw);
      
      const data = await getNotifications(profile.phone);
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkAsRead(notificationId: string) {
    const success = await markAsRead(notificationId);
    if (success) {
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    }
  }

  function getIcon(type: Notification['type']) {
    switch (type) {
      case 'contract': return '📝';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'price_alert': return '📈';
      default: return '🔔';
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm flex items-center gap-4 mb-4">
        <button onClick={() => router.push('/')} className="text-gray-600">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="font-bold text-lg">Notifications</h2>
      </div>

      <div className="p-4 space-y-3">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <div className="text-4xl mb-2">🔔</div>
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              onClick={() => {
                if (!notification.read) {
                  handleMarkAsRead(notification.id);
                }
                // Navigate if it's a contract notification
                if (notification.type === 'contract' && notification.metadata?.contractId) {
                  router.push(`/contracts/${notification.metadata.contractId}`);
                }
              }}
              className={`bg-white p-4 rounded-xl shadow-sm border-l-4 cursor-pointer ${
                notification.read ? 'border-gray-200 opacity-75' : 'border-green-500'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-800">{notification.title}</h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(notification.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
