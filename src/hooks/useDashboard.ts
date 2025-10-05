'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, DashboardState, ChartDataPoint } from '@/types/marketplace';

interface DashboardHookState {
  responses: ApiResponse[] | { data: ApiResponse[] };
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// Type guard to check if responses is an array
const isResponsesArray = (responses: ApiResponse[] | { data: ApiResponse[] }): responses is ApiResponse[] => {
  return Array.isArray(responses);
};

// Helper function to get responses data safely
const getResponsesData = (responses: ApiResponse[] | { data: ApiResponse[] }): ApiResponse[] => {
  return isResponsesArray(responses) ? responses : responses.data;
};
import { apiService } from '@/lib/api';
import { socketService } from '@/lib/socket';

export const useDashboard = () => {
  const [state, setState] = useState<DashboardHookState>({
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

  const addNewResponse = useCallback((payload: { data: ApiResponse | ApiResponse[] }) => {
    console.log('New response payload:', payload);

    const newResponses: ApiResponse[] = Array.isArray(payload.data)
      ? payload.data
      : [payload.data];
    setState(prev => ({
      ...prev,
      responses: {
        ...(isResponsesArray(prev.responses) ? {} : prev.responses),
        data: [
          ...newResponses,
          ...getResponsesData(prev.responses),
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
  const responsesData = getResponsesData(state.responses);
  const chartData: ChartDataPoint[] = responsesData.length > 0
    ? responsesData.map((response: ApiResponse) => ({
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
