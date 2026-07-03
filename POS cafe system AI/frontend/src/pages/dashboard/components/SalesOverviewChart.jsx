import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Icons } from '../../../assets/icons';
import { dashboardData } from '../dashboardData';

const SalesOverviewChart = () => {
  return (
    <div className="bg-white rounded-[8px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] p-[12px] h-full flex flex-col">
      <div className="flex items-center justify-between mb-[12px] shrink-0">
        <h2 className="text-[13px] font-bold text-[var(--color-text)]">Sales Overview</h2>
        <div className="flex items-center h-[24px] rounded-[4px] border border-[#deddf6] px-[6px] cursor-pointer">
          <span className="text-[10px] font-semibold text-[var(--color-text)] mr-[4px]">Daily</span>
          <Icons.ChevronDown className="text-[10px] text-[#9b9ab1]" />
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
          <AreaChart data={dashboardData.salesData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
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
          <p className="text-[10px] font-semibold text-[#8a84b3] mb-[2px]">Total Sales</p>
          <p className="text-[14px] font-bold text-[var(--color-text)] leading-none">₹8,962.98</p>
        </div>
        <div className="h-[20px] px-[6px] rounded-[4px] bg-[#dff8e6] flex items-center justify-center">
          <span className="text-[9px] font-bold text-[#00a711]">Sales Trend</span>
        </div>
      </div>
    </div>
  );
};

export default SalesOverviewChart;
