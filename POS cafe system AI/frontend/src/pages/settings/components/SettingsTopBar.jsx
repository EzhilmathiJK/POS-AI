import React, { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons';
import { useAppContext } from '../../../context/AppContext';

const SettingsTopBar = () => {
  const { toggleSidebar, settings } = useAppContext();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-[76px] flex items-center justify-between shrink-0">
      <div className="flex items-center gap-[18px] pl-[8px]">
        <button onClick={toggleSidebar} className="text-[var(--color-text)] hover:bg-white w-[28px] h-[28px] rounded-[5px] flex items-center justify-center">
          <Icons.Menu className="text-[20px]" />
        </button>
        <div>
          <h1 className="text-[22px] font-bold text-black leading-none">Settings</h1>
        </div>
      </div>

      <div className="hidden md:flex items-center h-[42px] rounded-[6px] bg-white border border-[#deddf6] text-[var(--color-text)] mr-[4px] shadow-[0_1px_2px_rgba(3,4,90,0.04)]">
        <div className="h-full flex items-center gap-[9px] pl-[12px] pr-[17px] border-r border-[#e4e2fa]">
          <Icons.Calendar className="text-[17px] text-[var(--color-primary)]" />
          <div className="text-[12px] font-semibold leading-[14px]">
            <div>{time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            <div>{time.toLocaleDateString('en-US', { weekday: 'long' })}</div>
          </div>
        </div>
        <div className="h-full flex items-center gap-[9px] pl-[15px] pr-[17px]">
          <Icons.Clock className="text-[17px] text-[var(--color-primary)]" />
          <span className="text-[12px] font-semibold">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: settings?.timeFormat === '12h' })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default SettingsTopBar;
