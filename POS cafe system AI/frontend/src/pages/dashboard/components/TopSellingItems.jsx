import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../../assets/icons';
import api from '../../../api/axios';

const TopSellingItems = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('this_week');
  const [items, setItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchTopItems = async () => {
      try {
        const response = await api.get(`/dashboard/top-selling?period=${period}`);
        if (response.data.success) {
          setItems(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch top selling items", error);
      }
    };
    
    fetchTopItems();
  }, [period]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    setIsDropdownOpen(false);
  };

  const displayPeriod = period.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="bg-white rounded-[8px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] p-[12px] h-full flex flex-col relative">
      <div className="flex items-center justify-between mb-[10px] shrink-0">
        <h2 className="text-[13px] font-bold text-[var(--color-text)]">Top Selling Items</h2>
        
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center h-[24px] rounded-[4px] border border-[#deddf6] px-[6px] cursor-pointer"
          >
            <span className="text-[10px] font-semibold text-[var(--color-text)] mr-[4px]">{displayPeriod}</span>
            <Icons.ChevronDown className="text-[10px] text-[#9b9ab1]" />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 top-[28px] w-[90px] bg-white border border-[#deddf6] rounded-[4px] shadow-sm z-20 overflow-hidden">
              <div onClick={() => handlePeriodChange('this_week')} className="px-[10px] py-[6px] text-[10px] font-semibold text-[var(--color-text)] hover:bg-[#fbfbfd] cursor-pointer">This Week</div>
              <div onClick={() => handlePeriodChange('last_week')} className="px-[10px] py-[6px] text-[10px] font-semibold text-[var(--color-text)] hover:bg-[#fbfbfd] cursor-pointer">Last Week</div>
              <div onClick={() => handlePeriodChange('this_month')} className="px-[10px] py-[6px] text-[10px] font-semibold text-[var(--color-text)] hover:bg-[#fbfbfd] cursor-pointer">This Month</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="grid grid-cols-[20px_1fr_40px_60px] text-[10px] font-bold text-[#8a84b3] mb-[6px] shrink-0">
          <div>Items</div>
          <div></div>
          <div className="text-right">Qty</div>
          <div className="text-right">Revenue</div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-[4px] min-h-0 divide-y divide-[#f0f0f8]">
          {items.map((item, index) => {
            const isImage = item.image.startsWith('http') || item.image.startsWith('/uploads') || item.image.startsWith('/');
            const imageUrl = item.image.startsWith('/uploads') ? `http://localhost:8000${item.image}` : item.image;
            return (
              <div key={item.id} className="grid grid-cols-[20px_1fr_40px_60px] items-center py-[7px]">
                <div className="text-[10px] font-bold text-[var(--color-text)]">{index + 1}.</div>
                <div className="flex items-center gap-[6px] min-w-0">
                  <div className="w-[24px] h-[24px] rounded-[4px] bg-[#f7f6ff] flex items-center justify-center text-[12px] shrink-0 overflow-hidden">
                    {isImage ? (
                      <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    ) : (
                      item.image
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-[var(--color-text)] truncate w-full">{item.name}</span>
                </div>
                <div className="text-right text-[10px] font-semibold text-[var(--color-text)]">{item.qtySold}</div>
                <div className="text-right text-[10px] font-bold text-[var(--color-text)]">₹{item.revenue.toFixed(2)}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-[8px] pt-[8px] border-t border-[var(--color-border)] text-center shrink-0">
        <button onClick={() => navigate('/inventory')} style={{ fontSize: 12 }} className="font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-[4px]">
          View All Products <Icons.Next style={{ fontSize: 10 }} />
        </button>
      </div>
    </div>
  );
};

export default TopSellingItems;
