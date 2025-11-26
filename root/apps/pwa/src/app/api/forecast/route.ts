import { NextResponse } from "next/server";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

export async function GET() {
  try {
    // Call the Python ML service
    const response = await fetch(`${ML_SERVICE_URL}/forecast?crop=soybean`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add a timeout to prevent hanging
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`ML service returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching forecast from ML service:", error);
    
    // Fallback to static data if ML service is unavailable
    const fallbackData = {
      crop: "Soybean",
      generated_at: new Date().toISOString(),
      current_price: 4250,
      horizons: [
        { days: 7, yhat: 4260, lower: 4100, upper: 4400, summary: "Stable" },
        { days: 30, yhat: 4590, lower: 4200, upper: 4800, summary: "Slight up" },
        { days: 90, yhat: 4550, lower: 3800, upper: 5100, summary: "Uncertain" }
      ],
      model_version: "fallback-static-1.0"
    };
    
    return NextResponse.json(fallbackData, { status: 200 });
  }
}

