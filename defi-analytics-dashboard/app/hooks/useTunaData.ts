import { useState, useEffect } from 'react';
import { getUserPositions, getVaults, getVaultHistory, UserPosition, Vault, VaultHistory } from '../lib/api';

// Hook for fetching user positions
export const useUserPositions = (userPubkey: string | null) => {
  const [positions, setPositions] = useState<UserPosition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userPubkey) return;

    const fetchPositions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserPositions(userPubkey);
        setPositions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch positions');
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [userPubkey]);

  return { positions, loading, error };
};

// Hook for fetching vaults
export const useVaults = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVaults = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getVaults();
        setVaults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch vaults');
      } finally {
        setLoading(false);
      }
    };

    fetchVaults();
  }, []);

  const totalTVL = vaults.reduce((sum, vault) => sum + vault.tvl, 0);
  const averageAPY = vaults.length > 0 ? vaults.reduce((sum, vault) => sum + vault.apy, 0) / vaults.length : 0;
  const totalUtilization = vaults.length > 0 ? vaults.reduce((sum, vault) => sum + vault.utilizationRate, 0) / vaults.length : 0;

  return { 
    vaults, 
    loading, 
    error, 
    totalTVL, 
    averageAPY, 
    totalUtilization,
    activeVaults: vaults.filter(v => v.status === 'active').length
  };
};

// Hook for fetching vault history
export const useVaultHistory = (vaultId: string | null) => {
  const [history, setHistory] = useState<VaultHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vaultId) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getVaultHistory(vaultId);
        setHistory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch vault history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [vaultId]);

  return { history, loading, error };
};