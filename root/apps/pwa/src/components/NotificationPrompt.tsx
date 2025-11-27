'use client';

import { useState, useEffect } from 'react';
import { requestNotificationPermission, subscribeToPushNotifications } from '@/lib/pushNotifications';

export default function NotificationPrompt() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showPrompt, setShowPrompt] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    // Check current permission status
    if ('Notification' in window) {
      setPermission(Notification.permission);
      
      // Show prompt if permission not yet granted
      if (Notification.permission === 'default') {
        // Delay showing prompt to avoid overwhelming user immediately
        const timer = setTimeout(() => setShowPrompt(true), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleEnable = async () => {
    setIsSubscribing(true);
    try {
      const granted = await requestNotificationPermission();
      if (granted) {
        const userId = localStorage.getItem('krishi_userId');
        if (userId) {
          const success = await subscribeToPushNotifications(userId);
          if (success) {
            setPermission('granted');
            setShowPrompt(false);
          }
        }
      } else {
        setPermission('denied');
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember user dismissed (don't show again this session)
    sessionStorage.setItem('notif_prompt_dismissed', 'true');
  };

  // Don't show if already granted/denied or user dismissed
  if (permission !== 'default' || !showPrompt) return null;
  if (typeof window !== 'undefined' && sessionStorage.getItem('notif_prompt_dismissed')) return null;

  return (
    <div className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-down">
      <div className="bg-white rounded-2xl shadow-2xl border border-green-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔔</div>
            <div>
              <h3 className="font-bold text-lg">Stay Updated</h3>
              <p className="text-sm text-green-50">Get instant alerts on your contracts</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Contract acceptance notifications</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Price change alerts</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Delivery reminders</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDismiss}
              disabled={isSubscribing}
              className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors"
            >
              Not Now
            </button>
            <button
              onClick={handleEnable}
              disabled={isSubscribing}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-xl font-bold transition-all shadow-md"
            >
              {isSubscribing ? 'Enabling...' : 'Enable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
