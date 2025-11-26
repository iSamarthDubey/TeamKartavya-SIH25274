from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Literal
import pandas as pd
import numpy as np
import logging
from datetime import datetime, timedelta
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Krishi Hedge - ML API Service",
    description="Price Prediction API",
    version="1.0.0",
    docs_url="/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ForecastResponse(BaseModel):
    crop: str
    generated_at: str
    current_price: float
    horizons: List[dict]
    model_version: str

def get_mock_forecast(crop: str = "soybean") -> dict:
    """Generate mock forecast data matching the JSON structure"""
    base_prices = {
        "soybean": 4250,
        "wheat": 2100,
        "rice": 3200,
        "corn": 1800,
    }
    
    current_price = base_prices.get(crop.lower(), 4250)
    
    # Generate predictions with some randomness
    np.random.seed(42)
    horizons = [
        {
            "days": 7,
            "yhat": current_price + np.random.randint(-50, 150),
            "lower": current_price - 150,
            "upper": current_price + 300,
            "summary": "Stable"
        },
        {
            "days": 30,
            "yhat": current_price + np.random.randint(200, 400),
            "lower": current_price - 50,
            "upper": current_price + 550,
            "summary": "Slight up"
        },
        {
            "days": 90,
            "yhat": current_price + np.random.randint(150, 350),
            "lower": current_price - 450,
            "upper": current_price + 850,
            "summary": "Uncertain"
        }
    ]
    
    return {
        "crop": crop.capitalize(),
        "generated_at": datetime.now().isoformat(),
        "current_price": current_price,
        "horizons": horizons,
        "model_version": "prophet-baseline-1.0"
    }

@app.get("/")
async def root():
    return {
        "service": "Krishi Hedge ML API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/forecast", response_model=ForecastResponse)
async def get_forecast(crop: str = "soybean"):
    """Get price forecast for a crop"""
    try:
        logger.info(f"Generating forecast for {crop}")
        forecast = get_mock_forecast(crop)
        return ForecastResponse(**forecast)
    except Exception as e:
        logger.error(f"Forecast error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/commodities")
async def get_commodities():
    """Get list of supported crops"""
    return {
        "commodities": [
            {"name": "soybean", "display_name": "Soybean"},
            {"name": "wheat", "display_name": "Wheat"},
            {"name": "rice", "display_name": "Rice"},
            {"name": "corn", "display_name": "Corn"},
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Enable auto-reload on file changes
        log_level="info"
    )
