import React, { useState } from 'react';
import { Icons } from '../../assets/icons';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState('Beverage');

  const categories = [
    { name: 'Beverage', icon: Icons.Beverage },
    { name: 'Steamed Bun', icon: Icons.SteamedBun },
    { name: 'Steamed Dimsum', icon: Icons.Dimsum },
    { name: 'Deep Fry Timsun', icon: Icons.DeepFry },
    { name: 'Bake', icon: Icons.Bake },
    { name: 'Noodle/ Dumplings', icon: Icons.Noodles },
    { name: 'Porridge', icon: Icons.Porridge },
    { name: 'All Items', icon: Icons.AllItems },
  ];

  return (
    <div className="w-[172px] h-full bg-white rounded-[7px] px-[12px] pt-[16px] overflow-y-auto custom-scrollbar">
      <div className="space-y-[10px]">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`w-full h-[44px] flex items-center gap-[13px] px-[17px] rounded-[6px] text-left transition-colors ${
                isActive
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white text-black hover:bg-[var(--color-primary-soft)]'
              }`}
            >
              <cat.icon className={`text-[18px] shrink-0 ${isActive ? 'text-white' : 'text-[var(--color-text)]'}`} />
              <span className="text-[11.5px] font-semibold tracking-wide leading-tight">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
