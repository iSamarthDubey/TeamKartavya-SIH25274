import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "..", "..", "..", "services", "ml", "forecast.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(raw);
    return NextResponse.json(json, { status: 200 });
  } catch (error) {
    console.error("Error reading forecast.json", error);
    return NextResponse.json({ error: "Unable to load forecast" }, { status: 500 });
  }
}

