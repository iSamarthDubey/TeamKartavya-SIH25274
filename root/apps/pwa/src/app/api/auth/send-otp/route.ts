import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone || phone.length < 10) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    const supabase = supabaseServer();
    
    // Check if user exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .single();

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

    if (existingUser) {
      // Update existing user's OTP
      await supabase
        .from("users")
        .update({ otp, otp_expires_at: expiresAt })
        .eq("phone", phone);
    } else {
      // Create new user
      await supabase.from("users").insert({
        phone,
        otp,
        otp_expires_at: expiresAt,
        role: "farmer", // Default role
        created_at: new Date().toISOString(),
      });
    }

    // TODO: In production, send OTP via SMS (Twilio, etc.)
    console.log(`[AUTH] OTP for ${phone}: ${otp}`);

    return NextResponse.json({ 
      success: true, 
      message: "OTP sent successfully",
      // Remove in production! Only for demo
      otp: process.env.NODE_ENV === "development" ? otp : undefined
    });
  } catch (error: any) {
    console.error("[AUTH] Send OTP error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
