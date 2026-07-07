import { useState, useEffect, useCallback } from 'react';
import api from '../../api/axios';
import { useAppContext } from '../../context/AppContext';
import SalesReportTopBar from './components/SalesReportTopBar';
import SalesReportFilters from './components/SalesReportFilters';
import SalesReportTable from './components/SalesReportTable';

const SalesReportLayout = () => {
  const { showToast } = useAppContext();
  const [isSubView, setIsSubView] = useState(false);
  const [subViewTitle, setSubViewTitle] = useState('');

  const [salesData, setSalesData] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    selectedItem: '',
    datePreset: '',
    dateFrom: '',
    dateTo: ''
  });

  const [appliedFilters, setAppliedFilters] = useState({
    selectedItem: '',
    datePreset: '',
    dateFrom: '',
    dateTo: ''
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalRecords: 0
  });

  // Fetch filter options (items)
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await api.get('/sales-report/items');
        if (response.data.success) {
          setItemOptions(response.data.data.map(i => i.itemName));
        }
      } catch (error) {
        console.error('Failed to load item options', error);
      }
    };
    fetchOptions();
  }, []);

  // Fetch report data
  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit
      });

      if (appliedFilters.selectedItem && appliedFilters.selectedItem !== 'All Items') {
        params.append('selectedItem', appliedFilters.selectedItem);
      }

      const presetMap = {
        'Today': 'today',
        'Yesterday': 'yesterday',
        'This Week': 'thisWeek',
        'This Month': 'thisMonth',
        'Custom': 'custom',
        'All': 'all'
      };
      
      params.append('datePreset', presetMap[appliedFilters.datePreset] || 'all');

      if (appliedFilters.datePreset === 'Custom' && appliedFilters.dateFrom && appliedFilters.dateTo) {
        params.append('dateFrom', appliedFilters.dateFrom);
        params.append('dateTo', appliedFilters.dateTo);
      }

      const response = await api.get(`/sales-report?${params.toString()}`);
      if (response.data.success) {
        setSalesData(response.data.data.sales);
        setPagination({
          page: response.data.data.currentPage,
          limit: response.data.data.pageSize,
          totalPages: response.data.data.totalPages,
          totalRecords: response.data.data.totalRecords
        });
      }
    } catch (error) {
      showToast('Failed to load sales report', 'error');
    } finally {
      setLoading(false);
    }
  }, [appliedFilters, pagination.page, pagination.limit, showToast]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const applyFilters = () => {
    if (filters.datePreset === 'Custom') {
      if (filters.dateFrom && !filters.dateTo) {
        showToast('Please select a Reported Date To', 'warning');
        return;
      }
      if (!filters.dateFrom && filters.dateTo) {
        showToast('Please select a Reported Date From', 'warning');
        return;
      }
    }
    setAppliedFilters(filters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleResetFilters = () => {
    const defaultFilters = { selectedItem: '', datePreset: '', dateFrom: '', dateTo: '' };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
  };

  return (
    <div className="w-full h-full min-w-0 flex flex-col bg-[var(--color-app-bg)] overflow-x-hidden overflow-y-auto box-border px-[15px] sm:px-[13px] pb-[12px] gap-[12px]">
      <SalesReportTopBar isSubView={isSubView} subViewTitle={subViewTitle} />
      <SalesReportFilters 
        filters={filters} 
        onChange={handleFilterChange} 
        itemOptions={itemOptions} 
        onFilterClick={applyFilters}
        onResetClick={handleResetFilters}
      />
      <SalesReportTable 
        salesData={salesData} 
        pagination={pagination} 
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        loading={loading}
      />
    </div>
  );
};

export default SalesReportLayout;

