import { renderHook, act } from '@testing-library/react';
import { useDashboard } from '@/hooks/useDashboard';
import { ApiResponse } from '@/types/marketplace';
import { apiService } from '@/lib/api';
import { socketService } from '@/lib/socket';

// Mock dependencies
jest.mock('@/lib/api');
jest.mock('@/lib/socket');

const mockedApiService = apiService as jest.Mocked<typeof apiService>;
const mockedSocketService = socketService as jest.Mocked<typeof socketService>;

describe('useDashboard', () => {
  const mockSocket = {
    on: jest.fn(),
    off: jest.fn(),
  } as unknown as ReturnType<typeof socketService.connect>;

  const mockApiResponse: ApiResponse[] = [
    {
      id: '1',
      createdAt: '2024-01-01T00:00:00Z',
      activeDeals: 100,
      newDeals: 5,
      averageDealValueUSD: 25000,
      offersSubmitted: 10,
      userViews: 200,
    },
    {
      id: '2',
      createdAt: '2024-01-01T00:05:00Z',
      activeDeals: 105,
      newDeals: 3,
      averageDealValueUSD: 30000,
      offersSubmitted: 15,
      userViews: 250,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedSocketService.connect.mockReturnValue(mockSocket);
    mockedSocketService.isConnected.mockReturnValue(true);
    mockedApiService.fetchResponses.mockResolvedValue(mockApiResponse);
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useDashboard());
    expect(result.current.loading).toBe(true);
    expect(result.current.responses).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('should fetch data on mount', async () => {
    const { result } = renderHook(() => useDashboard());
    await act(async () => {
      await new Promise(r => setTimeout(r, 0));
    });

    expect(mockedApiService.fetchResponses).toHaveBeenCalledTimes(1);
    expect(result.current.responses).toEqual(mockApiResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch errors', async () => {
    mockedApiService.fetchResponses.mockRejectedValueOnce(new Error('Failed to fetch data'));
    const { result } = renderHook(() => useDashboard());
    await act(async () => {
      await new Promise(r => setTimeout(r, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch data');
    expect(result.current.responses).toEqual([]);
  });

  it('should set up socket connection on mount', () => {
    renderHook(() => useDashboard());
    expect(mockedSocketService.connect).toHaveBeenCalledTimes(1);
    expect(mockSocket.on).toHaveBeenCalledWith('newResponse', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('latestResponse', expect.any(Function));
  });

  it('should add new response when socket event is received', async () => {
    const { result } = renderHook(() => useDashboard());
    await act(async () => {
      await new Promise(r => setTimeout(r, 0));
    });

    const newResponse: ApiResponse = {
      id: '3',
      createdAt: '2024-01-01T00:10:00Z',
      activeDeals: 110,
      newDeals: 7,
      averageDealValueUSD: 35000,
      offersSubmitted: 20,
      userViews: 300,
    };

    act(() => {
      const onNewResponse = mockSocket.on.mock.calls.find(c => c[0] === 'newResponse')?.[1];
      onNewResponse && onNewResponse({ data: newResponse });
    });

    const responses = Array.isArray(result.current.responses)
      ? result.current.responses
      : result.current.responses.data;

    expect(responses.length).toBe(3);
    expect(responses[0]).toEqual(newResponse);
  });

  it('should generate chart data correctly', async () => {
    const { result } = renderHook(() => useDashboard());
    await act(async () => {
      await new Promise(r => setTimeout(r, 0));
    });

    expect(result.current.chartData).toHaveLength(2);
    expect(result.current.chartData[0]).toMatchObject({
      activeDeals: 100,
      newDeals: 5,
      offersSubmitted: 10,
      userViews: 200,
      averageDealValueUSD: 25000,
    });
    expect(result.current.chartData[0].time).toBeDefined();
  });

  it('should refresh data when refreshData is called', async () => {
    const { result } = renderHook(() => useDashboard());
    await act(async () => {
      await new Promise(r => setTimeout(r, 0));
    });

    mockedApiService.fetchResponses.mockClear();
    act(() => result.current.refreshData());
    await act(async () => {
      await new Promise(r => setTimeout(r, 0));
    });
    expect(mockedApiService.fetchResponses).toHaveBeenCalledTimes(1);
  });

  it('should clean up socket connection on unmount', () => {
    const { unmount } = renderHook(() => useDashboard());
    unmount();
    expect(mockSocket.off).toHaveBeenCalledWith('latestResponse', expect.any(Function));
    expect(mockSocket.off).toHaveBeenCalledWith('newResponse', expect.any(Function));
    expect(mockedSocketService.disconnect).toHaveBeenCalledTimes(1);
  });
});
