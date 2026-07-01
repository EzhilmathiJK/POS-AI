import React from 'react';
import { Icons } from '../../../assets/icons';

const SelectField = ({ label, icon: Icon, value, width }) => (
  <label className="block" style={{ width }}>
    <span className="block text-[12px] leading-[14px] font-semibold text-[var(--color-primary)] mb-[7px]">{label}</span>
    <button className="w-full h-[34px] flex items-center justify-between rounded-[6px] border border-[#deddf6] bg-white px-[12px] text-[12px] text-black">
      <span className="flex items-center gap-[9px] font-semibold">
        {Icon && <Icon className="text-[14px] text-black" />}
        {value}
      </span>
      <Icons.ChevronDown className="text-[12px] text-[#9b9ab1]" />
    </button>
  </label>
);

const DateField = ({ label }) => (
  <label className="block w-[176px]">
    <span className="block text-[12px] leading-[14px] font-semibold text-[var(--color-primary)] mb-[7px]">{label}</span>
    <div className="h-[34px] flex items-center justify-between rounded-[6px] border border-[#deddf6] bg-white px-[12px] text-[12px] text-black font-semibold">
      <span>dd-mm-yyyy</span>
      <Icons.Calendar className="text-[14px] text-black" />
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

      <div className="flex items-center gap-[10px] mt-[21px] ml-auto">
        <button className="h-[34px] w-[82px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[7px] text-[12px] font-semibold hover:bg-[var(--color-primary-hover)]">
          <Icons.Filter className="text-[15px]" />
          Filter
        </button>
        <button className="h-[34px] w-[86px] rounded-[6px] bg-white text-[var(--color-text)] border border-[#deddf6] flex items-center justify-center gap-[8px] text-[12px] font-semibold hover:bg-gray-50">
          <Icons.Reset className="text-[15px]" />
          Reset
        </button>
      </div>
    </section>
  );
};

export default InventoryFilters;
