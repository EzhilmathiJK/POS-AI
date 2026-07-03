import React, { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons';
import { useAppContext } from '../../../context/AppContext';

const allPages = ['Dashboard', 'Billing', 'Inventory', 'Item Request', 'Sales Report', 'Users', 'Settings'];

const UserSettings = () => {
  const { rolePermissions, setRolePermissions } = useAppContext();
  
  // Local state to track edits before saving
  const [localPermissions, setLocalPermissions] = useState({});

  useEffect(() => {
    setLocalPermissions(rolePermissions);
  }, [rolePermissions]);

  const togglePermission = (role, page) => {
    setLocalPermissions(prev => {
      const currentPages = prev[role] || [];
      const newPages = currentPages.includes(page)
        ? currentPages.filter(p => p !== page)
        : [...currentPages, page];
      return { ...prev, [role]: newPages };
    });
  };

  const handleSaveRole = (role) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: localPermissions[role]
    }));
    // Flash green or simply rely on state being synced
  };

  const rolesList = ['admin', 'manager', 'cashier', 'staff'];

  return (
    <div>
      <div className="border border-[#deddf6] rounded-[7px] overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#f7f6ff] border-b border-[#deddf6] h-[44px]">
              <th className="px-[20px] text-[12px] font-bold text-[var(--color-primary)] w-[150px]">Role</th>
              <th className="px-[20px] text-[12px] font-bold text-[var(--color-primary)]">Page Permissions</th>
              <th className="px-[20px] text-[12px] font-bold text-[var(--color-primary)] w-[100px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rolesList.map((role) => (
              <tr key={role} className="border-b border-[#deddf6] last:border-b-0 h-[64px] hover:bg-gray-50 transition-colors">
                <td className="px-[20px] text-[13px] font-semibold text-[var(--color-text)] capitalize">
                  {role}
                </td>
                <td className="px-[20px]">
                  <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[10px]">
                    {allPages.map(page => {
                      const isChecked = (localPermissions[role] || []).includes(page);
                      return (
                        <label key={page} className="flex items-center gap-[6px] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => togglePermission(role, page)}
                            className="w-[14px] h-[14px] rounded-[3px] border-[#deddf6] text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                          />
                          <span className="text-[12px] font-semibold text-[var(--color-primary)]">{page}</span>
                        </label>
                      );
                    })}
                  </div>
                </td>
                <td className="px-[20px] text-right">
                  <div className="flex items-center justify-end gap-[10px]">
                    <button
                      onClick={() => handleSaveRole(role)}
                      className="h-[32px] px-[16px] rounded-[5px] bg-[var(--color-primary)] text-white text-[12px] font-bold hover:bg-[var(--color-primary-hover)] transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSettings;
