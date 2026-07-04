import { useState } from 'react';
import { Icons } from '../../../assets/icons';

const itemOptions = [
  'BBQ Bun',
  'Black Coffee',
  'Black Tea',
  'Bubble Tea',
  'Cold Coffee',
  'Ginger Tea',
  'Iced Tea',
  'Milk',
  'Milo',
];

const dateFilters = ['Today', 'Yesterday', 'This Week', 'This Month', 'Custom'];

const SelectField = ({ label, placeholder, options }) => (
  <div className="flex flex-col gap-[7px] w-full">
    <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-text)]">{label}</span>
    <div className="relative w-full h-[42px] flex items-center">
      <select
        defaultValue=""
        style={{ fontSize: '12px', fontWeight: 600 }}
        className="w-full h-full appearance-none bg-white rounded-[6px] border border-[#deddf6] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)] pl-[16px] pr-[34px] cursor-pointer"
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <Icons.ChevronDown className="absolute right-[12px] text-[12px] text-[#9b9ab1] pointer-events-none" />
    </div>
  </div>
);

const DateField = ({ label }) => (
  <div className="flex flex-col gap-[7px] w-full">
    <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-text)]">{label}</span>
    <div className="relative w-full h-[42px] flex items-center">
      <input
        type="date"
        onClick={(event) => event.currentTarget.showPicker?.()}
        style={{ fontSize: '12px', fontWeight: 600 }}
        className="w-full h-full bg-white rounded-[6px] border border-[#deddf6] pl-[12px] pr-[34px] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
      />
      <Icons.Calendar className="absolute right-[12px] text-[15px] text-[var(--color-primary)] pointer-events-none" />
    </div>
  </div>
);

const SalesReportFilters = () => {
  const [activeDateFilter, setActiveDateFilter] = useState('Today');
  const isCustom = activeDateFilter === 'Custom';

  return (
    <div className="w-full bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[20px] py-[20px] box-border shrink-0 min-h-[106px] transition-all duration-200">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[255px_1fr_minmax(200px,auto)] gap-[20px] lg:gap-[32px] items-end min-w-0">
        
        <SelectField label="Item" placeholder="Select item" options={itemOptions} />

        <div className="w-full flex flex-col gap-[7px]">
          <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-text)]">Reported Date</span>
          <div className="flex w-full h-[42px] rounded-[6px] border border-[#deddf6] overflow-hidden">
            {dateFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveDateFilter(filter)}
                style={{ fontSize: '12px' }}
                className={`flex-1 font-bold border-r border-[#deddf6] last:border-r-0 ${
                  activeDateFilter === filter
                    ? 'bg-[#dfe4ea] text-[var(--color-primary)]'
                    : 'bg-white text-[var(--color-primary)] hover:bg-[#f7f6ff]'
                } whitespace-nowrap px-[4px]`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[12px] w-full min-w-0 lg:ml-auto">
          <button style={{ fontSize: '14px' }} className="h-[42px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[8px] font-bold hover:bg-[var(--color-primary-hover)] shrink-0 cursor-pointer whitespace-nowrap">
            <Icons.Filter className="text-[15px]" />
            Filter
          </button>
          <button style={{ fontSize: '14px' }} className="h-[42px] rounded-[6px] bg-white text-[var(--color-text)] border border-[#deddf6] flex items-center justify-center gap-[8px] font-bold hover:bg-gray-50 shrink-0 cursor-pointer whitespace-nowrap">
            <Icons.Reset className="text-[14px]" />
            Reset
          </button>
        </div>
      </div>

      {isCustom && (
        <div className="mt-[20px] pt-[20px] border-t border-[var(--color-border)] w-full grid grid-cols-1 sm:grid-cols-2 gap-[20px] lg:gap-[32px]">
          <DateField label="Reported Date From" />
          <DateField label="Reported Date To" />
        </div>
      )}
    </div>
  );
};

export default SalesReportFilters;
