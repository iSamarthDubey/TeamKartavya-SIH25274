import { NextResponse } from "next/server";
import dummyContracts from "@/data/dummyContracts";

export async function GET() {
  return NextResponse.json(dummyContracts);
}

