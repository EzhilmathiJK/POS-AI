import { Icons } from '../../../assets/icons';

const MetricCard = ({ icon: Icon, iconBgColor, iconColor, title, value, change, isPositive }) => {
  return (
    <div className="bg-white rounded-[8px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] p-[12px] flex items-center gap-[12px]" style={{ height: 88 }}>
      <div
        className="rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBgColor, color: iconColor, width: 40, height: 40 }}
      >
        <Icon className="text-[18px]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-[#8a84b3] mb-[6px] truncate leading-none">{title}</p>
        <p className="text-[18px] font-bold text-[var(--color-text)] leading-none mb-[6px]">{value}</p>
        <div className="flex items-center gap-[3px]">
          {isPositive ? (
            <Icons.Plus className="text-[10px] text-[#00a711]" />
          ) : (
            <Icons.Minus className="text-[10px] text-[#ff1e27]" />
          )}
          <span className={`text-[10px] font-bold ${isPositive ? 'text-[#00a711]' : 'text-[#ff1e27]'}`}>
            {change}%
          </span>
          <span className="text-[9px] text-[#8a84b3] ml-[2px]">vs last week</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
