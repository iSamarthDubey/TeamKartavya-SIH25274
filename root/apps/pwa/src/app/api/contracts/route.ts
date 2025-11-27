import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const role = searchParams.get('role'); // 'farmer' or 'buyer'
    const userId = searchParams.get('userId');

    const supabase = supabaseServer();
    let query = supabase
      .from("contracts")
      .select("*")
      .order("created_at", { ascending: false });

    // Filter by role
    if (role === 'farmer' && userId) {
      query = query.eq('farmer_id', userId);
    } else if (role === 'buyer') {
      // Buyers see all available contracts OR contracts they've accepted
      query = query.or(`status.eq.CREATED,buyer_id.eq.${userId}`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const mapped = (data || []).map((row: any) => ({
      id: row.id,
      crop: row.crop,
      quantity: row.quantity,
      unit: row.unit,
      strikePrice: row.strike_price,
      deliveryWindow: row.deliverywindow,
      status: row.status,
      createdAt: row.created_at,
      farmerId: row.farmer_id,
      buyerId: row.buyer_id,
      pdfUrl: row.pdf_url,
      anchorTxHash: row.anchor_tx_hash,
      anchorExplorerUrl: row.anchor_explorer_url,
    }));

    return NextResponse.json(mapped, { status: 200 });
  } catch (error: any) {
    console.error("[CONTRACTS] GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { crop, quantity, unit, targetPrice, deliveryWindow, userId } = body || {};

    console.log('[CONTRACTS] POST request:', { crop, quantity, unit, targetPrice, deliveryWindow, userId });

    if (!crop || !quantity || !unit || !targetPrice || !deliveryWindow) {
      console.error('[CONTRACTS] Missing required fields:', { crop, quantity, unit, targetPrice, deliveryWindow });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = supabaseServer();
    const insertRow = {
      crop,
      quantity: Number(quantity),
      unit,
      strike_price: Number(targetPrice),
      deliverywindow: deliveryWindow,
      status: "CREATED",
      farmer_id: userId || null,
    };

    console.log('[CONTRACTS] Inserting:', insertRow);

    const { data, error } = await supabase
      .from("contracts")
      .insert(insertRow)
      .select("*")
      .single();

    if (error) {
      console.error('[CONTRACTS] Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('[CONTRACTS] Success:', data);

    const contract = {
      id: data.id,
      crop: data.crop,
      quantity: data.quantity,
      unit: data.unit,
      strikePrice: data.strike_price,
      deliveryWindow: data.deliverywindow,
      status: data.status,
      createdAt: data.created_at,
      pdfUrl: data.pdf_url,
      anchorTxHash: data.anchor_tx_hash,
      anchorExplorerUrl: data.anchor_explorer_url,
    };

    // Send in-app notification to farmer
    if (userId) {
      await supabase.from('notifications').insert({
        user_id: userId,
        title: 'Contract Created',
        message: `Your ${crop} contract for ${quantity} ${unit} has been created successfully.`,
        type: 'contract',
        read: false,
      });
    }

    return NextResponse.json(contract, { status: 201 });
  } catch (e: any) {
    console.error('[CONTRACTS] Exception:', e);
    return NextResponse.json({ error: e.message || "Invalid JSON" }, { status: 400 });
  }
}
