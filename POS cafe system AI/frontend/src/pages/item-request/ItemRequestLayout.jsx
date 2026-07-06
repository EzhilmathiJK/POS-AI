import { useState, useEffect, useCallback } from 'react';
import ItemRequestTopBar from './components/ItemRequestTopBar';
import ItemRequestFilters from './components/ItemRequestFilters';
import ItemRequestTable from './components/ItemRequestTable';
import NewItemRequestForm from './components/NewItemRequestForm';
import api from '../../api/axios';
import { useAppContext } from '../../context/AppContext';

const ItemRequestLayout = () => {
  const [isAddingRequest, setIsAddingRequest] = useState(false);
  const [isEditingRequest, setIsEditingRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [itemRequests, setItemRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1, totalRecords: 0 });
  const [filters, setFilters] = useState({});
  const { showToast } = useAppContext();

  const fetchItemRequests = useCallback(async (currentFilters = filters, page = pagination.page) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        limit: pagination.limit,
        ...currentFilters
      });

      const res = await api.get(`/item-requests?${queryParams}`);
      if (res.data.success) {
        setItemRequests(res.data.data.itemRequests);
        setPagination(prev => ({
          ...prev,
          page: res.data.data.currentPage,
          totalPages: res.data.data.totalPages,
          totalRecords: res.data.data.totalRecords
        }));
      }
    } catch (error) {
      showToast('Failed to fetch item requests', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit, showToast]);

  useEffect(() => {
    fetchItemRequests();
  }, [fetchItemRequests]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    fetchItemRequests(newFilters, 1);
  };

  const handlePageChange = (newPage) => {
    fetchItemRequests(filters, newPage);
  };

  const handleLimitChange = (newLimit) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    setIsEditingRequest(true);
  };

  const handleCancel = () => {
    setIsAddingRequest(false);
    setIsEditingRequest(false);
    setSelectedRequest(null);
  };

  const handleUpdate = () => {
    fetchItemRequests();
    handleCancel();
  };

  const handleDelete = () => {
    // Delete is currently not a feature on backend, cancel is used.
    handleCancel();
  };

  return (
    <div className="w-full h-full min-w-0 flex flex-col bg-[var(--color-app-bg)] overflow-x-hidden overflow-y-auto box-border px-[15px] sm:px-[13px] pb-[12px] gap-[12px]">
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
          <ItemRequestFilters onFilter={handleFilter} />
          <ItemRequestTable 
            requests={itemRequests} 
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onNewItemRequest={() => setIsAddingRequest(true)} 
            onEditRequest={handleEditRequest} 
          />
        </>
      )}
    </div>
  );
};

export default ItemRequestLayout;
