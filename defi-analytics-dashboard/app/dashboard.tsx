'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useVaults, useUserPositions, useVaultHistory } from './hooks/useTunaData';
import { formatCurrency, formatPercentage } from './lib/utils';
import { DEFI_TUNA_CONSTANTS } from './lib/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

export default function SimplifiedDashboard() {
  const [selectedUserPubkey, setSelectedUserPubkey] = useState<string | null>(null);
  const [selectedVaultId, setSelectedVaultId] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  // Fetch data using our hooks
  const { vaults, loading: vaultsLoading, error: vaultsError, totalTVL, averageAPY, totalUtilization, activeVaults } = useVaults();
  const { positions, loading: positionsLoading, error: positionsError } = useUserPositions(selectedUserPubkey);
  const { history, loading: historyLoading } = useVaultHistory(selectedVaultId);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const COLORS = ['#00e4ff', '#9333ea', '#00ffa3', '#ffb300', '#ff4d6d'];

  // Prepare chart data
  const vaultDistributionData = vaults.map((vault, index) => ({
    name: vault.name,
    value: vault.tvl,
    color: COLORS[index % COLORS.length]
  }));

  const utilizationData = vaults.map(vault => ({
    name: vault.asset,
    utilization: vault.utilizationRate * 100,
    apy: vault.apy
  }));

  if (vaultsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl animate-pulse">🐟</span>
          </div>
        </div>
      </div>
    );
  }

  if (vaultsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card bg-danger/10 border border-danger/30 max-w-md">
          <h2 className="text-xl font-bold text-danger flex items-center">
            <span className="mr-2">⚠️</span> Error Loading Data
          </h2>
          <p className="mt-2">{vaultsError}</p>
          <button 
            className="btn btn-primary mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className={`transition-all duration-1000 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="gradient-text">DeFi Tuna Protocol</span> 
              <span className="ml-2">🐟</span>
            </h1>
            <p className="text-text-muted">
              Last updated: {format(new Date(), 'MMM d, yyyy HH:mm')} • 
              <span className="ml-1">Simplified protocol overview</span>
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter user pubkey to view positions"
              className="select w-full md:w-80"
              value={selectedUserPubkey || ''}
              onChange={(e) => setSelectedUserPubkey(e.target.value || null)}
            />
          </div>
        </div>
      </div>

      {/* Protocol Constants */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="text-primary mr-2">🔧</span> Protocol Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-muted">TUNA Program ID:</span>
            <p className="font-mono text-xs break-all">{DEFI_TUNA_CONSTANTS.TUNA_ID}</p>
          </div>
          <div>
            <span className="text-text-muted">TUNA Staking ID:</span>
            <p className="font-mono text-xs break-all">{DEFI_TUNA_CONSTANTS.TUNA_STAKING_ID}</p>
          </div>
          <div>
            <span className="text-text-muted">TUNA Token Mint:</span>
            <p className="font-mono text-xs break-all">{DEFI_TUNA_CONSTANTS.TUNA_TOKEN_MINT}</p>
          </div>
          <div>
            <span className="text-text-muted">TUNA Treasury:</span>
            <p className="font-mono text-xs break-all">{DEFI_TUNA_CONSTANTS.TUNA_TREASURY}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`card transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-text-muted">Total Value Locked</h3>
            <span className="text-primary text-xl">💰</span>
          </div>
          <p className="text-3xl font-bold gradient-text">{formatCurrency(totalTVL)}</p>
          <div className="mt-2 text-text-muted text-sm">Across all vaults</div>
        </div>

        <div className={`card transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-text-muted">Average APY</h3>
            <span className="text-primary text-xl">📈</span>
          </div>
          <p className="text-3xl font-bold">{formatPercentage(averageAPY)}</p>
          <div className="mt-2 text-text-muted text-sm">Weighted average</div>
        </div>

        <div className={`card transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-text-muted">Avg Utilization</h3>
            <span className="text-primary text-xl">📊</span>
          </div>
          <p className="text-3xl font-bold">{formatPercentage(totalUtilization * 100)}</p>
          <div className="mt-2 text-text-muted text-sm">Capital efficiency</div>
        </div>

        <div className={`card transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-text-muted">Active Vaults</h3>
            <span className="text-primary text-xl">🏦</span>
          </div>
          <p className="text-3xl font-bold">{activeVaults}</p>
          <div className="mt-2 text-text-muted text-sm">Available pools</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* TVL Distribution */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">TVL Distribution by Vault</h2>
          <div className="h-80">
            {vaultDistributionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vaultDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {vaultDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'TVL']}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-text-muted">No vault data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Utilization vs APY */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Utilization Rate vs APY</h2>
          <div className="h-80">
            {utilizationData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={utilizationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'utilization' ? `${value.toFixed(1)}%` : `${value.toFixed(1)}%`,
                      name === 'utilization' ? 'Utilization' : 'APY'
                    ]}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                  />
                  <Bar dataKey="utilization" name="Utilization" fill="#00e4ff" />
                  <Bar dataKey="apy" name="APY" fill="#9333ea" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-text-muted">No utilization data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vaults Table */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">All Vaults</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left">Vault</th>
                <th className="px-4 py-2 text-right">TVL</th>
                <th className="px-4 py-2 text-right">APY</th>
                <th className="px-4 py-2 text-right">Utilization</th>
                <th className="px-4 py-2 text-right">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vaults.map((vault) => (
                <tr key={vault.id} className="border-b border-border hover:bg-card-hover">
                  <td className="px-4 py-2">
                    <div>
                      <div className="font-medium">{vault.name}</div>
                      <div className="text-sm text-text-muted">{vault.asset}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">{formatCurrency(vault.tvl)}</td>
                  <td className="px-4 py-2 text-right">{formatPercentage(vault.apy)}</td>
                  <td className="px-4 py-2 text-right">{formatPercentage(vault.utilizationRate * 100)}</td>
                  <td className="px-4 py-2 text-right">
                    <span className={`px-2 py-1 rounded text-xs ${
                      vault.status === 'active' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                    }`}>
                      {vault.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      className="btn btn-outline text-xs"
                      onClick={() => setSelectedVaultId(vault.id)}
                    >
                      View History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Positions */}
      {selectedUserPubkey && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">User Positions</h2>
          {positionsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : positionsError ? (
            <p className="text-danger">{positionsError}</p>
          ) : positions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Asset</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                    <th className="px-4 py-2 text-right">APY</th>
                    <th className="px-4 py-2 text-right">Status</th>
                    <th className="px-4 py-2 text-right">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((position) => (
                    <tr key={position.id} className="border-b border-border">
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          position.type === 'pool' ? 'bg-primary/20 text-primary' :
                          position.type === 'loan' ? 'bg-secondary/20 text-secondary' :
                          'bg-accent/20 text-accent'
                        }`}>
                          {position.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-2">{position.asset}</td>
                      <td className="px-4 py-2 text-right">{position.amount.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right">{formatPercentage(position.apy)}</td>
                      <td className="px-4 py-2 text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          position.status === 'active' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                        }`}>
                          {position.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        {format(new Date(position.createdAt), 'MMM d, yyyy')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-text-muted text-center py-8">No positions found for this user</p>
          )}
        </div>
      )}

      {/* Vault History Chart */}
      {selectedVaultId && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">
            Vault History: {vaults.find(v => v.id === selectedVaultId)?.name}
          </h2>
          {historyLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : history.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="timestamp" 
                    stroke="#94a3b8"
                    tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM d')}
                  />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'apy' ? `${value.toFixed(2)}%` : 
                      name === 'tvl' ? formatCurrency(value) : 
                      formatCurrency(value),
                      name === 'apy' ? 'APY' : name === 'tvl' ? 'TVL' : 'Volume'
                    ]}
                    labelFormatter={(label) => format(new Date(label), 'MMM d, yyyy')}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                  />
                  <Line type="monotone" dataKey="apy" stroke="#00e4ff" name="APY" />
                  <Line type="monotone" dataKey="tvl" stroke="#9333ea" name="TVL" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-text-muted text-center py-8">No history data available</p>
          )}
        </div>
      )}
    </div>
  );
}