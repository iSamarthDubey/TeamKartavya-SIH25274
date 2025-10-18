# Krishi Hedge - AI-Powered Oilseed Price Risk Management

**Smart India Hackathon 2025 | Problem Statement ID: 25274**

> A blockchain-based mobile application featuring simulated futures trading, AI-driven price prediction, and e-contracts for forward sales.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ LTS
- Python 3.11+
- npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Kartavya-SIH25274

# Install dependencies for all workspaces
npm install

# Copy environment variables
cp .env.example .env
# Fill in your environment variables

# Install Python dependencies for ML service
cd services/ml
pip install -r requirements.txt
cd ../..
```

### Development

```bash
# Start API + Web App
npm run dev

# Start Mobile App (separate terminal)
npm run dev:mobile

# Start ML Service (separate terminal)
npm run dev:ml
```

## 🏗️ Architecture

This monorepo contains:

- **apps/mobile**: React Native (Expo) farmer app
- **apps/web**: Next.js 14 FPO/admin dashboard  
- **services/api**: Node.js + Express REST API
- **services/ml**: FastAPI price prediction service
- **packages**: Shared TypeScript types, utilities, and UI components

## 🎯 Features

### For Farmers
- 📱 Mobile app for price alerts and hedging
- 📊 Portfolio risk visualization
- 📚 Educational modules on risk management
- 🔔 Real-time market notifications

### For FPOs
- 🖥️ Web dashboard for contract management
- 📈 Market analytics and forecasting
- ✅ Contract approval workflows
- 📋 Risk assessment tools

### Technical
- 🤖 AI-powered price prediction (Prophet)
- 🔗 Blockchain contract security (Phase 2)
- ⚡ Real-time updates via Socket.io
- 🛡️ Supabase authentication & database

## 🛠️ Development Commands

See [WARP.md](./WARP.md) for detailed development commands and architecture.

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Team Kartavya** | Smart India Hackathon 2025
