import React from 'react';
import { Icons } from '../../../assets/icons';
import { inventoryItems } from '../inventoryData';

const columns = [
  'Item Name',
  'Category',
  'Price',
  'Unit',
  'Purchased',
  'Sold',
  'In Stock',
  'Status',
  'Last Updated',
];

const statusClasses = {
  'In Stock': 'bg-[#e4f8e9] text-[#00a711]',
  'Low Stock': 'bg-[#fff0df] text-[#ff5f00]',
  'Out of Stock': 'bg-[#ffe4e7] text-[#ff1e27]',
};

const stockClass = (status) => {
  if (status === 'Out of Stock') return 'text-[#ff0000]';
  if (status === 'Low Stock') return 'text-[#ff5f00]';
  return 'text-[#00a711]';
};

const SortMark = () => (
  <span className="inline-flex flex-col ml-[5px] align-middle translate-y-[1px]">
    <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-[#9da5b3]" />
    <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#9da5b3] mt-[1px]" />
  </span>
);

const InventoryTable = () => {
  return (
    <section className="flex-1 min-h-0 bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] mt-[12px] px-[17px] pt-[16px] pb-[16px] flex flex-col">
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h2 className="text-[16px] leading-[19px] font-semibold text-[var(--color-text)]">Inventory List</h2>
          <p className="text-[13px] leading-[18px] font-medium text-[var(--color-primary)]">Total 10 items found</p>
        </div>

        <div className="flex gap-[10px]">
          <button className="h-[38px] px-[16px] rounded-[6px] border border-[#deddf6] bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center gap-[7px] text-[12px] font-semibold">
            <Icons.Plus className="text-[15px]" />
            Add Item
          </button>
          <button className="h-[38px] px-[16px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center gap-[7px] text-[12px] font-semibold hover:bg-[var(--color-primary-hover)]">
            <Icons.Download className="text-[16px]" />
            Request Item
          </button>
          <button className="h-[38px] px-[16px] rounded-[6px] border border-[#deddf6] bg-white text-[var(--color-text)] flex items-center gap-[7px] text-[12px] font-semibold">
            <Icons.FileExcel className="text-[16px]" />
            Export to Excel
          </button>
        </div>
      </div>

      <div className="mt-[14px] border border-[#deddf6] rounded-[7px] overflow-hidden flex-1 min-h-0 relative">
        <div className="h-full overflow-y-auto custom-scrollbar inventory-table-scroll">
          <table className="w-full border-collapse text-[13px] text-[var(--color-text)]">
            <thead className="sticky top-0 z-10">
              <tr className="h-[50px] bg-[#f7f6ff] border-b border-[#deddf6]">
                {columns.map((column) => (
                  <th key={column} className="font-semibold text-[13px] text-[var(--color-text)] px-[18px] text-left whitespace-nowrap">
                    {column}
                    <SortMark />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.name} className="h-[48px] border-b border-[#deddf6] last:border-b-0">
                  <td className="px-[18px] font-normal whitespace-nowrap">
                    <div className="flex items-center gap-[13px]">
                      <img src={item.image} alt={item.name} className="w-[18px] h-[22px] object-contain shrink-0" />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="px-[18px] font-normal text-[var(--color-primary)] whitespace-nowrap">{item.category}</td>
                  <td className="px-[18px] font-normal whitespace-nowrap">{item.price}</td>
                  <td className="px-[18px] font-normal text-[var(--color-primary)] whitespace-nowrap">{item.unit}</td>
                  <td className="px-[18px] font-normal whitespace-nowrap text-center">{item.purchased}</td>
                  <td className="px-[18px] font-normal whitespace-nowrap text-center">{item.sold}</td>
                  <td className={`px-[18px] font-normal whitespace-nowrap text-center ${stockClass(item.status)}`}>{item.inStock}</td>
                  <td className="px-[18px] font-normal whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center h-[24px] rounded-[5px] px-[10px] text-[12px] font-semibold ${statusClasses[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-[18px] font-normal text-[var(--color-primary)] whitespace-nowrap">{item.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-[42px] pt-[14px] grid grid-cols-3 items-start shrink-0 text-[12px] text-[var(--color-primary)]">
        <div className="flex items-center gap-[7px] font-semibold">
          <span>Show</span>
          <button className="h-[27px] w-[47px] rounded-[5px] border border-[var(--color-border)] bg-[#fbfbfd] flex items-center justify-center gap-[5px] text-[var(--color-text)] font-semibold">
            10
            <Icons.ChevronDown className="text-[10px] text-[#b2b5c2]" />
          </button>
          <span>entries</span>
        </div>

        <div className="flex justify-center gap-[5px]">
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.First className="text-[15px]" />
          </button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.Prev className="text-[15px]" />
          </button>
          <button className="w-[30px] h-[30px] rounded-[7px] bg-[var(--color-primary)] text-white font-semibold">1</button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.Next className="text-[15px]" />
          </button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.Last className="text-[15px]" />
          </button>
        </div>

        <p className="text-right font-semibold leading-[28px]">Showing 1 to 10 of 10 entries</p>
      </div>
    </section>
  );
};

export default InventoryTable;
