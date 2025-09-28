import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import apiService from '../services/api';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && apiService.isAuthenticated();

  const logout = () => {
    setUser(null);
    apiService.logout();
  };

  const refreshUser = async () => {
    if (!apiService.isAuthenticated()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiService.getProfile();
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // If token is invalid, logout user
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check for stored user data and token on mount
    const storedUser = localStorage.getItem('userData');
    const hasToken = apiService.isAuthenticated();
    
    if (storedUser && hasToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Verify token validity by fetching fresh user data
        refreshUser();
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        logout();
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Sync user data to localStorage
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userData');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated, 
      setUser, 
      logout, 
      refreshUser 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};