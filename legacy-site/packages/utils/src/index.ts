import type { 
  OilseedType, 
  HedgeCalculationInput, 
  HedgeCalculationResult,
  PriceData,
  RiskMetrics 
} from '@kartavya/types';

// Date utilities
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getDaysUntil = (date: Date): number => {
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Currency formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPrice = (price: number, unit: string = 'quintal'): string => {
  return `${formatCurrency(price)}/${unit}`;
};

// Percentage formatting
export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

// Hedging calculations
export const calculateHedgeRatio = (
  portfolioVolatility: number,
  hedgeVolatility: number,
  correlation: number
): number => {
  if (hedgeVolatility === 0) return 0;
  return (portfolioVolatility * correlation) / hedgeVolatility;
};

export const calculateOptimalHedge = (
  input: HedgeCalculationInput
): HedgeCalculationResult => {
  const { quantity, currentPrice, targetPrice, timeHorizon } = input;
  
  // Simple hedging calculation for prototype
  const priceDiff = targetPrice - currentPrice;
  const riskExposure = quantity * Math.abs(priceDiff);
  
  // Recommend 70-80% hedge ratio for most scenarios
  const recommendedHedgeRatio = 0.75;
  
  const hedgedQuantity = quantity * recommendedHedgeRatio;
  const expectedProfitLoss = hedgedQuantity * priceDiff;
  
  // Simple cost calculation (0.5% of hedged value)
  const cost = hedgedQuantity * currentPrice * 0.005;
  
  const riskReduction = riskExposure * recommendedHedgeRatio;
  const breakEvenPrice = currentPrice + (cost / hedgedQuantity);
  
  return {
    recommendedHedgeRatio,
    expectedProfitLoss: expectedProfitLoss - cost,
    riskReduction,
    cost,
    breakEvenPrice
  };
};

// Price analysis utilities
export const calculateVolatility = (prices: number[]): number => {
  if (prices.length < 2) return 0;
  
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
  }
  
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
  
  return Math.sqrt(variance) * Math.sqrt(252); // Annualized volatility
};

export const calculatePriceChange = (current: number, previous: number): {
  absolute: number;
  percentage: number;
} => {
  const absolute = current - previous;
  const percentage = previous !== 0 ? absolute / previous : 0;
  
  return { absolute, percentage };
};

export const getPriceTrend = (prices: PriceData[]): 'bullish' | 'bearish' | 'neutral' => {
  if (prices.length < 2) return 'neutral';
  
  const recent = prices.slice(-5); // Last 5 data points
  let upCount = 0;
  let downCount = 0;
  
  for (let i = 1; i < recent.length; i++) {
    if (recent[i].price > recent[i - 1].price) upCount++;
    else if (recent[i].price < recent[i - 1].price) downCount++;
  }
  
  if (upCount > downCount) return 'bullish';
  if (downCount > upCount) return 'bearish';
  return 'neutral';
};

// Risk calculations
export const calculateValueAtRisk = (
  portfolioValue: number,
  volatility: number,
  confidenceLevel: number = 0.95
): number => {
  // Simple VaR calculation using normal distribution
  // For 95% confidence level, z-score is approximately 1.645
  const zScore = confidenceLevel === 0.95 ? 1.645 : 2.33;
  return portfolioValue * volatility * zScore / Math.sqrt(252);
};

export const calculateSharpeRatio = (
  returns: number[],
  riskFreeRate: number = 0.06
): number => {
  if (returns.length === 0) return 0;
  
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const excessReturn = avgReturn - riskFreeRate / 252; // Daily risk-free rate
  
  const variance = returns.reduce((sum, r) => 
    sum + Math.pow(r - avgReturn, 2), 0) / (returns.length - 1);
  const stdDev = Math.sqrt(variance);
  
  return stdDev !== 0 ? excessReturn / stdDev : 0;
};

// Commodity utilities
export const getCommodityDisplayName = (commodity: OilseedType): string => {
  const names: Record<OilseedType, string> = {
    mustard: 'Mustard Seed',
    groundnut: 'Groundnut',
    soybean: 'Soybean',
    sunflower: 'Sunflower',
    sesame: 'Sesame'
  };
  return names[commodity];
};

export const getCommodityUnit = (commodity: OilseedType): 'quintal' | 'ton' => {
  // Most oilseeds traded in quintals in Indian markets
  return 'quintal';
};

// Validation utilities
export const isValidPrice = (price: number): boolean => {
  return price > 0 && price < 100000; // Reasonable price range
};

export const isValidQuantity = (quantity: number): boolean => {
  return quantity > 0 && quantity < 10000; // Reasonable quantity range
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Array utilities
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const groupBy = <T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

// Debounce utility for search inputs
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

// Color utilities for UI
export const getPriceChangeColor = (change: number): string => {
  if (change > 0) return 'text-green-600';
  if (change < 0) return 'text-red-600';
  return 'text-gray-600';
};

export const getRiskLevelColor = (risk: 'low' | 'medium' | 'high'): string => {
  switch (risk) {
    case 'low': return 'text-green-600';
    case 'medium': return 'text-yellow-600';
    case 'high': return 'text-red-600';
    default: return 'text-gray-600';
  }
};
