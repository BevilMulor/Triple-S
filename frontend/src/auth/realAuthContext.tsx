// realAuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define types for our auth context state and methods
interface User {
  review(review: User): unknown;
  _id: any;
  email: string;
  discipline: string;
  role:string;
  // Add other user fields here as needed
}

interface RealAuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// Creating Context with default values
const RealAuthContext = createContext<RealAuthContextType | undefined>(undefined);

// Define the props for the provider component
interface RealAuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const RealAuthProvider = ({ children }: RealAuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Check if the user is already logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('loggedInUser');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData); // Parse the stored user data correctly
        console.log('Parsed User:', parsedUser); // Log the parsed user data
        setIsLoggedIn(true);
        setUser(parsedUser); // Set the user correctly
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
      }
    } else {
      console.log('No token or userData in localStorage');
    }
  }, []);

  const login = (token: string, userData: User) => {
    try {
      localStorage.setItem('authToken', token);
      localStorage.setItem('loggedInUser', JSON.stringify(userData)); // Store user data correctly
      console.log('User logged in:', userData); // Log user on login
      setIsLoggedIn(true);
      setUser(userData); // Set the user in the context
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      setIsLoggedIn(false);
      setUser(null); // Clear user data on logout
    } catch (error) {
      console.error('Error clearing localStorage on logout:', error);
    }
  };

  return (
    <RealAuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </RealAuthContext.Provider>
  );
};

// Custom Hook to Use the Auth Context
export const useAuth = (): RealAuthContextType => {
  const context = useContext(RealAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
// Goal

// To implement role-based access control (RBAC) and restrict access to specific parts of your application
//  (like a coach’s dashboard) based on the user's role (Talent, Coach, Scout), you can follow these steps:

// 1. Update Context to Include Role
// You already have the user's role stored in the context, so you can easily use that to manage access
//  control for specific parts of your app.

// 2. Implement Protected Routes
// You can create a wrapper component (PrivateRoute) that checks the user's role and whether they are logged in.
//  This component will handle navigation based on the role of the user.

// 3. Conditional Rendering Based on Role
// When a user logs in, they’ll get a role, and based on that, you can control what parts of the app they can access. 
// You can render different layouts or routes depending on the role.