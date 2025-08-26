export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  tradingExperience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  preferredTimeframe: string;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  totalTrades: number;
  winRate: number;
  totalPnL: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface Trade {
  id: string;
  pair: string;
  type: 'buy' | 'sell';
  entry: number;
  exit?: number;
  stopLoss: number;
  takeProfit: number;
  size: number;
  pnl?: number;
  status: 'open' | 'closed' | 'cancelled';
  timestamp: string;
  notes?: string;
  ictConcepts: string[];
}

export interface MarketStructure {
  trend: 'bullish' | 'bearish' | 'ranging';
  keyLevels: number[];
  liquidityPools: LiquidityPool[];
  orderBlocks: OrderBlock[];
  fairValueGaps: FairValueGap[];
  seasonalTendency: SeasonalTendency;
}

export interface LiquidityPool {
  price: number;
  type: 'buy' | 'sell';
  strength: 'weak' | 'medium' | 'strong';
}

export interface OrderBlock {
  high: number;
  low: number;
  type: 'bullish' | 'bearish';
  timeframe: string;
  tested: boolean;
}

export interface FairValueGap {
  high: number;
  low: number;
  type: 'bullish' | 'bearish';
  filled: boolean;
  timestamp: string;
}

export interface SeasonalTendency {
  month: string;
  tendency: 'bullish' | 'bearish' | 'neutral';
  strength: number;
  historicalData: {
    year: number;
    performance: number;
  }[];
  description: string;
}