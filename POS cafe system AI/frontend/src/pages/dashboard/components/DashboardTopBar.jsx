import { Icons } from '../../../assets/icons';
import { useAppContext } from '../../../context/AppContext';

const DashboardTopBar = () => {
  const { toggleSidebar, currentUser } = useAppContext();

  return (
    <header className="h-[60px] flex items-center justify-between shrink-0">
      <div className="flex items-center gap-[18px] flex-1">
        <button onClick={toggleSidebar} className="text-[var(--color-text)] hover:bg-white w-[28px] h-[28px] rounded-[5px] flex items-center justify-center shrink-0">
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
          <span className="text-[12px] font-semibold text-[var(--color-text)] mr-[8px]">
            {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
          <Icons.ChevronDown className="text-[12px] text-[#9b9ab1]" />
        </div>
        
        <button className="relative w-[36px] h-[36px] flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors mr-[10px]">
          <Icons.Bell className="text-[20px] text-[var(--color-text)]" />
          <span className="absolute top-[5px] right-[7px] w-[8px] h-[8px] bg-[var(--color-primary)] rounded-full"></span>
        </button>

        <div className="flex items-center gap-[12px] cursor-pointer hover:opacity-90 transition-opacity">
          <div className="w-[38px] h-[38px] rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-[13px] uppercase">
            {currentUser?.full_name ? currentUser.full_name.substring(0, 2) : 'AD'}
          </div>
          <div className="hidden sm:flex flex-col items-start justify-center">
            <p className="text-[14px] font-bold text-[#14142b] leading-[18px] capitalize">{currentUser?.role?.toLowerCase() || 'Admin'}</p>
            <p className="text-[12px] font-semibold text-[#8a84b3] leading-[16px]">{currentUser?.full_name || 'Administrator'}</p>
          </div>
          <Icons.ChevronDown className="hidden sm:block text-[14px] text-[#14142b] font-bold" strokeWidth={3} />
        </div>
      </div>
    </header>
  );
};

export default DashboardTopBar;
