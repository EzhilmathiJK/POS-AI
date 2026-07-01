import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import BillingLayout from './pages/billing/BillingLayout';
import InventoryLayout from './pages/inventory/InventoryLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/billing" replace />} />
          <Route path="billing" element={<BillingLayout />} />
          <Route path="inventory" element={<InventoryLayout />} />
          {/* Other routes can be added here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
