import { ApiResponse } from '@/types/marketplace';
import { apiService } from '@/lib/api';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = jest.mocked(axios);

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
                    activeDeals: 100,
                    newDeals: 5,
                    averageDealValueUSD: 25000,
                    offersSubmitted: 10,
                    userViews: 200,
                },
            ];

            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await apiService.fetchResponses();

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.API_BASE_URL}/responses`,
                { timeout: 10000, headers: { 'Content-Type': 'application/json' } }
            );
            expect(result).toEqual(mockData);
        });

        it('should handle fetch errors', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network Error'));
            await expect(apiService.fetchResponses()).rejects.toThrow(
                'Failed to fetch marketplace data'
            );
        });
    });

    describe('fetchLatestResponse', () => {
        it('should fetch latest response successfully', async () => {
            const mockData: ApiResponse = {
                id: '1',
                createdAt: '2024-01-01T00:00:00Z',
                activeDeals: 100,
                newDeals: 5,
                averageDealValueUSD: 25000,
                offersSubmitted: 10,
                userViews: 200,
            };

            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await apiService.fetchLatestResponse();

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.API_BASE_URL}/responses/latest`,
                { timeout: 10000, headers: { 'Content-Type': 'application/json' } }
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
