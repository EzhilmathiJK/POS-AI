import { useState } from 'react';
import ItemRequestTopBar from './components/ItemRequestTopBar';
import ItemRequestFilters from './components/ItemRequestFilters';
import ItemRequestTable from './components/ItemRequestTable';
import NewItemRequestForm from './components/NewItemRequestForm';

const ItemRequestLayout = () => {
  const [isAddingRequest, setIsAddingRequest] = useState(false);
  const [isEditingRequest, setIsEditingRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    setIsEditingRequest(true);
  };

  const handleCancel = () => {
    setIsAddingRequest(false);
    setIsEditingRequest(false);
    setSelectedRequest(null);
  };

  const handleUpdate = (updatedData) => {
    console.log('Updating request:', updatedData);
    handleCancel();
  };

  const handleDelete = () => {
    console.log('Deleting request:', selectedRequest);
    handleCancel();
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-app-bg)] px-[13px] pb-[12px]">
      <ItemRequestTopBar 
        isAddingRequest={isAddingRequest} 
        isEditingRequest={isEditingRequest}
        subViewTitle={isEditingRequest ? 'Edit Item Request' : 'Add Item Request'} 
        onNavigateBack={handleCancel} 
      />
      {(isAddingRequest || isEditingRequest) ? (
        <NewItemRequestForm 
          mode={isEditingRequest ? 'edit' : 'add'} 
          initialData={selectedRequest}
          onCancel={handleCancel}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ) : (
        <>
          <ItemRequestFilters />
          <ItemRequestTable onNewItemRequest={() => setIsAddingRequest(true)} onEditRequest={handleEditRequest} />
        </>
      )}
    </div>
  );
};

export default ItemRequestLayout;
