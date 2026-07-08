import { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons';
import ActionModal from '../../../components/ui/ActionModal';
import { useAppContext } from '../../../context/AppContext';
import api from '../../../api/axios';

const requiredMark = <span className="text-[#ff1e27]">*</span>;

const FieldLabel = ({ children, required = false }) => (
  <span className="block text-[13px] leading-[16px] font-semibold text-[var(--color-text)] mb-[8px]">
    {children} {required && requiredMark}
  </span>
);

const TextInput = ({ placeholder, value, readOnly = false, onChange }) => (
  <input
    type="text"
    value={value}
    readOnly={readOnly}
    placeholder={placeholder}
    onChange={onChange}
    style={{ fontSize: '12px', fontWeight: 400 }}
    className={`w-full h-[32px] rounded-[6px] border border-[#deddf6] px-[12px] outline-none focus:border-[var(--color-primary)] ${
      readOnly
        ? 'bg-[#fbfbfd] text-[#b9b2e6] placeholder:text-[#b9b2e6]'
        : 'bg-white text-[var(--color-primary)] placeholder:text-[#9b8fd6]'
    }`}
  />
);

const DateInput = ({ value, readOnly = false, onChange }) => (
  <div className="relative">
    <input
      type={readOnly ? 'text' : 'date'}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      onClick={(event) => {
        if (!readOnly) event.currentTarget.showPicker?.();
      }}
      style={{ fontSize: '12px', fontWeight: 400 }}
      className={`w-full h-[32px] rounded-[6px] border border-[#deddf6] pl-[12px] pr-[35px] outline-none focus:border-[var(--color-primary)] ${
        readOnly ? 'bg-[#fbfbfd] text-[#b9b2e6]' : 'bg-white text-[var(--color-primary)] cursor-pointer'
      } [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
    />
    <Icons.Calendar className="absolute right-[13px] top-[9px] text-[14px] text-[var(--color-primary)] pointer-events-none" />
  </div>
);

const SelectInput = ({ value, onChange, options = [] }) => (
  <div className="relative">
    <select
      required
      value={value || ''}
      onChange={onChange}
      style={{ fontSize: '12px', fontWeight: 400 }}
      className="w-full h-[32px] appearance-none rounded-[6px] border border-[#deddf6] bg-white pl-[12px] pr-[34px] text-[var(--color-primary)] invalid:text-[#9b8fd6] outline-none focus:border-[var(--color-primary)] cursor-pointer"
    >
      <option value="" disabled hidden>Select item</option>
      {options.map((item) => (
        <option key={item.id} value={item.id}>{item.item_name}</option>
      ))}
    </select>
    <Icons.ChevronDown className="absolute right-[12px] top-[10px] text-[12px] text-[#b2b5c2] pointer-events-none" />
  </div>
);

const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const NewItemRequestForm = ({ mode = 'add', initialData = null, onCancel, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    requestId: '',
    subject: '',
    requestedBy: 'Admin',
    requestedDate: '',
    expectingDelivery: '',
    status: 'Pending'
  });
  const [rows, setRows] = useState([{ id: 1, item: '', quantity: '', expectedDate: '' }]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const { showToast, currentUser } = useAppContext();
  const [modalState, setModalState] = useState({ isOpen: false, type: '', step: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await api.get('/inventory?limit=1000');
        if (res.data.success) {
          setInventoryItems(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch inventory', err);
      }
    };
    fetchInventory();

    if (mode === 'edit' && initialData) {
      setFormData({
        requestId: initialData.id || '',
        subject: initialData.subject || '',
        requestedBy: initialData.requested_by || 'Admin',
        requestedDate: formatDateForInput(initialData.created_at || initialData.request_date),
        expectingDelivery: formatDateForInput(initialData.delivery_date),
        status: initialData.status || 'Pending'
      });
      if (initialData.details && initialData.details.length > 0) {
        setRows(initialData.details.map((detail, index) => ({
          id: index + 1,
          item: detail.inventory_id || '',
          quantity: detail.quantity || '',
          expectedDate: formatDateForInput(detail.expected_date)
        })));
      }
    } else {
      const today = new Date().toLocaleDateString('en-CA');
      setFormData(prev => ({ ...prev, requestedDate: today, requestedBy: currentUser?.full_name || 'Admin' }));
    }
  }, [mode, initialData, currentUser]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRowChange = (rowId, field, value) => {
    setRows(rows.map(row => row.id === rowId ? { ...row, [field]: value } : row));
  };

  const addRow = () => {
    setRows((currentRows) => [...currentRows, { id: Date.now() }]);
  };

  const removeRow = (rowId) => {
    setRows((currentRows) => (
      currentRows.length === 1 ? currentRows : currentRows.filter((row) => row.id !== rowId)
    ));
  };

  const validateForm = () => {
    if (!formData.subject.trim()) {
      showToast('Subject is required', 'error');
      return false;
    }
    if (rows.length === 0 || rows.some(r => !r.item || !r.quantity || !r.expectedDate)) {
      showToast('All item fields are required', 'error');
      return false;
    }
    return true;
  };

  const getPayload = () => ({
    subject: formData.subject,
    requestedBy: currentUser?.fullname || 'Admin',
    deliveryDate: formData.expectingDelivery,
    items: rows.map(r => ({
      inventoryId: parseInt(r.item),
      quantity: parseInt(r.quantity),
      expectedDate: r.expectedDate
    }))
  });

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      if (mode === 'add') {
        const res = await api.post('/item-requests', getPayload());
        if (res.data.success) {
          setModalState({ isOpen: true, type: 'success', step: 'saveSuccess' });
        }
      } else {
        const res = await api.put(`/item-requests/${formData.requestId}`, getPayload());
        if (res.data.success) {
          setModalState({ isOpen: true, type: 'success', step: 'updateSuccess' });
        }
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'An error occurred', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitRequest = () => {
    if (!validateForm()) return;
    setModalState({ isOpen: true, type: 'submit', step: 'submitConfirm' });
  };

  const handleCancelRequest = () => {
    setModalState({ isOpen: true, type: 'cancel', step: 'cancelConfirm' });
  };

  const handleModalPrimaryAction = async () => {
    try {
      setIsSubmitting(true);
      const step = modalState.step;
      setModalState({ isOpen: false, type: '', step: '' });

      if (step === 'saveSuccess' || step === 'updateSuccess') {
        if (onUpdate) onUpdate();
      } else if (step === 'submitConfirm') {
        // If mode is add, we first create it, then submit it
        let reqId = formData.requestId;
        if (mode === 'add') {
          const res = await api.post('/item-requests', getPayload());
          reqId = res.data.data.id;
        } else {
          await api.put(`/item-requests/${reqId}`, getPayload());
        }
        
        const res = await api.patch(`/item-requests/${reqId}/submit`);
        if (res.data.success) {
          showToast('Request submitted successfully', 'success');
          if (onUpdate) onUpdate();
        }
      } else if (step === 'cancelConfirm') {
        const res = await api.patch(`/item-requests/${formData.requestId}/cancel`);
        if (res.data.success) {
          showToast('Request cancelled successfully', 'success');
          if (onUpdate) onUpdate();
        }
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'An error occurred', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pb-[18px]">
      <section className="mt-[27px] bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.08)] px-[18px] pt-[21px] pb-[19px]">
        <h2 className="text-[17px] leading-[20px] font-bold text-[var(--color-text)] mb-[18px]">Request Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[18px] gap-y-[19px]">
          <label>
            <FieldLabel>Request ID</FieldLabel>
            <TextInput value={formData.requestId || 'REQ-000001 (Auto generated)'} readOnly />
          </label>
          <label>
            <FieldLabel required>Subject</FieldLabel>
            <TextInput 
              placeholder="Enter subject" 
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
            />
          </label>
          <label>
            <FieldLabel>Requested By</FieldLabel>
            <TextInput value={formData.requestedBy} readOnly />
          </label>
          <label>
            <FieldLabel>Requested Date</FieldLabel>
            <DateInput value={formData.requestedDate} readOnly />
          </label>
          <label>
            <FieldLabel required>Expecting Delivery</FieldLabel>
            <DateInput 
              value={formData.expectingDelivery}
              onChange={(e) => handleInputChange('expectingDelivery', e.target.value)}
            />
          </label>
          <label>
            <FieldLabel>Status</FieldLabel>
            <TextInput value={formData.status} readOnly />
          </label>
        </div>
      </section>

      <section className="mt-[24px] bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.08)] px-[18px] pt-[17px] pb-[15px]">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[17px] leading-[20px] font-bold text-[var(--color-text)]">Items</h2>
            <p className="mt-[6px] text-[13px] leading-[16px] font-semibold text-[var(--color-primary)]">Total {rows.length} items</p>
          </div>

          <button
            type="button"
            onClick={addRow}
            style={{ fontSize: '14px' }}
            className="h-[31px] px-[16px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center gap-[7px] font-bold hover:bg-[var(--color-primary-hover)]"
          >
            <Icons.Plus className="text-[15px]" />
            Add Item
          </button>
        </div>

        <div className="mt-[17px] border border-[#deddf6] rounded-[7px] overflow-x-auto min-w-0">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[1.55fr_1fr_1fr_110px] h-[37px] bg-[#f7f6ff] border-b border-[#deddf6] items-center text-[13px] font-semibold text-[var(--color-text)]">
            <div className="px-[18px]">Item Name {requiredMark}</div>
            <div className="px-[28px]">Quantity {requiredMark}</div>
            <div className="px-[26px]">Expected Date {requiredMark}</div>
            <div className="px-[20px] text-center">Action</div>
          </div>

          {rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1.55fr_1fr_1fr_110px] min-h-[50px] border-b border-[#deddf6] last:border-b-0 items-center"
            >
              <div className="px-[15px]">
                <SelectInput 
                  value={row.item}
                  options={inventoryItems}
                  onChange={(e) => handleRowChange(row.id, 'item', e.target.value)}
                />
              </div>
              <div className="px-[15px]">
                <TextInput 
                  placeholder="Enter quantity" 
                  value={row.quantity}
                  onChange={(e) => handleRowChange(row.id, 'quantity', e.target.value)}
                />
              </div>
              <div className="px-[15px]">
                <DateInput 
                  value={row.expectedDate}
                  onChange={(e) => handleRowChange(row.id, 'expectedDate', e.target.value)}
                />
              </div>
              <div className="px-[20px] flex justify-center">
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  className="w-[28px] h-[28px] rounded-[5px] text-[#ff1e27] hover:bg-[#ffe4e7] flex items-center justify-center"
                  aria-label="Delete item row"
                >
                  <Icons.Delete className="text-[14px]" />
                </button>
              </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[22px] border-t border-[#deddf6] pt-[15px] flex flex-wrap justify-center gap-[11px]">
          <button
            type="button"
            onClick={onCancel}
            style={{ fontSize: '14px' }}
            className="h-[36px] min-w-[102px] rounded-[7px] border border-[#deddf6] bg-white px-[24px] font-bold text-[var(--color-text)] hover:bg-gray-50"
          >
            {mode === 'add' ? 'Cancel' : 'Back'}
          </button>
          {mode === 'edit' && (
            <button
              type="button"
              onClick={handleCancelRequest}
              style={{ fontSize: '14px' }}
              className="h-[36px] min-w-[130px] rounded-[7px] border border-[#ff1e27] bg-white px-[24px] font-bold text-[#ff1e27] hover:bg-[#ffe4e7]"
            >
              Cancel Request
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            style={{ fontSize: '14px' }}
            className="h-[36px] min-w-[113px] rounded-[7px] bg-[var(--color-primary)] px-[24px] font-bold text-white flex items-center justify-center gap-[10px] hover:bg-[var(--color-primary-hover)] disabled:opacity-50"
          >
            <Icons.Save className="text-[16px]" />
            {mode === 'add' ? 'Save' : 'Update'}
          </button>
          <button
            type="button"
            onClick={handleSubmitRequest}
            disabled={isSubmitting}
            style={{ fontSize: '14px' }}
            className="h-[36px] min-w-[180px] rounded-[7px] bg-[#078c22] px-[24px] font-bold text-white flex items-center justify-center gap-[10px] hover:bg-[#05791d] disabled:opacity-50"
          >
            <Icons.Send className="text-[17px]" />
            Submit Request
          </button>
        </div>
      </section>

      <ActionModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, type: '', step: '' })}
        type={modalState.type}
        title={
          modalState.step === 'saveSuccess' ? 'Item Request Saved!' :
          modalState.step === 'updateSuccess' ? 'Item Request Updated!' :
          modalState.step === 'submitConfirm' ? 'Submit Item Request?' :
          modalState.step === 'cancelConfirm' ? 'Cancel Request?' : ''
        }
        message={
          modalState.step === 'saveSuccess' ? 'Your item request has been saved as Pending.' :
          modalState.step === 'updateSuccess' ? 'Your item request has been updated successfully.' :
          modalState.step === 'submitConfirm' ? 'Please confirm that you want to submit this item request. You won\'t be able to edit it after submission.' :
          modalState.step === 'cancelConfirm' ? 'Are you sure you want to permanently abort this supply request?' : ''
        }
        secondaryAction={
          ['submitConfirm', 'cancelConfirm'].includes(modalState.step)
            ? { text: modalState.step === 'cancelConfirm' ? 'No, Keep it' : 'Cancel', onClick: () => setModalState({ isOpen: false, type: '', step: '' }) }
            : null
        }
        primaryAction={{
          text: modalState.step === 'saveSuccess' ? 'View Requests' :
                modalState.step === 'updateSuccess' ? 'View Requests' :
                modalState.step === 'submitConfirm' ? 'Yes, Submit' :
                modalState.step === 'cancelConfirm' ? 'Yes, Cancel' : '',
          onClick: handleModalPrimaryAction
        }}
      />
    </div>
  );
};

export default NewItemRequestForm;
