import React, { useState, useMemo } from 'react';

export const menuItems = [
  { id: 1, name: 'Black Coffee', price: 15.00, image: '/menu/black-coffee.png', category: 'Beverage' },
  { id: 2, name: 'Black Tea', price: 20.00, image: '/menu/black-tea.png', category: 'Beverage' },
  { id: 3, name: 'Bubble Tea', price: 80.00, image: '/menu/bubble-tea.png', category: 'Beverage' },
  { id: 4, name: 'Ginger Tea', price: 24.00, image: '/menu/ginger-tea.png', category: 'Beverage' },
  { id: 5, name: 'Cold Coffee', price: 20.00, image: '/menu/cold-coffee.png', category: 'Beverage' },
  { id: 6, name: 'Iced Tea', price: 50.00, image: '/menu/iced-tea.png', category: 'Beverage' },
  { id: 7, name: 'Milk', price: 20.00, image: '/menu/milk.png', category: 'Beverage' },
  { id: 8, name: 'Milo', price: 60.00, image: '/menu/milo.png', category: 'Beverage' },
  { id: 9, name: 'Cream Bun', price: 80.00, image: '/menu/cream-bun.png', category: 'Steamed Bun' },
  { id: 10, name: 'BBQ Bun', price: 50.00, image: '/menu/bbq-bun.png', category: 'Steamed Bun' },
];

// How many items fit per page in each view
const GRID_PER_PAGE = 16;  // 4 cols × 4 rows
const LIST_PER_PAGE = 6;  // 6 rows

const MenuGrid = ({ activeCategory, onAddItem, quantities = {}, viewMode = 'grid' }) => {
  const [page, setPage] = useState(0);

  const perPage = viewMode === 'grid' ? GRID_PER_PAGE : LIST_PER_PAGE;

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All Items') return menuItems;
    return menuItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Reset page when view mode or category changes
  const pageItems = useMemo(() => {
    const start = page * perPage;
    return filteredItems.slice(start, start + perPage);
  }, [page, perPage, filteredItems]);

  const totalPages = Math.ceil(filteredItems.length / perPage);

  // Reset to page 0 if switching modes or categories puts us out of range
  if (page >= totalPages && totalPages > 0) setPage(0);
  if (page > 0 && totalPages === 0) setPage(0);

  return (
    <div className="xl:flex-1 h-auto xl:h-full bg-white rounded-[7px] flex flex-col xl:overflow-hidden min-h-[400px] xl:min-h-0">

      {/* Items area */}
      <div className="xl:flex-1 xl:overflow-hidden p-[10px]">
        {filteredItems.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <span className="text-[12px] leading-[14px] font-normal text-[var(--color-muted)]">
              No dishes or menu items found
            </span>
          </div>
        ) : viewMode === 'grid' ? (
          /* ── GRID VIEW ── */
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-x-[10px] gap-y-[8px] h-auto xl:h-full content-start">
            {pageItems.map((item) => {
              const quantity = quantities[item.id] || 0;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onAddItem?.(item)}
                  className="relative bg-white rounded-[4px] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all flex flex-col items-center justify-start overflow-visible"
                  style={{ height: 103 }}
                >
                  {quantity > 0 && (
                    <span className="absolute -top-[1px] -left-[1px] min-w-[18px] h-[18px] px-[5px] rounded-[4px] bg-[var(--color-primary)] text-white text-[11px] leading-[18px] font-semibold z-10">
                      {quantity}
                    </span>
                  )}
                  <div className="h-[68px] w-full flex justify-center items-center pt-[4px]">
                    <img src={item.image} alt={item.name} className="max-h-[60px] max-w-[76px] object-contain" />
                  </div>
                  <div className="text-center leading-none px-[4px]">
                    <h3 className="text-[10px] font-semibold text-black leading-[11px] mb-[2px]">{item.name}</h3>
                    <p className="text-[var(--color-text)] font-semibold text-[9px]">₹{item.price.toFixed(2)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* ── LIST VIEW ── */
          <div className="flex flex-col gap-[8px]">
            {pageItems.map((item) => {
              const quantity = quantities[item.id] || 0;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onAddItem?.(item)}
                  className="flex items-center gap-[10px] p-[6px] rounded-[6px] border border-[#f0f0f8] hover:border-[var(--color-primary)] hover:shadow-sm hover:bg-[#faf9ff] transition-all text-left w-full group"
                >
                  {/* Image */}
                  <div className="w-[40px] h-[40px] rounded-[6px] bg-[#f7f6ff] flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-[34px] h-[34px] object-contain" />
                  </div>

                  {/* Name & Price */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[var(--color-text)] truncate leading-[14px]">{item.name}</p>
                    <p className="text-[11px] font-bold text-[var(--color-primary)] leading-[14px]">₹{item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity badge */}
                  {quantity > 0 && (
                    <span className="shrink-0 min-w-[22px] h-[22px] px-[6px] rounded-[4px] bg-[var(--color-primary)] text-white text-[11px] leading-[22px] font-bold text-center">
                      {quantity}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="shrink-0 flex items-center justify-center gap-[6px] pb-[8px] pt-[4px]">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="transition-all"
              style={{
                width: i === page ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: i === page ? 'var(--color-primary)' : '#d4d2f0',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuGrid;
