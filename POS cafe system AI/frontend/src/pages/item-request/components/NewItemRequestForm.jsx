import { useState } from 'react';
import { Icons } from '../../../assets/icons';

const itemOptions = [
  'Black Coffee',
  'Black Tea',
  'Bubble Tea',
  'Cold Coffee',
  'Ginger Tea',
  'Iced Tea',
  'Milk',
  'Milo',
];

const requiredMark = <span className="text-[#ff1e27]">*</span>;

const FieldLabel = ({ children, required = false }) => (
  <span className="block text-[13px] leading-[16px] font-semibold text-[var(--color-text)] mb-[8px]">
    {children} {required && requiredMark}
  </span>
);

const TextInput = ({ placeholder, value, readOnly = false }) => (
  <input
    type="text"
    value={value}
    readOnly={readOnly}
    placeholder={placeholder}
    style={{ fontSize: '12px', fontWeight: 400 }}
    className={`w-full h-[32px] rounded-[6px] border border-[#deddf6] px-[12px] outline-none focus:border-[var(--color-primary)] ${
      readOnly
        ? 'bg-[#fbfbfd] text-[#b9b2e6] placeholder:text-[#b9b2e6]'
        : 'bg-white text-[var(--color-primary)] placeholder:text-[#9b8fd6]'
    }`}
  />
);

const DateInput = ({ value, readOnly = false }) => (
  <div className="relative">
    <input
      type={readOnly ? 'text' : 'date'}
      value={value}
      readOnly={readOnly}
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

const SelectInput = () => (
  <div className="relative">
    <select
      required
      defaultValue=""
      style={{ fontSize: '12px', fontWeight: 400 }}
      className="w-full h-[32px] appearance-none rounded-[6px] border border-[#deddf6] bg-white pl-[12px] pr-[34px] text-[var(--color-primary)] invalid:text-[#9b8fd6] outline-none focus:border-[var(--color-primary)] cursor-pointer"
    >
      <option value="" disabled hidden>Select item</option>
      {itemOptions.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
    <Icons.ChevronDown className="absolute right-[12px] top-[10px] text-[12px] text-[#b2b5c2] pointer-events-none" />
  </div>
);

const NewItemRequestForm = ({ onCancel }) => {
  const [rows, setRows] = useState([{ id: 1 }]);

  const addRow = () => {
    setRows((currentRows) => [...currentRows, { id: Date.now() }]);
  };

  const removeRow = (rowId) => {
    setRows((currentRows) => (
      currentRows.length === 1 ? currentRows : currentRows.filter((row) => row.id !== rowId)
    ));
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-[18px] pb-[18px]">
      <section className="mt-[27px] bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.08)] px-[18px] pt-[21px] pb-[19px]">
        <h2 className="text-[17px] leading-[20px] font-bold text-[var(--color-text)] mb-[18px]">Request Information</h2>

        <div className="grid grid-cols-3 gap-x-[18px] gap-y-[19px]">
          <label>
            <FieldLabel>Request ID</FieldLabel>
            <TextInput value="REQ-000001 (Auto generated)" readOnly />
          </label>
          <label>
            <FieldLabel required>Subject</FieldLabel>
            <TextInput placeholder="Enter subject" />
          </label>
          <label>
            <FieldLabel>Requested By</FieldLabel>
            <TextInput value="Admin" readOnly />
          </label>
          <label>
            <FieldLabel>Requested Date</FieldLabel>
            <DateInput value="01-07-2026" readOnly />
          </label>
          <label>
            <FieldLabel required>Expecting Delivery</FieldLabel>
            <DateInput />
          </label>
          <label>
            <FieldLabel>Status</FieldLabel>
            <TextInput value="Pending" readOnly />
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

        <div className="mt-[17px] border border-[#deddf6] rounded-[7px] overflow-hidden">
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
                <SelectInput />
              </div>
              <div className="px-[15px]">
                <TextInput placeholder="Enter quantity" />
              </div>
              <div className="px-[15px]">
                <DateInput />
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

        <div className="mt-[22px] border-t border-[#deddf6] pt-[15px] flex justify-center gap-[11px]">
          <button
            type="button"
            onClick={onCancel}
            style={{ fontSize: '14px' }}
            className="h-[36px] min-w-[102px] rounded-[7px] border border-[#deddf6] bg-white px-[24px] font-bold text-[var(--color-text)] hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            style={{ fontSize: '14px' }}
            className="h-[36px] min-w-[113px] rounded-[7px] bg-[var(--color-primary)] px-[24px] font-bold text-white flex items-center justify-center gap-[10px] hover:bg-[var(--color-primary-hover)]"
          >
            <Icons.Save className="text-[16px]" />
            Save
          </button>
          <button
            type="button"
            style={{ fontSize: '14px' }}
            className="h-[36px] min-w-[180px] rounded-[7px] bg-[#078c22] px-[24px] font-bold text-white flex items-center justify-center gap-[10px] hover:bg-[#05791d]"
          >
            <Icons.Send className="text-[17px]" />
            Submit Request
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewItemRequestForm;
