import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP required" }, { status: 400 });
    }

    const supabase = supabaseServer();
    
    // Get user with OTP
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check OTP expiry
    const otpExpiry = new Date(user.otp_expires_at);
    if (otpExpiry < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Clear OTP after successful verification
    await supabase
      .from("users")
      .update({ otp: null, otp_expires_at: null })
      .eq("phone", phone);

    // Return user session data
    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
        name: user.name,
        onboarded: user.onboarded || false
      }
    });
  } catch (error: any) {
    console.error("[AUTH] Verify OTP error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
