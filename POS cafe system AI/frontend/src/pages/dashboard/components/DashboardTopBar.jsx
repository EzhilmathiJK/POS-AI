import { Icons } from '../../../assets/icons';

const DashboardTopBar = () => {
  return (
    <header className="h-[60px] flex items-center justify-between shrink-0">
      <div className="flex items-center gap-[18px] flex-1">
        <button className="text-[var(--color-text)] hover:bg-white w-[28px] h-[28px] rounded-[5px] flex items-center justify-center lg:hidden">
          <Icons.Menu className="text-[20px]" />
        </button>
        <div className="relative w-full max-w-[400px]">
          <Icons.Search className="absolute left-[14px] top-[10px] text-[15px] text-[#9b9ab1]" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-[36px] bg-white rounded-[8px] border border-[#deddf6] pl-[38px] pr-[50px] text-[13px] outline-none focus:border-[var(--color-primary)] placeholder:text-[#9b9ab1]"
          />
          <div className="absolute right-[10px] top-[8px] px-[6px] h-[20px] rounded-[4px] bg-[#f7f6ff] text-[10px] font-semibold text-[#8a84b3] flex items-center justify-center">
            Ctrl + K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[16px]">
        <div className="hidden md:flex items-center h-[36px] rounded-[8px] bg-white border border-[#deddf6] px-[12px] cursor-pointer hover:bg-gray-50">
          <Icons.Calendar className="text-[14px] text-[var(--color-text)] mr-[8px]" />
          <span className="text-[12px] font-semibold text-[var(--color-text)] mr-[8px]">22 Jun 2026</span>
          <Icons.ChevronDown className="text-[12px] text-[#9b9ab1]" />
        </div>
        
        <button className="relative w-[36px] h-[36px] rounded-full bg-white border border-[#deddf6] flex items-center justify-center hover:bg-gray-50">
          <Icons.Info className="text-[16px] text-[var(--color-text)]" /> {/* Assuming bell icon might be in Icons, if not Info is placeholder */}
          <span className="absolute top-[8px] right-[10px] w-[6px] h-[6px] bg-[#ff1e27] rounded-full border border-white"></span>
        </button>

        <div className="flex items-center gap-[10px] cursor-pointer">
          <div className="w-[36px] h-[36px] rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-[14px]">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] font-bold text-[var(--color-text)] leading-[15px]">admin</p>
            <p className="text-[11px] text-[#8a84b3] leading-[15px]">admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopBar;
