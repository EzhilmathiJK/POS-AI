import { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons';
import api from '../../../api/axios';
import { useAppContext } from '../../../context/AppContext';

const SelectField = ({ label, placeholder, options, value, onChange }) => (
  <div className="flex flex-col gap-[7px] w-full">
    <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-primary)]">{label}</span>
    <div className="relative w-full h-[34px] flex items-center">
      <select
        value={value}
        onChange={onChange}
        style={{ fontSize: '12px', fontWeight: 400 }}
        className="w-full h-full appearance-none bg-white rounded-[6px] border border-[#deddf6] text-black focus:outline-none focus:border-[var(--color-primary)] pl-[12px] pr-[30px] cursor-pointer"
      >
        <option value="all">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <Icons.ChevronDown className="absolute right-[12px] top-[11px] text-[12px] text-[#9b9ab1] pointer-events-none" />
    </div>
  </div>
);

const TextField = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col gap-[7px] w-full">
    <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-primary)]">{label}</span>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ fontSize: '12px', fontWeight: 400 }}
      className="w-full h-[34px] bg-white rounded-[6px] border border-[#deddf6] pl-[12px] pr-[12px] text-[var(--color-primary)] placeholder:text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)]"
    />
  </div>
);

const DateField = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-[7px] w-full">
    <span className="text-[13px] leading-[14px] font-semibold text-[var(--color-primary)]">{label}</span>
    <div className="relative w-full h-[34px] flex items-center">
      <input
        type="date"
        max={new Date().toISOString().split('T')[0]}
        value={value}
        onChange={onChange}
        onClick={(event) => event.currentTarget.showPicker?.()}
        style={{ fontSize: '12px', fontWeight: 400 }}
        className="w-full h-[34px] bg-white rounded-[6px] border border-[#deddf6] pl-[12px] pr-[30px] text-black focus:outline-none focus:border-[var(--color-primary)] cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
      />
      <Icons.Calendar className="absolute right-[12px] text-[14px] text-black pointer-events-none" />
    </div>
  </div>
);

const ItemRequestFilters = ({ onFilter }) => {
  const { showToast } = useAppContext();
  const [requestNumbers, setRequestNumbers] = useState([]);
  const [requestedBy, setRequestedBy] = useState([]);

  const [filters, setFilters] = useState({
    requestNo: 'all',
    subject: '',
    requestedBy: 'all',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await api.get('/item-requests/filter-dropdown');
        if (res.data.success) {
          setRequestNumbers(res.data.data.requestNumbers);
          setRequestedBy(res.data.data.requestedBy);
        }
      } catch (error) {
        console.error('Failed to fetch dropdown options', error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFilter = () => {
    if (filters.dateFrom && !filters.dateTo) {
      showToast('Please select a Requested Date To', 'warning');
      return;
    }
    if (!filters.dateFrom && filters.dateTo) {
      showToast('Please select a Requested Date From', 'warning');
      return;
    }
    if (onFilter) onFilter(filters);
  };

  const handleReset = () => {
    const defaultFilters = { requestNo: 'all', subject: '', requestedBy: 'all', dateFrom: '', dateTo: '' };
    setFilters(defaultFilters);
    if (onFilter) onFilter(defaultFilters);
  };

  return (
    <div className="w-full bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[16px] py-[16px] box-border shrink-0">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(150px,1fr)_minmax(150px,1fr)_minmax(140px,1fr)_minmax(150px,1fr)_minmax(150px,1fr)_minmax(190px,auto)] gap-[14px] items-end min-w-0">
        <SelectField label="Request ID" placeholder="All Requests" options={requestNumbers} value={filters.requestNo} onChange={(e) => handleChange('requestNo', e.target.value)} />
        <TextField label="Subject" placeholder="Enter subject" value={filters.subject} onChange={(e) => handleChange('subject', e.target.value)} />
        <SelectField label="Requested By" placeholder="All Users" options={requestedBy} value={filters.requestedBy} onChange={(e) => handleChange('requestedBy', e.target.value)} />
        <DateField label="Requested Date From" value={filters.dateFrom} onChange={(e) => handleChange('dateFrom', e.target.value)} />
        <DateField label="Requested Date To" value={filters.dateTo} onChange={(e) => handleChange('dateTo', e.target.value)} />

        <div className="grid grid-cols-2 gap-[10px] w-full min-w-0">
          <button onClick={handleFilter} style={{ fontSize: '14px' }} className="h-[34px] px-[16px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[7px] font-bold hover:bg-[var(--color-primary-hover)] cursor-pointer whitespace-nowrap">
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

export default ItemRequestFilters;
