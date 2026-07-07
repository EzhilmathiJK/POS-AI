import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../assets/icons';
import { useAppContext } from '../../context/AppContext';
import api from '../../api/axios';
import CurrentBill from './CurrentBill';
import NumpadInput from './NumpadInput';
import Categories from './Categories';
import MenuGrid from './MenuGrid';
import PurpleActions from './actions/PurpleActions';
import TealActions from './actions/TealActions';
import OrangeActions from './actions/OrangeActions';
import PriceAmendment from './PriceAmendment';
import ActionModal from '../../components/ui/ActionModal';

const BillingLayout = () => {
  const navigate = useNavigate();
  const { toggleSidebar, showToast, categories: contextCategories, settings } = useAppContext();
  const [billItems, setBillItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPriceAmendment, setShowPriceAmendment] = useState(false);
  const [showNewBillConfirm, setShowNewBillConfirm] = useState(false);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [activeMobileTab, setActiveMobileTab] = useState('cart'); // 'cart' or 'menu'
  const [tenderAmount, setTenderAmount] = useState(0);

  const subtotal = useMemo(
    () => billItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [billItems]
  );

  const gstRate = (settings?.gst ?? 7) / 100;
  const totalAmount = subtotal * (1 + gstRate);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get('/inventory?limit=1000&sortBy=id&sortOrder=asc');
        if (response.data.success) {
          setMenuItems(response.data.data);
        }
      } catch (error) {
        showToast('Failed to load menu items', 'error');
      }
    };
    fetchInventory();
  }, [showToast]);

  const handleAddItem = (item, quantityToAdd = 1) => {
    if (showPriceAmendment) {
      showToast('Please terminate transaction first!', 'warning');
      return;
    }

    const currentQtyInCart = billItems.find((billItem) => billItem.id === item.id)?.quantity || 0;
    if (currentQtyInCart + quantityToAdd > item.in_stock) {
      showToast(`Out of Stock: ${item.item_name} only has ${item.in_stock} left!`, 'error');
      return;
    }

    setBillItems((currentItems) => {
      const existingItem = currentItems.find((billItem) => billItem.id === item.id);
      if (existingItem) {
        return currentItems.map((billItem) =>
          billItem.id === item.id ? { ...billItem, quantity: billItem.quantity + quantityToAdd } : billItem
        );
      }
      return [...currentItems, { ...item, quantity: quantityToAdd }];
    });
  };

  const handleNumpadAdd = (itemNumber, quantity) => {
    if (!itemNumber) return;
    
    // Convert to string and find in menu items (by id or item_number)
    const target = menuItems.find(i => String(i.id) === String(itemNumber) || String(i.item_number) === String(itemNumber));
    if (target) {
      handleAddItem(target, quantity);
    } else {
      showToast(`Item number ${itemNumber} not found`, 'error');
    }
  };

  const handleRemoveItem = (itemId) => {
    setBillItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  const itemQuantities = useMemo(
    () => Object.fromEntries(billItems.map((item) => [item.id, item.quantity])),
    [billItems]
  );

  const handleQuickTender = (amount) => {
    if (!showPriceAmendment) return;
    setTenderAmount(prev => prev + amount);
  };

  const handlePrint = async () => {
    if (!showPriceAmendment) {
      showToast('Open Price Amendment first!', 'warning');
      return;
    }
    if (tenderAmount < totalAmount) {
      showToast(`Insufficient Amount: Total payable is ₹${totalAmount.toFixed(2)}`, 'error');
      return;
    }

    try {
      setIsProcessing(true);
      const payload = {
        cart: billItems.map(item => ({
          id: item.id,
          item_number: item.item_number || 'UNKNOWN',
          item_name: item.item_name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount,
        tenderAmount,
        balanceAmount: tenderAmount > totalAmount ? tenderAmount - totalAmount : 0
      };

      const response = await api.post('/billing', payload);
      if (response.data.success) {
        showToast('Bill printed successfully.', 'success');
        setBillItems([]);
        setShowPriceAmendment(false);
        setTenderAmount(0);
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to print bill', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTerminate = () => {
    if (!showPriceAmendment) {
      showToast('No active transaction to terminate!', 'warning');
      return;
    }
    showToast('Transaction Terminated. Continue billing.', 'info');
    setShowPriceAmendment(false);
    setTenderAmount(0);
  };

  const handleDeleteAll = () => {
    if (billItems.length === 0) {
      showToast('Cart is already empty!', 'info');
      return;
    }
    setShowDeleteAllConfirm(true);
  };

  const confirmDeleteAll = () => {
    setBillItems([]);
    setShowPriceAmendment(false);
    setTenderAmount(0);
    setShowDeleteAllConfirm(false);
  };

  const handlePriceAmendmentClick = () => {
    if (billItems.length === 0) {
      showToast('Please add items to cart first!', 'error');
      return;
    }
    setShowPriceAmendment(true);
  };

  const handleNewBill = () => {
    if (showPriceAmendment) {
      showToast('Please terminate transaction first!', 'warning');
      return;
    }
    if (billItems.length > 0) {
      setShowNewBillConfirm(true);
    } else {
      setBillItems([]);
      setShowPriceAmendment(false);
      setTenderAmount(0);
    }
  };

  const confirmNewBill = () => {
    setBillItems([]);
    setShowPriceAmendment(false);
    setTenderAmount(0);
    setShowNewBillConfirm(false);
  };

  const MobileActionBlocks = () => (
    <div className="flex flex-col gap-[10px] shrink-0 mt-[10px]">
      <div className="h-[104px]"><PurpleActions onNewBill={handleNewBill} onPriceAmendmentClick={handlePriceAmendmentClick} onQuickTender={handleQuickTender} /></div>
      <div className="flex flex-col md:flex-row gap-[10px]">
        <div className="h-[90px] md:flex-1"><TealActions /></div>
        <div className="h-[120px] md:h-[90px] md:flex-1"><OrangeActions onTerminate={handleTerminate} onPrint={handlePrint} onDeleteAll={handleDeleteAll} onMainMenu={() => navigate('/')} /></div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden xl:flex flex-col h-full bg-[var(--color-app-bg)] px-[10px] pb-[17px]">
        <header className="h-[57px] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-[16px] w-[360px] pl-[8px]">
            <button onClick={toggleSidebar} className="text-[var(--color-text)] hover:bg-white w-[28px] h-[28px] rounded-[5px] flex items-center justify-center">
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
              <input type="text" placeholder="Search menu items..." className="w-full h-[31px] bg-white border border-[var(--color-border)] rounded-[7px] pl-[37px] pr-4 text-[12px] text-[var(--color-text)] placeholder:text-[#766f9d] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
            </div>
            <div className="flex gap-[5px]">
              <button onClick={() => setViewMode('grid')} className={`w-[33px] h-[33px] rounded-[7px] shadow-sm flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-gray-50'}`}><Icons.GridMode className="text-[18px]" /></button>
              <button onClick={() => setViewMode('list')} className={`w-[33px] h-[33px] rounded-[7px] shadow-sm flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-gray-50'}`}><Icons.ListMode className="text-[18px]" /></button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex gap-[11px] min-h-0">
          <div className="w-[500px] flex flex-col gap-[12px]">
            {showPriceAmendment ? <PriceAmendment totalAmount={subtotal} gstAmount={totalAmount - subtotal} payable={totalAmount} tenderAmount={tenderAmount} onTenderChange={setTenderAmount} /> : <CurrentBill items={billItems} onRemoveItem={handleRemoveItem} />}
            <NumpadInput onAdd={handleNumpadAdd} />
          </div>
          <div className="flex shrink-0">
            <Categories categories={contextCategories} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <MenuGrid menuItems={menuItems} activeCategory={activeCategory} onAddItem={handleAddItem} quantities={itemQuantities} viewMode={viewMode} />
          </div>
        </div>

        <div className="h-[104px] grid grid-cols-[500px_233px_1fr] gap-[11px] shrink-0 mt-[11px]">
          <div><PurpleActions onNewBill={handleNewBill} onPriceAmendmentClick={handlePriceAmendmentClick} onQuickTender={handleQuickTender} /></div>
          <div><TealActions /></div>
          <div><OrangeActions onTerminate={handleTerminate} onPrint={handlePrint} onDeleteAll={handleDeleteAll} onMainMenu={() => navigate('/')} /></div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="flex xl:hidden flex-col h-full bg-[var(--color-app-bg)] overflow-hidden">
        {/* Mobile & Tablet Header */}
        <header className="flex flex-col shrink-0 bg-white border-b border-[var(--color-border)] pb-[2px] md:pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between px-[15px] pt-[15px] pb-[10px] md:pb-[15px] gap-[10px] md:gap-[20px]">
            {/* Top row (mobile) / Left section (tablet) */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[15px]">
                <button onClick={toggleSidebar} className="text-[var(--color-text)] hover:bg-gray-50 w-[30px] h-[30px] rounded-[5px] flex items-center justify-center">
                  <Icons.Menu className="text-[20px]" />
                </button>
                <h1 className="text-[18px] font-bold text-black">Current Bill</h1>
              </div>
              {/* Total Amount (mobile only, hidden on tablet) */}
              <div className="flex flex-col items-end md:hidden">
                <span className="text-[11px] font-bold text-[var(--color-text)] leading-[13px]">Total Amount</span>
                <span className="text-[18px] font-bold text-[var(--color-primary)] leading-[20px]">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Total Amount (tablet only, centered) */}
            <div className="hidden md:flex flex-col items-center flex-1">
              <span className="text-[12px] font-bold text-[var(--color-text)] leading-[14px]">Total Amount</span>
              <span className="text-[20px] font-bold text-[var(--color-primary)] leading-[22px]">₹{totalAmount.toFixed(2)}</span>
            </div>

            {/* Search & View toggles (Second row on mobile / Right section on tablet) */}
            <div className="flex gap-[10px] md:w-[350px]">
              <div className="relative flex-1">
                <Icons.Search className="absolute left-[11px] top-[10px] text-[#7773a8] text-[14px]" />
                <input type="text" placeholder="Search menu items..." className="w-full h-[36px] bg-white border border-[#deddf6] rounded-[7px] pl-[37px] pr-4 text-[13px] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
              </div>
              <div className="flex gap-[5px]">
                <button onClick={() => setViewMode('grid')} className={`w-[36px] h-[36px] rounded-[7px] shadow-sm flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-gray-50'}`}><Icons.GridMode className="text-[18px]" /></button>
                <button onClick={() => setViewMode('list')} className={`w-[36px] h-[36px] rounded-[7px] shadow-sm flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-gray-50'}`}><Icons.ListMode className="text-[18px]" /></button>
              </div>
            </div>
          </div>

          <div className="flex w-full md:hidden">
            <button 
              onClick={() => setActiveMobileTab('cart')}
              className={`flex-1 py-[12px] text-[14px] text-center border-b-[2px] font-bold transition-colors ${activeMobileTab === 'cart' ? 'text-[var(--color-primary)] border-[var(--color-primary)]' : 'text-[#8a84b3] border-transparent'}`}
            >
              Cart ({billItems.length})
            </button>
            <button 
              onClick={() => setActiveMobileTab('menu')}
              className={`flex-1 py-[12px] text-[14px] text-center border-b-[2px] font-bold transition-colors ${activeMobileTab === 'menu' ? 'text-[var(--color-primary)] border-[var(--color-primary)]' : 'text-[#8a84b3] border-transparent'}`}
            >
              Menu
            </button>
          </div>
        </header>

        {/* Mobile & Tablet Body */}
        <div className="flex-1 overflow-y-auto px-[10px] py-[10px] flex flex-col gap-[10px]">
          <div className="flex flex-col md:flex-row gap-[10px]">
            {/* Left Column (Active tab on mobile, permanent on tablet) */}
            <div className={`w-full md:w-1/2 flex-col gap-[10px] ${activeMobileTab === 'cart' ? 'flex' : 'hidden md:flex'}`}>
              {showPriceAmendment ? <PriceAmendment totalAmount={subtotal} gstAmount={totalAmount - subtotal} payable={totalAmount} tenderAmount={tenderAmount} onTenderChange={setTenderAmount} /> : <CurrentBill items={billItems} onRemoveItem={handleRemoveItem} />}
              <NumpadInput onAdd={handleNumpadAdd} />
            </div>
            
            {/* Right Column (Active tab on mobile, permanent on tablet) */}
            <div className={`w-full md:w-1/2 flex-col gap-[10px] ${activeMobileTab === 'menu' ? 'flex' : 'hidden md:flex'}`}>
              <div className="w-full shrink-0">
                <Categories categories={contextCategories} activeCategory={activeCategory} onSelectCategory={setActiveCategory} isMobile={true} />
              </div>
              <div className="w-full flex flex-col shrink-0">
                <MenuGrid menuItems={menuItems} activeCategory={activeCategory} onAddItem={handleAddItem} quantities={itemQuantities} viewMode={viewMode} />
              </div>
            </div>
          </div>

          <MobileActionBlocks />
        </div>
      </div>

      {/* Action Modals */}
      <ActionModal
        isOpen={showNewBillConfirm}
        onClose={() => setShowNewBillConfirm(false)}
        type="warning"
        title="Open New Bill?"
        message="Are you sure you want to open a new bill? All items currently in the cart will be removed."
        primaryAction={{
          text: 'New Bill',
          onClick: confirmNewBill
        }}
        secondaryAction={{ text: 'Cancel' }}
      />

      <ActionModal
        isOpen={showDeleteAllConfirm}
        onClose={() => setShowDeleteAllConfirm(false)}
        type="delete"
        title="Clear Cart?"
        message="Are you sure you want to remove all items from the current bill?"
        primaryAction={{
          text: 'Clear Cart',
          onClick: confirmDeleteAll
        }}
        secondaryAction={{ text: 'Cancel' }}
      />
    </>
  );
};

export default BillingLayout;
