import { Icons } from '../../../assets/icons';
import { dashboardData } from '../dashboardData';

const RecentTransactions = () => {
  return (
    <div className="bg-white rounded-[8px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] p-[12px] h-full flex flex-col">
      <div className="flex items-center justify-between mb-[10px] shrink-0">
        <h2 className="text-[13px] font-bold text-[var(--color-text)]">Recent Transactions</h2>
        <button style={{ fontSize: 12 }} className="font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-[4px]">
          View All <Icons.Next style={{ fontSize: 10 }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-[4px] min-h-0 divide-y divide-[#f0f0f8]">
        {dashboardData.recentTransactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between py-[7px]">
            <div className="flex items-center gap-[8px] min-w-0">
              <div className="w-[28px] h-[28px] rounded-[6px] bg-[#f7f6ff] flex items-center justify-center text-[var(--color-primary)] shrink-0">
                <Icons.FileExcel className="text-[14px]" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[var(--color-text)] mb-[2px] truncate">{tx.id}</p>
                <p className="text-[9px] font-semibold text-[#8a84b3] truncate">{tx.date}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[11px] font-bold text-[var(--color-text)] mb-[2px]">₹{tx.amount.toFixed(2)}</p>
              <p className="text-[9px] font-bold text-[#00a711]">{tx.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[8px] pt-[8px] border-t border-[var(--color-border)] text-center shrink-0">
        <button style={{ fontSize: 12 }} className="font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-[4px]">
          View All Transactions <Icons.Next style={{ fontSize: 10 }} />
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;
