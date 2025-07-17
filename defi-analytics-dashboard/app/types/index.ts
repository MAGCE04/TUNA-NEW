export type TimeRange = '7d' | '30d' | '90d' | 'day' | 'week' | 'month' | 'year' | 'all';
export type TokenType = 'SOL' | 'USDC' | 'all';

export interface WalletInfo {
  address: string;
  label?: string;
  color?: string;
}

export interface RevenueData {
  timestamp: number;
  wallet: string;
  solAmount: number;
  usdcAmount: number;
  totalUsdValue: number;
  periodType: PeriodType;
}

export enum PeriodType {
  Daily = 0,
  Weekly = 1,
  Monthly = 2,
  Yearly = 3,
}

export interface DailyRevenue {
  date: string;
  solAmount: number;
  usdcAmount: number;
  totalUsdValue: number;
}

export interface WalletRevenue {
  wallet: string;
  label?: string;
  solAmount: number;
  usdcAmount: number;
  totalUsdValue: number;
  percentage: number;
}

export interface RevenueMetrics {
  totalRevenue: number;
  averageDailyRevenue: number;
  sevenDayAverage: number;
  dailyGrowthPercentage: number;
  topRevenueDay: {
    date: string;
    amount: number;
  };
}

export interface FilterOptions {
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  wallets: string[];
  tokenType: TokenType;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

// New types for advanced analytics modules

// Liquidations Tracker
export interface LiquidationEvent {
  timestamp: number;
  wallet: string;
  tokenSymbol: string;
  tokenAmount: number;
  usdValue: number;
  txId: string;
}

export interface DailyLiquidation {
  date: string;
  totalUsdValue: number;
  count: number;
  tokens: {
    [symbol: string]: {
      amount: number;
      usdValue: number;
    };
  };
}

// Limit Orders Monitor
export interface LimitOrder {
  orderId: string;
  owner: string;
  pair: string;
  side: 'buy' | 'sell';
  price: number;
  size: number;
  usdValue: number;
  timestamp: number;
  status: 'open' | 'filled' | 'canceled';
}

export interface LimitOrderStats {
  totalOrders: number;
  openOrders: number;
  filledOrders: number;
  canceledOrders: number;
  totalVolume: number;
  averageOrderSize: number;
}

// User Activity Dashboard
export interface UserActivity {
  timestamp: number;
  uniqueUsers: number;
  newUsers: number;
  totalTransactions: number;
  returningUsers: number;
}


export interface UserMetrics {
  dau: number; // Daily Active Users
  wau: number; // Weekly Active Users
  mau: number; // Monthly Active Users
  retentionRate: number; // Percentage of returning users
  averageTransactionsPerUser: number;
  growthRate?: number; // Growth rate percentage
}

// Top Wallet Leaderboard
export interface TopWallet {
  address: string;
  shortAddress?: string;
  tradeVolume: number;
  tradeCount: number;
  lastActive: number;
  favoriteToken: string;
  timestamp: number;
}

// Ensure all data types have timestamp for filtering
export interface TimestampedData {
  timestamp: number;
}

// Pool Utilization & Insights
export interface PoolData {
  poolAddress: string;
  name: string;
  tokenA: string;
  tokenB: string;
  totalSupplied: number;
  totalBorrowed: number;
  utilizationRate: number;
  apy: number;
  volume24h: number;
  tvl: number;
}

// Protocol Overview
export interface ProtocolMetrics {
  totalVolume: number;
  totalRevenue: number;
  activeUsers: number;
  trackedAssets: number;
  totalTransactions: number;
  avgTransactionsPerDay: number;
  avgTransactionSize: number;
  volumeGrowth: number;
  revenueGrowth: number;
  userGrowth: number;
}

// Recent Activity
export interface ActivityItem {
  id: string;
  timestamp: number;
  wallet: string;
  action: string;
  token?: string;
  amount?: number;
  usdValue?: number;
}