import { Icons } from '../../../assets/icons';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { name: 'New Bill', icon: Icons.ItemRequest, color: '#f3e8fd', iconColor: 'var(--color-primary)', path: '/billing' },
    { name: 'Add Product', icon: Icons.Inventory, color: '#e6f4ea', iconColor: '#00a711', path: '/inventory?action=add' },
    { name: 'New Order', icon: Icons.Lock, color: '#fdf0e6', iconColor: '#f58025', path: '/billing' },
    { name: 'Add Customer', icon: Icons.Users, color: '#e8f0fe', iconColor: '#1a73e8', path: '/users' },
    { name: 'Reports', icon: Icons.SalesReport, color: '#f3e8fd', iconColor: 'var(--color-primary)', path: '/sales-report' },
  ];

  return (
    <div className="bg-white rounded-[8px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] p-[12px] h-full flex flex-col">
      <h2 className="text-[13px] font-bold text-[var(--color-text)] mb-[10px] shrink-0">Quick Actions</h2>

      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[8px] min-h-[160px] lg:min-h-0">
        {actions.map((action, index) => (
          <button 
            key={index}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center justify-center gap-[6px] h-full rounded-[6px] border border-[#deddf6] hover:bg-gray-50 transition-colors p-[4px] min-w-0"
          >
            <div 
              className="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: action.color }}
            >
              <action.icon 
                className="text-[14px]" 
                style={{ color: action.iconColor }} 
              />
            </div>
            <span className="text-[9px] font-bold text-[var(--color-text)] text-center leading-[11px] truncate w-full">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
