import { useState } from 'react';
import InventoryTopBar from './components/InventoryTopBar';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';
import AddInventoryForm from './components/AddInventoryForm';

const InventoryLayout = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[var(--color-app-bg)] px-[13px] pb-[12px]">
      <InventoryTopBar isAddingItem={isAddingItem} />
      {isAddingItem ? (
        <AddInventoryForm onCancel={() => setIsAddingItem(false)} />
      ) : (
        <>
          <InventoryFilters />
          <InventoryTable onAddItem={() => setIsAddingItem(true)} />
        </>
      )}
    </div>
  );
};

export default InventoryLayout;
