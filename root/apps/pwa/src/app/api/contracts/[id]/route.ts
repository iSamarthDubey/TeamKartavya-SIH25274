import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../../lib/supabaseServer";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { params } = await context;
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
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

  return NextResponse.json(contract, { status: 200 });
}
