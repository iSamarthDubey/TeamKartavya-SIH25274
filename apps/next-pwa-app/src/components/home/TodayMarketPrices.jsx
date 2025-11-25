import PriceCard from "./PriceCard";

const mockPrices = [
  { crop: "Soybean", subtitle: "सोयाबीन", price: 4850, changePct: 2.5 },
  { crop: "Groundnut", subtitle: "मूंगफली", price: 5200, changePct: 1.8 },
  { crop: "Mustard", subtitle: "सरसों", price: 5650, changePct: 1.2 },
];

export default function TodayMarketPrices() {
  return (
    <section className="mt-7 pb-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#111827]">
          Today's Market Prices
        </h2>
        <button className="text-sm font-medium text-[#22A34C]">
          View All →
        </button>
      </div>

      {mockPrices.map((p) => (
        <PriceCard key={p.crop} {...p} />
      ))}
    </section>
  );
}
