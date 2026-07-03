import React, { useState } from 'react';
import { Icons } from '../../../assets/icons';

const AccordionSection = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className={`border-b border-[#deddf6] last:border-b-0 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'flex-1 min-h-0' : 'flex-none h-[64px]'}`}>
      <button
        onClick={onToggle}
        className="w-full h-[64px] shrink-0 flex items-center gap-[12px] px-[20px] text-left hover:bg-gray-50 transition-colors"
      >
        <Icons.Next className={`text-[16px] text-[var(--color-text)] transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        <h2 className="text-[14px] font-semibold text-[var(--color-text)]">{title}</h2>
      </button>
      
      <div className={`flex-1 min-h-0 overflow-y-auto custom-scrollbar transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-150' : 'opacity-0'}`}>
        <div className="p-[24px] pt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
