"use client";

import MainScreenLayout from "@/components/MainScreenLayout";
import HomeHeader from "@/components/home/HomeHeader";
import ForecastBanner from "@/components/home/ForecastBanner";
import QuickActions from "@/components/home/QuickActions";
import TodayMarketPrices from "@/components/home/TodayMarketPrices";

export default function HomePage() {
  return (
    <MainScreenLayout>
      {/* Top greeting & live price */}
      <HomeHeader />

      {/* AI Prediction card sitting below the header */}
      <div className="px-1 -mt-4">
        <ForecastBanner />
      </div>

      {/* Scrollable content below */}
      <QuickActions />
      <TodayMarketPrices />
    </MainScreenLayout>
  );
}
