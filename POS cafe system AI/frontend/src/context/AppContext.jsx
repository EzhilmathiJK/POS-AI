import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast as toastify } from 'react-toastify';
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

  // Allowed pages for current user
  const [currentPermissions, setCurrentPermissions] = useState(() => {
    const stored = localStorage.getItem('permissions');
    return stored ? JSON.parse(stored) : {};
  });

  // Current logged in user
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Global Toast State
  const [toast, setToast] = useState(null); // Keep state for backward compatibility if any component reads it directly, though we should just use react-toastify

  const showToast = useCallback((message, type = 'success') => {
    if (type === 'success') {
      toastify.success(message);
    } else if (type === 'error') {
      toastify.error(message);
    } else if (type === 'warning') {
      toastify.warning(message);
    } else {
      toastify.info(message);
    }
  }, []);

  // Sidebar Toggle State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);

  // Unauthorized Modal State
  const [unauthorizedState, setUnauthorizedState] = useState({ isOpen: false, type: null });
  const triggerUnauthorized = useCallback((type) => setUnauthorizedState({ isOpen: true, type }), []);

  return (
    <AppContext.Provider value={{
      settings,
      setSettings,
      categories,
      setCategories,
      currentPermissions,
      setCurrentPermissions,
      currentUser,
      setCurrentUser,
      toast,
      showToast,
      isSidebarOpen,
      setIsSidebarOpen,
      toggleSidebar,
      unauthorizedState,
      setUnauthorizedState,
      triggerUnauthorized
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
