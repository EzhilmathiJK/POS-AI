import { NavLink } from 'react-router-dom';
import { Icons } from '../../assets/icons';
import { useAppContext } from '../../context/AppContext';

const Sidebar = () => {
  const { rolePermissions, currentUser, isSidebarOpen, setIsSidebarOpen } = useAppContext();

  const allNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Icons.Dashboard },
    { name: 'Billing', path: '/billing', icon: Icons.Billing },
    { name: 'Inventory', path: '/inventory', icon: Icons.Inventory },
    { name: 'Item Request', path: '/item-request', icon: Icons.ItemRequest },
    { name: 'Sales Report', path: '/sales-report', icon: Icons.SalesReport },
    { name: 'Users', path: '/users', icon: Icons.Users },
    { name: 'Settings', path: '/settings', icon: Icons.Settings },
  ];

  const allowedPages = rolePermissions[currentUser.role.toLowerCase()] || [];
  const navItems = allNavItems.filter(item => allowedPages.includes(item.name));

  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[40] lg:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <aside 
        className={`w-[178px] bg-[var(--color-sidebar)] text-white flex flex-col h-screen fixed left-0 top-0 z-[50] transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-7">
          <div className="bg-[var(--color-primary)] w-[44px] h-[44px] rounded-full flex items-center justify-center mb-[10px]">
            <Icons.Logo className="text-white text-[24px]" />
          </div>
          <h2 className="text-[17px] font-extrabold tracking-[-0.01em]">POS Cafe</h2>
        </div>

        <nav className="flex-1 px-[5px] space-y-[5px]">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-[14px] h-[40px] px-[23px] rounded-[6px] transition-colors ${
                  isActive
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-white hover:bg-[#20235a]'
                }`
              }
            >
              <item.icon className="text-[15px] shrink-0" />
              <span className="font-bold text-[12px] leading-none">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-y border-[var(--color-sidebar-line)] py-[12px] px-[5px] space-y-[5px]">
          <a href="#" className="flex items-center gap-[14px] h-[35px] px-[23px] rounded-[6px] text-white hover:bg-[#20235a] transition-colors">
            <Icons.Help className="text-[15px] shrink-0" />
            <span className="font-bold text-[12px] leading-none">Help & Support</span>
          </a>
          <NavLink to="/login" className="flex items-center gap-[14px] h-[35px] px-[23px] rounded-[6px] text-white hover:bg-[#20235a] transition-colors">
            <Icons.Logout className="text-[15px] shrink-0" />
            <span className="font-bold text-[12px] leading-none">Logout</span>
          </NavLink>
        </div>

        <div className="h-[71px] px-[24px] flex items-center gap-[11px]">
          <div className="w-[37px] h-[37px] rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-[19px]">
            A
          </div>
          <div>
            <p className="text-[13px] font-extrabold leading-[15px]">Admin</p>
            <p className="text-[12px] text-white leading-[15px]">Administrator</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
