import { ApiResponse } from '@/types/marketplace';
import { apiService } from '@/lib/api';

// Mock axios
jest.mock('axios');
const mockedAxios = jest.mocked(require('axios'));

describe('ApiService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchResponses', () => {
        it('should fetch responses successfully', async () => {
            const mockData: ApiResponse[] = [
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
            ];

            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await apiService.fetchResponses();

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:3000/responses',
                {
                    timeout: 10000,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            expect(result).toEqual(mockData);
        });

        it('should handle fetch errors', async () => {
            const errorMessage = 'Network Error';
            mockedAxios.get.mockRejectedValue(new Error(errorMessage));

            await expect(apiService.fetchResponses()).rejects.toThrow(
                'Failed to fetch marketplace data'
            );
        });
    });

    describe('fetchResponseById', () => {
        it('should fetch response by ID successfully', async () => {
            const mockData: ApiResponse = {
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
            };

            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await apiService.fetchResponseById('1');

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:3000/responses/1',
                {
                    timeout: 10000,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            expect(result).toEqual(mockData);
        });

        it('should handle fetch by ID errors', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Not Found'));

            await expect(apiService.fetchResponseById('1')).rejects.toThrow(
                'Failed to fetch marketplace data'
            );
        });
    });

    describe('fetchLatestResponse', () => {
        it('should fetch latest response successfully', async () => {
            const mockData: ApiResponse = {
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
            };

            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await apiService.fetchLatestResponse();

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:3000/responses/latest',
                {
                    timeout: 10000,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            expect(result).toEqual(mockData);
        });

        it('should handle fetch latest errors', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Server Error'));

            await expect(apiService.fetchLatestResponse()).rejects.toThrow(
                'Failed to fetch latest marketplace data'
            );
        });
    });
});
