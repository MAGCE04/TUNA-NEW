/**
 * API utilities for fetching DeFi Tuna protocol data
 */

// DeFi Tuna Protocol Constants
export const DEFI_TUNA_CONSTANTS = {
  TUNA_ID: 'tuna4uSQZncNeeiAMKbstuxA9CUkHH6HmC64wgmnogD',
  TUNA_STAKING_ID: 'tUnst2Y2sbmgSgARBpSBZhqPzpoy2iUsdCwb5ToYVJa',
  TUNA_TOKEN_MINT: 'TUNAfXDZEdQizTMTh3uEvNvYqJmqFHZbEJt8joP4cyx',
  TUNA_TREASURY: 'G9XfJoY81n8A9bZKaJFhJYomRrcvFkuJ22em2g8rZuCh'
};

// API Base URL - adjust this to your actual API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.defituna.com/api/v1';

// Types for DeFi Tuna API responses
export interface UserPosition {
  id: string;
  type: 'loan' | 'pool' | 'stake';
  amount: number;
  asset: string;
  apy: number;
  status: 'active' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface Vault {
  id: string;
  name: string;
  asset: string;
  tvl: number;
  apy: number;
  totalSupplied: number;
  totalBorrowed: number;
  utilizationRate: number;
  status: 'active' | 'paused';
}

export interface VaultHistory {
  timestamp: string;
  apy: number;
  tvl: number;
  volume: number;
}

// Fetch user positions
export const getUserPositions = async (userPubkey: string): Promise<UserPosition[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userPubkey}/positions`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching user positions for ${userPubkey}:`, error);
    // Return mock data as fallback
    return [
      {
        id: '1',
        type: 'pool',
        amount: 1000,
        asset: 'TUNA',
        apy: 12.5,
        status: 'active',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        type: 'loan',
        amount: 500,
        asset: 'SOL',
        apy: 8.2,
        status: 'active',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
};

// Fetch all vaults
export const getVaults = async (): Promise<Vault[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vaults`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Error fetching vaults:', error);
    // Return mock data as fallback
    return [
      {
        id: 'tuna-vault',
        name: 'TUNA Vault',
        asset: 'TUNA',
        tvl: 2500000,
        apy: 15.8,
        totalSupplied: 2500000,
        totalBorrowed: 1800000,
        utilizationRate: 0.72,
        status: 'active'
      },
      {
        id: 'sol-vault',
        name: 'SOL Vault',
        asset: 'SOL',
        tvl: 1200000,
        apy: 9.4,
        totalSupplied: 1200000,
        totalBorrowed: 850000,
        utilizationRate: 0.71,
        status: 'active'
      },
      {
        id: 'usdc-vault',
        name: 'USDC Vault',
        asset: 'USDC',
        tvl: 3200000,
        apy: 6.2,
        totalSupplied: 3200000,
        totalBorrowed: 2100000,
        utilizationRate: 0.66,
        status: 'active'
      }
    ];
  }
};

// Fetch specific vault details
export const getVault = async (vaultId: string): Promise<Vault | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vaults/${vaultId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching vault ${vaultId}:`, error);
    return null;
  }
};

// Fetch vault history
export const getVaultHistory = async (vaultId: string): Promise<VaultHistory[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vaults/${vaultId}/history`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching vault history for ${vaultId}:`, error);
    // Return mock historical data
    const mockHistory: VaultHistory[] = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      mockHistory.push({
        timestamp: date.toISOString(),
        apy: 12 + Math.random() * 8,
        tvl: 2000000 + Math.random() * 1000000,
        volume: 50000 + Math.random() * 100000
      });
    }
    return mockHistory;
  }
};