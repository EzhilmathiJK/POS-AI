import React from 'react';
import { useAppContext } from '../../context/AppContext';

const Toast = () => {
  const { toast } = useAppContext();

  if (!toast) return null;

  return (
    <div className="fixed top-[40px] right-[40px] z-[9999] transition-opacity duration-300">
      <div className={`px-[24px] py-[12px] rounded-[6px] shadow-lg text-[14px] font-semibold text-white flex items-center gap-[8px] ${
        toast.type === 'success' ? 'bg-[#078c22]' : 'bg-[#ff1e27]'
      }`}>
        {toast.message}
      </div>
    </div>
  );
};

export default Toast;
