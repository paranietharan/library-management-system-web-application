import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path according to your file structure

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  console.log('Protected', user);

  if (!user || !user.isAuthenticated) {
    console.log('ProtectedRoute: User not authenticated');
	  // User not authenticated
	  return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    console.log('ProtectedRoute: User does not have the required role');
	  // User does not have the required role
	  return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page or handle as needed
  }

  return children;
};

export default ProtectedRoute;