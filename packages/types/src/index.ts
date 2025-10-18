// User and Authentication Types
export interface User {
  id: string;
  email?: string;
  phone?: string;
  name: string;
  role: UserRole;
  fpoId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'farmer' | 'fpo' | 'admin';

// Oilseed and Commodity Types
export type OilseedType = 'mustard' | 'groundnut' | 'soybean' | 'sunflower' | 'sesame';

export interface Commodity {
  id: string;
  name: string;
  type: OilseedType;
  unit: 'quintal' | 'ton';
  description?: string;
}

// Price and Market Data Types
export interface PriceData {
  id: string;
  commodityId: string;
  commodity: OilseedType;
  price: number;
  market: string;
  date: Date;
  source: 'agmarknet' | 'ncdex' | 'manual';
  priceType: 'spot' | 'futures';
}

export interface PriceForecast {
  commodity: OilseedType;
  predictions: {
    date: Date;
    predictedPrice: number;
    confidence: number;
    upperBound: number;
    lowerBound: number;
  }[];
  volatility: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  accuracy: number;
}

// Hedging and Contract Types
export interface HedgePosition {
  id: string;
  farmerId: string;
  commodity: OilseedType;
  quantity: number;
  hedgePrice: number;
  currentPrice: number;
  profitLoss: number;
  hedgeRatio: number;
  status: 'active' | 'settled' | 'expired';
  createdAt: Date;
  expiryDate: Date;
}

export interface ForwardContract {
  id: string;
  farmerId: string;
  fpoId: string;
  commodity: OilseedType;
  quantity: number;
  agreedPrice: number;
  deliveryDate: Date;
  contractHash?: string;
  status: 'pending' | 'approved' | 'active' | 'delivered' | 'cancelled';
  terms: string;
  createdAt: Date;
  updatedAt: Date;
}

// Risk Management Types
export interface RiskMetrics {
  portfolioValue: number;
  valueAtRisk: number;
  expectedShortfall: number;
  volatility: number;
  beta: number;
  sharpeRatio?: number;
}

export interface MarketAlert {
  id: string;
  userId: string;
  commodity: OilseedType;
  alertType: 'price_threshold' | 'volatility' | 'news' | 'contract_expiry';
  message: string;
  threshold?: number;
  isRead: boolean;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface HedgeCalculationInput {
  commodity: OilseedType;
  quantity: number;
  currentPrice: number;
  targetPrice: number;
  timeHorizon: number; // days
}

export interface HedgeCalculationResult {
  recommendedHedgeRatio: number;
  expectedProfitLoss: number;
  riskReduction: number;
  cost: number;
  breakEvenPrice: number;
}

// Educational Content Types
export interface EducationalModule {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
  category: 'hedging' | 'market-analysis' | 'risk-management' | 'contracts';
  completedBy: string[]; // user IDs
}

// Socket Events
export interface SocketEvents {
  price_update: PriceData;
  hedge_notification: {
    userId: string;
    message: string;
    type: 'profit' | 'loss' | 'expiry_warning';
  };
  contract_update: {
    contractId: string;
    status: ForwardContract['status'];
    message: string;
  };
  market_alert: MarketAlert;
}

// Database Models (for API)
export interface DatabaseUser extends Omit<User, 'createdAt' | 'updatedAt'> {
  created_at: string;
  updated_at: string;
}

export interface DatabasePriceData extends Omit<PriceData, 'date'> {
  date: string;
}

export interface DatabaseContract extends Omit<ForwardContract, 'deliveryDate' | 'createdAt' | 'updatedAt'> {
  delivery_date: string;
  created_at: string;
  updated_at: string;
}
