import { Icons } from '../../assets/icons';
import DashboardTopBar from './components/DashboardTopBar';
import MetricCard from './components/MetricCard';
import SalesOverviewChart from './components/SalesOverviewChart';
import TopSellingItems from './components/TopSellingItems';
import RecentTransactions from './components/RecentTransactions';
import LowStockAlerts from './components/LowStockAlerts';
import QuickActions from './components/QuickActions';

const DashboardLayout = () => {
  return (
    // Outer: full height, flex column, header fixed, rest scrollable
    <div className="flex flex-col h-full bg-[var(--color-app-bg)] overflow-hidden w-full min-w-0">

      {/* Fixed Header */}
      <div className="shrink-0 px-[16px] bg-white border-b border-[var(--color-border)] w-full">
        <DashboardTopBar />
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-[12px] flex flex-col gap-[12px] custom-scrollbar w-full min-w-0">

        {/* Row 1: Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-[12px] shrink-0 w-full min-w-0">
          <MetricCard icon={Icons.ItemRequest} iconBgColor="#f3e8fd" iconColor="var(--color-primary)" title="Total Sales" value="8962.98" change="0" isPositive={true} />
          <MetricCard icon={Icons.Lock} iconBgColor="#fdf0e6" iconColor="#f58025" title="Total Orders" value="14" change="0" isPositive={true} />
          <MetricCard icon={Icons.User} iconBgColor="#e8f0fe" iconColor="#1a73e8" title="Total Users" value="10" change="0" isPositive={true} />
          <MetricCard icon={Icons.SalesReport} iconBgColor="#f3e8fd" iconColor="var(--color-primary)" title="Average Order Value" value="640.21" change="0" isPositive={true} />
          <MetricCard icon={Icons.Inventory} iconBgColor="#e6f4ea" iconColor="#00a711" title="Total Products" value="22" change="0" isPositive={true} />
        </div>

        {/* Row 2: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[40%_1fr_1fr] gap-[12px] shrink-0 w-full min-w-0 h-auto xl:h-[340px]">
          <div className="h-[340px] xl:h-full min-w-0"><SalesOverviewChart /></div>
          <div className="h-[340px] xl:h-full min-w-0"><TopSellingItems /></div>
          <div className="h-[340px] xl:h-full min-w-0 lg:col-span-2 xl:col-span-1"><RecentTransactions /></div>
        </div>

        {/* Row 3: Low Stock + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-[12px] shrink-0 w-full min-w-0 h-auto lg:h-[130px]">
          <div className="h-[130px] sm:h-[140px] lg:h-full min-w-0"><LowStockAlerts /></div>
          <div className="h-auto lg:h-full min-w-0"><QuickActions /></div>
        </div>

        {/* Footer — flows naturally at bottom of scroll */}
        <div className="pt-[8px] pb-[4px] text-[#8a84b3] text-[11px] flex justify-between shrink-0 flex-wrap gap-[10px]">
          <span>© 2026 POS Cafe. All rights reserved.</span>
          <span>Made with ♥ for your business</span>
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;
