import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import BillingLayout from './pages/billing/BillingLayout';
import InventoryLayout from './pages/inventory/InventoryLayout';
import ItemRequestLayout from './pages/item-request/ItemRequestLayout';
import SalesReportLayout from './pages/sales-report/SalesReportLayout';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import UsersLayout from './pages/users/UsersLayout';
import SettingsLayout from './pages/settings/SettingsLayout';
import LoginPage from './pages/login/LoginPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardLayout />} />
            <Route path="billing" element={<BillingLayout />} />
            <Route path="inventory" element={<InventoryLayout />} />
            <Route path="item-request" element={<ItemRequestLayout />} />
            <Route path="sales-report" element={<SalesReportLayout />} />
            <Route path="users" element={<UsersLayout />} />
            <Route path="settings" element={<SettingsLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
