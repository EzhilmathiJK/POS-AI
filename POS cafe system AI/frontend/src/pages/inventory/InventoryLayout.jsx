import { useState, useEffect } from 'react';
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
  const { showToast } = useAppContext();

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await api.get('/inventory');
      if (res.data.success) {
        setItems(res.data.data);
      }
    } catch (error) {
      showToast('Failed to fetch inventory items', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
          <InventoryFilters />
          <InventoryTable 
            items={items} 
            loading={loading}
            onAddItem={() => setIsAddingItem(true)} 
            onEditItem={handleEditItem} 
          />
        </>
      )}
    </div>
  );
};

export default InventoryLayout;

