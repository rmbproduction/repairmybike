import { API_CONFIG } from '../config/api.config';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
  }

  private async fetchData(endpoint: string) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async getServices() {
    return this.fetchData(API_CONFIG.endpoints.services);
  }

  async getMechanics() {
    return this.fetchData(API_CONFIG.endpoints.mechanics);
  }

  async getReviews() {
    return this.fetchData(API_CONFIG.endpoints.reviews);
  }

  // Add more API methods here
}

export const apiService = new ApiService();