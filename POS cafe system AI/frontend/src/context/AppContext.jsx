import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast as toastify } from 'react-toastify';
import { Icons } from '../assets/icons';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // General Settings
  const [settings, setSettings] = useState({
    cafeName: 'POS Cafe',
    timeFormat: '12h',
    logo: '/default-image.png',
    gst: 7,
    lowStockThreshold: 10,
  });

  // Menu Categories
  const [categories, setCategories] = useState([]);

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

  // Fetch settings & categories on mount or login
  useEffect(() => {
    import('../api/axios').then(({ default: api }) => {
      // Fetch General Settings (Public)
      api.get('/settings/general')
        .then(res => {
          if (res.data.success && res.data.data) {
            const data = res.data.data;
            setSettings(prev => ({
              ...prev,
              cafeName: data.cafe_name,
              logo: data.cafe_logo.startsWith('/uploads') ? `http://localhost:8000${data.cafe_logo}` : data.cafe_logo,
              timeFormat: data.time_format,
              gst: data.gst_percentage !== undefined ? Number(data.gst_percentage) : 7,
              lowStockThreshold: data.low_stock_threshold !== undefined ? data.low_stock_threshold : 10
            }));
          }
        })
        .catch(err => console.error("Failed to load general settings:", err));

      // Fetch Categories (Protected)
      if (currentUser) {
        api.get('/settings/categories')
          .then(res => {
            if (res.data.success) {
              const fetchedCats = res.data.data.map(c => ({
                ...c,
                id: c.id.toString()
              }));
              setCategories(fetchedCats);
            }
          })
          .catch(err => console.error("Failed to load categories:", err));
      } else {
        setCategories([]);
      }
    });
  }, [currentUser]);


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

  // Proactively refresh token 30 seconds before expiration
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
        
        // Trigger refresh 30 seconds before expiration
        const timeUntilRefresh = (exp - now) - 30000;
        
        if (timeUntilRefresh <= 0) {
          doRefreshToken();
        } else {
          timeoutId = setTimeout(() => {
            doRefreshToken();
          }, timeUntilRefresh);
        }
      } catch (error) {
        console.error("Error parsing token", error);
      }
    };

    const doRefreshToken = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return;
        
        const response = await fetch('http://localhost:8000/api/auth/refresh-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: refreshToken })
        });
        
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('accessToken', data.data.accessToken);
          window.dispatchEvent(new CustomEvent('token_refreshed'));
        }
      } catch (error) {
        console.error("Proactive token refresh failed", error);
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
  }, [currentUser]);

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
