import React, { createContext, useContext, useState } from 'react';
import { Icons } from '../assets/icons';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // General & Inventory Settings
  const [settings, setSettings] = useState({
    cafeName: 'Coffee Cove',
    timeFormat: '12h',
    logo: '/logo.png',
    gst: 7,
    lowStockThreshold: 10,
  });

  // Menu Categories
  const [categories, setCategories] = useState([
    { id: '1', name: 'Beverage', iconName: 'Beverage' },
    { id: '2', name: 'Steamed Bun', iconName: 'SteamedBun' },
    { id: '3', name: 'Steamed Dimsum', iconName: 'Dimsum' },
    { id: '4', name: 'Deep Fry Timsun', iconName: 'DeepFry' },
    { id: '5', name: 'Bake', iconName: 'Bake' },
    { id: '6', name: 'Noodle/ Dumplings', iconName: 'Noodles' },
    { id: '7', name: 'Porridge', iconName: 'Porridge' },
  ]);

  // Role Permissions
  // Allowed pages for each role
  const [rolePermissions, setRolePermissions] = useState({
    admin: ['Dashboard', 'Billing', 'Inventory', 'Item Request', 'Sales Report', 'Users', 'Settings'],
    manager: ['Dashboard', 'Billing', 'Inventory', 'Item Request', 'Sales Report'],
    cashier: ['Dashboard', 'Billing', 'Sales Report'],
    staff: ['Dashboard', 'Billing'],
  });

  // Current logged in user mock
  const [currentUser] = useState({ role: 'admin' });

  // Global Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <AppContext.Provider value={{
      settings,
      setSettings,
      categories,
      setCategories,
      rolePermissions,
      setRolePermissions,
      currentUser,
      toast,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
