"use client";

import { ApiResponse } from '@/types/marketplace';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataCardsProps {
  data: ApiResponse[];
  loading?: boolean;
}

export const DataCards = ({ data, loading }: DataCardsProps) => {
  console.log("card", data);
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      { data.length > 0 &&
        data.map((response, index) => (
          <Card key={response.id || index} className="hover:shadow-lg transition-all duration-200 border-border/50 shadow-sm hover:border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {new Date(response.createdAt).toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Deals:</span>
                <span className="text-sm font-semibold text-foreground">{response.activeDeals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">New Deals:</span>
                <span className="text-sm font-semibold text-foreground">{response.newDeals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Value:</span>
                <span className="text-sm font-semibold text-foreground">
                  ${response.averageDealValueUSD.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Offers:</span>
                <span className="text-sm font-semibold text-foreground">{response.offersSubmitted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Views:</span>
                <span className="text-sm font-semibold text-foreground">{response.userViews}</span>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};
