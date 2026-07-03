import React from 'react';
import { Icons } from '../../../assets/icons';

const UserFilters = ({ filterValues, onFilterChange, onReset }) => {
  return (
    <div className="bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[20px] py-[20px] flex flex-wrap items-end gap-[32px] gap-y-[20px]">
      
      <div className="flex-1 min-w-[200px]">
        <span className="block text-[13px] leading-[14px] font-semibold text-[var(--color-text)] mb-[7px]">Search</span>
        <div className="relative">
          <Icons.Search className="absolute left-[12px] top-[14px] text-[15px] text-[#9b9ab1]" />
          <input
            type="text"
            placeholder="Search by name or email..."
            style={{ fontSize: '12px', fontWeight: 400 }}
            className="w-full h-[42px] bg-white rounded-[6px] border border-[#deddf6] pl-[36px] pr-[12px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] placeholder:text-[#9b9ab1]"
            value={filterValues.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 min-w-[150px]">
        <span className="block text-[13px] leading-[14px] font-semibold text-[var(--color-text)] mb-[7px]">Role</span>
        <div className="relative">
          <select
            style={{ fontSize: '12px', fontWeight: 400 }}
            className="w-full h-[42px] appearance-none bg-white rounded-[6px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] cursor-pointer"
            value={filterValues.role}
            onChange={(e) => onFilterChange('role', e.target.value)}
          >
            <option value="All Roles">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Cashier">Cashier</option>
            <option value="Staff">Staff</option>
          </select>
          <Icons.ChevronDown className="absolute right-[12px] top-[14px] text-[12px] text-[#9b9ab1] pointer-events-none" />
        </div>
      </div>

      <div className="flex-1 min-w-[150px]">
        <span className="block text-[13px] leading-[14px] font-semibold text-[var(--color-text)] mb-[7px]">Status</span>
        <div className="relative">
          <select
            style={{ fontSize: '12px', fontWeight: 400 }}
            className="w-full h-[42px] appearance-none bg-white rounded-[6px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] cursor-pointer"
            value={filterValues.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <Icons.ChevronDown className="absolute right-[12px] top-[14px] text-[12px] text-[#9b9ab1] pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center gap-[12px] ml-auto">
        <button 
          style={{ fontSize: '14px' }} 
          className="h-[42px] w-[94px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[8px] font-bold hover:bg-[var(--color-primary-hover)] shrink-0"
        >
          <Icons.Filter className="text-[15px]" /> Filter
        </button>

        <button 
          onClick={onReset}
          style={{ fontSize: '14px' }} 
          className="h-[42px] w-[96px] rounded-[6px] bg-white border border-[#deddf6] text-[var(--color-text)] flex items-center justify-center gap-[8px] font-bold hover:bg-gray-50 transition-colors shrink-0"
        >
          <Icons.Reset className="text-[14px]" /> Reset
        </button>
      </div>

    </div>
  );
};

export default UserFilters;
