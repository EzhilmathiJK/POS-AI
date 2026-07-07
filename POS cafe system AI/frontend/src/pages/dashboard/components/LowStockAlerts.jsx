import { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

const LowStockAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await api.get('/dashboard/low-stock');
        if (response.data.success) {
          setAlerts(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch low stock alerts", error);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="bg-white rounded-[8px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] p-[12px] h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-[10px] shrink-0">
        <div className="flex items-center gap-[6px]">
          <div className="text-[#ff1e27]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2 className="text-[13px] font-bold text-[var(--color-text)]">Low Stock Alerts</h2>
        </div>
        <button onClick={() => navigate('/inventory?filter=low_stock')} style={{ fontSize: 12 }} className="font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-[4px]">
          View All Alerts <Icons.Next style={{ fontSize: 10 }} />
        </button>
      </div>

      {/* Items row */}
      <div className="flex-1 grid gap-[8px] min-h-0" style={{ gridTemplateColumns: `repeat(${Math.max(alerts.length, 1)}, 1fr)` }}>
        {alerts.length === 0 ? (
           <div className="col-span-full h-full flex items-center justify-center text-[12px] text-[#8a84b3] font-semibold">
             No low stock alerts!
           </div>
        ) : alerts.map((item) => {
          const isImage = item.image.startsWith('http') || item.image.startsWith('/uploads') || item.image.startsWith('/');
          const imageUrl = item.image.startsWith('/uploads') ? `http://localhost:8000${item.image}` : item.image;
          
          return (
            <div
              key={item.name}
              className="h-full rounded-[6px] border border-[#deddf6] bg-white flex flex-col items-center justify-center p-[6px] gap-[4px] min-w-0 cursor-pointer hover:border-[var(--color-primary)] transition-colors"
              onClick={() => navigate('/inventory')}
            >
              {isImage ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-[36px] h-[36px] object-contain shrink-0 rounded-[4px]"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="w-[36px] h-[36px] flex items-center justify-center text-[20px] bg-[#f7f6ff] rounded-[4px] shrink-0">
                  {item.image}
                </div>
              )}
              <p className="text-[10px] font-bold text-[var(--color-text)] text-center truncate w-full leading-[12px]">
                {item.name}
              </p>
              <p className="text-[10px] font-bold text-[#ff1e27] leading-[12px]">
                Stock: {item.stock}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LowStockAlerts;
