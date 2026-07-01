import React from 'react';
import { Icons } from '../../assets/icons';

const NumpadInput = () => {
  const numpadKeys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'BACKSPACE'];

  return (
    <div className="bg-white rounded-[7px] h-[198px] px-[12px] py-[19px] grid grid-cols-[155px_1fr] gap-[26px]">
      <div className="space-y-[9px]">
        <div>
          <label className="block text-[12px] font-semibold text-[var(--color-text)] mb-[4px]">Item Number</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Scan / Enter item number"
              className="w-full h-[28px] bg-[#fbfbfd] border border-[var(--color-border)] rounded-[5px] px-[12px] pr-[30px] text-sm text-[var(--color-text)] placeholder:text-xs placeholder:text-[#746c9e] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
            <Icons.Barcode className="absolute right-[10px] top-[7px] text-[var(--color-text)] text-[14px]" />
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[var(--color-text)] mb-[4px]">Table No</label>
          <input
            type="text"
            placeholder="Enter table no"
            className="w-full h-[28px] bg-[#fbfbfd] border border-[var(--color-border)] rounded-[5px] px-[12px] text-sm text-[var(--color-text)] placeholder:text-xs placeholder:text-[#746c9e] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[var(--color-text)] mb-[4px]">No of Cover</label>
          <input
            type="text"
            placeholder="Enter no of cover"
            className="w-full h-[28px] bg-[#fbfbfd] border border-[var(--color-border)] rounded-[5px] px-[12px] text-sm text-[var(--color-text)] placeholder:text-xs placeholder:text-[#746c9e] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>
      </div>

      <div className="flex flex-col min-w-0">
        <div className="grid grid-cols-[1fr_64px] gap-[7px] mb-[10px]">
          <div>
            <span className="block text-[12px] font-semibold text-[var(--color-text)] mb-[3px]">Quantity</span>
            <div className="grid grid-cols-3 h-[28px] bg-white border border-[var(--color-border)] rounded-[5px] overflow-hidden">
              <button className="flex items-center justify-center text-[var(--color-text)] hover:bg-gray-50">
                <Icons.Minus size={12} />
              </button>
              <span className="flex items-center justify-center text-[12px] font-semibold text-[var(--color-text)]">1</span>
              <button className="flex items-center justify-center text-[var(--color-text)] hover:bg-gray-50">
                <Icons.Plus size={12} />
              </button>
            </div>
          </div>
          <button className="self-end h-[29px] bg-[var(--color-primary)] text-white rounded-[5px] font-semibold text-[11px] hover:bg-[var(--color-primary-hover)]">Add</button>
        </div>

        <div className="grid grid-cols-[1fr_64px] gap-[7px] flex-1 min-h-0">
          <div className="grid grid-cols-3 gap-[6px]">
            {numpadKeys.map((key) => (
              <button
                key={key}
                className="bg-[#fbfbfd] border border-[var(--color-border)] rounded-[5px] flex items-center justify-center text-[14px] font-semibold text-black hover:bg-gray-50 h-[24px]"
              >
                {key === 'BACKSPACE' ? <Icons.Clear className="text-[var(--color-text)] text-[13px]" /> : key}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-[6px]">
            <button className="h-[29px] bg-[var(--color-primary)] text-white rounded-[5px] font-semibold text-[11px] hover:bg-[var(--color-primary-hover)]">AC</button>
            <button className="h-[29px] bg-[var(--color-primary)] text-white rounded-[5px] font-semibold text-[11px] hover:bg-[var(--color-primary-hover)]">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumpadInput;
