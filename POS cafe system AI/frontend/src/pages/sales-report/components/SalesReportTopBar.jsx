import { Icons } from '../../../assets/icons';

const SalesReportTopBar = ({ isSubView = false, subViewTitle = '' }) => {
  return (
    <header className="h-[76px] flex items-center justify-between shrink-0">
      <div className="flex items-center gap-[18px] pl-[8px]">
        <button className="text-[var(--color-text)] hover:bg-white w-[28px] h-[28px] rounded-[5px] flex items-center justify-center">
          <Icons.Menu className="text-[20px]" />
        </button>
        <div>
          <h1 className="text-[22px] font-bold text-black leading-none">Sales Report</h1>
          {isSubView && (
            <p className="mt-[8px] text-[12px] leading-[14px] font-semibold text-[var(--color-primary)]">
              Sales Report &gt; {subViewTitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center h-[42px] rounded-[6px] bg-white border border-[#deddf6] text-[var(--color-text)] mr-[4px] shadow-[0_1px_2px_rgba(3,4,90,0.04)]">
        <div className="h-full flex items-center gap-[9px] pl-[12px] pr-[17px] border-r border-[#e4e2fa]">
          <Icons.Calendar className="text-[17px] text-[var(--color-primary)]" />
          <div className="text-[12px] font-semibold leading-[14px]">
            <div>02 Jul 2026</div>
            <div>Thursday</div>
          </div>
        </div>
        <div className="h-full flex items-center gap-[9px] pl-[15px] pr-[17px]">
          <Icons.Clock className="text-[17px] text-[var(--color-primary)]" />
          <span className="text-[12px] font-semibold">12:58 PM</span>
        </div>
      </div>
    </header>
  );
};

export default SalesReportTopBar;

