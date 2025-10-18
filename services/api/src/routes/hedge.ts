import { Router } from 'express';
import { z } from 'zod';
import { calculateOptimalHedge } from '@kartavya/utils';
import type { HedgeCalculationInput, ApiResponse, HedgeCalculationResult } from '@kartavya/types';

const router = Router();

// Validation schemas
const hedgeCalculationSchema = z.object({
  commodity: z.enum(['mustard', 'groundnut', 'soybean', 'sunflower', 'sesame']),
  quantity: z.number().min(1).max(10000),
  currentPrice: z.number().min(1),
  targetPrice: z.number().min(1),
  timeHorizon: z.number().min(1).max(365)
});

const createHedgePositionSchema = z.object({
  commodity: z.enum(['mustard', 'groundnut', 'soybean', 'sunflower', 'sesame']),
  quantity: z.number().min(1),
  hedgePrice: z.number().min(1),
  hedgeRatio: z.number().min(0.1).max(1),
  expiryDays: z.number().min(1).max(365)
});

/**
 * @route POST /api/hedge/calculate
 * @desc Calculate optimal hedge for given parameters
 * @access Private
 */
router.post('/calculate', async (req, res) => {
  try {
    const validatedData = hedgeCalculationSchema.parse(req.body);
    
    const input: HedgeCalculationInput = {
      commodity: validatedData.commodity,
      quantity: validatedData.quantity,
      currentPrice: validatedData.currentPrice,
      targetPrice: validatedData.targetPrice,
      timeHorizon: validatedData.timeHorizon
    };
    
    const result = calculateOptimalHedge(input);
    
    const response: ApiResponse<HedgeCalculationResult> = {
      success: true,
      data: result,
      message: 'Hedge calculation completed successfully'
    };
    
    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        message: error.errors.map(e => e.message).join(', ')
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Failed to calculate hedge'
      });
    }
  }
});

/**
 * @route POST /api/hedge/position
 * @desc Create a new hedge position
 * @access Private
 */
router.post('/position', async (req, res) => {
  try {
    const validatedData = createHedgePositionSchema.parse(req.body);
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }
    
    // TODO: Save to database via Supabase
    const hedgePosition = {
      id: `hedge_${Date.now()}`,
      farmerId: userId,
      commodity: validatedData.commodity,
      quantity: validatedData.quantity,
      hedgePrice: validatedData.hedgePrice,
      currentPrice: validatedData.hedgePrice, // Initial price
      profitLoss: 0,
      hedgeRatio: validatedData.hedgeRatio,
      status: 'active' as const,
      createdAt: new Date(),
      expiryDate: new Date(Date.now() + validatedData.expiryDays * 24 * 60 * 60 * 1000)
    };
    
    res.status(201).json({
      success: true,
      data: hedgePosition,
      message: 'Hedge position created successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        message: error.errors.map(e => e.message).join(', ')
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Failed to create hedge position'
      });
    }
  }
});

/**
 * @route GET /api/hedge/positions
 * @desc Get user's hedge positions
 * @access Private
 */
router.get('/positions', async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }
    
    // TODO: Fetch from database
    // Mock data for now
    const positions = [
      {
        id: 'hedge_1',
        farmerId: userId,
        commodity: 'mustard',
        quantity: 50,
        hedgePrice: 5500,
        currentPrice: 5650,
        profitLoss: 7500, // (5650-5500) * 50
        hedgeRatio: 0.75,
        status: 'active',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        expiryDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000)
      }
    ];
    
    res.json({
      success: true,
      data: positions,
      message: 'Hedge positions retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch hedge positions'
    });
  }
});

/**
 * @route GET /api/hedge/portfolio-risk
 * @desc Calculate portfolio risk metrics
 * @access Private
 */
router.get('/portfolio-risk', async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }
    
    // Mock risk calculation
    const riskMetrics = {
      portfolioValue: 275000,
      valueAtRisk: 13750, // 5% of portfolio
      expectedShortfall: 20625, // 7.5% of portfolio
      volatility: 0.23, // 23% annual volatility
      beta: 1.1,
      sharpeRatio: 0.65
    };
    
    res.json({
      success: true,
      data: riskMetrics,
      message: 'Portfolio risk calculated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to calculate portfolio risk'
    });
  }
});

export default router;
