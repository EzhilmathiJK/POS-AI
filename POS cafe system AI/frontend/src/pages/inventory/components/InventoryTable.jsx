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

const EntriesSelect = () => (
  <div className="relative h-[27px] w-[47px]">
    <select
      defaultValue="10"
      aria-label="Inventory entries per page"
      className="w-full h-full appearance-none rounded-[5px] border border-[var(--color-border)] bg-[#fbfbfd] pl-[11px] pr-[18px] text-[var(--color-text)] font-semibold outline-none focus:border-[var(--color-primary)] cursor-pointer"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
    <Icons.ChevronDown className="absolute right-[7px] top-[9px] text-[10px] text-[#b2b5c2] pointer-events-none" />
  </div>
);

const InventoryTable = ({ items = [], loading, onAddItem, onEditItem }) => {
  return (
    <div className="w-full flex-1 min-h-[520px] lg:min-h-0 flex flex-col bg-white rounded-[6px] border border-[var(--color-border)] overflow-hidden min-w-0 shrink-0 relative">

      {/* Header: Title + Action Buttons */}
      <div className="w-full px-[17px] pt-[16px] pb-[10px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[14px] shrink-0">
        <div className="flex flex-row items-center justify-between sm:flex-col sm:items-start gap-[2px]">
          <h2 className="text-[13px] leading-[19px] font-semibold text-[var(--color-text)]">Inventory List</h2>
          <span className="text-[12px] leading-[18px] font-normal text-[var(--color-primary)]">Total {items.length} items found</span>
        </div>

        <div className="grid grid-cols-3 gap-[8px] sm:flex sm:items-center sm:gap-[10px] w-full sm:w-auto">
          <button
            type="button"
            onClick={onAddItem}
            style={{ fontSize: '14px' }}
            className="h-[38px] min-w-0 px-[10px] sm:px-[16px] rounded-[6px] border border-[#deddf6] bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center gap-[7px] font-bold cursor-pointer text-center leading-[16px] whitespace-normal"
          >
            <Icons.Plus className="text-[14px]" />
            Add Item
          </button>
          <button style={{ fontSize: '14px' }} className="h-[38px] min-w-0 px-[10px] sm:px-[16px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[7px] font-bold hover:bg-[var(--color-primary-hover)] cursor-pointer text-center leading-[16px] whitespace-normal">
            <Icons.Download className="text-[14px]" />
            Request Item
          </button>
          <button style={{ fontSize: '14px' }} className="h-[38px] min-w-0 px-[10px] sm:px-[16px] rounded-[6px] border border-[#deddf6] bg-white text-[var(--color-text)] flex items-center justify-center gap-[7px] font-bold cursor-pointer text-center leading-[16px] whitespace-normal">
            <Icons.FileExcel className="text-[14px]" />
            Export to Excel
          </button>
        </div>
      </div>

      {/* Table with horizontal scroll only on this container */}
      <div className="flex-1 mx-[17px] mb-[4px] border border-[#deddf6] rounded-[7px] overflow-auto min-w-0 inventory-table-scroll">
        <table className="min-w-[760px] w-full border-collapse text-[12px] text-[var(--color-text)]">
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
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="h-[100px] text-center text-[13px] text-[var(--color-primary)] font-semibold">
                  Loading inventory...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="h-[100px] text-center text-[13px] text-[var(--color-primary)] font-semibold">
                  No items found. Click "Add Item" to create one.
                </td>
              </tr>
            ) : items.map((item) => (
              <tr key={item.id} className="h-[48px] border-b border-[#deddf6] last:border-b-0 hover:bg-gray-50 transition-colors">
                <td className="px-[18px] font-normal whitespace-nowrap">
                  <div className="flex items-center gap-[13px]">
                    <img 
                      src={
                        !item.image_url || item.image_url === '/default-image.png'
                          ? '/default-image.png'
                          : item.image_url.startsWith('http')
                          ? item.image_url
                          : `http://localhost:8000${item.image_url}`
                      } 
                      alt={item.item_name} 
                      className="w-[18px] h-[22px] object-contain shrink-0" 
                    />
                    <button 
                      onClick={() => onEditItem(item)}
                      className="text-[var(--color-text)] hover:underline hover:text-[var(--color-primary)] cursor-pointer text-left"
                    >
                      {item.item_name}
                    </button>
                  </div>
                </td>
                <td className="px-[18px] font-normal text-[var(--color-primary)] whitespace-nowrap">{item.category}</td>
                <td className="px-[18px] font-normal whitespace-nowrap">${Number(item.price).toFixed(2)}</td>
                <td className="px-[18px] font-normal text-[var(--color-primary)] whitespace-nowrap">{item.unit}</td>
                <td className="px-[18px] font-normal whitespace-nowrap text-center">{item.purchased}</td>
                <td className="px-[18px] font-normal whitespace-nowrap text-center">{item.sold}</td>
                <td className={`px-[18px] font-normal whitespace-nowrap text-center ${stockClass(item.status)}`}>{item.in_stock}</td>
                <td className="px-[18px] font-normal whitespace-nowrap">
                  <span className={`inline-flex items-center justify-center h-[24px] rounded-[5px] px-[10px] text-[12px] font-semibold ${statusClasses[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-[18px] font-normal text-[var(--color-primary)] whitespace-nowrap">
                  {new Date(item.updated_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="w-full px-[17px] py-[14px] flex flex-col md:flex-row md:items-center justify-between gap-[10px] shrink-0 text-[12px] text-[var(--color-primary)]">
        
        <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-[10px]">
          <div className="flex items-center gap-[7px] font-semibold">
            <span>Show</span>
            <EntriesSelect />
            <span>entries</span>
          </div>
          <p className="font-semibold text-[12px] md:hidden">Showing 1 to 10 of 10 entries</p>
        </div>

        <div className="flex items-center justify-center gap-[5px] w-full md:w-auto">
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.First className="text-[14px]" />
          </button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.Prev className="text-[14px]" />
          </button>
          <button className="w-[30px] h-[30px] rounded-[7px] bg-[var(--color-primary)] text-white font-semibold">1</button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.Next className="text-[14px]" />
          </button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.Last className="text-[14px]" />
          </button>
        </div>

        <p className="text-right font-semibold text-[12px] hidden md:block">Showing 1 to 10 of 10 entries</p>
      </div>
    </div>
  );
};

export default InventoryTable;

