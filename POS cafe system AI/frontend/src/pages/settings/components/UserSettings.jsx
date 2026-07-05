import React, { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons';
import api from '../../../api/axios';
import { useAppContext } from '../../../context/AppContext';

// Backend field mappings
const allPages = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: 'Billing', key: 'billing' },
  { label: 'Inventory', key: 'inventory' },
  { label: 'Item Request', key: 'item_request' },
  { label: 'Sales Report', key: 'sales_report' },
  { label: 'Users', key: 'users' },
  { label: 'Settings', key: 'settings' },
];

const rolesList = ['Admin', 'Manager', 'Cashier', 'Staff'];

const UserSettings = () => {
  const { currentPermissions, setCurrentPermissions, currentUser, showToast } = useAppContext();
  
  // Local state to track all roles permissions
  const [permissionsData, setPermissionsData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const res = await api.get('/settings/permissions');
      if (res.data.success) {
        const data = res.data.data.permissions;
        // Transform array into an object mapped by lowercase role name for easier state management
        const formatted = {};
        data.forEach(perm => {
          formatted[perm.role.toLowerCase()] = {
            dashboard: perm.dashboard,
            billing: perm.billing,
            inventory: perm.inventory,
            item_request: perm.item_request,
            sales_report: perm.sales_report,
            users: perm.users,
            settings: perm.settings,
          };
        });
        setPermissionsData(formatted);
      }
    } catch (err) {
      console.error('Failed to fetch permissions', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const togglePermission = (roleKey, pageKey) => {
    setPermissionsData(prev => ({
      ...prev,
      [roleKey]: {
        ...prev[roleKey],
        [pageKey]: !prev[roleKey][pageKey]
      }
    }));
  };

  const handleSaveRole = async (roleName) => {
    const roleKey = roleName.toLowerCase();
    const updatedData = permissionsData[roleKey];
    
    try {
      const res = await api.put(`/settings/permissions/${roleName}`, updatedData);
      if (res.data.success) {
        showToast(`${roleName} permissions saved successfully!`, 'success');
        
        // If the admin is modifying their own role, update local context and storage immediately
        if (currentUser?.role?.toLowerCase() === roleKey) {
          setCurrentPermissions(updatedData);
          localStorage.setItem('permissions', JSON.stringify(updatedData));
        }
      }
    } catch (err) {
      showToast('Failed to save permissions', 'error');
    }
  };

  return (
    <div>
      <div className="border border-[#deddf6] rounded-[7px] overflow-x-auto custom-scrollbar relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <span className="text-[14px] font-semibold text-[var(--color-primary)]">Loading...</span>
          </div>
        )}
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#f7f6ff] border-b border-[#deddf6] h-[44px]">
              <th className="px-[20px] text-[12px] font-bold text-[var(--color-primary)] w-[150px]">Role</th>
              <th className="px-[20px] text-[12px] font-bold text-[var(--color-primary)]">Page Permissions</th>
              <th className="px-[20px] text-[12px] font-bold text-[var(--color-primary)] w-[100px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rolesList.map((role) => {
              const roleKey = role.toLowerCase();
              const rolePerms = permissionsData[roleKey] || {};

              return (
                <tr key={role} className="border-b border-[#deddf6] last:border-b-0 h-[64px] hover:bg-gray-50 transition-colors">
                  <td className="px-[20px] text-[13px] font-semibold text-[var(--color-text)]">
                    {role}
                  </td>
                  <td className="px-[20px] w-auto whitespace-nowrap">
                    <div className="flex flex-nowrap items-center gap-[20px] py-[5px]">
                      {allPages.map(page => {
                        const isChecked = rolePerms[page.key] === true;
                        return (
                          <label key={page.key} className="flex items-center gap-[6px] cursor-pointer shrink-0">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => togglePermission(roleKey, page.key)}
                              className="w-[14px] h-[14px] rounded-[3px] border-[#deddf6] text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                            />
                            <span className="text-[12px] font-semibold text-[var(--color-primary)]">{page.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-[20px] text-right">
                    <div className="flex items-center justify-end gap-[10px]">
                      <button
                        onClick={() => handleSaveRole(role)}
                        disabled={loading}
                        className="h-[32px] px-[16px] rounded-[5px] bg-[var(--color-primary)] text-white text-[12px] font-bold hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
                      >
                        Save
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSettings;
