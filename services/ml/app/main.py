from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Literal
import pandas as pd
import numpy as np
# from prophet import Prophet  # Will use pre-trained models from Colab
import pickle
import requests
import logging
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Kartavya ML Service",
    description="Oilseed Price Prediction API for Hedging Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if os.getenv("ENV") != "production" else ["https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class PredictionRequest(BaseModel):
    commodity: Literal["mustard", "groundnut", "soybean", "sunflower", "sesame"]
    days: int = Field(default=30, ge=1, le=365, description="Number of days to predict")
    include_uncertainty: bool = Field(default=True, description="Include confidence intervals")

class PredictionPoint(BaseModel):
    date: str
    predicted_price: float
    confidence: float
    upper_bound: Optional[float] = None
    lower_bound: Optional[float] = None

class PredictionResponse(BaseModel):
    commodity: str
    predictions: List[PredictionPoint]
    volatility: float
    trend: Literal["bullish", "bearish", "neutral"]
    accuracy: float
    model_last_trained: str
    data_source: str

class VolatilityRequest(BaseModel):
    commodity: Literal["mustard", "groundnut", "soybean", "sunflower", "sesame"]
    historical_days: int = Field(default=90, ge=30, le=365)

class VolatilityResponse(BaseModel):
    commodity: str
    volatility: float
    risk_level: Literal["low", "medium", "high"]
    analysis_period_days: int

# Mock historical data (in production, this would come from your database/API)
def get_mock_historical_data(commodity: str, days: int = 180) -> pd.DataFrame:
    """Generate mock historical price data for demonstration"""
    np.random.seed(42)  # For reproducible results
    
    # Base prices for different commodities (INR per quintal)
    base_prices = {
        "mustard": 5500,
        "groundnut": 6200,
        "soybean": 4800,
        "sunflower": 6800,
        "sesame": 8500
    }
    
    start_date = datetime.now() - timedelta(days=days)
    dates = pd.date_range(start=start_date, periods=days, freq='D')
    
    base_price = base_prices.get(commodity, 5000)
    
    # Generate price series with trend and seasonality
    trend = np.linspace(0, 0.1, days)  # Slight upward trend
    seasonal = 0.05 * np.sin(2 * np.pi * np.arange(days) / 365)  # Annual seasonality
    noise = 0.02 * np.random.randn(days)  # Random noise
    
    prices = base_price * (1 + trend + seasonal + noise)
    
    df = pd.DataFrame({
        'ds': dates,
        'y': prices
    })
    
    return df

def train_prophet_model(data: pd.DataFrame) -> Prophet:
    """Train Prophet model with historical data"""
    model = Prophet(
        daily_seasonality=False,
        weekly_seasonality=True,
        yearly_seasonality=True,
        changepoint_prior_scale=0.05,
        seasonality_prior_scale=10.0,
        interval_width=0.95
    )
    
    model.fit(data)
    return model

def calculate_volatility(prices: List[float]) -> float:
    """Calculate annualized volatility from price series"""
    if len(prices) < 2:
        return 0.0
    
    returns = np.diff(np.log(prices))
    daily_vol = np.std(returns)
    # Annualized volatility (assuming 252 trading days)
    annual_vol = daily_vol * np.sqrt(252)
    
    return float(annual_vol)

def determine_trend(predictions: List[float]) -> Literal["bullish", "bearish", "neutral"]:
    """Determine price trend from predictions"""
    if len(predictions) < 2:
        return "neutral"
    
    start_price = predictions[0]
    end_price = predictions[-1]
    change_pct = (end_price - start_price) / start_price
    
    if change_pct > 0.02:  # >2% increase
        return "bullish"
    elif change_pct < -0.02:  # >2% decrease
        return "bearish"
    else:
        return "neutral"

def get_risk_level(volatility: float) -> Literal["low", "medium", "high"]:
    """Categorize volatility into risk levels"""
    if volatility < 0.15:
        return "low"
    elif volatility < 0.25:
        return "medium"
    else:
        return "high"

@app.get("/")
async def root():
    return {
        "service": "Kartavya ML API",
        "status": "running",
        "description": "Oilseed price prediction for hedging platform",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "kartavya-ml"
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict_prices(request: PredictionRequest):
    """Predict oilseed prices using Prophet model"""
    try:
        logger.info(f"Predicting prices for {request.commodity} for {request.days} days")
        
        # Get historical data
        historical_data = get_mock_historical_data(request.commodity, days=180)
        
        # Train Prophet model
        model = train_prophet_model(historical_data)
        
        # Create future dataframe
        future = model.make_future_dataframe(periods=request.days)
        
        # Make predictions
        forecast = model.predict(future)
        
        # Extract prediction data
        prediction_data = forecast.tail(request.days)
        predictions = []
        
        for _, row in prediction_data.iterrows():
            point = PredictionPoint(
                date=row['ds'].strftime('%Y-%m-%d'),
                predicted_price=round(float(row['yhat']), 2),
                confidence=0.85,  # Mock confidence score
                upper_bound=round(float(row['yhat_upper']), 2) if request.include_uncertainty else None,
                lower_bound=round(float(row['yhat_lower']), 2) if request.include_uncertainty else None
            )
            predictions.append(point)
        
        # Calculate metrics
        predicted_prices = [p.predicted_price for p in predictions]
        historical_prices = historical_data['y'].tolist()
        
        volatility = calculate_volatility(historical_prices[-30:])  # Last 30 days
        trend = determine_trend(predicted_prices)
        
        response = PredictionResponse(
            commodity=request.commodity,
            predictions=predictions,
            volatility=round(volatility, 3),
            trend=trend,
            accuracy=0.82,  # Mock accuracy score
            model_last_trained=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            data_source="agmarknet_mock"
        )
        
        return response
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.post("/volatility", response_model=VolatilityResponse)
async def calculate_price_volatility(request: VolatilityRequest):
    """Calculate price volatility for risk assessment"""
    try:
        logger.info(f"Calculating volatility for {request.commodity}")
        
        # Get historical data
        historical_data = get_mock_historical_data(request.commodity, days=request.historical_days)
        prices = historical_data['y'].tolist()
        
        # Calculate volatility
        volatility = calculate_volatility(prices)
        risk_level = get_risk_level(volatility)
        
        response = VolatilityResponse(
            commodity=request.commodity,
            volatility=round(volatility, 3),
            risk_level=risk_level,
            analysis_period_days=request.historical_days
        )
        
        return response
        
    except Exception as e:
        logger.error(f"Volatility calculation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Volatility calculation failed: {str(e)}")

@app.get("/commodities")
async def get_supported_commodities():
    """Get list of supported oilseed commodities"""
    return {
        "commodities": [
            {
                "name": "mustard",
                "display_name": "Mustard Seed",
                "unit": "quintal",
                "markets": ["Delhi", "Jaipur", "Bharatpur"]
            },
            {
                "name": "groundnut",
                "display_name": "Groundnut",
                "unit": "quintal", 
                "markets": ["Rajkot", "Junagadh", "Gondal"]
            },
            {
                "name": "soybean",
                "display_name": "Soybean",
                "unit": "quintal",
                "markets": ["Indore", "Dewas", "Ujjain"]
            },
            {
                "name": "sunflower",
                "display_name": "Sunflower",
                "unit": "quintal",
                "markets": ["Bangalore", "Davangere", "Chitradurga"]
            },
            {
                "name": "sesame",
                "display_name": "Sesame",
                "unit": "quintal",
                "markets": ["Akola", "Jalgaon", "Amravati"]
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
