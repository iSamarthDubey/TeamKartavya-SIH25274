import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../../../lib/supabaseServer";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = supabaseServer();
  const { error } = await supabase
    .from('contracts')
    .update({ status: 'MATCHED_WITH_BUYER_DEMO' })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id, status: 'MATCHED_WITH_BUYER_DEMO' }, { status: 200 });
}

