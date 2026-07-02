import { Icons } from '../../../assets/icons';

const requiredMark = <span className="text-[#ff1e27]">*</span>;

const FieldLabel = ({ children, required = false }) => (
  <span className="block text-[13px] leading-[16px] font-semibold text-[var(--color-text)] mb-[9px]">
    {children} {required && requiredMark}
  </span>
);

const TextInput = ({ placeholder, value, readOnly = false, suffix }) => (
  <div className="relative">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
      style={{ fontSize: '12px', fontWeight: 400 }}
      className={`w-full h-[37px] rounded-[7px] border border-[#deddf6] px-[12px] text-[var(--color-primary)] placeholder:text-[#9b8fd6] outline-none focus:border-[var(--color-primary)] ${
        readOnly ? 'bg-[#f4f4f7]' : 'bg-white'
      } ${suffix ? 'pr-[56px]' : ''}`}
    />
    {suffix && (
      <span className="absolute right-[13px] top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[var(--color-primary)]">
        {suffix}
      </span>
    )}
  </div>
);

const SelectInput = ({ placeholder, value, options }) => (
  <div className="relative">
    <select
      defaultValue={value || ''}
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

const TextArea = ({ placeholder }) => (
  <textarea
    placeholder={placeholder}
    style={{ fontSize: '12px', fontWeight: 400 }}
    className="w-full h-[115px] resize-none rounded-[9px] border border-[#deddf6] bg-white px-[12px] py-[12px] text-[var(--color-primary)] placeholder:text-[#9b8fd6] outline-none focus:border-[var(--color-primary)]"
  />
);

const AddInventoryForm = ({ onCancel }) => {
  return (
    <section className="flex-1 min-h-0 bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[154px] pt-[16px] pb-[15px] overflow-y-auto custom-scrollbar">
      <div className="max-w-[806px] mx-auto">
        <div className="text-center border-b border-[#deddf6] pb-[13px]">
          <h2 className="text-[22px] leading-[27px] font-semibold text-[var(--color-text)]">Add New Item</h2>
          <p className="mt-[8px] text-[13px] leading-[16px] font-semibold text-[var(--color-primary)]">
            Add a new item to your inventory
          </p>
        </div>

        <form className="pt-[16px]" onSubmit={(event) => event.preventDefault()}>
          <div className="grid grid-cols-2 gap-x-[29px] gap-y-[19px]">
            <label>
              <FieldLabel>Item Code</FieldLabel>
              <TextInput readOnly />
              <p className="mt-[8px] text-[11px] leading-[13px] font-semibold text-[var(--color-primary)]">Auto-generated</p>
            </label>

            <label>
              <FieldLabel required>Item Name</FieldLabel>
              <TextInput placeholder="Enter item name" />
            </label>

            <label>
              <FieldLabel>Item Image</FieldLabel>
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
            </label>

            <label>
              <FieldLabel>Item Description</FieldLabel>
              <TextArea placeholder="Enter item description" />
            </label>

            <label>
              <FieldLabel required>Category</FieldLabel>
              <SelectInput placeholder="Select category" options={['Beverage', 'Steamed Bun', 'Dimsum', 'Deep Fry', 'Bake', 'Noodles', 'Porridge']} />
            </label>

            <label>
              <FieldLabel required>Price</FieldLabel>
              <TextInput placeholder="Enter price" suffix="0.00" />
            </label>

            <label>
              <FieldLabel required>Unit</FieldLabel>
              <SelectInput placeholder="Select unit" options={['Cup', 'Plate', 'Piece', 'Bowl', 'Pack']} />
            </label>

            <label>
              <FieldLabel required>In Stock</FieldLabel>
              <TextInput placeholder="Enter stock quantity" suffix="0" />
            </label>

            <label>
              <FieldLabel>Status</FieldLabel>
              <TextInput value="In Stock" readOnly />
              <p className="mt-[8px] text-[10px] leading-[12px] font-semibold text-[var(--color-primary)]">
                Status is auto-populated based on In Stock quantity.
              </p>
            </label>

            <label>
              <FieldLabel>Supplier</FieldLabel>
              <SelectInput placeholder="Select supplier" options={['Cafe Supplier', 'Daily Fresh', 'Main Store', 'Local Vendor']} />
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
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddInventoryForm;
