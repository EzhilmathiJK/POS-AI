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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: 'var(--color-app-bg)' }}>

      {/* Fixed Header */}
      <div style={{ flexShrink: 0, paddingLeft: 16, paddingRight: 16, background: 'white', borderBottom: '1px solid var(--color-border)' }}>
        <DashboardTopBar />
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}
        className="custom-scrollbar">

        {/* Row 1: Metric Cards — fixed height 88px */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, height: 88, flexShrink: 0 }}>
          <MetricCard icon={Icons.ItemRequest} iconBgColor="#f3e8fd" iconColor="var(--color-primary)" title="Total Sales" value="8962.98" change="0" isPositive={true} />
          <MetricCard icon={Icons.Lock} iconBgColor="#fdf0e6" iconColor="#f58025" title="Total Orders" value="14" change="0" isPositive={true} />
          <MetricCard icon={Icons.User} iconBgColor="#e8f0fe" iconColor="#1a73e8" title="Total Users" value="10" change="0" isPositive={true} />
          <MetricCard icon={Icons.SalesReport} iconBgColor="#f3e8fd" iconColor="var(--color-primary)" title="Average Order Value" value="640.21" change="0" isPositive={true} />
          <MetricCard icon={Icons.Inventory} iconBgColor="#e6f4ea" iconColor="#00a711" title="Total Products" value="22" change="0" isPositive={true} />
        </div>

        {/* Row 2: Charts — fixed height 340px */}
        <div style={{ display: 'grid', gridTemplateColumns: '40% 1fr 1fr', gap: 12, height: 340, flexShrink: 0 }}>
          <div style={{ height: '100%', minWidth: 0 }}><SalesOverviewChart /></div>
          <div style={{ height: '100%', minWidth: 0 }}><TopSellingItems /></div>
          <div style={{ height: '100%', minWidth: 0 }}><RecentTransactions /></div>
        </div>

        {/* Row 3: Low Stock + Quick Actions — fixed height 130px */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 390px', gap: 12, height: 130, flexShrink: 0 }}>
          <div style={{ height: '100%', minWidth: 0 }}><LowStockAlerts /></div>
          <div style={{ height: '100%', minWidth: 0 }}><QuickActions /></div>
        </div>

        {/* Footer — flows naturally at bottom of scroll */}
        <div style={{ paddingTop: 8, paddingBottom: 4, color: '#8a84b3', fontSize: 11, display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
          <span>© 2026 POS Cafe. All rights reserved.</span>
          <span>Made with ♥ for your business</span>
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;
