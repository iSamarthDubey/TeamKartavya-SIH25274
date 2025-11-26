import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// Stub endpoint: in a real backend, compute SHA-256 of the contract, push to IPFS,
// then anchor the IPFS CID / hash on Polygon testnet via ethers.js.
// For SIH demo, we return a fixed sample IPFS CID and testnet tx hash and persist them.

export async function POST(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  // Sample data - replace with real values later
  const ipfsCid = "bafybeigdyrztwexamplecid1234567890";
  const ipfsGatewayUrl = `https://ipfs.io/ipfs/${ipfsCid}`;

  const txHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd";
  const explorerUrl = `https://amoy.polygonscan.com/tx/${txHash}`;

  const supabase = supabaseServer();
  await supabase
    .from("contracts")
    .update({ anchor_tx_hash: txHash, anchor_explorer_url: explorerUrl })
    .eq("id", id);

  return NextResponse.json(
    {
      id,
      ipfsCid,
      ipfsGatewayUrl,
      txHash,
      explorerUrl,
    },
    { status: 200 },
  );
}

