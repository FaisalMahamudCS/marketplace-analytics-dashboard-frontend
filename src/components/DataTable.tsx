'use client';

import { ApiResponse } from '@/types/marketplace';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { exportResponsesToCSV } from '@/lib/utils';
import { Button } from './ui/button';

interface DataTableProps {
  data: ApiResponse[];
  loading?: boolean;
}

export const DataTable = ({ data, loading }: DataTableProps) => {
  if (loading) {
    return (
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-foreground">Realtime Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground">Analytical Data</CardTitle>
          <Button
            variant="outline"
            onClick={() => exportResponsesToCSV(data)}
          >
            Export CSV
          </Button>
        </div>

      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-semibold text-sm text-muted-foreground">Time</th>
                <th className="text-left p-3 font-semibold text-sm text-muted-foreground">Active Deals</th>
                <th className="text-left p-3 font-semibold text-sm text-muted-foreground">New Deals</th>
                <th className="text-left p-3 font-semibold text-sm text-muted-foreground">Avg Deal Value</th>
                <th className="text-left p-3 font-semibold text-sm text-muted-foreground">Offers</th>
                <th className="text-left p-3 font-semibold text-sm text-muted-foreground">User Views</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 && data?.map((response, index) => (
                <tr key={response.id || index} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="p-3 text-sm text-foreground">
                    {new Date(response.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm font-semibold text-foreground">
                    {response.activeDeals}
                  </td>
                  <td className="p-3 text-sm text-foreground">
                    {response.newDeals}
                  </td>
                  <td className="p-3 text-sm text-foreground">
                    ${response.averageDealValueUSD.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-foreground">
                    {response.offersSubmitted}
                  </td>
                  <td className="p-3 text-sm text-foreground">
                    {response.userViews}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
