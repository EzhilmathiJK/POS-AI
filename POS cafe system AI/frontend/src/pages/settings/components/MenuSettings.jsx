import React, { useState } from 'react';
import { Icons } from '../../../assets/icons';
import { useAppContext } from '../../../context/AppContext';
import ActionModal from '../../../components/ui/ActionModal';
import api from '../../../api/axios';

const existingIcons = ['Beverage', 'SteamedBun', 'Dimsum', 'DeepFry', 'Bake', 'Noodles', 'Porridge'];

const MenuSettings = () => {
  const { categories, setCategories } = useAppContext();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      const response = await api.delete(`/settings/categories/${categoryToDelete.id}`);
      if (response.data.success) {
        setCategories(prev => prev.filter(c => c.id !== categoryToDelete.id));
        setCategoryToDelete(null);
      }
    } catch (error) {
      console.error("Failed to delete category", error);
      setCategoryToDelete(null);
    }
  };

  const handleAdd = async () => {
    if (!newCategoryName.trim()) return;

    // Pick a random icon from the existing ones to satisfy the design requirement
    const randomIconName = existingIcons[Math.floor(Math.random() * existingIcons.length)];

    try {
      const response = await api.post('/settings/categories', {
        name: newCategoryName.trim(),
        iconName: randomIconName
      });
      
      if (response.data.success) {
        const newCat = response.data.data;
        setCategories(prev => [...prev, { ...newCat, id: newCat.id.toString() }]);
        setNewCategoryName('');
      }
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  return (
    <div className="flex flex-col gap-[20px] max-w-[600px]">
      <div>
        <span className="block text-[13px] leading-[16px] font-semibold text-[var(--color-text)] mb-[15px]">
          Current Menu Categories
        </span>
        
        <div className="space-y-[10px]">
          {categories.map(category => (
            <div key={category.id} className="flex items-center justify-between h-[42px] px-[16px] rounded-[7px] border border-[#deddf6] bg-white">
              <span className="text-[12px] font-semibold text-[var(--color-text)]">{category.name}</span>
              <button
                onClick={() => handleDeleteClick(category)}
                className="w-[28px] h-[28px] flex items-center justify-center rounded-[5px] text-[#ff1e27] hover:bg-[#ffe4e7] transition-colors"
                title="Delete Category"
              >
                <Icons.Delete className="text-[16px]" />
              </button>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="text-[12px] text-[#9b9ab1] italic">No categories found.</div>
          )}
        </div>
      </div>

      <div className="mt-[10px] pt-[20px] border-t border-[#deddf6]">
        <span className="block text-[13px] leading-[16px] font-semibold text-[var(--color-text)] mb-[9px]">
          Add New Category
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-[10px] sm:gap-[15px]">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            style={{ fontSize: '12px', fontWeight: 400 }}
            className="w-full sm:flex-1 shrink-0 h-[37px] rounded-[7px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] bg-white"
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            onClick={handleAdd}
            style={{ fontSize: '14px' }}
            className="w-full sm:w-auto h-[37px] px-[20px] rounded-[7px] bg-[var(--color-primary)] font-bold text-white flex items-center justify-center gap-[8px] hover:bg-[var(--color-primary-hover)] shrink-0"
          >
            <Icons.Plus className="text-[16px]" /> Add Category
          </button>
        </div>
      </div>

      <ActionModal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        type="delete"
        title="Delete Category?"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"?`}
        primaryAction={{
          text: 'Delete',
          onClick: confirmDelete
        }}
        secondaryAction={{ text: 'Cancel' }}
      />
    </div>
  );
};

export default MenuSettings;
