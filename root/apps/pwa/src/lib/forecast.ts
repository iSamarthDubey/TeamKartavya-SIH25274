export type HorizonTrend = "up" | "down" | "flat" | "uncertain";

export interface HorizonForecast {
  label: string; // e.g. "7 days"
  trend: HorizonTrend;
  text: string; // short description, e.g. "Stable"
}

export interface ForecastSummary {
  cropName: string; // e.g. "Soybean (Indore Mandi)"
  currentPriceText: string; // e.g. "₹4,250 / quintal"
  changeText: string; // e.g. "+3.2% vs yesterday"
  mainSummary: string; // main sentence for 30 days
  rangeText: string; // e.g. "Range: ₹4,000 – ₹4,600"
  horizons: HorizonForecast[]; // 7 / 30 / 90 day summaries
}

// TODO: Replace this file-backed JSON with a real call to the ML service (services/ml).
export async function getForecastSummary(): Promise<ForecastSummary> {
  // For now, read the ML output JSON that lives in services/ml/forecast.json.
  // In production this would be served by a FastAPI/ML service or cached endpoint.
  const res = await fetch("http://localhost:3000/api/forecast", { cache: "no-store" }).catch(() => null);

  if (!res || !res.ok) {
    // Fallback to hardcoded values if API is unavailable.
    return {
      cropName: "Soybean (Indore Mandi)",
      currentPriceText: "₹4,250 / quintal",
      changeText: "+3.2% vs yesterday",
      mainSummary: "Model expects ~+8% in 30 days",
      rangeText: "Range: ₹4,000 – ₹4,600",
      horizons: [
        { label: "7 days", trend: "flat", text: "Stable" },
        { label: "30 days", trend: "up", text: "Slight up" },
        { label: "90 days", trend: "uncertain", text: "Uncertain" },
      ],
    };
  }

  const data = (await res.json()) as {
    crop: string;
    current_price: number;
    horizons: { days: number; yhat: number; lower: number; upper: number; summary: string }[];
  };

  const cropName = `${data.crop} (Indore Mandi)`;
  const currentPriceText = `₹${data.current_price.toLocaleString()} / quintal`;
  const changeText = "+3.2% vs yesterday"; // placeholder until we have history deltas

  const horizon30 = data.horizons.find((h) => h.days === 30) ?? data.horizons[0];
  const mainSummary = `Model expects ~${Math.round(
    ((horizon30.yhat - data.current_price) / data.current_price) * 100
  )}% in 30 days`;
  const rangeText = `Range: ₹${horizon30.lower.toLocaleString()} – ₹${horizon30.upper.toLocaleString()}`;

  const horizons: HorizonForecast[] = data.horizons.map((h) => ({
    label: `${h.days} days`,
    trend:
      h.summary.toLowerCase().includes("up") || h.yhat > data.current_price
        ? "up"
        : h.summary.toLowerCase().includes("down") || h.yhat < data.current_price
        ? "down"
        : h.summary.toLowerCase().includes("uncertain")
        ? "uncertain"
        : "flat",
    text: h.summary,
  }));

  return {
    cropName,
    currentPriceText,
    changeText,
    mainSummary,
    rangeText,
    horizons,
  };
}

