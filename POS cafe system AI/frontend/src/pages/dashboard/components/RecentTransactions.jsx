import { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/dashboard/recent-transactions');
        if (response.data.success) {
          setTransactions(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch recent transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="bg-white rounded-[8px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] p-[12px] h-full flex flex-col">
      <div className="flex items-center justify-between mb-[10px] shrink-0">
        <h2 className="text-[13px] font-bold text-[var(--color-text)]">Recent Transactions</h2>
        <button onClick={() => navigate('/sales-report')} className="text-[10px] font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-[2px]">
          View All <Icons.Next className="text-[8px]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-[4px] min-h-0 flex flex-col gap-[8px]">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-[8px] rounded-[6px] border border-[#f0f0f8] hover:border-[var(--color-primary)] hover:bg-[#fbfbfd] transition-colors cursor-pointer group">
            <div className="flex items-center gap-[10px] min-w-0">
              <div className="w-[32px] h-[32px] rounded-[6px] bg-[#f7f6ff] group-hover:bg-white flex items-center justify-center text-[var(--color-primary)] shrink-0 transition-colors">
                <Icons.FileExcel className="text-[14px]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] font-bold text-[var(--color-text)] truncate">{tx.id}</h4>
                <p className="text-[9px] font-semibold text-[#8a84b3] truncate mt-[2px]">{tx.date}</p>
              </div>
            </div>
            
            <div className="text-right shrink-0">
              <h4 className="text-[11px] font-bold text-[var(--color-text)]">₹{tx.amount.toFixed(2)}</h4>
              <p className="text-[9px] font-semibold text-[#00a711] mt-[2px]">{tx.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
