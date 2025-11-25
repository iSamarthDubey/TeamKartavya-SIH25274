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

// TODO: Replace this with a real call to the ML service (services/ml) or backend API.
export async function getForecastSummary(): Promise<ForecastSummary> {
  // For now, return static data that matches the SIH story.
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

