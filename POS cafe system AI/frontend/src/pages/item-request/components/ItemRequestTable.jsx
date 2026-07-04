import { Icons } from '../../../assets/icons';
import { itemRequests } from '../itemRequestData';

const columns = [
  'Request ID',
  'Subject',
  'Requested By',
  'Requested Date',
  'Expecting Delivery',
  'Status',
  'Action',
];

const statusClasses = {
  Received: 'bg-[#dff8e6] text-[#00a711]',
  Cancelled: 'bg-[#ffe4e7] text-[#ff1e27]',
  Pending: 'bg-[#fff0df] text-[#ff5f00]',
  'On The Way': 'bg-[#e8f1ff] text-[#1f64ff]',
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
      aria-label="Item request entries per page"
      className="w-full h-full appearance-none rounded-[5px] border border-[var(--color-border)] bg-[#fbfbfd] pl-[11px] pr-[18px] text-[var(--color-text)] font-semibold outline-none focus:border-[var(--color-primary)] cursor-pointer"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
    <Icons.ChevronDown className="absolute right-[7px] top-[9px] text-[10px] text-[#b2b5c2] pointer-events-none" />
  </div>
);

const ItemRequestTable = ({ onNewItemRequest, onEditRequest }) => {
  return (
    <section className="w-full flex-1 min-h-[520px] lg:min-h-0 flex flex-col bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] mt-[12px] overflow-hidden min-w-0 shrink-0">
      
      {/* Header: Title + Action Buttons */}
      <div className="w-full px-[14px] pt-[16px] pb-[10px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[14px] shrink-0">
        <div className="flex flex-row items-center justify-between sm:flex-col sm:items-start gap-[2px]">
          <h2 className="text-[13px] leading-[19px] font-semibold text-[var(--color-text)]">Item Request List</h2>
          <span className="text-[12px] leading-[18px] font-normal text-[var(--color-primary)]">Total 10 requests</span>
        </div>

        <div className="grid grid-cols-2 gap-[8px] sm:flex sm:items-center sm:gap-[10px] w-full sm:w-auto">
          <button
            type="button"
            onClick={onNewItemRequest}
            style={{ fontSize: '14px' }}
            className="h-[38px] min-w-0 px-[10px] sm:px-[16px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[7px] font-bold hover:bg-[var(--color-primary-hover)] text-center leading-[16px] whitespace-normal cursor-pointer"
          >
            <Icons.Plus className="text-[14px]" />
            New Item Request
          </button>
          <button style={{ fontSize: '14px' }} className="h-[38px] min-w-0 px-[10px] sm:px-[16px] rounded-[6px] border border-[#deddf6] bg-white text-[var(--color-text)] flex items-center justify-center gap-[7px] font-bold hover:bg-gray-50 text-center leading-[16px] whitespace-normal cursor-pointer">
            <Icons.FileExcel className="text-[14px]" />
            Export to Excel
          </button>
        </div>
      </div>

      {/* Table container with horizontal scroll */}
      <div className="flex-1 mx-[14px] mb-[4px] border border-[#deddf6] rounded-[7px] overflow-auto min-w-0 inventory-table-scroll">
        <table className="min-w-[800px] w-full border-collapse text-[12px] text-[var(--color-primary)]">
          <thead className="sticky top-0 z-10">
            <tr className="h-[50px] bg-[#f7f6ff] border-b border-[#deddf6]">
              {columns.map((column) => (
                <th
                  key={column}
                  className="font-semibold text-[13px] text-[var(--color-text)] px-[14px] text-left whitespace-nowrap"
                >
                  {column}
                  <SortMark />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {itemRequests.map((request) => (
              <tr key={request.id} className="h-[64px] border-b border-[#deddf6] last:border-b-0 hover:bg-gray-50 transition-colors">
                <td className="px-[14px] font-normal whitespace-nowrap">
                  <button 
                    onClick={() => onEditRequest(request)}
                    className="text-[var(--color-primary)] hover:underline cursor-pointer text-left"
                  >
                    {request.id}
                  </button>
                </td>
                <td className="px-[14px] font-normal whitespace-nowrap">{request.subject}</td>
                <td className="px-[14px] font-normal whitespace-nowrap">{request.requestedBy}</td>
                <td className="px-[14px] font-normal whitespace-nowrap">
                  <div>{request.requestedDate}</div>
                  <div className="mt-[3px]">{request.requestedTime}</div>
                </td>
                <td className="px-[14px] font-normal whitespace-nowrap">{request.expectedDelivery}</td>
                <td className="px-[14px] font-normal whitespace-nowrap">
                  <span className={`inline-flex items-center justify-center h-[22px] rounded-[5px] px-[10px] text-[11px] font-semibold ${statusClasses[request.status]}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-[14px] font-normal whitespace-nowrap">
                  <button className="w-[28px] h-[28px] rounded-[6px] text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] flex items-center justify-center cursor-pointer" aria-label={`View ${request.id}`}>
                    <Icons.Eye className="text-[14px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="w-full px-[14px] py-[14px] flex flex-col md:flex-row md:items-center justify-between gap-[10px] shrink-0 text-[12px] text-[var(--color-primary)]">
        
        <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-[10px]">
          <div className="flex items-center gap-[7px] font-semibold">
            <span>Show</span>
            <EntriesSelect />
            <span>entries</span>
          </div>
          <p className="font-semibold text-[12px] md:hidden">Showing 1 to 10 of 10 requests</p>
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

        <p className="text-right font-semibold text-[12px] hidden md:block">Showing 1 to 10 of 10 requests</p>
      </div>
    </section>
  );
};

export default ItemRequestTable;
