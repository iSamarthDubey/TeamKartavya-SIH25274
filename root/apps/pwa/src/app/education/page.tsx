import Link from "next/link";

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm mb-4">
        <h1 className="text-xl font-bold text-green-800">Education Center</h1>
        <p className="text-xs text-gray-500">Short lessons in simple Hindi & English</p>
      </div>

      <div className="p-4 space-y-4">
        <Link href="/education/hedging" className="block bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">What is hedging?</h3>
              <p className="text-sm text-gray-500 mt-1">How a forward contract protects your price</p>
            </div>
            <i className="fa-solid fa-shield-alt text-yellow-500 text-xl"></i>
          </div>
        </Link>

        <Link href="/education/forecast" className="block bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">How to read our forecast</h3>
              <p className="text-sm text-gray-500 mt-1">Understanding bands and uncertainty</p>
            </div>
            <i className="fa-solid fa-chart-line text-green-500 text-xl"></i>
          </div>
        </Link>
      </div>
    </div>
  );
}
