import { useState, useEffect, useCallback } from 'react';
import InventoryTopBar from './components/InventoryTopBar';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';
import AddInventoryForm from './components/AddInventoryForm';
import api from '../../api/axios';
import { useAppContext } from '../../context/AppContext';

const InventoryLayout = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1, totalRecords: 0 });
  const [filters, setFilters] = useState({});
  const { showToast } = useAppContext();

  const fetchItems = useCallback(async (currentFilters = filters, page = pagination.page) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        limit: pagination.limit,
        ...currentFilters
      });

      const res = await api.get(`/inventory?${queryParams}`);
      if (res.data.success) {
        setItems(res.data.data);
        if (res.data.pagination) {
          setPagination(prev => ({
            ...prev,
            page: res.data.pagination.page,
            totalPages: res.data.pagination.totalPages,
            totalRecords: res.data.pagination.total
          }));
        }
      }
    } catch (error) {
      showToast('Failed to fetch inventory items', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit, showToast]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    fetchItems(newFilters, 1);
  };

  const handlePageChange = (newPage) => {
    fetchItems(filters, newPage);
  };

  const handleLimitChange = (newLimit) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsEditingItem(true);
  };

  const handleCancel = () => {
    setIsAddingItem(false);
    setIsEditingItem(false);
    setSelectedItem(null);
  };

  const handleUpdate = () => {
    fetchItems();
    handleCancel();
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      const res = await api.delete(`/inventory/${selectedItem.id}`);
      if (res.data.success) {
        showToast('Item deleted successfully', 'success');
        fetchItems();
        handleCancel();
      }
    } catch (error) {
      showToast('Failed to delete item', 'error');
    }
  };

  return (
    <div className="w-full h-full min-w-0 flex flex-col bg-[var(--color-app-bg)] overflow-x-hidden overflow-y-auto box-border px-[15px] sm:px-[13px] pb-[12px] gap-[12px]">
      <InventoryTopBar isAddingItem={isAddingItem} isEditingItem={isEditingItem} onNavigateBack={handleCancel} />
      {(isAddingItem || isEditingItem) ? (
        <AddInventoryForm 
          mode={isEditingItem ? 'edit' : 'add'} 
          initialData={selectedItem}
          onCancel={handleCancel}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ) : (
        <>
          <InventoryFilters onFilter={handleFilter} />
          <InventoryTable 
            items={items} 
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onAddItem={() => setIsAddingItem(true)} 
            onEditItem={handleEditItem} 
          />
        </>
      )}
    </div>
  );
};

export default InventoryLayout;

