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
  console.log("state", state);
  // Fetch initial data from API
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

  // Add new response(s) to state safely
  const addNewResponse = useCallback((payload: any) => {
    console.log('New response payload:', payload);

    const newResponses: ApiResponse[] = Array.isArray(payload.data)
      ? payload.data
      : [payload.data];
    setState(prev => ({
      ...prev,
      responses: {
        ...prev.responses, // keep other fields like total/page
        data: [
          ...newResponses,
          ...(Array.isArray(prev.responses?.data) ? prev.responses.data : []),
        ],
      },
      lastUpdated: new Date(),
    }));
  }, []);

  // WebSocket setup
  useEffect(() => {
    fetchData();

    const socket = socketService.connect();

    socket.on('latestResponse', addNewResponse);
    socket.on('newResponse', addNewResponse);

    return () => {
      socket.off('latestResponse', addNewResponse);
      socket.off('newResponse', addNewResponse);
      socketService.disconnect();
    };
  }, [fetchData, addNewResponse]);

  // Map responses to chart-friendly data
  const chartData: ChartDataPoint[] =
    Array.isArray(state.responses) && state.responses.length > 0
      ? state.responses.map(response => ({
        time: new Date(response.createdAt).toLocaleTimeString(),
        activeDeals: response.data?.activeDeals ?? 0,
        newDeals: response.data?.newDeals ?? 0,
        offersSubmitted: response.data?.offersSubmitted ?? 0,
        userViews: response.data?.userViews ?? 0,
        averageDealValueUSD: response.data?.averageDealValueUSD ?? 0,
      }))
      : [];

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
