import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { sendNotification } from "@/lib/notifications";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { buyerId } = body || {};

    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from('contracts')
      .update({ 
        status: 'ACCEPTED',
        buyer_id: buyerId,
        accepted_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send notification to farmer
    if (data.farmer_id) {
      // In-app notification
      await sendNotification(
        data.farmer_id,
        'Contract Accepted! 🎉',
        `A buyer has accepted your ${data.crop} contract for ${data.quantity} ${data.unit} at ₹${data.strike_price}/${data.unit}.`,
        'contract',
        { contractId: data.id, buyerId }
      );

      // Push notification
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/push/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: data.farmer_id,
            title: 'Contract Accepted! 🎉',
            message: `A buyer accepted your ${data.crop} contract for ${data.quantity} ${data.unit} at ₹${data.strike_price}/${data.unit}.`,
            url: `/contracts/${data.id}`,
            requireInteraction: true,
          }),
        });
      } catch (pushError) {
        console.error('[PUSH] Failed to send push notification:', pushError);
        // Don't fail the request if push fails
      }
    }

    return NextResponse.json({ 
      success: true,
      contract: {
        id: data.id,
        status: data.status,
        buyerId: data.buyer_id
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error("[CONTRACT] Accept error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

