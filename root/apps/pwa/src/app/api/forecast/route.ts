import { NextResponse } from "next/server";
import forecastData from "../../../data/forecast.json";

export async function GET() {
  try {
    return NextResponse.json(forecastData, { status: 200 });
  } catch (error) {
    console.error("Error reading forecast.json", error);
    return NextResponse.json({ error: "Unable to load forecast" }, { status: 500 });
  }
}

