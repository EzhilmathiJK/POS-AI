import { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons';
import ActionModal from '../../../components/ui/ActionModal';
import { useAppContext } from '../../../context/AppContext';

const requiredMark = <span className="text-[#ff1e27]">*</span>;

const FieldLabel = ({ children, required = false }) => (
  <span className="block text-[13px] leading-[16px] font-semibold text-[var(--color-text)] mb-[9px]">
    {children} {required && requiredMark}
  </span>
);

const TextInput = ({ placeholder, value, readOnly = false, suffix, onChange }) => {
  const showSuffix = suffix && !value;
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        style={{ fontSize: '12px', fontWeight: 400 }}
        className={`w-full h-[37px] rounded-[7px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] placeholder:text-[#9b8fd6] outline-none focus:border-[var(--color-primary)] ${
          readOnly ? 'bg-[#f4f4f7]' : 'bg-white'
        } ${showSuffix ? 'pr-[56px]' : ''}`}
      />
      {showSuffix && (
        <span className="absolute right-[13px] top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[var(--color-primary)] flex items-center gap-[4px] pointer-events-none">
          {suffix}
          {suffix === '0.00' && (
            <span className="flex flex-col gap-[2px]">
              <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-[#9da5b3]" />
              <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#9da5b3]" />
            </span>
          )}
        </span>
      )}
    </div>
  );
};

const SelectInput = ({ placeholder, value, options, onChange }) => (
  <div className="relative">
    <select
      value={value || ''}
      onChange={onChange}
      style={{ fontSize: '12px', fontWeight: 400 }}
      className="w-full h-[37px] appearance-none rounded-[7px] border border-[#deddf6] bg-white pl-[14px] pr-[36px] text-[var(--color-primary)] invalid:text-[#9b8fd6] outline-none focus:border-[var(--color-primary)] cursor-pointer"
    >
      <option value="" disabled hidden>{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    <Icons.ChevronDown className="absolute right-[14px] top-[12px] text-[15px] text-[var(--color-primary)] pointer-events-none" />
  </div>
);

const TextArea = ({ placeholder, value, onChange }) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={{ fontSize: '12px', fontWeight: 400 }}
    className="w-full h-[115px] resize-none rounded-[9px] border border-[#deddf6] bg-white px-[12px] py-[12px] text-[var(--color-primary)] placeholder:text-[#9b8fd6] outline-none focus:border-[var(--color-primary)]"
  />
);

const AddInventoryForm = ({ mode = 'add', initialData = null, onCancel, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    itemImage: null,
    itemDescription: '',
    category: '',
    price: '',
    unit: '',
    inStock: '',
    status: 'In Stock',
    supplier: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const { showToast } = useAppContext();
  const [modalState, setModalState] = useState({ isOpen: false, type: '', step: '' });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        itemCode: initialData.code || '',
        itemName: initialData.name || '',
        itemImage: initialData.image || null,
        itemDescription: initialData.description || '',
        category: initialData.category || '',
        price: initialData.price || '',
        unit: initialData.unit || '',
        inStock: initialData.inStock || '',
        status: initialData.status || 'In Stock',
        supplier: initialData.supplier || ''
      });
      setImagePreview(initialData.image || null);
    }
  }, [mode, initialData]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, itemImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (field === 'inStock') {
      const stock = parseInt(value) || 0;
      let status = 'In Stock';
      if (stock === 0) status = 'Out of Stock';
      else if (stock < 10) status = 'Low Stock';
      setFormData(prev => ({ ...prev, inStock: value, status }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mode === 'add') {
      setModalState({ isOpen: true, type: 'submit', step: 'saveConfirm' });
    } else if (mode === 'edit') {
      setModalState({ isOpen: true, type: 'success', step: 'updateSuccess' });
    }
  };

  const handleDelete = () => {
    if (mode === 'edit') {
      setModalState({ isOpen: true, type: 'delete', step: 'deleteConfirm' });
    }
  };

  const handleModalPrimaryAction = () => {
    if (modalState.step === 'saveConfirm') {
      setModalState({ isOpen: true, type: 'success', step: 'saveSuccess' });
    } else if (modalState.step === 'saveSuccess') {
      setModalState({ isOpen: false, type: '', step: '' });
      console.log('Adding item:', formData);
    } else if (modalState.step === 'updateSuccess') {
      setModalState({ isOpen: false, type: '', step: '' });
      if (onUpdate) onUpdate(formData);
    } else if (modalState.step === 'deleteConfirm') {
      setModalState({ isOpen: false, type: '', step: '' });
      showToast('Deleted successfully', 'success');
      if (onDelete) onDelete();
    }
  };

  return (
    <section className="flex-1 min-h-0 bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[154px] pt-[16px] pb-[15px] overflow-y-auto custom-scrollbar">
      <div className="max-w-[806px] mx-auto">
        <div className="text-center border-b border-[#deddf6] pb-[13px]">
          <h2 className="text-[22px] leading-[27px] font-semibold text-[var(--color-text)]">
            {mode === 'add' ? 'Add New Item' : 'Edit Inventory Item'}
          </h2>
          <p className="mt-[8px] text-[13px] leading-[16px] font-semibold text-[var(--color-primary)]">
            {mode === 'add' ? 'Add a new item to your inventory' : 'Update the details of the inventory item'}
          </p>
        </div>

        <form className="pt-[16px]" onSubmit={(event) => event.preventDefault()}>
          <div className="grid grid-cols-2 gap-x-[29px] gap-y-[19px]">
            <label>
              <FieldLabel>Item Code</FieldLabel>
              <TextInput value={formData.itemCode} readOnly />
              <p className="mt-[8px] text-[11px] leading-[13px] font-semibold text-[var(--color-primary)]">Auto-generated</p>
            </label>

            <label>
              <FieldLabel required>Item Name</FieldLabel>
              <TextInput 
                placeholder="Enter item name" 
                value={formData.itemName}
                onChange={(e) => handleInputChange('itemName', e.target.value)}
              />
            </label>

            <label>
              <FieldLabel>Item Image</FieldLabel>
              {imagePreview ? (
                <div className="flex w-full h-[115px] rounded-[9px] border border-[#deddf6] overflow-hidden bg-white">
                  <div className="w-[140px] shrink-0 flex items-center justify-center border-r border-[#deddf6]">
                    <img src={imagePreview} alt="Item preview" className="max-w-[80px] max-h-[80px] object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center relative hover:bg-gray-50 cursor-pointer">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center gap-[8px] text-[var(--color-primary)]">
                      <Icons.Save className="text-[16px]" />
                      <span className="text-[13px] font-semibold">Change Image</span>
                    </div>
                    <span className="mt-[7px] text-[10px] leading-[12px] font-semibold text-[var(--color-primary)]">
                      PNG, JPG or WEBP (Max. 2MB)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="w-full h-[115px] rounded-[9px] border border-[#deddf6] bg-white text-[var(--color-text)] flex flex-col items-center justify-center"
                  >
                    <Icons.Upload className="text-[28px] text-[var(--color-primary)]" />
                    <span className="mt-[10px] text-[13px] leading-[16px] font-semibold">Click to upload or drag and drop</span>
                    <span className="mt-[7px] text-[10px] leading-[12px] font-semibold text-[var(--color-primary)]">
                      PNG, JPG or WEBP (Max. 2MB)
                    </span>
                  </button>
                </div>
              )}
            </label>

            <label>
              <FieldLabel>Item Description</FieldLabel>
              <TextArea 
                placeholder="Enter item description" 
                value={formData.itemDescription}
                onChange={(e) => handleInputChange('itemDescription', e.target.value)}
              />
            </label>

            <label>
              <FieldLabel required>Category</FieldLabel>
              <SelectInput 
                placeholder="Select category" 
                value={formData.category}
                options={['Beverage', 'Steamed Bun', 'Dimsum', 'Deep Fry', 'Bake', 'Noodles', 'Porridge']} 
                onChange={(e) => handleInputChange('category', e.target.value)}
              />
            </label>

            <label>
              <FieldLabel required>Price</FieldLabel>
              <TextInput 
                placeholder="Enter price" 
                value={formData.price}
                suffix="0.00"
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </label>

            <label>
              <FieldLabel required>Unit</FieldLabel>
              <SelectInput 
                placeholder="Select unit" 
                value={formData.unit}
                options={['Cup', 'Plate', 'Piece', 'Bowl', 'Pack']} 
                onChange={(e) => handleInputChange('unit', e.target.value)}
              />
            </label>

            <label>
              <FieldLabel required>In Stock</FieldLabel>
              <TextInput 
                placeholder="Enter stock quantity" 
                value={formData.inStock}
                suffix="0"
                onChange={(e) => handleInputChange('inStock', e.target.value)}
              />
            </label>

            <label>
              <FieldLabel>Status</FieldLabel>
              <TextInput value={formData.status} readOnly />
              <p className="mt-[8px] text-[10px] leading-[12px] font-semibold text-[var(--color-primary)]">
                Status is auto-populated based on In Stock quantity.
              </p>
            </label>

            <label>
              <FieldLabel>Supplier</FieldLabel>
              <SelectInput 
                placeholder="Select supplier" 
                value={formData.supplier}
                options={['Cafe Supplier', 'Daily Fresh', 'Main Store', 'Local Vendor']} 
                onChange={(e) => handleInputChange('supplier', e.target.value)}
              />
            </label>
          </div>

          <div className="mt-[30px] flex justify-center gap-[11px]">
            <button
              type="button"
              onClick={onCancel}
              style={{ fontSize: '14px' }}
              className="h-[36px] min-w-[102px] rounded-[7px] border border-[#deddf6] bg-white px-[24px] font-bold text-[var(--color-text)] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ fontSize: '14px' }}
              className="h-[36px] min-w-[116px] rounded-[7px] bg-[var(--color-primary)] px-[24px] font-bold text-white flex items-center justify-center gap-[10px] hover:bg-[var(--color-primary-hover)]"
            >
              <Icons.Save className="text-[16px]" />
              {mode === 'add' ? 'Save' : 'Update'}
            </button>
            {mode === 'edit' && (
              <button
                type="button"
                onClick={handleDelete}
                style={{ fontSize: '14px' }}
                className="h-[36px] min-w-[102px] rounded-[7px] border border-[#ff1e27] bg-white px-[24px] font-bold text-[#ff1e27] flex items-center justify-center gap-[8px] hover:bg-[#ffe4e7]"
              >
                <Icons.Delete className="text-[16px]" />
                Delete
              </button>
            )}
          </div>
        </form>
      </div>

      <ActionModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, type: '', step: '' })}
        type={modalState.type}
        title={
          modalState.step === 'saveConfirm' ? 'Add Inventory Item?' :
          modalState.step === 'saveSuccess' ? 'Inventory Item Added!' :
          modalState.step === 'updateSuccess' ? 'Inventory Item Updated!' :
          modalState.step === 'deleteConfirm' ? 'Delete Inventory' : ''
        }
        message={
          modalState.step === 'saveConfirm' ? 'Are you sure you want to add this item to the inventory?' :
          modalState.step === 'saveSuccess' ? 'The inventory item has been added successfully.' :
          modalState.step === 'updateSuccess' ? 'The inventory item has been updated successfully.' :
          modalState.step === 'deleteConfirm' ? 'Are you sure you want to delete this inventory item? This action cannot be undone.' : ''
        }
        secondaryAction={
          ['saveConfirm', 'deleteConfirm'].includes(modalState.step) 
            ? { text: 'Cancel', onClick: () => setModalState({ isOpen: false, type: '', step: '' }) } 
            : null
        }
        primaryAction={{
          text: modalState.step === 'saveConfirm' ? 'Yes, Save' :
                modalState.step === 'saveSuccess' ? 'View Inventory' :
                modalState.step === 'updateSuccess' ? 'View Inventory' :
                modalState.step === 'deleteConfirm' ? 'Delete' : '',
          onClick: handleModalPrimaryAction
        }}
      />
    </section>
  );
};

export default AddInventoryForm;
