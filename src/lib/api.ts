import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '@/types/marketplace';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async fetchResponses(): Promise<ApiResponse[]> {
    try {
      const response: AxiosResponse<ApiResponse[]> = await axios.get(
        `${this.baseURL}/responses`,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching responses:', error);
      throw new Error('Failed to fetch marketplace data');
    }
  }

  async fetchResponseById(id: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(
        `${this.baseURL}/responses/${id}`,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching response by ID:', error);
      throw new Error('Failed to fetch marketplace data');
    }
  }

  async fetchLatestResponse(): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(
        `${this.baseURL}/responses/latest`,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching latest response:', error);
      throw new Error('Failed to fetch latest marketplace data');
    }
  }
}

export const apiService = new ApiService();
export default apiService;
