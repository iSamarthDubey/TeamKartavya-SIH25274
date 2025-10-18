import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import './global.css';

export default function App() {
  return (
    <View className="flex-1 bg-krishi-light">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-krishi-green pt-12 pb-6 px-4">
        <Text className="text-white text-2xl font-bold text-center">
          🌾 Krishi Hedge
        </Text>
        <Text className="text-white text-sm text-center mt-1">
          Smart Oilseed Price Risk Management
        </Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Welcome Card */}
        <View className="bg-white rounded-lg p-6 mb-4 shadow-sm border border-gray-100">
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Welcome to Krishi Hedge
          </Text>
          <Text className="text-gray-600 mb-4">
            Protect your oilseed investments with AI-powered price predictions and smart hedging strategies.
          </Text>
        </View>

        {/* Feature Cards */}
        <View className="space-y-4">
          <TouchableOpacity className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <Text className="text-lg font-medium text-gray-800 mb-2">📈 Price Predictions</Text>
            <Text className="text-gray-600 text-sm">
              AI-powered forecasts for major oilseeds
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <Text className="text-lg font-medium text-gray-800 mb-2">🛡️ Hedging Strategies</Text>
            <Text className="text-gray-600 text-sm">
              Personalized risk management solutions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <Text className="text-lg font-medium text-gray-800 mb-2">📊 Market Analytics</Text>
            <Text className="text-gray-600 text-sm">
              Real-time insights and market trends
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-krishi-green rounded-lg p-4">
            <Text className="text-white text-center text-lg font-semibold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
