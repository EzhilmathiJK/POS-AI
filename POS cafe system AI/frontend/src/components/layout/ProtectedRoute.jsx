import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const ProtectedRoute = ({ pageKey }) => {
  const { currentPermissions, currentUser, triggerUnauthorized } = useAppContext();
  
  const notLoggedIn = !currentUser || !currentUser.role;
  const isForbidden = pageKey && currentPermissions[pageKey] !== true;

  useEffect(() => {
    if (isForbidden && !notLoggedIn) {
      triggerUnauthorized('forbidden');
    }
  }, [notLoggedIn, isForbidden, triggerUnauthorized]);

  if (notLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isForbidden) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
