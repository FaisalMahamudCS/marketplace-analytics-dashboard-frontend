'use client';

import { ApiResponse } from '@/types/marketplace';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataCardsProps {
  data: ApiResponse[];
  loading?: boolean;
}

export const DataCards = ({ data, loading }: DataCardsProps) => {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.length>0 && data?.slice(0, 6).map((response, index) => (
        <Card key={response.id || index} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {new Date(response.createdAt).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Active Deals:</span>
              <span className="text-sm font-medium">{response.data.json.activeDeals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">New Deals:</span>
              <span className="text-sm font-medium">{response.data.json.newDeals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Avg Value:</span>
              <span className="text-sm font-medium">
                ${response.data.json.averageDealValueUSD.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Offers:</span>
              <span className="text-sm font-medium">{response.data.json.offersSubmitted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Views:</span>
              <span className="text-sm font-medium">{response.data.json.userViews}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
