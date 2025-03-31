// src/context/ApiContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

// Define API URLs for different environments
const API_URLS: Record<string, string> = {
  development: 'http://localhost:3000', // For local development
  production: 'https://latestbackend.vercel.app/', // For production
};

// Create the context and define the type for the URL
const ApiContext = createContext<string | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  // Determine the current environment
  const environment = process.env.NODE_ENV || 'development'; // Defaults to 'development' if not set
  
  // Set the API URL based on the environment
  const apiUrl = API_URLS[environment];

  return (
    <ApiContext.Provider value={apiUrl}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API URL
export const useApiUrl = (): string => {
  const apiUrl = useContext(ApiContext);
  
  if (!apiUrl) {
    throw new Error('useApiUrl must be used within an ApiProvider');
  }
  
  return apiUrl;
};
