import React from 'react';
import { Icons } from '../../../assets/icons';

const SelectField = ({ label, icon: Icon, value, width }) => (
  <label className="block" style={{ width }}>
    <span className="block text-[12px] leading-[14px] font-semibold text-[var(--color-primary)] mb-[7px]">{label}</span>
    <div className="relative">
      {Icon && <Icon className="absolute left-[12px] top-[10px] text-[14px] text-black pointer-events-none" />}
      <select
        defaultValue=""
        className={`w-full h-[34px] appearance-none bg-white rounded-[6px] border border-[#deddf6] text-[12px] text-black font-semibold focus:outline-none focus:border-[var(--color-primary)] pr-[30px] cursor-pointer ${Icon ? 'pl-[35px]' : 'pl-[12px]'}`}
      >
        <option value="" disabled hidden>{value}</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <Icons.ChevronDown className="absolute right-[12px] top-[11px] text-[12px] text-[#9b9ab1] pointer-events-none" />
    </div>
  </label>
);

const DateField = ({ label }) => (
  <label className="block w-[176px]">
    <span className="block text-[12px] leading-[14px] font-semibold text-[var(--color-primary)] mb-[7px]">{label}</span>
    <div className="relative">
      <input
        type="date"
        className="w-full h-[34px] bg-white rounded-[6px] border border-[#deddf6] pl-[12px] pr-[30px] text-[12px] text-black font-semibold focus:outline-none focus:border-[var(--color-primary)] cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
      />
      <Icons.Calendar className="absolute right-[12px] top-[10px] text-[14px] text-black pointer-events-none" />
    </div>
  </label>
);

const InventoryFilters = () => {
  return (
    <section className="h-[86px] bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[16px] pt-[16px] flex items-start gap-[14px] shrink-0">
      <SelectField label="Category" icon={Icons.GridMode} value="All Categories" width={177} />
      <SelectField label="Item Name" icon={Icons.Inventory} value="All Items" width={177} />
      <SelectField label="Status" value="All Status" width={177} />
      <DateField label="Date From" />
      <DateField label="Date To" />

      <div className="flex items-center gap-[10px] mt-[21px] ml-[10px]">
        <button className="h-[34px] w-[96px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[7px] text-[12px] font-semibold hover:bg-[var(--color-primary-hover)]">
          <Icons.Filter className="text-[15px]" />
          Filter
        </button>
        <button className="h-[34px] w-[96px] rounded-[6px] bg-white text-[var(--color-text)] border border-[#deddf6] flex items-center justify-center gap-[8px] text-[12px] font-semibold hover:bg-gray-50">
          <Icons.Reset className="text-[15px]" />
          Reset
        </button>
      </div>
    </section>
  );
};

export default InventoryFilters;
