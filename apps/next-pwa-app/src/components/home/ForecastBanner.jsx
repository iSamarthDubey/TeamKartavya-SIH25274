export default function ForecastBanner() {
  return (
    <section className="-mt-4 rounded-3xl bg-[#FACC15] px-5 py-4 text-[#111827] shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold">AI Forecast</p>
          <p className="text-xs text-gray-700">7-Day Prediction</p>
        </div>
        <span className="rounded-full bg-[#D8F5DF] px-3 py-1 text-xs font-medium text-emerald-700">
          Low Risk
        </span>
      </div>

      <p className="mt-3 text-sm">
        Expected:{" "}
        <span className="font-semibold">₹4,950 - ₹5,100</span>
      </p>
    </section>
  );
}
