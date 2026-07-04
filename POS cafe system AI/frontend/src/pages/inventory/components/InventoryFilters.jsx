import React from 'react';
import { Icons } from '../../../assets/icons';

const SelectField = ({ label, icon: Icon, value }) => (
  <div className="flex flex-col gap-[7px] w-full">
    <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-primary)]">{label}</span>
    <div className="relative w-full h-[34px] flex items-center">
      {Icon && <Icon className="absolute left-[12px] text-[14px] text-black pointer-events-none" />}
      <select
        defaultValue=""
        style={{ fontSize: '12px', fontWeight: 400 }}
        className={`w-full h-full appearance-none bg-white rounded-[6px] border border-[#deddf6] text-black focus:outline-none focus:border-[var(--color-primary)] pr-[30px] cursor-pointer ${Icon ? 'pl-[35px]' : 'pl-[12px]'}`}
      >
        <option value="" disabled hidden>{value}</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <Icons.ChevronDown className="absolute right-[12px] top-[11px] text-[12px] text-[#9b9ab1] pointer-events-none" />
    </div>
  </div>
);

const DateField = ({ label }) => (
  <div className="flex flex-col gap-[7px] w-full">
    <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-primary)]">{label}</span>
    <div className="relative w-full h-[34px] flex items-center">
      <input
        type="date"
        onClick={(event) => event.currentTarget.showPicker?.()}
        style={{ fontSize: '12px', fontWeight: 400 }}
        className="w-full h-full bg-white rounded-[6px] border border-[#deddf6] pl-[12px] pr-[30px] text-black focus:outline-none focus:border-[var(--color-primary)] cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
      />
      <Icons.Calendar className="absolute right-[12px] text-[14px] text-black pointer-events-none" />
    </div>
  </div>
);

const InventoryFilters = () => {
  return (
    <div className="w-full bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[16px] py-[16px] box-border shrink-0">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(150px,1fr)_minmax(150px,1fr)_minmax(140px,1fr)_minmax(150px,1fr)_minmax(150px,1fr)_minmax(190px,auto)] gap-[14px] items-end min-w-0">
        <SelectField label="Category" icon={Icons.GridMode} value="All Categories" />
        <SelectField label="Item Name" icon={Icons.Inventory} value="All Items" />
        <SelectField label="Status" value="All Status" />
        <DateField label="Date From" />
        <DateField label="Date To" />

        <div className="grid grid-cols-2 gap-[10px] w-full min-w-0">
          <button style={{ fontSize: '14px' }} className="h-[34px] px-[16px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[7px] font-bold hover:bg-[var(--color-primary-hover)] cursor-pointer whitespace-nowrap">
            <Icons.Filter className="text-[14px]" />
            Filter
          </button>
          <button style={{ fontSize: '14px' }} className="h-[34px] px-[16px] rounded-[6px] bg-white text-[var(--color-text)] border border-[#deddf6] flex items-center justify-center gap-[8px] font-bold hover:bg-gray-50 cursor-pointer whitespace-nowrap">
            <Icons.Reset className="text-[14px]" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;

