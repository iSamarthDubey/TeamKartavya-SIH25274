export default function HomeHeader() {
  // later you can pass these values as props from backend
  const userName = "Ramesh Kumar";
  const cropName = "Soybean / सोयाबीन";
  const livePrice = 4850;
  const changePct = 2.5;

  return (
    <section className="rounded-b-[36px] bg-gradient-to-b from-[#2BA55E] to-[#1E8748] px-5 pb-6 pt-8 text-white shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm opacity-90">Good Morning 🌾</p>
          <h1 className="mt-1 text-2xl font-semibold">{userName}</h1>
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/15">
          🔔
        </button>
      </div>

      {/* Live price card */}
      <div className="mt-6 rounded-3xl bg-white px-5 py-4 text-left text-[#111827] shadow-md">
        <p className="text-xs font-medium text-emerald-700">Live Market Price</p>

        <div className="mt-2 flex items-end justify-between">
          <div>
            <div className="text-3xl font-semibold">
              ₹{livePrice.toLocaleString("en-IN")}
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-emerald-600">
              <span>▲ +{changePct}%</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{cropName}</p>
          </div>
        </div>

        {/* thin line as in figma */}
        <div className="mt-3 h-[2px] rounded-full bg-[#2BA55E]/70" />
      </div>
    </section>
  );
}
