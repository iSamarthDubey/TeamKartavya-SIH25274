# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Kartavya-SIH25274 is a **hedging platform for oilseed price risk management** developed for Smart India Hackathon 2025.

### Problem Statement Details
**Problem Statement ID:** 25274  
**Title:** Hedging Platform for Oilseed Price Risk Management  
**Organization:** Ministry of Agriculture & Farmers Welfare (MoA&FW)  
**Department:** Department of Agriculture & Farmers Welfare (DoA&FW) (Oil Palm)  
**Category:** Software  
**Theme:** Agriculture, FoodTech & Rural Development

### Problem Background
Oilseed farmers in India face acute price volatility without adequate hedging tools. Suspension of commodity trading platforms has worsened their exposure to unpredictable market fluctuations, leading to distress sales and income instability. In contrast, developed markets like the US and Brazil use futures and options to mitigate such risks.

### Problem Description
Design a digital platform that allows virtual hedging and risk management for oilseed farmers. The system should integrate price forecasting models, forward contracts, and transparent trading systems accessible to FPOs and smallholders. Blockchain integration can ensure transaction security and trust, while AI algorithms provide predictive analytics for market trends.

### Expected Solution
A blockchain-based mobile application featuring simulated futures trading, AI-driven price prediction, and e-contracts for forward sales. Additional components should include real-time market alerts, NCDEX-style integration, and educational modules to improve financial literacy among farmers regarding risk management practices.

### Our Solution Features
- Virtual hedging and simulated futures trading
- AI-powered price prediction for oilseeds (mustard, groundnut, soybean)
- Forward contract management with blockchain security
- Educational modules for financial literacy
- Real-time market alerts and risk management tools
- NCDEX-style integration for transparent trading

## Architecture

This is a monorepo organized into the following main sections:

- **apps/**: Client applications
  - `mobile/`: React Native (Expo) farmer mobile app for hedging, price alerts, and education
  - `web/`: Next.js 14 FPO/admin dashboard for contract management and analytics
- **services/**: Backend services
  - `api/`: Node.js + Express + TypeScript REST API for hedging calculations and contract management
  - `ml/`: FastAPI + Prophet service for oilseed price forecasting (mustard, groundnut, soybean)
- **packages/**: Shared code
  - `types/`: Shared TypeScript type definitions
  - `utils/`: Isomorphic utility functions
  - `ui-native/`: Shared React Native components with NativeWind
  - `ui-web/`: Shared web components built with shadcn/ui

## Technology Stack

### Frontend
- **Mobile**: React Native (Expo), TypeScript, NativeWind, Zustand, Victory Native
- **Web**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts

### Backend
- **API**: Node.js 20, Express, TypeScript, Supabase JS client
- **ML**: Python 3.11, FastAPI, Prophet, Pandas, NumPy
- **Database**: PostgreSQL via Supabase with Row Level Security
- **Authentication**: Supabase Auth (Phone OTP + Email)
- **Storage**: Supabase Storage
- **Cache**: Upstash Redis
- **Real-time**: Socket.io

### Infrastructure
- **Hosting**: Vercel (web), Expo EAS (mobile), Railway (backend + ML)
- **CI/CD**: GitHub Actions
- **CDN**: Cloudflare (optional)

## Development Commands

### Root Level (npm workspaces)
```bash
# Install all dependencies
npm install

# Build all packages
npm run build

# Run linting across all packages
npm run lint

# Run tests across all packages
npm test

# Clean all node_modules and build artifacts
npm run clean
```

### Mobile App (apps/mobile/)
```bash
# Start Expo development server
npm run start

# Start iOS simulator
npm run ios

# Start Android emulator
npm run android

# Build APK
npm run build:android

# Run tests
npm test

# Type checking
npm run typecheck
```

### Web App (apps/web/)
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run tests
npm test

# Type checking
npm run typecheck
```

### API Service (services/api/)
```bash
# Start development server with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type checking
npm run typecheck

# Generate API documentation
npm run docs
```

### ML Service (services/ml/)
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start development server
uvicorn app.main:app --reload

# Start production server
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Test price prediction endpoint
curl -X POST "http://localhost:8000/predict" -H "Content-Type: application/json" -d '{"commodity": "mustard", "days": 30}'

# Run tests
pytest

# Run tests with coverage
pytest --cov=app

# Build Docker image
docker build -t kartavya-ml .

# Run Docker container
docker run -p 8000:8000 kartavya-ml
```

## Key Architectural Patterns

### Monorepo Structure
- Uses npm workspaces for dependency management
- Shared packages contain reusable code across apps
- TypeScript configurations inherit from root `tsconfig.base.json`

### State Management
- **Mobile**: Zustand for client state, AsyncStorage for persistence
- **Web**: React Hook Form + Zod for form validation, built-in Next.js state patterns

### API Design
- RESTful API with Express.js
- OpenAPI/Swagger documentation
- Zod schemas for request/response validation
- Socket.io for real-time features (price alerts, hedge notifications)
- Hedging calculation endpoints (/calculate-hedge, /portfolio-risk)
- Contract management endpoints (/contracts, /forward-contracts)

### Database Architecture
- PostgreSQL with Supabase for managed hosting
- Row Level Security (RLS) for multi-tenant data isolation
- Supabase client for real-time subscriptions

### Authentication Flow
- Phone OTP for farmers (primary use case)
- Email authentication for admin/FPO users
- JWT tokens managed by Supabase Auth

### ML Pipeline
- FastAPI service for oilseed price predictions using Prophet
- `/predict` endpoint for mustard, groundnut, and soybean forecasting
- Data sourced from Agmarknet (APMC prices), NCDEX historical data, and OpenWeather
- Volatility analysis for risk assessment
- Basis risk calculations (spot vs futures price differences)

## Environment Setup

### Required Environment Variables
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `UPSTASH_REDIS_URL`: Upstash Redis connection string
- `OPENWEATHER_API_KEY`: OpenWeather API key
- `NODE_ENV`: Environment (development/production)

### Development Prerequisites
- Node.js 20 LTS
- npm or pnpm
- Python 3.11 (for ML service)
- Expo CLI (for mobile development)
- Docker (optional, for ML service)

## Testing Strategy

### Unit Tests
- Jest + Supertest for API testing
- Jest for shared packages and utilities
- Pytest for ML service

### Integration Tests
- API endpoint testing with test database
- ML model accuracy validation

### E2E Tests
- Playwright for web application flows
- Detox for mobile app testing (optional)

## Deployment

### Production Deployment
- Web: Vercel with automatic deployments from main branch
- Mobile: Expo EAS Build for app store distribution
- API: Railway with GitHub integration
- ML: Railway with Docker deployment

### Staging Environment
- Feature branch deployments to staging environments
- Preview URLs for web app changes

## Hackathon Demo Strategy

### Core Demo Flow
1. **Price Volatility Alert** - Show real oilseed price fluctuations
2. **Virtual Hedge Creation** - Farmer creates hedge position via mobile app
3. **Risk Dashboard** - FPO views portfolio risk and approves contract
4. **Price Prediction** - ML service forecasts next 30-day prices
5. **Contract Execution** - Generate and hash forward contract
6. **Educational Module** - Explain hedging benefits to farmers

### MVP Features for Judging
- Working price prediction API for mustard/groundnut/soybean
- Simple hedging calculator (basic P&L scenarios)
- Contract generation with blockchain hashing
- Real-time price alerts via Socket.io
- Educational content explaining risk management

## Blockchain Integration (Future)

### Phase 1: Document Integrity
- SHA-256 hashing for contract documents
- IPFS storage via Pinata for document distribution

### Phase 2: Smart Contracts
- Polygon network deployment (Mumbai testnet → Mainnet)
- Solidity contracts with Hardhat development framework
- Ethers.js for blockchain interactions
