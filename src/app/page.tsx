'use client';

import { useDashboard } from '@/hooks/useDashboard';
import { MarketplaceChart } from '@/components/MarketplaceChart';
import { DataTable } from '@/components/DataTable';
import { DataCards } from '@/components/DataCards';
import { StatusIndicator } from '@/components/StatusIndicator';
import { ErrorMessage } from '@/components/ui/loading';
import { ApiResponse } from '@/types/marketplace';
import { SummaryMetrics } from '@/components/SummaryMetrics';

// Helper function to get responses data safely (same as in useDashboard)
const getResponsesData = (responses: ApiResponse[] | { data: ApiResponse[] }): ApiResponse[] => {
  return Array.isArray(responses) ? responses : responses.data;
};

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
      <div className="min-h-screen p-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6 text-foreground">
            Marketplace Dashboard
          </h1>
          <ErrorMessage message={error} onRetry={refreshData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Marketplace Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time marketplace analytics and monitoring
          </p>
        </header>

          <StatusIndicator
            isConnected={isConnected}
            lastUpdated={lastUpdated}
            onRefresh={refreshData}
            loading={loading}
          />


        <SummaryMetrics data={getResponsesData(responses)} />

        <MarketplaceChart data={chartData} loading={loading} />

        <div className="block md:hidden">
          <DataCards data={getResponsesData(responses)} loading={loading} />
        </div>

        <div className="hidden md:block">
          <DataTable data={getResponsesData(responses)} loading={loading} />
        </div>
      </div>
    </div>
  );
}
