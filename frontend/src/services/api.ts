import { 
  AuthResponse, 
  LoginData, 
  SignupData, 
  User, 
  UpdateProfileData, 
  ApiError,
  Vehicle,
  Bike,
  Scooter,
  Contact,
  Review,
  ServiceRequest,
  Feedback,
  EMICalculation,
  ApiResponse,
  PaginatedResponse
} from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  private removeAuthToken(): void {
    localStorage.removeItem('authToken');
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getAuthToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || 'Something went wrong',
          errors: data.errors || null,
          status: response.status,
        } as ApiError & { status: number };
      }

      return data;
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError) {
        throw {
          message: 'Network error: Please check your internet connection and ensure the backend server is running',
        } as ApiError;
      }
      
      // Re-throw API errors
      throw error;
    }
  }

  // Authentication endpoints
  async signup(userData: SignupData): Promise<AuthResponse> {
    const response = await this.makeRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Store token after successful signup
    this.setAuthToken(response.data.token);
    return response;
  }

  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await this.makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store token after successful login
    this.setAuthToken(response.data.token);
    return response;
  }

  async getProfile(): Promise<{ message: string; data: { user: User } }> {
    return await this.makeRequest<{ message: string; data: { user: User } }>('/auth/profile');
  }

  async updateProfile(userData: UpdateProfileData): Promise<{ message: string; data: { user: User } }> {
    return await this.makeRequest<{ message: string; data: { user: User } }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async checkHealth(): Promise<{ message: string; status: string; timestamp: string }> {
    return await this.makeRequest<{ message: string; status: string; timestamp: string }>('/health');
  }

  // Vehicle endpoints
  async getVehicles(params?: {
    page?: number;
    limit?: number;
    type?: string;
    condition?: string;
    brand?: string;
    model?: string;
    minPrice?: number;
    maxPrice?: number;
    fuelType?: string;
    transmission?: string;
    location?: string;
    sort?: string;
    order?: string;
    search?: string;
  }): Promise<PaginatedResponse<{ vehicles: Vehicle[] }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<PaginatedResponse<{ vehicles: Vehicle[] }>>(
      `/vehicles?${queryParams.toString()}`
    );
  }

  async getVehicle(id: string, includeReviews = true): Promise<ApiResponse<{ vehicle: Vehicle; reviews?: Review[] }>> {
    return await this.makeRequest<ApiResponse<{ vehicle: Vehicle; reviews?: Review[] }>>(`/vehicles/${id}`);
  }

  async createVehicle(vehicleData: Partial<Vehicle>): Promise<ApiResponse<{ vehicle: Vehicle }>> {
    return await this.makeRequest<ApiResponse<{ vehicle: Vehicle }>>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
    });
  }

  async updateVehicle(id: string, vehicleData: Partial<Vehicle>): Promise<ApiResponse<{ vehicle: Vehicle }>> {
    return await this.makeRequest<ApiResponse<{ vehicle: Vehicle }>>(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehicleData),
    });
  }

  async deleteVehicle(id: string): Promise<ApiResponse<{}>> {
    return await this.makeRequest<ApiResponse<{}>>(`/vehicles/${id}`, {
      method: 'DELETE',
    });
  }

  async getMyVehicleListings(): Promise<ApiResponse<{ vehicles: Vehicle[] }>> {
    return await this.makeRequest<ApiResponse<{ vehicles: Vehicle[] }>>('/vehicles/user/my-listings');
  }

  async getFeaturedVehicles(): Promise<ApiResponse<{ vehicles: Vehicle[] }>> {
    return await this.makeRequest<ApiResponse<{ vehicles: Vehicle[] }>>('/vehicles/featured');
  }

  async getVehicleBrands(): Promise<ApiResponse<{ brands: string[] }>> {
    return await this.makeRequest<ApiResponse<{ brands: string[] }>>('/vehicles/meta/brands');
  }

  async getVehicleModels(brand: string): Promise<ApiResponse<{ models: string[] }>> {
    return await this.makeRequest<ApiResponse<{ models: string[] }>>(`/vehicles/meta/models/${brand}`);
  }

  // Review endpoints
  async getVehicleReviews(vehicleId: string, page = 1, limit = 10): Promise<PaginatedResponse<{ reviews: Review[] }>> {
    return await this.makeRequest<PaginatedResponse<{ reviews: Review[] }>>(
      `/reviews/vehicle/${vehicleId}?page=${page}&limit=${limit}`
    );
  }

  async createReview(reviewData: {
    vehicle: string;
    rating: number;
    title: string;
    comment: string;
    pros?: string[];
    cons?: string[];
  }): Promise<ApiResponse<{ review: Review }>> {
    return await this.makeRequest<ApiResponse<{ review: Review }>>('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async updateReview(id: string, reviewData: Partial<Review>): Promise<ApiResponse<{ review: Review }>> {
    return await this.makeRequest<ApiResponse<{ review: Review }>>(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  }

  async deleteReview(id: string): Promise<ApiResponse<{}>> {
    return await this.makeRequest<ApiResponse<{}>>(`/reviews/${id}`, {
      method: 'DELETE',
    });
  }

  async markReviewHelpful(id: string): Promise<ApiResponse<{ helpfulCount: number }>> {
    return await this.makeRequest<ApiResponse<{ helpfulCount: number }>>(`/reviews/${id}/helpful`, {
      method: 'POST',
    });
  }

  async getMyReviews(): Promise<ApiResponse<{ reviews: Review[] }>> {
    return await this.makeRequest<ApiResponse<{ reviews: Review[] }>>('/reviews/user/my-reviews');
  }

  // Service endpoints
  async createServiceRequest(serviceData: Partial<ServiceRequest>): Promise<ApiResponse<{ serviceRequest: ServiceRequest }>> {
    return await this.makeRequest<ApiResponse<{ serviceRequest: ServiceRequest }>>('/services/request', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  }

  async getMyServiceRequests(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<{ requests: ServiceRequest[] }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<PaginatedResponse<{ requests: ServiceRequest[] }>>(
      `/services/my-requests?${queryParams.toString()}`
    );
  }

  async getServiceRequest(id: string): Promise<ApiResponse<{ request: ServiceRequest }>> {
    return await this.makeRequest<ApiResponse<{ request: ServiceRequest }>>(`/services/request/${id}`);
  }

  async updateServiceRequest(id: string, serviceData: Partial<ServiceRequest>): Promise<ApiResponse<{ request: ServiceRequest }>> {
    return await this.makeRequest<ApiResponse<{ request: ServiceRequest }>>(`/services/request/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });
  }

  async cancelServiceRequest(id: string): Promise<ApiResponse<{}>> {
    return await this.makeRequest<ApiResponse<{}>>(`/services/request/${id}`, {
      method: 'DELETE',
    });
  }

  async getServiceTypes(): Promise<ApiResponse<{ serviceTypes: any[] }>> {
    return await this.makeRequest<ApiResponse<{ serviceTypes: any[] }>>('/services/types');
  }

  async calculateEMI(params: {
    principal: number;
    rate: number;
    tenure: number;
  }): Promise<ApiResponse<EMICalculation>> {
    return await this.makeRequest<ApiResponse<EMICalculation>>('/services/emi-calculator', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // Bike-specific endpoints
  async getBikes(params?: {
    page?: number;
    limit?: number;
    type?: 'Petrol' | 'Electric';
    condition?: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    search?: string;
    availability?: 'available' | 'sold' | 'reserved';
    sort?: string;
  }): Promise<PaginatedResponse<{ bikes: Bike[] }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<PaginatedResponse<{ bikes: Bike[] }>>(
      `/bikes?${queryParams.toString()}`
    );
  }

  async getBike(id: string): Promise<ApiResponse<Bike>> {
    return await this.makeRequest<ApiResponse<Bike>>(`/bikes/${id}`);
  }

  async createBikeListing(bikeData: Partial<Bike> & {
    sellerName?: string;
    sellerEmail?: string;
    sellerPhone?: string;
    whatsapp?: string;
  }): Promise<ApiResponse<Bike>> {
    return await this.makeRequest<ApiResponse<Bike>>('/bikes', {
      method: 'POST',
      body: JSON.stringify(bikeData),
    });
  }

  async updateBikeListing(id: string, bikeData: Partial<Bike>): Promise<ApiResponse<Bike>> {
    return await this.makeRequest<ApiResponse<Bike>>(`/bikes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bikeData),
    });
  }

  async deleteBikeListing(id: string): Promise<ApiResponse<{}>> {
    return await this.makeRequest<ApiResponse<{}>>(`/bikes/${id}`, {
      method: 'DELETE',
    });
  }

  async markBikeAsSold(id: string): Promise<ApiResponse<Bike>> {
    return await this.makeRequest<ApiResponse<Bike>>(`/bikes/${id}/sold`, {
      method: 'PATCH',
    });
  }

  async getBikesByType(type: 'Petrol' | 'Electric', params?: {
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<PaginatedResponse<{ bikes: Bike[] }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<PaginatedResponse<{ bikes: Bike[] }>>(
      `/bikes/type/${type}?${queryParams.toString()}`
    );
  }

  async getBikesByPriceRange(minPrice: number, maxPrice: number, params?: {
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<PaginatedResponse<{ bikes: Bike[] }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<PaginatedResponse<{ bikes: Bike[] }>>(
      `/bikes/price-range/${minPrice}/${maxPrice}?${queryParams.toString()}`
    );
  }

  async getBikeStats(): Promise<ApiResponse<{
    total: number;
    available: number;
    sold: number;
    petrol: number;
    electric: number;
    priceStats: {
      avgPrice: number;
      minPrice: number;
      maxPrice: number;
    };
  }>> {
    return await this.makeRequest<ApiResponse<{
      total: number;
      available: number;
      sold: number;
      petrol: number;
      electric: number;
      priceStats: {
        avgPrice: number;
        minPrice: number;
        maxPrice: number;
      };
    }>>('/bikes/stats/overview');
  }

  // Scooter-specific endpoints
  async getScooters(params?: {
    page?: number;
    limit?: number;
    type?: 'Petrol' | 'Electric';
    condition?: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    search?: string;
    availability?: 'available' | 'sold' | 'reserved';
    sort?: string;
  }): Promise<PaginatedResponse<{ scooters: Scooter[] }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<PaginatedResponse<{ scooters: Scooter[] }>>(
      `/scooters?${queryParams.toString()}`
    );
  }

  async getScooter(id: string): Promise<ApiResponse<Scooter>> {
    return await this.makeRequest<ApiResponse<Scooter>>(`/scooters/${id}`);
  }

  async createScooterListing(scooterData: Partial<Scooter> & {
    sellerName?: string;
    sellerEmail?: string;
    sellerPhone?: string;
    whatsapp?: string;
  }): Promise<ApiResponse<Scooter>> {
    return await this.makeRequest<ApiResponse<Scooter>>('/scooters', {
      method: 'POST',
      body: JSON.stringify(scooterData),
    });
  }

  async updateScooterListing(id: string, scooterData: Partial<Scooter>): Promise<ApiResponse<Scooter>> {
    return await this.makeRequest<ApiResponse<Scooter>>(`/scooters/${id}`, {
      method: 'PUT',
      body: JSON.stringify(scooterData),
    });
  }

  async deleteScooterListing(id: string): Promise<ApiResponse<{}>> {
    return await this.makeRequest<ApiResponse<{}>>(`/scooters/${id}`, {
      method: 'DELETE',
    });
  }

  async markScooterAsSold(id: string): Promise<ApiResponse<Scooter>> {
    return await this.makeRequest<ApiResponse<Scooter>>(`/scooters/${id}/sold`, {
      method: 'PATCH',
    });
  }

  async getScootersByType(type: 'Petrol' | 'Electric', params?: {
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<PaginatedResponse<{ scooters: Scooter[] }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<PaginatedResponse<{ scooters: Scooter[] }>>(
      `/scooters/type/${type}?${queryParams.toString()}`
    );
  }

  async getScootersByPriceRange(minPrice: number, maxPrice: number, params?: {
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<PaginatedResponse<{ scooters: Scooter[] }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<PaginatedResponse<{ scooters: Scooter[] }>>(
      `/scooters/price-range/${minPrice}/${maxPrice}?${queryParams.toString()}`
    );
  }

  async getScooterStats(): Promise<ApiResponse<{
    total: number;
    available: number;
    sold: number;
    petrol: number;
    electric: number;
    priceStats: {
      avgPrice: number;
      minPrice: number;
      maxPrice: number;
    };
  }>> {
    return await this.makeRequest<ApiResponse<{
      total: number;
      available: number;
      sold: number;
      petrol: number;
      electric: number;
      priceStats: {
        avgPrice: number;
        minPrice: number;
        maxPrice: number;
      };
    }>>('/scooters/stats/overview');
  }

  // Contact endpoints
  async getContacts(params?: {
    page?: number;
    limit?: number;
    status?: 'new' | 'in-progress' | 'resolved' | 'closed';
    category?: 'general' | 'support' | 'sales' | 'feedback' | 'complaint' | 'partnership';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    startDate?: string;
    endDate?: string;
    search?: string;
    email?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<{ contacts: Contact[] }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<PaginatedResponse<{ contacts: Contact[] }>>(
      `/contacts?${queryParams.toString()}`
    );
  }

  async getContact(id: string): Promise<ApiResponse<Contact>> {
    return await this.makeRequest<ApiResponse<Contact>>(`/contacts/${id}`);
  }

  async createContact(contactData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    category?: 'general' | 'support' | 'sales' | 'feedback' | 'complaint' | 'partnership';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    source?: 'website' | 'mobile-app' | 'phone' | 'email' | 'social-media';
  }): Promise<ApiResponse<Contact>> {
    return await this.makeRequest<ApiResponse<Contact>>('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async updateContact(id: string, contactData: Partial<Contact>): Promise<ApiResponse<Contact>> {
    return await this.makeRequest<ApiResponse<Contact>>(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    });
  }

  async updateContactStatus(id: string, statusData: {
    status: 'new' | 'in-progress' | 'resolved' | 'closed';
    responseMessage?: string;
    respondedBy?: string;
  }): Promise<ApiResponse<Contact>> {
    return await this.makeRequest<ApiResponse<Contact>>(`/contacts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(statusData),
    });
  }

  async addContactTag(id: string, tag: string): Promise<ApiResponse<Contact>> {
    return await this.makeRequest<ApiResponse<Contact>>(`/contacts/${id}/tags`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'add', tag }),
    });
  }

  async removeContactTag(id: string, tag: string): Promise<ApiResponse<Contact>> {
    return await this.makeRequest<ApiResponse<Contact>>(`/contacts/${id}/tags`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'remove', tag }),
    });
  }

  async deleteContact(id: string): Promise<ApiResponse<{}>> {
    return await this.makeRequest<ApiResponse<{}>>(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  async getContactsByCategory(category: 'general' | 'support' | 'sales' | 'feedback' | 'complaint' | 'partnership', params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<{ contacts: Contact[] }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<PaginatedResponse<{ contacts: Contact[] }>>(
      `/contacts/category/${category}?${queryParams.toString()}`
    );
  }

  async getContactsByPriority(priority: 'low' | 'medium' | 'high' | 'urgent', params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<{ contacts: Contact[] }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<PaginatedResponse<{ contacts: Contact[] }>>(
      `/contacts/priority/${priority}?${queryParams.toString()}`
    );
  }

  async getContactStats(): Promise<ApiResponse<{
    total: number;
    new: number;
    inProgress: number;
    resolved: number;
    closed: number;
    urgent: number;
    high: number;
    medium: number;
    low: number;
    recentContacts: number;
    pendingContacts: number;
    categoryBreakdown: Array<{
      _id: string;
      count: number;
      avgResponseTime: number;
    }>;
  }>> {
    return await this.makeRequest<ApiResponse<{
      total: number;
      new: number;
      inProgress: number;
      resolved: number;
      closed: number;
      urgent: number;
      high: number;
      medium: number;
      low: number;
      recentContacts: number;
      pendingContacts: number;
      categoryBreakdown: Array<{
        _id: string;
        count: number;
        avgResponseTime: number;
      }>;
    }>>('/contacts/stats');
  }

  // Feedback endpoints
  async createFeedback(feedbackData: {
    type: string;
    subject: string;
    message: string;
    rating?: number;
    isAnonymous?: boolean;
  }): Promise<ApiResponse<{ feedback: Feedback }>> {
    return await this.makeRequest<ApiResponse<{ feedback: Feedback }>>('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  }

  async getMyFeedback(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<{ feedback: Feedback[]; pagination: any }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return await this.makeRequest<ApiResponse<{ feedback: Feedback[]; pagination: any }>>(
      `/feedback/my-feedback?${queryParams.toString()}`
    );
  }

  async getFeedback(id: string): Promise<ApiResponse<{ feedback: Feedback }>> {
    return await this.makeRequest<ApiResponse<{ feedback: Feedback }>>(`/feedback/${id}`);
  }

  async updateFeedback(id: string, feedbackData: Partial<Feedback>): Promise<ApiResponse<{ feedback: Feedback }>> {
    return await this.makeRequest<ApiResponse<{ feedback: Feedback }>>(`/feedback/${id}`, {
      method: 'PUT',
      body: JSON.stringify(feedbackData),
    });
  }

  async deleteFeedback(id: string): Promise<ApiResponse<{}>> {
    return await this.makeRequest<ApiResponse<{}>>(`/feedback/${id}`, {
      method: 'DELETE',
    });
  }

  async getFeedbackTypes(): Promise<ApiResponse<{ feedbackTypes: any[] }>> {
    return await this.makeRequest<ApiResponse<{ feedbackTypes: any[] }>>('/feedback/meta/types');
  }

  // Auth utility methods
  logout(): void {
    this.removeAuthToken();
    localStorage.removeItem('userData');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  getStoredToken(): string | null {
    return this.getAuthToken();
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;