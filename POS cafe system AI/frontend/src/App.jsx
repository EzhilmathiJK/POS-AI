import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import BillingLayout from './pages/billing/BillingLayout';
import InventoryLayout from './pages/inventory/InventoryLayout';
import ItemRequestLayout from './pages/item-request/ItemRequestLayout';
import SalesReportLayout from './pages/sales-report/SalesReportLayout';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import UsersLayout from './pages/users/UsersLayout';
import SettingsLayout from './pages/settings/SettingsLayout';
import LoginPage from './pages/login/LoginPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import ActionModal from './components/ui/ActionModal';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GlobalModalHandler = () => {
  const { unauthorizedState, setUnauthorizedState } = useAppContext();

  useEffect(() => {
    const handleUnauthorized = (e) => {
      setUnauthorizedState({ isOpen: true, type: e.detail.type });
    };
    window.addEventListener('unauthorized', handleUnauthorized);
    return () => window.removeEventListener('unauthorized', handleUnauthorized);
  }, [setUnauthorizedState]);

  const handleClose = () => {
    const type = unauthorizedState.type;
    setUnauthorizedState({ isOpen: false, type: null });
    if (type === 'login_required') {
      window.location.href = '/login';
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <ActionModal 
      isOpen={unauthorizedState.isOpen}
      onClose={handleClose}
      type="warning"
      title="Unauthorized Access"
      message={unauthorizedState.type === 'login_required' ? 'You must be logged in to access this page.' : 'You do not have permission to access this page.'}
      primaryAction={{
        text: unauthorizedState.type === 'login_required' ? 'Redirect to Login' : 'Redirect to Dashboard',
        onClick: handleClose
      }}
    />
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route element={<MainLayout />}>
            {/* Base protected route to ensure login */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<ProtectedRoute pageKey="dashboard" />} >
                <Route index element={<DashboardLayout />} />
              </Route>
              <Route path="billing" element={<ProtectedRoute pageKey="billing" />} >
                <Route index element={<BillingLayout />} />
              </Route>
              <Route path="inventory" element={<ProtectedRoute pageKey="inventory" />} >
                <Route index element={<InventoryLayout />} />
              </Route>
              <Route path="item-request" element={<ProtectedRoute pageKey="item_request" />} >
                <Route index element={<ItemRequestLayout />} />
              </Route>
              <Route path="sales-report" element={<ProtectedRoute pageKey="sales_report" />} >
                <Route index element={<SalesReportLayout />} />
              </Route>
              <Route path="users" element={<ProtectedRoute pageKey="users" />} >
                <Route index element={<UsersLayout />} />
              </Route>
              <Route path="settings" element={<ProtectedRoute pageKey="settings" />} >
                <Route index element={<SettingsLayout />} />
              </Route>
            </Route>
          </Route>
        </Routes>
        <GlobalModalHandler />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
