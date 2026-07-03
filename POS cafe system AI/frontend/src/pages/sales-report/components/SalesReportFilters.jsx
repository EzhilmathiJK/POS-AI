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

const SelectField = ({ label, placeholder, options, className }) => (
  <label className={`block ${className || ''}`}>
    <span className="block text-[13px] leading-[14px] font-semibold text-[var(--color-text)] mb-[7px]">{label}</span>
    <div className="relative">
      <select
        defaultValue=""
        style={{ fontSize: '12px', fontWeight: 400 }}
        className="w-full h-[42px] appearance-none bg-white rounded-[6px] border border-[#deddf6] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)] pl-[16px] pr-[34px] cursor-pointer font-semibold"
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <Icons.ChevronDown className="absolute right-[12px] top-[14px] text-[12px] text-[#9b9ab1] pointer-events-none" />
    </div>
  </label>
);

const DateField = ({ label, className }) => (
  <label className={`block ${className || ''}`}>
    <span className="block text-[13px] leading-[14px] font-semibold text-[var(--color-text)] mb-[7px]">{label}</span>
    <div className="relative">
      <input
        type="date"
        onClick={(event) => event.currentTarget.showPicker?.()}
        style={{ fontSize: '12px', fontWeight: 600 }}
        className="w-full h-[42px] bg-white rounded-[6px] border border-[#deddf6] pl-[12px] pr-[34px] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
      />
      <Icons.Calendar className="absolute right-[12px] top-[12px] text-[15px] text-[var(--color-primary)] pointer-events-none" />
    </div>
  </label>
);

const SalesReportFilters = () => {
  const [activeDateFilter, setActiveDateFilter] = useState('Today');
  const isCustom = activeDateFilter === 'Custom';

  return (
    <section className="bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[20px] py-[20px] shrink-0 h-auto min-h-[106px] transition-all duration-200">
      <div className="flex flex-wrap items-end gap-[32px] gap-y-[20px]">
        <SelectField label="Item" placeholder="Select item" options={itemOptions} className="flex-[0.5] min-w-[150px] max-w-[255px]" />

        <div className="flex-[2] min-w-[300px] max-w-[542px]">
          <span className="block text-[13px] leading-[14px] font-semibold text-[var(--color-text)] mb-[7px]">Reported Date</span>
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
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-[12px] ml-auto">
          <button style={{ fontSize: '14px' }} className="h-[42px] w-[94px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[8px] font-bold hover:bg-[var(--color-primary-hover)] shrink-0">
            <Icons.Filter className="text-[15px]" />
            Filter
          </button>
          <button style={{ fontSize: '14px' }} className="h-[42px] w-[96px] rounded-[6px] bg-white text-[var(--color-text)] border border-[#deddf6] flex items-center justify-center gap-[8px] font-bold hover:bg-gray-50 shrink-0">
            <Icons.Reset className="text-[14px]" />
            Reset
          </button>
        </div>
      </div>

      {isCustom && (
        <div className="mt-[20px] pt-[20px] border-t border-[var(--color-border)] flex flex-wrap justify-center gap-[32px]">
          <DateField label="Reported Date From" className="flex-1 min-w-[200px] max-w-[320px]" />
          <DateField label="Reported Date To" className="flex-1 min-w-[200px] max-w-[320px]" />
        </div>
      )}
    </section>
  );
};

export default SalesReportFilters;

