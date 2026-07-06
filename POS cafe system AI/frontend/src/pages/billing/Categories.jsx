import React, { useState } from 'react';
import { Icons } from '../../assets/icons';
import { useAppContext } from '../../context/AppContext';

const Categories = ({ categories: propCategories, activeCategory, onSelectCategory, isMobile = false }) => {
  const { categories: contextCategories } = useAppContext();
  
  const displayCategories = [
    ...(propCategories || contextCategories),
    { id: 'all-items', name: 'All Items', iconName: 'AllItems' }
  ];

  return (
    <div className={`${isMobile ? 'w-full h-auto overflow-x-auto flex gap-[10px] pb-[5px]' : 'w-[172px] h-full overflow-y-auto pt-[16px] space-y-[10px]'} bg-white rounded-[7px] px-[12px] py-[10px] lg:pt-[16px] lg:pb-0 custom-scrollbar shrink-0`}>
      {isMobile ? (
        displayCategories.map((cat) => {
          const isActive = activeCategory === cat.name;
          const IconComponent = Icons[cat.iconName] || Icons.Box;
          return (
            <button
              key={cat.id || cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`h-[44px] shrink-0 flex items-center justify-center gap-[10px] px-[20px] rounded-[6px] transition-colors ${
                isActive
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white text-black border border-[#deddf6] hover:bg-[var(--color-primary-soft)]'
              }`}
            >
              <IconComponent className={`text-[16px] shrink-0 ${isActive ? 'text-white' : 'text-[var(--color-primary)]'}`} />
              <span className="text-[12px] font-semibold tracking-wide">{cat.name}</span>
            </button>
          );
        })
      ) : (
        <div className="space-y-[10px]">
        {displayCategories.map((cat) => {
          const isActive = activeCategory === cat.name;
          const IconComponent = Icons[cat.iconName] || Icons.Box;
          return (
            <button
              key={cat.id || cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`w-full h-[44px] flex items-center gap-[13px] px-[17px] rounded-[6px] text-left transition-colors ${
                isActive
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white text-black hover:bg-[var(--color-primary-soft)]'
              }`}
            >
              <IconComponent className={`text-[18px] shrink-0 ${isActive ? 'text-white' : 'text-[var(--color-text)]'}`} />
              <span className="text-[11.5px] font-semibold tracking-wide leading-tight">{cat.name}</span>
            </button>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default Categories;
