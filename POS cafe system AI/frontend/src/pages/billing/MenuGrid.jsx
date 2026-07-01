import React from 'react';

export const menuItems = [
  { id: 1, name: 'Black Coffee', price: 15.00, image: '/menu/black-coffee.png' },
  { id: 2, name: 'Black Tea', price: 20.00, image: '/menu/black-tea.png' },
  { id: 3, name: 'Bubble Tea', price: 80.00, image: '/menu/bubble-tea.png' },
  { id: 4, name: 'Ginger Tea', price: 24.00, image: '/menu/ginger-tea.png' },
  { id: 5, name: 'Cold Coffee', price: 20.00, image: '/menu/cold-coffee.png' },
  { id: 6, name: 'Iced Tea', price: 50.00, image: '/menu/iced-tea.png' },
  { id: 7, name: 'Milk', price: 20.00, image: '/menu/milk.png' },
  { id: 8, name: 'Milo', price: 60.00, image: '/menu/milo.png' },
];

const MenuGrid = ({ onAddItem, quantities = {} }) => {
  return (
    <div className="flex-1 bg-white rounded-[7px] overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-4 gap-x-[12px] gap-y-[10px] p-[12px]">
        {menuItems.map((item) => {
          const quantity = quantities[item.id] || 0;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onAddItem?.(item)}
              className="relative h-[103px] bg-white rounded-[4px] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all flex flex-col items-center justify-start overflow-visible"
            >
              {quantity > 0 && (
                <span className="absolute -top-[1px] -left-[1px] min-w-[18px] h-[18px] px-[5px] rounded-[4px] bg-[var(--color-primary)] text-white text-[11px] leading-[18px] font-semibold z-10">
                  {quantity}
                </span>
              )}

              <div className="h-[72px] w-full flex justify-center items-center pt-[5px]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-[64px] max-w-[82px] object-contain"
                />
              </div>
              <div className="text-center leading-none">
                <h3 className="text-[10px] font-semibold text-black leading-[11px] mb-[3px]">{item.name}</h3>
                <p className="text-[var(--color-text)] font-semibold text-[9px] leading-[10px]">₹{item.price.toFixed(2)}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuGrid;
