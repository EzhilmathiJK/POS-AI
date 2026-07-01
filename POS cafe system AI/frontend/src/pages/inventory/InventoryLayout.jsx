import React from 'react';
import InventoryTopBar from './components/InventoryTopBar';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';

const InventoryLayout = () => {
  return (
    <div className="flex flex-col h-full bg-[var(--color-app-bg)] px-[13px] pb-[12px]">
      <InventoryTopBar />
      <InventoryFilters />
      <InventoryTable />
    </div>
  );
};

export default InventoryLayout;
