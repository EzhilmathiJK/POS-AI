import React, { useState } from 'react';
import { Icons } from '../../assets/icons';
import { useAppContext } from '../../context/AppContext';

const Categories = ({ activeCategory, onSelectCategory }) => {
  const { categories } = useAppContext();

  const displayCategories = [
    ...categories,
    { id: 'all-items', name: 'All Items', iconName: 'AllItems' }
  ];

  return (
    <div className="w-[172px] h-full bg-white rounded-[7px] px-[12px] pt-[16px] overflow-y-auto custom-scrollbar">
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
    </div>
  );
};

export default Categories;
