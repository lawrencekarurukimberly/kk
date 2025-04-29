// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';  // Use Navigate instead of Redirect
import { auth } from '../firebase'; // Import firebase auth
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);  // Set authentication state based on user
    });

    return () => unsubscribe();  // Cleanup listener
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;  // Optionally show a loading state
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;  // Render protected route if authenticated
};

export default PrivateRoute;
