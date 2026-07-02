import React from 'react';
import { Icons } from '../../assets/icons';

const CurrentBill = ({ items = [], onRemoveItem }) => {
  const hasItems = items.length > 0;

  return (
    <div className="bg-white rounded-[7px] flex-1 flex flex-col min-h-0">
      <div className="grid grid-cols-[1fr_70px_100px_90px_24px] text-[12px] font-semibold text-[var(--color-text)] px-[12px] pt-[17px] pb-[12px] border-b border-[var(--color-border)]">
        <div>Item</div>
        <div className="text-center">Qty</div>
        <div className="text-center">Unit Price</div>
        <div className="text-center">Total</div>
        <div />
      </div>

      {hasItems ? (
        <>
          <div className="flex-1 min-h-0 px-[12px] pt-[7px] overflow-y-auto custom-scrollbar">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_70px_100px_90px_24px] items-center min-h-[48px] border-b border-[var(--color-border)] text-[12px] text-black"
              >
                <div className="flex items-center gap-[12px] min-w-0">
                  <div className="w-[32px] h-[32px] rounded-[5px] bg-[#f6f7fb] flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="max-w-[26px] max-h-[27px] object-contain" />
                  </div>
                  <span className="font-semibold text-[12px] text-[var(--color-text)] truncate">{item.name}</span>
                </div>

                <div className="flex justify-center">
                  <span className="w-[45px] h-[26px] rounded-[5px] border border-[var(--color-border)] bg-white flex items-center justify-center text-[12px] font-semibold text-black">
                    {item.quantity}
                  </span>
                </div>

                <div className="text-center font-normal">₹{item.price.toFixed(2)}</div>
                <div className="text-center font-normal">₹{(item.price * item.quantity).toFixed(2)}</div>
                <button
                  type="button"
                  onClick={() => onRemoveItem?.(item.id)}
                  className="text-[var(--color-text)] hover:text-red-500 flex items-center justify-center"
                  aria-label={`Remove ${item.name}`}
                >
                  <Icons.Delete className="text-[12px]" />
                </button>
              </div>
            ))}
          </div>

          <div className="mx-[12px] mb-[10px] h-[61px] bg-[#eef3fb] rounded-[4px] flex items-start gap-[10px] px-[9px] pt-[9px] text-[9px] leading-[14px] text-[var(--color-text)]">
            <Icons.Info className="text-[14px] text-[var(--color-primary)] shrink-0 mt-[1px]" />
            <p className="font-semibold">
              Click item to create billing entry. If item already exists, quantity will increase.
              <br />
              Cancel item removes the last billed item. Delete All clears local data.
              <br />
              Main menu will redirect to menu page.
            </p>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-[24px] text-center">
          <div className="w-[50px] h-[50px] bg-[var(--color-primary-soft)] rounded-full flex items-center justify-center mb-[12px]">
            <Icons.Billing className="text-[21px] text-[#8c89b8]" />
          </div>
          <p className="text-[13px] leading-[17px] text-[var(--color-text)] font-semibold mb-[7px]">No items added yet</p>
          <p className="text-[12px] leading-[14px] font-normal text-[var(--color-muted)]">Select items from the menu to add to the bill.</p>
        </div>
      )}
    </div>
  );
};

export default CurrentBill;
