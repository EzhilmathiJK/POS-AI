import React from 'react';
import { Icons } from '../../../assets/icons';

const OrangeActions = () => {
  return (
    <div className="h-full grid grid-rows-2 bg-[var(--color-orange-action)] text-white rounded-[4px] overflow-hidden">
      <div className="grid grid-cols-4 border-b border-[var(--color-orange-action-border)]">
        <button className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors border-r border-[var(--color-orange-action-border)]">
          <Icons.TerminateTransaction className="text-[20px]" />
          <span className="text-[11px] font-semibold text-left leading-[12px]">Terminate<br />Transaction</span>
        </button>
        <button className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors border-r border-[var(--color-orange-action-border)]">
          <Icons.Print className="text-[19px]" />
          <span className="text-[11px] font-semibold leading-[11px]">Print</span>
        </button>
        <button className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors border-r border-[var(--color-orange-action-border)]">
          <Icons.ReservedTransaction className="text-[19px]" />
          <span className="text-[11px] font-semibold text-left leading-[12px]">Reserved<br />Transaction</span>
        </button>
        <button className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors">
          <Icons.DeleteAll className="text-[19px]" />
          <span className="text-[11px] font-semibold leading-[11px]">Delete All</span>
        </button>
      </div>
      <div className="grid grid-cols-2">
        <button className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors border-r border-[var(--color-orange-action-border)]">
          <Icons.Restore className="text-[19px]" />
          <span className="text-[11px] font-semibold leading-[11px]">Restore</span>
        </button>
        <button className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors">
          <Icons.MainMenu className="text-[19px]" />
          <span className="text-[11px] font-semibold leading-[11px]">Main Menu</span>
        </button>
      </div>
    </div>
  );
};

export default OrangeActions;
