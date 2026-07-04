import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../../context/AppContext';

const FieldLabel = ({ children }) => (
  <span className="block text-[13px] leading-[16px] font-semibold text-[var(--color-text)] mb-[9px]">
    {children}
  </span>
);

const InventorySettings = () => {
  const { settings, setSettings } = useAppContext();
  
  const [formData, setFormData] = useState({
    gst: '',
    lowStockThreshold: '',
  });

  useEffect(() => {
    setFormData({
      gst: settings.gst,
      lowStockThreshold: settings.lowStockThreshold,
    });
  }, [settings]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSettings(prev => ({ 
      ...prev, 
      gst: formData.gst !== '' ? Number(formData.gst) : prev.gst,
      lowStockThreshold: formData.lowStockThreshold !== '' ? Number(formData.lowStockThreshold) : prev.lowStockThreshold
    }));
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px]">
        <label className="flex-1 w-full max-w-[400px]">
          <FieldLabel>GST Percentage (%)</FieldLabel>
          <input
            type="number"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            placeholder="e.g. 7"
            style={{ fontSize: '12px', fontWeight: 400 }}
            className="w-full h-[37px] rounded-[7px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] bg-white"
          />
        </label>

        <label className="flex-1 w-full max-w-[400px]">
          <FieldLabel>Low Stock Threshold</FieldLabel>
          <input
            type="number"
            name="lowStockThreshold"
            value={formData.lowStockThreshold}
            onChange={handleChange}
            placeholder="e.g. 10"
            style={{ fontSize: '12px', fontWeight: 400 }}
            className="w-full h-[37px] rounded-[7px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] bg-white"
          />
        </label>
      </div>

      <div className="mt-[10px]">
        <button
          onClick={handleSave}
          style={{ fontSize: '14px' }}
          className="h-[36px] px-[24px] rounded-[7px] bg-[var(--color-primary)] font-bold text-white flex items-center justify-center hover:bg-[var(--color-primary-hover)]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default InventorySettings;
