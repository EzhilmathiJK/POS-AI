import { Icons } from '../../assets/icons';

const PriceAmendment = ({ totalAmount, gstAmount, payable }) => {
  const formatAmount = (amount) => `₹${amount.toFixed(2)}`;

  return (
    <div className="bg-white rounded-[7px] flex-1 flex flex-col min-h-0">
      <div className="px-[17px] pt-[18px] pb-[18px] flex items-center gap-[10px] border-b border-[var(--color-border)] shrink-0">
        <Icons.PriceAmendment className="text-[18px] text-[var(--color-primary)]" />
        <h2 className="text-[15px] leading-[18px] font-bold text-[var(--color-primary)]">Price Amendment</h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col pb-[14px]">
        <div className="px-[30px] pt-[15px] pb-[10px] space-y-[14px] shrink-0">
          <div className="flex items-center justify-between text-[12px] leading-[15px] font-semibold">
            <span className="text-[var(--color-text)]">Total Amount:</span>
            <span className="text-black">{formatAmount(totalAmount)}</span>
          </div>
          <div className="flex items-center justify-between text-[12px] leading-[15px] font-semibold">
            <span className="text-[var(--color-text)]">GST Amount (7%):</span>
            <span className="text-black">{formatAmount(gstAmount)}</span>
          </div>
        </div>

        <div className="mx-[17px] px-[13px] py-[10px] border-t border-b border-[var(--color-border)] shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[15px] leading-[18px] font-bold text-[var(--color-text)]">Payable</span>
            <span className="text-[22px] leading-[27px] font-bold text-[var(--color-primary)]">{formatAmount(payable)}</span>
          </div>
        </div>

        <div className="px-[30px] pt-[16px] flex items-center justify-between shrink-0">
          <span className="text-[12px] leading-[15px] font-semibold text-[var(--color-text)]">Tender</span>
          <div className="relative w-[123px]">
            <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[var(--color-primary)]">₹</span>
            <input
              type="text"
              placeholder="0.00"
              className="w-full h-[37px] bg-[#fbfbfd] border border-[#deddf6] rounded-[5px] pl-[29px] pr-[18px] text-right text-[14px] font-semibold text-[var(--color-primary)] placeholder:text-[#c8c3e7] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>

        <div className="mt-auto px-[16px] pt-[16px] shrink-0">
          <div className="h-[53px] rounded-[6px] bg-[#f1effc] px-[14px] flex items-center justify-between">
            <span className="text-[13px] leading-[16px] font-bold text-[var(--color-text)]">Change (Balance)</span>
            <span className="text-[20px] leading-[24px] font-bold text-[var(--color-primary)]">₹0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceAmendment;
