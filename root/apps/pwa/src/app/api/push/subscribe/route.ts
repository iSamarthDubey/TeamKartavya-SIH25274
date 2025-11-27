import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

// Store push subscription for a user
export async function POST(req: NextRequest) {
  try {
    const { userId, subscription } = await req.json();

    if (!userId || !subscription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = supabaseServer();

    // Store or update subscription in database
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        user_id: userId,
        subscription: subscription,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('[PUSH] Error saving subscription:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[PUSH] Exception:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Remove push subscription
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const supabase = supabaseServer();

    const { error } = await supabase
      .from('push_subscriptions')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('[PUSH] Error removing subscription:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[PUSH] Exception:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
