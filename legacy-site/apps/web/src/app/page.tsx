export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🌾 Krishi Hedge
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-Powered Oilseed Price Risk Management Platform
        </p>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            Smart India Hackathon 2025
          </h2>
          <p className="text-gray-700 mb-4">
            Problem Statement ID: 25274
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">For Farmers 📱</h3>
              <p className="text-green-600 text-sm">Mobile app for hedging and risk management</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">For FPOs 💼</h3>
              <p className="text-blue-600 text-sm">Web dashboard for contract management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
