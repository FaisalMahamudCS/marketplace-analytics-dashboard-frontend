import { renderHook, act } from '@testing-library/react';
import { useDashboard } from '@/hooks/useDashboard';
import { ApiResponse } from '@/types/marketplace';
import { apiService } from '@/lib/api';
import { socketService } from '@/lib/socket';

// Mock the API service
jest.mock('@/lib/api');
const mockedApiService = apiService as jest.Mocked<typeof apiService>;

// Mock the socket service
jest.mock('@/lib/socket');
const mockedSocketService = socketService as jest.Mocked<typeof socketService>;

describe('useDashboard', () => {
    const mockSocket = {
        on: jest.fn(),
        off: jest.fn(),
        connected: true,
    } as unknown as ReturnType<typeof socketService.connect>;

    const mockApiResponse: ApiResponse[] = [
        {
            id: '1',
            createdAt: '2024-01-01T00:00:00Z',
            data: {
                json: {
                    timestamp: 1704067200000,
                    activeDeals: 100,
                    newDeals: 5,
                    averageDealValueUSD: 25000,
                    offersSubmitted: 10,
                    userViews: 200,
                },
            },
        },
        {
            id: '2',
            createdAt: '2024-01-01T00:05:00Z',
            data: {
                json: {
                    timestamp: 1704067500000,
                    activeDeals: 105,
                    newDeals: 3,
                    averageDealValueUSD: 30000,
                    offersSubmitted: 15,
                    userViews: 250,
                },
            },
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
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(mockedApiService.fetchResponses).toHaveBeenCalledTimes(1);
        expect(result.current.responses).toEqual(mockApiResponse);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it('should handle fetch errors', async () => {
        const errorMessage = 'Failed to fetch data';
        mockedApiService.fetchResponses.mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useDashboard());

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(errorMessage);
        expect(result.current.responses).toEqual([]);
    });

    it('should set up socket connection on mount', () => {
        renderHook(() => useDashboard());

        expect(mockedSocketService.connect).toHaveBeenCalledTimes(1);
        expect(mockSocket.on).toHaveBeenCalledWith('new_response', expect.any(Function));
    });

    it('should add new response when socket event is received', async () => {
        const { result } = renderHook(() => useDashboard());

        // Wait for initial data to load
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        const newResponse: ApiResponse = {
            id: '3',
            createdAt: '2024-01-01T00:10:00Z',
            data: {
                json: {
                    timestamp: 1704067800000,
                    activeDeals: 110,
                    newDeals: 7,
                    averageDealValueUSD: 35000,
                    offersSubmitted: 20,
                    userViews: 300,
                },
            },
        };

        // Simulate socket event
        act(() => {
            const onNewResponse = mockSocket.on.mock.calls.find(
                call => call[0] === 'new_response'
            )?.[1];
            if (onNewResponse) {
                onNewResponse(newResponse);
            }
        });

        expect(result.current.responses).toHaveLength(3);
        expect(result.current.responses[0]).toEqual(newResponse);
    });

    it('should generate chart data correctly', async () => {
        const { result } = renderHook(() => useDashboard());

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.chartData).toHaveLength(2);
        expect(result.current.chartData[0]).toEqual({
            time: '12:00:00 AM',
            activeDeals: 100,
            newDeals: 5,
            offersSubmitted: 10,
            userViews: 200,
            averageDealValueUSD: 25000,
        });
    });

    it('should refresh data when refreshData is called', async () => {
        const { result } = renderHook(() => useDashboard());

        // Wait for initial data to load
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Clear the mock to verify it's called again
        mockedApiService.fetchResponses.mockClear();

        act(() => {
            result.current.refreshData();
        });

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(mockedApiService.fetchResponses).toHaveBeenCalledTimes(1);
    });

    it('should clean up socket connection on unmount', () => {
        const { unmount } = renderHook(() => useDashboard());

        unmount();

        expect(mockSocket.off).toHaveBeenCalledWith('new_response');
        expect(mockedSocketService.disconnect).toHaveBeenCalledTimes(1);
    });
});
