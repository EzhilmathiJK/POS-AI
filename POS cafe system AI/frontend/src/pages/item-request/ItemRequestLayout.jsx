import { useState } from 'react';
import ItemRequestTopBar from './components/ItemRequestTopBar';
import ItemRequestFilters from './components/ItemRequestFilters';
import ItemRequestTable from './components/ItemRequestTable';
import NewItemRequestForm from './components/NewItemRequestForm';

const ItemRequestLayout = () => {
  const [isAddingRequest, setIsAddingRequest] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[var(--color-app-bg)] px-[13px] pb-[12px]">
      <ItemRequestTopBar isAddingRequest={isAddingRequest} />
      {isAddingRequest ? (
        <NewItemRequestForm onCancel={() => setIsAddingRequest(false)} />
      ) : (
        <>
          <ItemRequestFilters />
          <ItemRequestTable onNewItemRequest={() => setIsAddingRequest(true)} />
        </>
      )}
    </div>
  );
};

export default ItemRequestLayout;
