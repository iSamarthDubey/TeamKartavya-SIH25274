export default function PriceCard({ crop, subtitle, price, changePct }) {
  const positive = changePct >= 0;

  return (
    <div className="mt-3 flex items-center justify-between rounded-3xl bg-white shadow-md px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E6F6EA] text-2xl">
          🌱
        </div>
        <div>
          <div className="font-semibold text-[#111827]">{crop}</div>
          <div className="text-sm text-gray-500">{subtitle}</div>
        </div>
      </div>

      <div className="text-right">
        <div className="font-semibold text-[#111827]">
          ₹{price.toLocaleString("en-IN")}
        </div>
        <div className="mt-1 flex items-center justify-end gap-1 text-xs">
          <span className={positive ? "text-emerald-600" : "text-red-500"}>
            {positive ? "▲" : "▼"} {changePct.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
