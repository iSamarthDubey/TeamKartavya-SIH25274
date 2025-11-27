// Notification helper functions
const API_BASE = '';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'contract' | 'price_alert';
  metadata?: any;
  read: boolean;
  created_at: string;
  read_at?: string;
}

export async function sendNotification(
  userId: string,
  title: string,
  message: string,
  type: Notification['type'] = 'info',
  metadata?: any
): Promise<Notification | null> {
  try {
    const response = await fetch(`${API_BASE}/api/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, title, message, type, metadata }),
    });

    if (!response.ok) {
      console.error('Failed to send notification:', await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending notification:', error);
    return null;
  }
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  try {
    const response = await fetch(`${API_BASE}/api/notifications?userId=${userId}`);
    
    if (!response.ok) {
      console.error('Failed to fetch notifications');
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

export async function markAsRead(notificationId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/notifications`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificationId }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
}

export function getUnreadCount(notifications: Notification[]): number {
  return notifications.filter(n => !n.read).length;
}
