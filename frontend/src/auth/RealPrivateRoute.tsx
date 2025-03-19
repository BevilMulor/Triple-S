// src/components/RealPrivateRoute.tsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './realAuthContext';

interface RealPrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // Define which roles are allowed to access this route
}

const RealPrivateRoute: React.FC<RealPrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isLoggedIn, user } = useAuth();

  // Retrieve role from localStorage in case it's not in user object

  useEffect(() => {
    console.log(`isLoggedIn: ${isLoggedIn}, user:`, user);
  }, [isLoggedIn, user]);

  // Redirect to login if not authenticated
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  //Get the role (priority: user.role → storedRole)
 let userRole=user.role;
 // Redirect if role is not allowed
  if (!userRole || !allowedRoles.includes(userRole)) {
    console.log('this is the code running', 'user role from local storage', userRole)
    return <Navigate to="/login" replace />;
  }

  //Render the protected content
  return <>{children}</>;
};

export default RealPrivateRoute;