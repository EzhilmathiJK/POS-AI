import { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons';
import api from '../../../api/axios';
import { useAppContext } from '../../../context/AppContext';

const SelectField = ({ label, icon: Icon, value, options, selected, onChange }) => (
  <div className="flex flex-col gap-[7px] w-full">
    <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-primary)]">{label}</span>
    <div className="relative w-full h-[34px] flex items-center">
      {Icon && <Icon className="absolute left-[12px] text-[14px] text-black pointer-events-none" />}
      <select
        value={selected || 'all'}
        onChange={(e) => onChange(e.target.value)}
        style={{ fontSize: '12px', fontWeight: 400 }}
        className={`w-full h-full appearance-none bg-white rounded-[6px] border border-[#deddf6] text-black focus:outline-none focus:border-[var(--color-primary)] pr-[30px] cursor-pointer ${Icon ? 'pl-[35px]' : 'pl-[12px]'}`}
      >
        <option value="all">{value}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      <Icons.ChevronDown className="absolute right-[12px] top-[11px] text-[12px] text-[#9b9ab1] pointer-events-none" />
    </div>
  </div>
);

const DateField = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-[7px] w-full">
    <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-primary)]">{label}</span>
    <div className="relative w-full h-[34px] flex items-center">
      <input
        type="date"
        max={new Date().toISOString().split('T')[0]}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onClick={(event) => event.currentTarget.showPicker?.()}
        style={{ fontSize: '12px', fontWeight: 400 }}
        className="w-full h-full bg-white rounded-[6px] border border-[#deddf6] pl-[12px] pr-[30px] text-black focus:outline-none focus:border-[var(--color-primary)] cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
      />
      <Icons.Calendar className="absolute right-[12px] text-[14px] text-black pointer-events-none" />
    </div>
  </div>
);

const InventoryFilters = ({ onFilter }) => {
  const { showToast } = useAppContext();
  const [filterOptions, setFilterOptions] = useState({ categories: [], itemNames: [], statuses: [] });
  const [filters, setFilters] = useState({
    category: 'all',
    search: '', // using item name dropdown as search
    status: 'all',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await api.get('/inventory/filter-dropdown');
        if (res.data.success) {
          setFilterOptions(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch inventory filters', error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleFilterClick = () => {
    if (filters.dateFrom && !filters.dateTo) {
      showToast('Please select a Date To', 'warning');
      return;
    }
    if (!filters.dateFrom && filters.dateTo) {
      showToast('Please select a Date From', 'warning');
      return;
    }
    if (onFilter) {
      onFilter(filters);
    }
  };

  const handleReset = () => {
    const defaultFilters = { category: 'all', search: '', status: 'all', dateFrom: '', dateTo: '' };
    setFilters(defaultFilters);
    if (onFilter) {
      onFilter(defaultFilters);
    }
  };

  return (
    <div className="w-full bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[16px] py-[16px] box-border shrink-0">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(150px,1fr)_minmax(150px,1fr)_minmax(140px,1fr)_minmax(150px,1fr)_minmax(150px,1fr)_minmax(190px,auto)] gap-[14px] items-end min-w-0">
        <SelectField label="Category" icon={Icons.GridMode} value="All Categories" options={filterOptions.categories} selected={filters.category} onChange={(val) => handleChange('category', val)} />
        <SelectField label="Item Name" icon={Icons.Inventory} value="All Items" options={filterOptions.itemNames} selected={filters.search} onChange={(val) => handleChange('search', val === 'all' ? '' : val)} />
        <SelectField label="Status" value="All Status" options={filterOptions.statuses} selected={filters.status} onChange={(val) => handleChange('status', val)} />
        <DateField label="Date From" value={filters.dateFrom} onChange={(val) => handleChange('dateFrom', val)} />
        <DateField label="Date To" value={filters.dateTo} onChange={(val) => handleChange('dateTo', val)} />

        <div className="grid grid-cols-2 gap-[10px] w-full min-w-0">
          <button onClick={handleFilterClick} style={{ fontSize: '14px' }} className="h-[34px] px-[16px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[7px] font-bold hover:bg-[var(--color-primary-hover)] cursor-pointer whitespace-nowrap">
            <Icons.Filter className="text-[14px]" />
            Filter
          </button>
          <button onClick={handleReset} style={{ fontSize: '14px' }} className="h-[34px] px-[16px] rounded-[6px] bg-white text-[var(--color-text)] border border-[#deddf6] flex items-center justify-center gap-[8px] font-bold hover:bg-gray-50 cursor-pointer whitespace-nowrap">
            <Icons.Reset className="text-[14px]" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;

