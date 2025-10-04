'use client';

import { useDashboard } from '@/hooks/useDashboard';
import { MarketplaceChart } from '@/components/MarketplaceChart';
import { DataTable } from '@/components/DataTable';
import { DataCards } from '@/components/DataCards';
import { StatusIndicator } from '@/components/StatusIndicator';
import { ErrorMessage } from '@/components/ui/loading';

export default function Home() {
  const { 
    responses, 
    loading, 
    error, 
    chartData, 
    refreshData, 
    isConnected, 
    lastUpdated 
  } = useDashboard();

  if (error) {
    return (
      <div className="min-h-screen p-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">
            BizScout Marketplace Dashboard
          </h1>
          <ErrorMessage message={error} onRetry={refreshData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            BizScout Marketplace Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time marketplace analytics and monitoring
          </p>
        </header>

        <StatusIndicator 
          isConnected={isConnected}
          lastUpdated={lastUpdated}
          onRefresh={refreshData}
          loading={loading}
        />

        <MarketplaceChart data={chartData} loading={loading} />

        <div className="block md:hidden">
          <DataCards data={responses} loading={loading} />
        </div>

        <div className="hidden md:block">
          <DataTable data={responses} loading={loading} />
        </div>
      </div>
    </div>
  );
}
