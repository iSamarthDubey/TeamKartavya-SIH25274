import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// Stub endpoint: in a real backend, generate a PDF from the contract data and return its URL.
// For now we just return a static sample PDF under /public and persist pdf_url.

export async function POST(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const pdfUrl = "/sample-contract.pdf";

  const supabase = supabaseServer();
  await supabase
    .from("contracts")
    .update({ pdf_url: pdfUrl })
    .eq("id", id);

  return NextResponse.json({ id, pdfUrl }, { status: 200 });
}

