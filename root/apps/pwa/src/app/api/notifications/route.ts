import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const supabase = supabaseServer();
    
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("[NOTIFICATIONS] GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, title, message, type, metadata } = await req.json();

    if (!userId || !title || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = supabaseServer();
    
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        title,
        message,
        type: type || "info",
        metadata: metadata || {},
        read: false,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[NOTIFICATIONS] POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Mark notification as read
export async function PATCH(req: NextRequest) {
  try {
    const { notificationId } = await req.json();

    if (!notificationId) {
      return NextResponse.json({ error: "Notification ID required" }, { status: 400 });
    }

    const supabase = supabaseServer();
    
    const { error } = await supabase
      .from("notifications")
      .update({ read: true, read_at: new Date().toISOString() })
      .eq("id", notificationId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[NOTIFICATIONS] PATCH error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
