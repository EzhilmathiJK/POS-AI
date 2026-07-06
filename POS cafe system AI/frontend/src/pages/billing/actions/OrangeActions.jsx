import React from 'react';
import { Icons } from '../../../assets/icons';

const OrangeActions = ({ onTerminate, onPrint, onDeleteAll, onMainMenu }) => {
  return (
    <div className="h-full bg-[var(--color-orange-action)] text-white rounded-[4px] overflow-hidden">
      
      {/* MOBILE VIEW (3x2 grid) */}
      <div className="grid grid-cols-3 grid-rows-2 h-full xl:hidden">
        <button onClick={onTerminate} className="flex flex-col items-center justify-center gap-[4px] hover:bg-[#ed8f2c] transition-colors border-r border-b border-[var(--color-orange-action-border)]">
          <Icons.TerminateTransaction className="text-[18px]" />
          <span className="text-[10px] font-semibold text-center leading-[11px]">Terminate</span>
        </button>
        <button onClick={onPrint} className="flex flex-col items-center justify-center gap-[4px] hover:bg-[#ed8f2c] transition-colors border-r border-b border-[var(--color-orange-action-border)]">
          <Icons.Print className="text-[18px]" />
          <span className="text-[10px] font-semibold leading-[11px]">Print</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-[4px] hover:bg-[#ed8f2c] transition-colors border-b border-[var(--color-orange-action-border)]">
          <Icons.ReservedTransaction className="text-[18px]" />
          <span className="text-[10px] font-semibold text-center leading-[11px]">Reserve</span>
        </button>
        <button onClick={onDeleteAll} className="flex flex-col items-center justify-center gap-[4px] hover:bg-[#ed8f2c] transition-colors border-r border-[var(--color-orange-action-border)]">
          <Icons.DeleteAll className="text-[18px]" />
          <span className="text-[10px] font-semibold leading-[11px]">Delete All</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-[4px] hover:bg-[#ed8f2c] transition-colors border-r border-[var(--color-orange-action-border)]">
          <Icons.Restore className="text-[18px]" />
          <span className="text-[10px] font-semibold leading-[11px]">Restore</span>
        </button>
        <button onClick={onMainMenu} className="flex flex-col items-center justify-center gap-[4px] hover:bg-[#ed8f2c] transition-colors">
          <Icons.MainMenu className="text-[18px]" />
          <span className="text-[10px] font-semibold text-center leading-[11px]">Main Menu</span>
        </button>
      </div>

      {/* DESKTOP VIEW (Custom 4-col top, 2-col bottom) */}
      <div className="hidden xl:grid grid-rows-2 h-full">
        <div className="grid grid-cols-4 border-b border-[var(--color-orange-action-border)]">
          <button onClick={onTerminate} className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors border-r border-[var(--color-orange-action-border)]">
            <Icons.TerminateTransaction className="text-[20px]" />
            <span className="text-[11px] font-semibold text-left leading-[12px]">Terminate<br />Transaction</span>
          </button>
          <button onClick={onPrint} className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors border-r border-[var(--color-orange-action-border)]">
            <Icons.Print className="text-[19px]" />
            <span className="text-[11px] font-semibold leading-[11px]">Print</span>
          </button>
          <button className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors border-r border-[var(--color-orange-action-border)]">
            <Icons.ReservedTransaction className="text-[19px]" />
            <span className="text-[11px] font-semibold text-left leading-[12px]">Reserved<br />Transaction</span>
          </button>
          <button onClick={onDeleteAll} className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors">
            <Icons.DeleteAll className="text-[19px]" />
            <span className="text-[11px] font-semibold leading-[11px]">Delete All</span>
          </button>
        </div>
        <div className="grid grid-cols-2">
          <button className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors border-r border-[var(--color-orange-action-border)]">
            <Icons.Restore className="text-[19px]" />
            <span className="text-[11px] font-semibold leading-[11px]">Restore</span>
          </button>
          <button onClick={onMainMenu} className="flex items-center justify-center gap-[10px] hover:bg-[#ed8f2c] transition-colors">
            <Icons.MainMenu className="text-[19px]" />
            <span className="text-[11px] font-semibold leading-[11px]">Main Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrangeActions;
