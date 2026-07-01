import React from 'react';
import { Icons } from '../../../assets/icons';

const PurpleActions = ({ onNewBill }) => {
  return (
    <div className="h-full flex bg-[var(--color-purple-action)] text-white rounded-[4px] overflow-hidden">
      <button
        type="button"
        onClick={onNewBill}
        className="w-[113px] flex flex-col items-center justify-center hover:bg-[#7435dc] border-r border-[var(--color-purple-action-border)] transition-colors"
      >
        <Icons.NewBill className="text-[26px] mb-[9px]" />
        <span className="text-[10px] font-semibold leading-[11px]">New Bill</span>
      </button>

      <button className="w-[113px] flex flex-col items-center justify-center hover:bg-[#7435dc] border-r border-[var(--color-purple-action-border)] transition-colors">
        <Icons.PriceAmendment className="text-[27px] mb-[9px]" />
        <span className="text-[10px] font-semibold leading-[11px]">Price Amendment</span>
      </button>

      <div className="w-[162px] grid grid-cols-2 grid-rows-2 text-center text-[14px] font-semibold">
        <button className="border-r border-b border-[var(--color-purple-action-border)] hover:bg-[#7435dc] flex items-center justify-center">₹2</button>
        <button className="border-b border-[var(--color-purple-action-border)] hover:bg-[#7435dc] flex items-center justify-center">₹5</button>
        <button className="border-r border-[var(--color-purple-action-border)] hover:bg-[#7435dc] flex items-center justify-center">₹20</button>
        <button className="hover:bg-[#7435dc] flex items-center justify-center">₹50</button>
      </div>

      <div className="flex-1 flex flex-col border-l border-[var(--color-purple-action-border)]">
        <button className="flex-1 border-b border-[var(--color-purple-action-border)] hover:bg-[#7435dc] flex items-center justify-center font-semibold text-[14px]">₹10</button>
        <button className="flex-1 flex flex-col items-center justify-center hover:bg-[#7435dc] transition-colors">
          <Icons.GiftVoucher className="text-[18px] mb-[2px]" />
          <span className="text-[9px] font-semibold leading-[10px]">Gift Voucher</span>
        </button>
      </div>
    </div>
  );
};

export default PurpleActions;
