import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import webpush from 'web-push';

// Configure web-push with VAPID keys
// Generate keys with: npx web-push generate-vapid-keys
const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '';
const vapidEmail = process.env.VAPID_EMAIL || 'mailto:support@krishihedge.com';

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(vapidEmail, vapidPublicKey, vapidPrivateKey);
}

export async function POST(req: NextRequest) {
  try {
    const { userId, title, message, url, requireInteraction } = await req.json();

    if (!userId || !title || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = supabaseServer();

    // Get user's push subscriptions
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('subscription')
      .eq('user_id', userId);

    if (error) {
      console.error('[PUSH] Error fetching subscriptions:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ error: 'No push subscriptions found for user' }, { status: 404 });
    }

    // Prepare notification payload
    const payload = JSON.stringify({
      title,
      body: message,
      message,
      icon: '/icon.png',
      badge: '/icon.png',
      url: url || '/notifications',
      requireInteraction: requireInteraction || false,
      tag: `notification-${Date.now()}`,
    });

    // Send push notification to all user's devices
    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          const subscription = JSON.parse(sub.subscription);
          await webpush.sendNotification(subscription, payload);
          return { success: true };
        } catch (error: any) {
          console.error('[PUSH] Error sending to subscription:', error);
          
          // If subscription is invalid/expired, remove it
          if (error.statusCode === 410 || error.statusCode === 404) {
            await supabase
              .from('push_subscriptions')
              .delete()
              .eq('subscription', sub.subscription);
          }
          
          return { success: false, error: error.message };
        }
      })
    );

    const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    
    console.log(`[PUSH] Sent to ${successCount}/${results.length} devices`);

    return NextResponse.json({ 
      success: true, 
      sent: successCount,
      total: results.length 
    });
  } catch (error: any) {
    console.error('[PUSH] Exception:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
