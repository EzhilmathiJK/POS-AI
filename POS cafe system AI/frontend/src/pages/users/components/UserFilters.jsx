import React from 'react';
import { Icons } from '../../../assets/icons';

const UserFilters = ({ filterValues, onFilterChange, onFilterClick, onReset }) => {
  return (
    <div className="w-full bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[20px] py-[20px] box-border shrink-0 min-h-[82px] transition-all duration-200 mt-[12px]">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_minmax(150px,200px)_minmax(150px,200px)_auto] gap-[20px] lg:gap-[32px] items-end min-w-0">
        
        <div className="flex flex-col gap-[7px] w-full min-w-0">
          <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-text)]">Search</span>
          <div className="relative w-full h-[42px] flex items-center">
            <Icons.Search className="absolute left-[12px] text-[15px] text-[#9b9ab1]" />
            <input
              type="text"
              placeholder="Search by name or email..."
              style={{ fontSize: '12px', fontWeight: 400 }}
              className="w-full h-full bg-white rounded-[6px] border border-[#deddf6] pl-[36px] pr-[12px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] placeholder:text-[#9b9ab1]"
              value={filterValues.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[7px] w-full min-w-0">
          <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-text)]">Role</span>
          <div className="relative w-full h-[42px] flex items-center">
            <select
              style={{ fontSize: '12px', fontWeight: 400 }}
              className="w-full h-full appearance-none bg-white rounded-[6px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] cursor-pointer"
              value={filterValues.role}
              onChange={(e) => onFilterChange('role', e.target.value)}
            >
              <option value="All Roles">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Cashier">Cashier</option>
              <option value="Staff">Staff</option>
            </select>
            <Icons.ChevronDown className="absolute right-[12px] text-[12px] text-[#9b9ab1] pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-[7px] w-full min-w-0">
          <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-text)]">Status</span>
          <div className="relative w-full h-[42px] flex items-center">
            <select
              style={{ fontSize: '12px', fontWeight: 400 }}
              className="w-full h-full appearance-none bg-white rounded-[6px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] cursor-pointer"
              value={filterValues.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <Icons.ChevronDown className="absolute right-[12px] text-[12px] text-[#9b9ab1] pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[12px] w-full min-w-0 lg:ml-auto">
          <button 
            onClick={onFilterClick}
            style={{ fontSize: '14px' }} 
            className="h-[42px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[8px] font-bold hover:bg-[var(--color-primary-hover)] shrink-0 cursor-pointer whitespace-nowrap px-[12px]"
          >
            <Icons.Filter className="text-[15px]" /> Filter
          </button>

          <button 
            onClick={onReset}
            style={{ fontSize: '14px' }} 
            className="h-[42px] rounded-[6px] bg-white border border-[#deddf6] text-[var(--color-text)] flex items-center justify-center gap-[8px] font-bold hover:bg-gray-50 transition-colors shrink-0 cursor-pointer whitespace-nowrap px-[12px]"
          >
            <Icons.Reset className="text-[14px]" /> Reset
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserFilters;
