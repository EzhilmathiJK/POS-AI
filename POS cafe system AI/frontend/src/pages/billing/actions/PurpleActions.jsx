import React from 'react';
import { Icons } from '../../../assets/icons';

const PurpleActions = ({ onNewBill, onPriceAmendmentClick, onQuickTender }) => {
  return (
    <div className="h-full flex bg-[var(--color-purple-action)] text-white rounded-[4px] overflow-hidden">
      <button
        type="button"
        onClick={onNewBill}
        className="w-[28%] xl:w-[113px] shrink-0 flex flex-col items-center justify-center hover:bg-[#7435dc] border-r border-[var(--color-purple-action-border)] transition-colors"
      >
        <Icons.NewBill className="text-[24px] xl:text-[26px] mb-[9px]" />
        <span className="text-[9px] xl:text-[10px] font-semibold leading-[11px]">New Bill</span>
      </button>

      <button 
        type="button"
        onClick={onPriceAmendmentClick}
        className="w-[28%] xl:w-[113px] shrink-0 flex flex-col items-center justify-center hover:bg-[#7435dc] border-r border-[var(--color-purple-action-border)] transition-colors"
      >
        <Icons.PriceAmendment className="text-[25px] xl:text-[27px] mb-[9px]" />
        <span className="text-[9px] xl:text-[10px] text-center font-semibold leading-[11px] px-[2px]">Price Amendment</span>
      </button>

      <div className="w-[30%] xl:w-[162px] shrink-0 grid grid-cols-2 grid-rows-2 text-center text-[12px] xl:text-[14px] font-semibold">
        <button onClick={() => onQuickTender?.(2)} className="border-r border-b border-[var(--color-purple-action-border)] hover:bg-[#7435dc] flex items-center justify-center">₹2</button>
        <button onClick={() => onQuickTender?.(5)} className="border-b border-[var(--color-purple-action-border)] hover:bg-[#7435dc] flex items-center justify-center">₹5</button>
        <button onClick={() => onQuickTender?.(20)} className="border-r border-[var(--color-purple-action-border)] hover:bg-[#7435dc] flex items-center justify-center">₹20</button>
        <button onClick={() => onQuickTender?.(50)} className="hover:bg-[#7435dc] flex items-center justify-center">₹50</button>
      </div>

      <div className="flex-1 min-w-[14%] flex flex-col border-l border-[var(--color-purple-action-border)] text-[12px] xl:text-[14px] font-semibold text-center">
        <button onClick={() => onQuickTender?.(10)} className="flex-1 border-b border-[var(--color-purple-action-border)] hover:bg-[#7435dc] flex items-center justify-center">₹10</button>
        <button className="flex-1 flex flex-col items-center justify-center hover:bg-[#7435dc] transition-colors">
          <Icons.GiftVoucher className="text-[16px] xl:text-[18px] mb-[2px]" />
          <span className="text-[8px] xl:text-[9px] font-semibold leading-[10px] text-center">Gift Voucher</span>
        </button>
      </div>
    </div>
  );
};

export default PurpleActions;
