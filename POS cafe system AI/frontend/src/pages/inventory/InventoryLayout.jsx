import { useState } from 'react';
import InventoryTopBar from './components/InventoryTopBar';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';
import AddInventoryForm from './components/AddInventoryForm';

const InventoryLayout = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsEditingItem(true);
  };

  const handleCancel = () => {
    setIsAddingItem(false);
    setIsEditingItem(false);
    setSelectedItem(null);
  };

  const handleUpdate = (updatedData) => {
    console.log('Updating item:', updatedData);
    handleCancel();
  };

  const handleDelete = () => {
    console.log('Deleting item:', selectedItem);
    handleCancel();
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
          <InventoryTable onAddItem={() => setIsAddingItem(true)} onEditItem={handleEditItem} />
        </>
      )}
    </div>
  );
};

export default InventoryLayout;

