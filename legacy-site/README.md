# Krishi Hedge - Hedging Platform for Oilseed Price Risk Management

A comprehensive price risk management platform for oilseed markets, developed for Smart India Hackathon 2025.

## Overview

Krishi Hedge addresses critical price volatility challenges in oilseed markets through AI-powered prediction models and intelligent hedging strategies. The platform provides farmers, traders, and agricultural businesses with institutional-grade risk management tools through accessible web and mobile interfaces.

**Problem Statement ID**: SIH25274  
**Category**: Software  
**Domain**: Agriculture, FoodTech & Rural Development

## Solution Architecture

The platform is built as a monorepo containing multiple applications and services:

```
Krishi-Hedge/
├── apps/
│   ├── web/                 # Next.js Dashboard
│   ├── mobile-pwa/          # Progressive Web App
│   └── mobile-native/       # React Native Application
├── services/
│   ├── api/                 # Express API Service
│   └── ml/                  # FastAPI ML Service
└── packages/
    ├── types/               # Shared TypeScript Definitions
    ├── utils/               # Common Utilities
    ├── ui-web/              # Web UI Components
    └── ui-native/           # Native UI Components
```

## Technology Stack

**Frontend**
- Next.js 14 with TypeScript
- React Native with Expo SDK
- Tailwind CSS and NativeWind
- Progressive Web App capabilities

**Backend**
- Node.js with Express and TypeScript
- FastAPI for ML service endpoints
- Supabase (PostgreSQL) database
- Socket.io for real-time communication

**Machine Learning**
- Prophet for time series forecasting
- ARIMA models for statistical analysis
- Python-based prediction pipeline

**Infrastructure**
- npm workspaces for monorepo management
- ESLint and Prettier for code quality
- Git version control

## Core Features

**Price Prediction Engine**
- AI-powered forecasting using multiple models
- Historical data analysis and pattern recognition
- Multi-timeframe predictions with confidence intervals

**Hedging Strategy Optimization**
- Risk assessment algorithms
- Personalized hedge recommendations
- Portfolio optimization tools

**Market Analytics**
- Real-time price feeds and indicators
- Volatility analysis and risk metrics
- Custom alerts and notifications

**Multi-Platform Access**
- Web dashboard for comprehensive analysis
- PWA for offline mobile capabilities
- Native mobile app for enhanced user experience

## Platform Applications

**Web Dashboard**
Comprehensive trading and analytics interface featuring advanced charting, portfolio management, and detailed risk analysis reports.

**Mobile PWA**
Lightweight mobile experience with essential trading functions, market overview, and offline capability.

**Native Mobile App**
Full-featured mobile application with native performance, biometric authentication, and real-time notifications.

## Machine Learning Pipeline

The ML service implements multiple forecasting models:
- Prophet for robust time series predictions
- ARIMA for statistical trend analysis
- External factor integration (weather, policy, global markets)
- Continuous model evaluation and backtesting

## Market Impact

**Target Segments**
- Small to medium-scale farmers and traders
- Agricultural cooperatives and commodity businesses
- Financial institutions serving agricultural markets

**Value Delivery**
- Significant reduction in price risk exposure
- Improved profit margins through better market timing
- Democratized access to institutional-grade risk management
- Enhanced financial literacy through educational resources

## Development Approach

The platform follows modern software engineering practices with a focus on scalability, maintainability, and user experience. The monorepo structure enables efficient code sharing and consistent development workflows across all applications and services.

## Competition Context

Developed for Smart India Hackathon 2025, this solution demonstrates technical excellence, user-centered design, and measurable business impact in addressing real-world agricultural challenges.

---

*Built for Smart India Hackathon 2025*
