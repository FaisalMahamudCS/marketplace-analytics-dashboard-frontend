export interface MarketplacePayload {
  timestamp: number;
  activeDeals: number;
  newDeals: number;
  averageDealValueUSD: number;
  offersSubmitted: number;
  userViews: number;
}

export interface ApiResponse {
  id: string;
  createdAt: string;
  activeDeals: number;
  newDeals: number;
  averageDealValueUSD: number;
  offersSubmitted: number;
  userViews: number;
}

export interface ChartDataPoint {
  time: string;
  activeDeals: number;
  newDeals: number;
  offersSubmitted: number;
  userViews: number;
  averageDealValueUSD: number;
}

export interface DashboardState {
  responses: {
    data: ApiResponse[];
  };
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}
