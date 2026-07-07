import { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Icons } from '../../../assets/icons';
import api from '../../../api/axios';

const SalesOverviewChart = () => {
  const [period, setPeriod] = useState('daily');
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await api.get(`/dashboard/sales-overview?period=${period}`);
        if (response.data.success) {
          // The repository returns data descending (latest to oldest), we should reverse it for chronological chart display
          // Wait, the repository loops from 6 down to 0, which means oldest to newest. Let's verify that.
          // i = 6: date is now - 6 days. i = 0: date is today. So it is chronologically ordered!
          setSalesData(response.data.data);
          
          const total = response.data.data.reduce((sum, item) => sum + item.sales, 0);
          setTotalSales(total);
        }
      } catch (error) {
        console.error("Failed to fetch sales overview", error);
      }
    };
    
    fetchSalesData();
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

  return (
    <div className="bg-white rounded-[8px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] p-[12px] h-full flex flex-col relative">
      <div className="flex items-center justify-between mb-[12px] shrink-0">
        <h2 className="text-[13px] font-bold text-[var(--color-text)]">Sales Overview</h2>
        
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center h-[24px] rounded-[4px] border border-[#deddf6] px-[6px] cursor-pointer"
          >
            <span className="text-[10px] font-semibold text-[var(--color-text)] mr-[4px] capitalize">{period}</span>
            <Icons.ChevronDown className="text-[10px] text-[#9b9ab1]" />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 top-[28px] w-[80px] bg-white border border-[#deddf6] rounded-[4px] shadow-sm z-20 overflow-hidden">
              <div 
                onClick={() => handlePeriodChange('daily')}
                className="px-[10px] py-[6px] text-[10px] font-semibold text-[var(--color-text)] hover:bg-[#fbfbfd] cursor-pointer"
              >
                Daily
              </div>
              <div 
                onClick={() => handlePeriodChange('weekly')}
                className="px-[10px] py-[6px] text-[10px] font-semibold text-[var(--color-text)] hover:bg-[#fbfbfd] cursor-pointer"
              >
                Weekly
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-[16px] mb-[12px] shrink-0">
        <div className="flex items-center gap-[6px]">
          <span className="w-[16px] h-[3px] rounded-full bg-[var(--color-primary)]"></span>
          <span className="text-[10px] font-semibold text-[#8a84b3]">Sales (₹)</span>
        </div>
      </div>

      <div className="flex-1 min-h-[100px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f5" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: '#8a84b3', fontWeight: 600 }} 
              dy={8}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: '#8a84b3', fontWeight: 600 }}
              width={35}
              ticks={[0, 5, 10, 15, 20]}
              domain={[0, 20]}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '6px', border: '1px solid #deddf6', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px' }}
              itemStyle={{ color: 'var(--color-primary)' }}
            />
            <Area type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-[12px] pt-[8px] border-t border-[var(--color-border)] flex items-center justify-between bg-[#fbfbfd] rounded-[6px] px-[12px] py-[8px] shrink-0">
        <div>
          <p className="text-[10px] font-semibold text-[#8a84b3] mb-[2px]">Total Sales ({period === 'daily' ? 'Last 7 Days' : 'Last 7 Weeks'})</p>
          <p className="text-[14px] font-bold text-[var(--color-text)] leading-none">₹{totalSales.toFixed(2)}</p>
        </div>
        <div className="h-[20px] px-[6px] rounded-[4px] bg-[#dff8e6] flex items-center justify-center">
          <span className="text-[9px] font-bold text-[#00a711]">Sales Trend</span>
        </div>
      </div>
    </div>
  );
};

export default SalesOverviewChart;
