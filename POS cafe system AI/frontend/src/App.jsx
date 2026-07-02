import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import BillingLayout from './pages/billing/BillingLayout';
import InventoryLayout from './pages/inventory/InventoryLayout';
import ItemRequestLayout from './pages/item-request/ItemRequestLayout';
import SalesReportLayout from './pages/sales-report/SalesReportLayout';
import LoginPage from './pages/login/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="billing" element={<BillingLayout />} />
          <Route path="inventory" element={<InventoryLayout />} />
          <Route path="item-request" element={<ItemRequestLayout />} />
          <Route path="sales-report" element={<SalesReportLayout />} />
          {/* Other routes can be added here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
