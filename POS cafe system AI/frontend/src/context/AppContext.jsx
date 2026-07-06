import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
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
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    import('../api/axios').then(({ default: api }) => {
      api.get('/settings/categories')
        .then(res => {
          if (res.data.success) {
            // Map iconName correctly and ensure ids are strings for frontend consistency
            const fetchedCats = res.data.data.map(c => ({
              ...c,
              id: c.id.toString()
            }));
            setCategories(fetchedCats);
          }
        })
        .catch(err => console.error("Failed to load categories:", err));
    });
  }, []);

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

  // Auto-trigger Unauthorized when token expires
  useEffect(() => {
    let timeoutId;
    
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload);
        const exp = decoded.exp * 1000;
        const now = Date.now();
        // Trigger a ping 1 second AFTER expiration to force the interceptor's 401 seamless refresh logic
        const timeUntilExpiry = (exp - now) + 1000;
        
        if (timeUntilExpiry <= 0) {
          import('../api/axios').then(({ default: api }) => api.get('/auth/me').catch(() => {}));
        } else {
          timeoutId = setTimeout(() => {
            import('../api/axios').then(({ default: api }) => api.get('/auth/me').catch(() => {}));
          }, timeUntilExpiry);
        }
      } catch (error) {
        console.error("Error parsing token", error);
      }
    };

    checkTokenExpiration();

    const handleTokenRefreshed = () => {
      clearTimeout(timeoutId);
      checkTokenExpiration();
    };
    window.addEventListener('token_refreshed', handleTokenRefreshed);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('token_refreshed', handleTokenRefreshed);
    };
  }, [currentUser, triggerUnauthorized]);

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
