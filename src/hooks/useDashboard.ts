'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, DashboardState, ChartDataPoint } from '@/types/marketplace';
import { apiService } from '@/lib/api';
import { socketService } from '@/lib/socket';

export const useDashboard = () => {
  const [state, setState] = useState<DashboardState>({
    responses: [],
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const responses = await apiService.fetchResponses();
      setState(prev => ({
        ...prev,
        responses,
        loading: false,
        lastUpdated: new Date(),
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  }, []);

  const addNewResponse = useCallback((newResponse: ApiResponse) => {
    setState(prev => ({
      ...prev,
      responses: [newResponse, ...prev.responses],
      lastUpdated: new Date(),
    }));
  }, []);

  useEffect(() => {
    fetchData();

    // Set up WebSocket connection
    const socket = socketService.connect();

    socket.on('new_response', addNewResponse);

    return () => {
      socket.off('new_response');
      socketService.disconnect();
    };
  }, [fetchData, addNewResponse]);

  const chartData: ChartDataPoint[] = state.responses.map(response => ({
    time: new Date(response.createdAt).toLocaleTimeString(),
    activeDeals: response.data.json.activeDeals,
    newDeals: response.data.json.newDeals,
    offersSubmitted: response.data.json.offersSubmitted,
    userViews: response.data.json.userViews,
    averageDealValueUSD: response.data.json.averageDealValueUSD,
  }));

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    chartData,
    refreshData,
    isConnected: socketService.isConnected(),
  };
};
