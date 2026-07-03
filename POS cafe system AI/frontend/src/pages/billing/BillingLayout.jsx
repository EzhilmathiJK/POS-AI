import React, { useMemo, useState } from 'react';
import { Icons } from '../../assets/icons';
import CurrentBill from './CurrentBill';
import NumpadInput from './NumpadInput';
import Categories from './Categories';
import MenuGrid from './MenuGrid';
import PurpleActions from './actions/PurpleActions';
import TealActions from './actions/TealActions';
import OrangeActions from './actions/OrangeActions';
import PriceAmendment from './PriceAmendment';

const BillingLayout = () => {
  const [billItems, setBillItems] = useState([]);
  const [showPriceAmendment, setShowPriceAmendment] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('All Items');

  const subtotal = useMemo(
    () => billItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [billItems]
  );

  const totalAmount = subtotal * 1.07;

  const handleAddItem = (item) => {
    setBillItems((currentItems) => {
      const existingItem = currentItems.find((billItem) => billItem.id === item.id);

      if (existingItem) {
        return currentItems.map((billItem) =>
          billItem.id === item.id
            ? { ...billItem, quantity: billItem.quantity + 1 }
            : billItem
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveItem = (itemId) => {
    setBillItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  const itemQuantities = useMemo(
    () => Object.fromEntries(billItems.map((item) => [item.id, item.quantity])),
    [billItems]
  );

  return (
    <div className="flex flex-col h-full bg-[var(--color-app-bg)] px-[10px] pb-[17px]">
      <header className="h-[57px] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-[16px] w-[360px] pl-[8px]">
          <button className="text-[var(--color-text)] hover:bg-white w-[28px] h-[28px] rounded-[5px] flex items-center justify-center">
            <Icons.Menu className="text-[18px]" />
          </button>
          <h1 className="text-[16px] font-semibold text-black">Current Bill</h1>
        </div>

        <div className="w-[160px] pl-[30px] flex items-start justify-center flex-col">
          <span className="text-[11px] font-semibold text-[var(--color-text)] leading-[13px]">Total Amount</span>
          <span className="text-[20px] font-semibold text-[var(--color-primary)] leading-[22px]">₹{totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-end gap-[14px] flex-1">
          <div className="relative w-[388px]">
            <Icons.Search className="absolute left-[11px] top-[10px] text-[#7773a8] text-[14px]" />
            <input
              type="text"
              placeholder="Search menu items..."
              className="w-full h-[31px] bg-white border border-[var(--color-border)] rounded-[7px] pl-[37px] pr-4 text-[12px] text-[var(--color-text)] placeholder:text-sm placeholder:text-[#766f9d] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="flex gap-[5px]">
            <button
              onClick={() => setViewMode('grid')}
              className={`w-[33px] h-[33px] rounded-[7px] shadow-sm flex items-center justify-center transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-gray-50'
              }`}
            >
              <Icons.GridMode className="text-[18px]" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`w-[33px] h-[33px] rounded-[7px] shadow-sm flex items-center justify-center transition-colors ${
                viewMode === 'list'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-gray-50'
              }`}
            >
              <Icons.ListMode className="text-[18px]" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex gap-[11px] min-h-0">
        <div className="w-[500px] flex flex-col gap-[12px]">
          {showPriceAmendment ? (
            <PriceAmendment
              totalAmount={subtotal}
              gstAmount={totalAmount - subtotal}
              payable={totalAmount}
            />
          ) : (
            <CurrentBill items={billItems} onRemoveItem={handleRemoveItem} />
          )}
          <NumpadInput />
        </div>

        <div className="flex shrink-0">
          <Categories activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <MenuGrid activeCategory={activeCategory} onAddItem={handleAddItem} quantities={itemQuantities} viewMode={viewMode} />
        </div>
      </div>

      <div className="h-[104px] grid grid-cols-[500px_233px_1fr] gap-[11px] shrink-0 mt-[11px]">
        <div>
          <PurpleActions 
            onNewBill={() => { setBillItems([]); setShowPriceAmendment(false); }} 
            onPriceAmendmentClick={() => setShowPriceAmendment(true)} 
          />
        </div>
        <div>
          <TealActions />
        </div>
        <div>
          <OrangeActions />
        </div>
      </div>
    </div>
  );
};

export default BillingLayout;
