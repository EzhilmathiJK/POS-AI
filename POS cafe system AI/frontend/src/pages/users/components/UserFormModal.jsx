import React, { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons';

const requiredMark = <span className="text-[#ff1e27]">*</span>;

const FieldLabel = ({ children, required = false }) => (
  <span className="block text-[13px] leading-[16px] font-semibold text-[var(--color-text)] mb-[9px]">
    {children} {required && requiredMark}
  </span>
);

const UserFormModal = ({ isOpen, onClose, onSave, onDelete, initialData }) => {
  const isEditMode = !!initialData;
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    role: 'Staff',
    status: 'Active',
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        fullName: initialData.fullName || '',
        username: initialData.username || '',
        password: initialData.password || '',
        email: initialData.email || '',
        role: initialData.role || 'Staff',
        status: initialData.status || 'Active',
      });
    } else if (isOpen && !initialData) {
      setFormData({
        fullName: '',
        username: '',
        password: '',
        email: '',
        role: 'Staff',
        status: 'Active',
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'Active' : 'Inactive') : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: initialData?.id || Date.now() });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[6px] w-full max-w-[600px] shadow-lg flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header matching AddInventoryForm text styles */}
        <div className="text-center border-b border-[#deddf6] pt-[20px] pb-[13px] mx-[24px]">
          <h2 className="text-[22px] leading-[27px] font-semibold text-[var(--color-text)]">
            {isEditMode ? 'Edit User' : 'Add New User'}
          </h2>
          <p className="mt-[8px] text-[13px] leading-[16px] font-semibold text-[var(--color-primary)]">
            {isEditMode ? 'Update the details of the user' : 'Add a new user to the system'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-[24px] py-[20px]">
          <div className="grid grid-cols-2 gap-x-[29px] gap-y-[19px]">
            {/* Full Name */}
            <label>
              <FieldLabel required>Full Name</FieldLabel>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={{ fontSize: '12px', fontWeight: 400 }}
                className="w-full h-[37px] rounded-[7px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] placeholder:text-[#9b8fd6] outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </label>
            
            {/* Username */}
            <label>
              <FieldLabel required>Username</FieldLabel>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{ fontSize: '12px', fontWeight: 400 }}
                className="w-full h-[37px] rounded-[7px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] placeholder:text-[#9b8fd6] outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </label>

            {/* Email */}
            <label className="col-span-2">
              <FieldLabel required>Email</FieldLabel>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ fontSize: '12px', fontWeight: 400 }}
                className="w-full h-[37px] rounded-[7px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] placeholder:text-[#9b8fd6] outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </label>

            {/* Role */}
            <label>
              <FieldLabel required>Role</FieldLabel>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{ fontSize: '12px', fontWeight: 400 }}
                  className="w-full h-[37px] appearance-none rounded-[7px] border border-[#deddf6] bg-white pl-[14px] pr-[36px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] cursor-pointer"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Staff">Staff</option>
                </select>
                <Icons.ChevronDown className="absolute right-[14px] top-[12px] text-[15px] text-[var(--color-primary)] pointer-events-none" />
              </div>
            </label>

            {/* Password */}
            <label>
              <FieldLabel required={!isEditMode}>Password</FieldLabel>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required={!isEditMode}
                style={{ fontSize: '12px', fontWeight: 400 }}
                className="w-full h-[37px] rounded-[7px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] placeholder:text-[#9b8fd6] outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </label>

            {/* Active User Checkbox */}
            <label className="col-span-2 flex items-center gap-[8px] mt-[4px] cursor-pointer">
              <input
                type="checkbox"
                name="status"
                checked={formData.status === 'Active'}
                onChange={handleChange}
                className="w-[16px] h-[16px] rounded-[4px] border-[#deddf6] text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
              />
              <span className="text-[13px] text-[var(--color-text)] font-semibold">
                Active User
              </span>
            </label>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-center gap-[11px] mt-[30px]">
            <button
              type="button"
              onClick={onClose}
              style={{ fontSize: '14px' }}
              className="h-[36px] min-w-[102px] rounded-[7px] border border-[#deddf6] bg-white px-[24px] font-bold text-[var(--color-text)] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ fontSize: '14px' }}
              className="h-[36px] min-w-[116px] rounded-[7px] bg-[var(--color-primary)] px-[24px] font-bold text-white flex items-center justify-center gap-[10px] hover:bg-[var(--color-primary-hover)]"
            >
              <Icons.Save className="text-[16px]" />
              {isEditMode ? 'Update' : 'Save'}
            </button>
            {isEditMode && onDelete && (
              <button
                type="button"
                onClick={() => { onDelete(initialData.id); onClose(); }}
                style={{ fontSize: '14px' }}
                className="h-[36px] min-w-[102px] rounded-[7px] border border-[#ff1e27] bg-white px-[24px] font-bold text-[#ff1e27] flex items-center justify-center gap-[8px] hover:bg-[#ffe4e7]"
              >
                <Icons.Delete className="text-[16px]" />
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
