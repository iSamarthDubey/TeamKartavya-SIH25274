import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

// ML Service endpoint
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

export async function GET() {
  try {
    // 1️⃣ Try calling the ML Service first
    const response = await fetch(`${ML_SERVICE_URL}/forecast?crop=soybean`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000), // prevents hanging forever
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    }

    throw new Error(`ML service returned status ${response.status}`);
  } catch (mlError) {
    console.error("ML Service error, falling back:", mlError);

    // 2️⃣ Fallback → Load local forecast.json
    try {
      const filePath = path.join(
        process.cwd(),
        "..",
        "..",
        "services",
        "ml",
        "forecast.json"
      );
      const raw = await fs.readFile(filePath, "utf-8");
      const json = JSON.parse(raw);

      return NextResponse.json(json, { status: 200 });
    } catch (fileError) {
      console.error("Local JSON fallback failed:", fileError);
    }

    // 3️⃣ Fallback → Static data
    const fallbackData = {
      crop: "Soybean",
      generated_at: new Date().toISOString(),
      current_price: 4250,
      horizons: [
        { days: 7, yhat: 4260, lower: 4100, upper: 4400, summary: "Stable" },
        { days: 30, yhat: 4590, lower: 4200, upper: 4800, summary: "Slight up" },
        { days: 90, yhat: 4550, lower: 3800, upper: 5100, summary: "Uncertain" },
      ],
      model_version: "fallback-static-1.0",
    };

    return NextResponse.json(fallbackData, { status: 200 });
  }
}
