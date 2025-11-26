import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";

export async function GET() {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const mapped = (data || []).map((row: any) => ({
    id: row.id,
    crop: row.crop,
    quantity: row.quantity,
    unit: row.unit,
    strikePrice: row.strike_price,
    deliveryWindow: row.delivery_window,
    status: row.status,
    createdAt: row.created_at,
    pdfUrl: row.pdf_url,
    anchorTxHash: row.anchor_tx_hash,
    anchorExplorerUrl: row.anchor_explorer_url,
  }));

  return NextResponse.json(mapped, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { crop, quantity, unit, targetPrice, deliveryWindow } = body || {};

    if (!crop || !quantity || !unit || !targetPrice || !deliveryWindow) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = supabaseServer();
    const id = Date.now().toString();
    const insertRow = {
      id,
      crop,
      quantity: Number(quantity),
      unit,
      strike_price: Number(targetPrice),
      delivery_window: deliveryWindow,
      status: "CREATED",
    };

    const { data, error } = await supabase
      .from("contracts")
      .insert(insertRow)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const contract = {
      id: data.id,
      crop: data.crop,
      quantity: data.quantity,
      unit: data.unit,
      strikePrice: data.strike_price,
      deliveryWindow: data.delivery_window,
      status: data.status,
      createdAt: data.created_at,
      pdfUrl: data.pdf_url,
      anchorTxHash: data.anchor_tx_hash,
      anchorExplorerUrl: data.anchor_explorer_url,
    };

    return NextResponse.json(contract, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
