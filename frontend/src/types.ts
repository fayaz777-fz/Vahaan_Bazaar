// Vehicle Types
export interface Vehicle {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  discount: number;
  type: 'bike' | 'scooter' | 'car';
  condition: 'new' | 'used' | 'certified-pre-owned';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'cng';
  transmission: 'manual' | 'automatic' | 'cvt';
  engineCapacity: number;
  mileage: number;
  images: string[];
  description: string;
  features: string[];
  specifications: {
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
      wheelbase?: number;
    };
    weight?: number;
    tankCapacity?: number;
    topSpeed?: number;
    acceleration?: string;
    brakes?: string;
    suspension?: string;
    tyres?: string;
  };
  availability: 'available' | 'sold' | 'reserved';
  location: {
    city?: string;
    state?: string;
    country: string;
  };
  seller: {
    _id: string;
    name: string;
    email: string;
    contactInfo?: {
      phone?: string;
      email?: string;
      whatsapp?: string;
    };
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  isPromoted: boolean;
  rating: number;
  reviewCount: number;
  viewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Legacy types for backward compatibility
export interface Bike extends Omit<Vehicle, 'type'> {
  id: string;
  daysUsed: number;
  presentPrice: number;
  pastPrice: number;
  license: string;
  type: 'Petrol' | 'Electric';
  batteryCapacity?: string;
}

export interface Scooter extends Omit<Vehicle, 'type'> {
  id: string;
  daysUsed: number;
  presentPrice: number;
  pastPrice: number;
  license: string;
  type: 'Petrol' | 'Electric';
  batteryCapacity?: string;
}

// Review Types
export interface Review {
  _id: string;
  vehicle: string | Vehicle;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  isVerified: boolean;
  helpfulCount: number;
  isActive: boolean;
  createdAt: string;
}

// Service Request Types
export interface ServiceRequest {
  _id: string;
  user: string | User;
  serviceType: 'insurance' | 'loan' | 'service' | 'roadside-assistance' | 'warranty';
  vehicleDetails?: {
    type?: 'bike' | 'scooter' | 'car';
    brand?: string;
    model?: string;
    year?: number;
    registrationNumber?: string;
  };
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      pincode?: string;
    };
  };
  serviceDetails?: {
    description?: string;
    preferredDate?: string;
    preferredTime?: string;
    urgency: 'low' | 'medium' | 'high';
  };
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  estimatedCost: number;
  actualCost: number;
  notes: {
    message: string;
    timestamp: string;
    addedBy: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Feedback Types
export interface Feedback {
  _id: string;
  user: string | User;
  type: 'general' | 'bug-report' | 'feature-request' | 'complaint' | 'suggestion';
  subject: string;
  message: string;
  rating?: number;
  status: 'open' | 'in-review' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  response?: {
    message: string;
    respondedBy: string;
    respondedAt: string;
  };
  attachments: {
    filename: string;
    url: string;
  }[];
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
}

// Contact Types
export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category: 'general' | 'support' | 'sales' | 'feedback' | 'complaint' | 'partnership';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  responseMessage?: string;
  respondedBy?: string;
  respondedAt?: string;
  source: 'website' | 'mobile-app' | 'phone' | 'email' | 'social-media';
  ipAddress?: string;
  userAgent?: string;
  tags: string[];
  internalNotes?: string;
  responseTime?: number;
  isResolved: boolean;
  daysSinceCreated: number;
  createdAt: string;
  updatedAt: string;
}

// EMI Calculator Types
export interface EMICalculation {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  principal: number;
  rate: number;
  tenure: number;
}

// Pagination Types
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// User and Authentication Types
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string>;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
}

// API Response Types
export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  message: string;
  data: T & {
    pagination: Pagination;
  };
}