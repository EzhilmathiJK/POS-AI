import React, { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons';
import { useAppContext } from '../../../context/AppContext';

const FieldLabel = ({ children }) => (
  <span className="block text-[13px] leading-[16px] font-semibold text-[var(--color-text)] mb-[9px]">
    {children}
  </span>
);

const GeneralSettings = () => {
  const { settings, setSettings } = useAppContext();
  
  const [formData, setFormData] = useState({
    cafeName: '',
    timeFormat: '',
  });

  useEffect(() => {
    setFormData({
      cafeName: settings.cafeName,
      timeFormat: settings.timeFormat,
    });
  }, [settings]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSettings(prev => ({ ...prev, ...formData }));
  };

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex gap-[30px]">
        <label className="flex-1 max-w-[400px]">
          <FieldLabel>Cafe Name</FieldLabel>
          <input
            type="text"
            name="cafeName"
            value={formData.cafeName}
            onChange={handleChange}
            style={{ fontSize: '12px', fontWeight: 400 }}
            className="w-full h-[37px] rounded-[7px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] bg-white"
          />
        </label>

        <label className="flex-1 max-w-[400px]">
          <FieldLabel>Time Format</FieldLabel>
          <div className="relative">
            <select
              name="timeFormat"
              value={formData.timeFormat}
              onChange={handleChange}
              style={{ fontSize: '12px', fontWeight: 400 }}
              className="w-full h-[37px] appearance-none rounded-[7px] border border-[#deddf6] bg-white pl-[14px] pr-[36px] text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] cursor-pointer"
            >
              <option value="12h">hh:mm A (12-hour)</option>
              <option value="24h">HH:mm (24-hour)</option>
            </select>
            <Icons.ChevronDown className="absolute right-[14px] top-[12px] text-[15px] text-[var(--color-primary)] pointer-events-none" />
          </div>
        </label>
      </div>

      <div>
        <FieldLabel>Cafe Logo</FieldLabel>
        <div className="flex w-full max-w-[400px] h-[115px] rounded-[9px] border border-[#deddf6] overflow-hidden bg-white">
          <div className="w-[140px] shrink-0 flex items-center justify-center border-r border-[#deddf6]">
            <img src="/logo.png" alt="Cafe Logo" className="w-[50px] object-contain opacity-50 grayscale" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative hover:bg-gray-50 cursor-pointer">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex items-center gap-[8px] text-[var(--color-primary)]">
              <Icons.Upload className="text-[16px]" />
              <span className="text-[13px] font-semibold">Change Logo</span>
            </div>
            <span className="mt-[7px] text-[10px] leading-[12px] font-semibold text-[var(--color-primary)]">
              PNG, JPG or WEBP (Max. 2MB)
            </span>
          </div>
        </div>
      </div>

      <div>
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

export default GeneralSettings;
