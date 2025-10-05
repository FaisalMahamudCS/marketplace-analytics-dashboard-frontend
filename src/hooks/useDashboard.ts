'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, DashboardState, ChartDataPoint } from '@/types/marketplace';
import { apiService } from '@/lib/api';
import { socketService } from '@/lib/socket';

export const useDashboard = () => {
  const [state, setState] = useState<DashboardState>({
    responses: { data: [] },
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
        responses: { data: responses },
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
  const addNewResponse = useCallback((payload: { data: ApiResponse | ApiResponse[] }) => {
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
  console.log("state.responses", Array.isArray(state.responses?.data), state.responses);
  const chartData: ChartDataPoint[] =
    Array.isArray(state.responses?.data) && state.responses?.data?.length > 0
      ? state.responses?.data?.map(response => ({
        time: new Date(response.createdAt).toLocaleTimeString(),
        activeDeals: response?.activeDeals ?? 0,
        newDeals: response?.newDeals ?? 0,
        offersSubmitted: response?.offersSubmitted ?? 0,
        userViews: response?.userViews ?? 0,
        averageDealValueUSD: response?.averageDealValueUSD ?? 0,
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
