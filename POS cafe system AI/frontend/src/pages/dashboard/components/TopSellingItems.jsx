import { Icons } from '../../../assets/icons';
import { dashboardData } from '../dashboardData';

const TopSellingItems = () => {
  return (
    <div className="bg-white rounded-[8px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] p-[12px] h-full flex flex-col">
      <div className="flex items-center justify-between mb-[10px] shrink-0">
        <h2 className="text-[13px] font-bold text-[var(--color-text)]">Top Selling Items</h2>
        <div className="flex items-center h-[24px] rounded-[4px] border border-[#deddf6] px-[6px] cursor-pointer">
          <span className="text-[10px] font-semibold text-[var(--color-text)] mr-[4px]">This Week</span>
          <Icons.ChevronDown className="text-[10px] text-[#9b9ab1]" />
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
          {dashboardData.topSellingItems.map((item, index) => (
            <div key={item.id} className="grid grid-cols-[20px_1fr_40px_60px] items-center py-[7px]">
              <div className="text-[10px] font-bold text-[var(--color-text)]">{index + 1}.</div>
              <div className="flex items-center gap-[6px] min-w-0">
                <div className="w-[24px] h-[24px] rounded-[4px] bg-[#f7f6ff] flex items-center justify-center text-[12px] shrink-0">
                  {item.image}
                </div>
                <span className="text-[11px] font-semibold text-[var(--color-text)] truncate w-full">{item.name}</span>
              </div>
              <div className="text-right text-[10px] font-semibold text-[var(--color-text)]">{item.qtySold}</div>
              <div className="text-right text-[10px] font-bold text-[var(--color-text)]">₹{item.revenue.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[8px] pt-[8px] border-t border-[var(--color-border)] text-center shrink-0">
        <button style={{ fontSize: 12 }} className="font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-[4px]">
          View All Products <Icons.Next style={{ fontSize: 10 }} />
        </button>
      </div>
    </div>
  );
};

export default TopSellingItems;
