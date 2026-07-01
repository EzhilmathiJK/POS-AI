import React from 'react';
import { Icons } from '../../../assets/icons';

const TealActions = () => {
  return (
    <div className="h-full grid grid-cols-2 bg-[var(--color-teal-action)] text-white rounded-[4px] overflow-hidden">
      <div className="grid grid-rows-2 border-r border-[var(--color-teal-action-border)]">
        <button className="flex flex-col items-center justify-center hover:bg-[#1a887f] transition-colors border-b border-[var(--color-teal-action-border)]">
          <Icons.OpenCashBox className="text-[18px] mb-[6px]" />
          <span className="text-[10px] font-semibold leading-[11px]">Open Cash Box</span>
        </button>
        <button className="flex flex-col items-center justify-center hover:bg-[#1a887f] transition-colors">
          <Icons.CancelItem className="text-[18px] mb-[6px]" />
          <span className="text-[10px] font-semibold leading-[11px]">Cancel Item</span>
        </button>
      </div>

      <div className="grid grid-rows-2">
        <button className="flex flex-col items-center justify-center hover:bg-[#1a887f] transition-colors border-b border-[var(--color-teal-action-border)]">
          <Icons.GoodsReturn className="text-[18px] mb-[6px]" />
          <span className="text-[10px] font-semibold leading-[11px]">Goods Return</span>
        </button>
        <button className="flex flex-col items-center justify-center hover:bg-[#1a887f] transition-colors">
          <Icons.AddItem className="text-[18px] mb-[6px]" />
          <span className="text-[10px] font-semibold leading-[11px]">Add Item</span>
        </button>
      </div>
    </div>
  );
};

export default TealActions;
