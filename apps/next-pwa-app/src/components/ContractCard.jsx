export default function ContractCard({ crop, id, quantity, price, date, status, statusColor }) {
  return (
    <div className="mt-4 rounded-3xl bg-white px-5 py-4 shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-inner text-2xl">
            🌾
          </div>
          <div>
            <div className="font-semibold text-[#111827]">{crop}</div>
            <div className="text-xs text-gray-500">ID: {id}</div>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium text-white ${statusColor}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-y-1 text-sm text-gray-600">
        <div>
          <div className="text-xs text-gray-400">Quantity</div>
          <div className="font-semibold text-[#111827]">{quantity}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Price</div>
          <div className="font-semibold text-[#111827]">₹{price.toLocaleString("en-IN")}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Date</div>
          <div className="font-semibold text-[#111827] whitespace-nowrap">{date}</div>
        </div>
      </div>
    </div>
  );
}
