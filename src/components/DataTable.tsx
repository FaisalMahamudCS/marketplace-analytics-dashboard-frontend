'use client';

import { ApiResponse } from '@/types/marketplace';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataTableProps {
  data: ApiResponse[];
  loading?: boolean;
}

export const DataTable = ({ data, loading }: DataTableProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium text-sm text-gray-600">Time</th>
                <th className="text-left p-2 font-medium text-sm text-gray-600">Active Deals</th>
                <th className="text-left p-2 font-medium text-sm text-gray-600">New Deals</th>
                <th className="text-left p-2 font-medium text-sm text-gray-600">Avg Deal Value</th>
                <th className="text-left p-2 font-medium text-sm text-gray-600">Offers</th>
                <th className="text-left p-2 font-medium text-sm text-gray-600">User Views</th>
              </tr>
            </thead>
            <tbody>
              {data?.length>0 && data?.map((response, index) => (
                <tr key={response.id || index} className="border-b hover:bg-gray-50">
                  <td className="p-2 text-sm">
                    {new Date(response.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 text-sm font-medium">
                    {response.data.json.activeDeals}
                  </td>
                  <td className="p-2 text-sm">
                    {response.data.json.newDeals}
                  </td>
                  <td className="p-2 text-sm">
                    ${response.data.json.averageDealValueUSD.toLocaleString()}
                  </td>
                  <td className="p-2 text-sm">
                    {response.data.json.offersSubmitted}
                  </td>
                  <td className="p-2 text-sm">
                    {response.data.json.userViews}
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
