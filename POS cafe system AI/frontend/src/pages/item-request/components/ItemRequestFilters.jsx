import { Icons } from '../../../assets/icons';

const selectOptions = {
  requestId: ['REQ-000001', 'REQ-000002', 'REQ-000003', 'REQ-000004', 'REQ-000005'],
  requestedBy: ['Admin', 'Jose'],
};

const SelectField = ({ label, placeholder, options, width }) => (
  <label className="block" style={{ width }}>
    <span style={{ fontWeight: 600 }} className="block text-[13px] leading-[14px] text-[var(--color-text)] mb-[7px]">{label}</span>
    <div className="relative">
      <select
        defaultValue=""
        style={{ fontSize: '12px', fontWeight: 400 }}
        className="w-full h-[34px] appearance-none bg-white rounded-[6px] border border-[#deddf6] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)] pl-[12px] pr-[32px] cursor-pointer"
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <Icons.ChevronDown className="absolute right-[12px] top-[11px] text-[12px] text-[#9b9ab1] pointer-events-none" />
    </div>
  </label>
);

const TextField = ({ label, placeholder, width }) => (
  <label className="block" style={{ width }}>
    <span style={{ fontWeight: 600 }} className="block text-[13px] leading-[14px] text-[var(--color-text)] mb-[7px]">{label}</span>
    <input
      type="text"
      placeholder={placeholder}
      style={{ fontSize: '12px', fontWeight: 400 }}
      className="w-full h-[34px] bg-white rounded-[6px] border border-[#deddf6] pl-[12px] pr-[12px] text-[var(--color-primary)] placeholder:text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)]"
    />
  </label>
);

const DateField = ({ label, width }) => (
  <label className="block" style={{ width }}>
    <span style={{ fontWeight: 600 }} className="block text-[13px] leading-[14px] text-[var(--color-text)] mb-[7px]">{label}</span>
    <div className="relative">
      <input
        type="date"
        onClick={(event) => event.currentTarget.showPicker?.()}
        style={{ fontSize: '12px', fontWeight: 400 }}
        className="w-full h-[34px] bg-white rounded-[6px] border border-[#deddf6] pl-[12px] pr-[34px] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
      />
      <Icons.Calendar className="absolute right-[12px] top-[10px] text-[14px] text-black pointer-events-none" />
    </div>
  </label>
);

const ItemRequestFilters = () => {
  return (
    <section className="h-[86px] bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] px-[16px] pt-[16px] flex items-start gap-[14px] shrink-0">
      <SelectField label="Request ID" placeholder="Select Request ID" options={selectOptions.requestId} width={177} />
      <TextField label="Subject" placeholder="Enter subject" width={177} />
      <SelectField label="Requested By" placeholder="Select requested by" options={selectOptions.requestedBy} width={177} />
      <DateField label="Requested Date From" width={176} />
      <DateField label="Requested Date To" width={176} />

      <div className="flex items-center gap-[10px] mt-[21px] ml-auto">
        <button style={{ fontSize: '14px' }} className="h-[34px] w-[82px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[7px] font-bold hover:bg-[var(--color-primary-hover)]">
          <Icons.Filter className="text-[14px]" />
          Filter
        </button>
        <button style={{ fontSize: '14px' }} className="h-[34px] w-[86px] rounded-[6px] bg-white text-[var(--color-text)] border border-[#deddf6] flex items-center justify-center gap-[8px] font-bold hover:bg-gray-50">
          <Icons.Reset className="text-[14px]" />
          Reset
        </button>
      </div>
    </section>
  );
};

export default ItemRequestFilters;
