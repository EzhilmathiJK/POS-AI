import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../../../assets/icons';
import ActionModal from '../../../components/ui/ActionModal';
import { useAppContext } from '../../../context/AppContext';
import api from '../../../api/axios';

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        itemCode: initialData.item_number || '',
        itemName: initialData.item_name || '',
        itemImage: initialData.image_url || null,
        itemDescription: initialData.description || '',
        category: initialData.category || '',
        price: initialData.price ? Number(initialData.price).toString() : '',
        unit: initialData.unit || '',
        inStock: initialData.in_stock !== undefined ? initialData.in_stock.toString() : '',
        status: initialData.status || 'In Stock',
        supplier: initialData.supplier || ''
      });
      
      if (initialData.image_url) {
        let finalUrl = initialData.image_url;
        if (finalUrl.startsWith('/uploads')) finalUrl = `http://localhost:8000${finalUrl}`;
        setImagePreview(finalUrl);
      }
    }
  }, [mode, initialData]);

  const { showToast } = useAppContext();
  const [modalState, setModalState] = useState({ isOpen: false, type: '', step: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    if (field === 'inStock') {
      const stock = parseInt(value) || 0;
      let status = 'In Stock';
      if (stock === 0) status = 'Out of Stock';
      else if (stock < 10) status = 'Low Stock';
      setFormData(prev => ({ ...prev, inStock: value, status }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemName || formData.itemName.trim() === '') {
      newErrors.itemName = 'Please enter a valid item name.';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a product category.';
    }
    const parsedPrice = parseFloat(formData.price);
    if (!formData.price || isNaN(parsedPrice) || parsedPrice < 0 || parsedPrice > 100000) {
      newErrors.price = 'Please enter a valid price between 0 and 100000.';
    }
    if (!formData.unit) {
      newErrors.unit = 'Please select a unit of measurement.';
    }
    
    const parsedStock = parseInt(formData.inStock);
    if (formData.inStock === '' || isNaN(parsedStock) || parsedStock < 0) {
      newErrors.inStock = 'Stock quantity must be a whole number greater than or equal to 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setModalState({ 
      isOpen: true, 
      type: mode === 'add' ? 'submit' : 'submit', 
      step: mode === 'add' ? 'saveConfirm' : 'updateConfirm' 
    });
  };

  const executeSave = async () => {
    try {
      setIsSubmitting(true);
      const data = new FormData();
      data.append('item_name', formData.itemName);
      data.append('category', formData.category);
      data.append('price', formData.price);
      data.append('unit', formData.unit);
      data.append('in_stock', formData.inStock);
      data.append('description', formData.itemDescription);
      data.append('supplier', formData.supplier);
      
      if (selectedFile) {
        data.append('image', selectedFile);
      }

      let res;
      if (mode === 'add') {
        res = await api.post('/inventory', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await api.put(`/inventory/${initialData.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (res.data.success) {
        showToast(`Item ${mode === 'add' ? 'created' : 'updated'} successfully!`, 'success');
        setModalState({ isOpen: true, type: 'success', step: mode === 'add' ? 'saveSuccess' : 'updateSuccess' });
        onUpdate();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to save inventory item', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (mode === 'edit') {
      setModalState({ isOpen: true, type: 'delete', step: 'deleteConfirm' });
    }
  };

  const handleModalPrimaryAction = () => {
    if (modalState.step === 'saveSuccess' || modalState.step === 'updateSuccess') {
      setModalState({ isOpen: false, type: '', step: '' });
      onUpdate();
    } else if (modalState.step === 'deleteConfirm') {
      setModalState({ isOpen: false, type: '', step: '' });
      showToast('Deleted successfully', 'success');
      if (onDelete) onDelete();
    }
  };

  return (
    <section className="flex-1 min-h-0 bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[15px] md:px-[50px] lg:px-[154px] pt-[16px] pb-[15px] overflow-y-auto custom-scrollbar">
      <div className="max-w-[806px] mx-auto">
        <div className="text-center border-b border-[#deddf6] pb-[13px]">
          <h2 className="text-[22px] leading-[27px] font-semibold text-[var(--color-text)]">
            {mode === 'add' ? 'Add New Item' : 'Edit Inventory Item'}
          </h2>
          <p className="mt-[8px] text-[13px] leading-[16px] font-semibold text-[var(--color-primary)]">
            {mode === 'add' ? 'Add a new item to your inventory' : 'Update the details of the inventory item'}
          </p>
        </div>

        <form className="pt-[16px]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[29px] gap-y-[19px]">
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
              {errors.itemName && <p className="mt-[8px] text-[11px] leading-[13px] font-semibold text-[#ff1e27]">{errors.itemName}</p>}
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
                      ref={fileInputRef}
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center gap-[8px] text-[var(--color-primary)]">
                      <Icons.Save className="text-[16px]" />
                      <span className="text-[13px] font-semibold">Change Image</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
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
              {errors.category && <p className="mt-[8px] text-[11px] leading-[13px] font-semibold text-[#ff1e27]">{errors.category}</p>}
            </label>

            <label>
              <FieldLabel required>Price</FieldLabel>
              <TextInput 
                placeholder="Enter price" 
                value={formData.price}
                suffix="0.00"
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
              {errors.price && <p className="mt-[8px] text-[11px] leading-[13px] font-semibold text-[#ff1e27]">{errors.price}</p>}
            </label>

            <label>
              <FieldLabel required>Unit</FieldLabel>
              <SelectInput 
                placeholder="Select unit" 
                value={formData.unit}
                options={['Cup', 'Plate', 'Piece', 'Bowl', 'Pack']} 
                onChange={(e) => handleInputChange('unit', e.target.value)}
              />
              {errors.unit && <p className="mt-[8px] text-[11px] leading-[13px] font-semibold text-[#ff1e27]">{errors.unit}</p>}
            </label>

            <label>
              <FieldLabel required={mode === 'add'}>In Stock</FieldLabel>
              <TextInput 
                placeholder="Enter stock quantity" 
                value={formData.inStock}
                readOnly={mode === 'edit'}
                suffix="0"
                onChange={(e) => handleInputChange('inStock', e.target.value)}
              />
              {errors.inStock && <p className="mt-[8px] text-[11px] leading-[13px] font-semibold text-[#ff1e27]">{errors.inStock}</p>}
            </label>

            <label>
              <FieldLabel>Status</FieldLabel>
              <TextInput value={formData.status} readOnly />
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

          <div className="mt-[30px] flex flex-wrap justify-center gap-[11px]">
            <button
              type="button"
              onClick={onCancel}
              className="h-[36px] min-w-[102px] rounded-[7px] border border-[#deddf6] bg-white px-[24px] font-bold text-[var(--color-text)] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[36px] min-w-[116px] rounded-[7px] bg-[var(--color-primary)] px-[24px] font-bold text-white flex items-center justify-center gap-[10px] hover:bg-[var(--color-primary-hover)]"
            >
              <Icons.Save className="text-[16px]" />
              {mode === 'add' ? 'Save' : 'Update'}
            </button>
            {mode === 'edit' && (
              <button
                type="button"
                onClick={handleDelete}
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
          modalState.step === 'updateConfirm' ? 'Update Inventory Item?' :
          modalState.step === 'saveSuccess' ? 'Inventory Item Added!' :
          modalState.step === 'updateSuccess' ? 'Inventory Item Updated!' :
          modalState.step === 'deleteConfirm' ? 'Delete Inventory' : ''
        }
        message={
          modalState.step === 'saveConfirm' ? 'Are you sure you want to add this item to the inventory?' :
          modalState.step === 'updateConfirm' ? 'Are you sure you want to save these changes to the inventory item?' :
          modalState.step === 'saveSuccess' ? 'The inventory item has been added successfully.' :
          modalState.step === 'updateSuccess' ? 'The inventory item has been updated successfully.' :
          modalState.step === 'deleteConfirm' ? 'Are you sure you want to delete this inventory item? This action cannot be undone.' : ''
        }
        secondaryAction={
          ['saveConfirm', 'updateConfirm', 'deleteConfirm'].includes(modalState.step) 
            ? { text: 'Cancel', onClick: () => setModalState({ isOpen: false, type: '', step: '' }) } 
            : null
        }
        primaryAction={{
          text: modalState.step === 'saveConfirm' ? 'Yes, Save' :
                modalState.step === 'updateConfirm' ? 'Yes, Update' :
                modalState.step === 'saveSuccess' ? 'View Inventory' :
                modalState.step === 'updateSuccess' ? 'View Inventory' :
                modalState.step === 'deleteConfirm' ? 'Delete' : '',
          onClick: ['saveConfirm', 'updateConfirm'].includes(modalState.step) ? executeSave : handleModalPrimaryAction
        }}
      />
    </section>
  );
};

export default AddInventoryForm;
