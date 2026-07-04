import { Icons } from '../../../assets/icons';
import { salesReports } from '../salesReportData';

const columns = ['Item Name', 'Sold Quantity', 'Total Price'];

const SortMark = () => (
  <span className="inline-flex flex-col ml-[5px] align-middle translate-y-[1px]">
    <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-[#9da5b3]" />
    <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#9da5b3] mt-[1px]" />
  </span>
);

const EntriesSelect = () => (
  <div className="relative h-[27px] w-[47px]">
    <select
      defaultValue="5"
      aria-label="Reports per page"
      className="w-full h-full appearance-none rounded-[5px] border border-[var(--color-border)] bg-[#fbfbfd] pl-[11px] pr-[18px] text-[var(--color-text)] font-semibold outline-none focus:border-[var(--color-primary)] cursor-pointer"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
    <Icons.ChevronDown className="absolute right-[7px] top-[9px] text-[10px] text-[#b2b5c2] pointer-events-none" />
  </div>
);

const SalesReportTable = () => {
  const visibleReports = salesReports.slice(0, 5);

  return (
    <section className="w-full flex-1 min-h-[520px] lg:min-h-0 flex flex-col bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] mt-[14px] overflow-hidden min-w-0 shrink-0">
      
      {/* Header: Title + Action Buttons */}
      <div className="w-full px-[16px] pt-[18px] pb-[10px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[14px] shrink-0">
        <div className="flex flex-row items-center justify-between sm:flex-col sm:items-start gap-[2px]">
          <h2 className="text-[13px] leading-[19px] font-semibold text-[var(--color-text)]">Sales Reports</h2>
          <p className="text-[12px] leading-[18px] font-normal text-[var(--color-primary)]">Total 20 reports</p>
        </div>

        <button style={{ fontSize: '14px' }} className="h-[40px] px-[16px] w-full sm:w-auto rounded-[6px] border border-[var(--color-primary)] bg-white text-[var(--color-primary)] flex items-center justify-center gap-[7px] font-bold hover:bg-[var(--color-primary-soft)] cursor-pointer">
          <Icons.FileExcel className="text-[14px]" />
          Export to Excel
        </button>
      </div>

      {/* Table container with horizontal scroll */}
      <div className="flex-1 mx-[16px] mb-[4px] border border-[#deddf6] rounded-[7px] overflow-auto min-w-0 inventory-table-scroll">
        <table className="w-full min-w-[500px] border-collapse text-[12px] text-[var(--color-primary)]">
          <thead className="sticky top-0 z-10">
            <tr className="h-[50px] bg-[#f7f6ff] border-b border-[#deddf6]">
              {columns.map((column, index) => (
                <th key={column} className={`font-semibold text-[13px] text-[var(--color-text)] px-[24px] whitespace-nowrap ${index === 0 ? 'text-left' : 'text-center'}`}>
                  {column}
                  <SortMark />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleReports.map((report) => (
              <tr key={report.itemName} className="h-[48px] border-b border-[#deddf6] last:border-b-0 hover:bg-gray-50 transition-colors">
                <td className="px-[24px] font-normal whitespace-nowrap">{report.itemName}</td>
                <td className="px-[24px] font-normal text-center whitespace-nowrap">{report.soldQuantity}</td>
                <td className="px-[24px] font-normal text-center whitespace-nowrap">{report.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="w-full px-[16px] py-[14px] flex flex-col md:flex-row md:items-center justify-between gap-[10px] shrink-0 text-[12px] text-[var(--color-primary)]">
        
        <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-[10px]">
          <div className="flex items-center gap-[7px] font-semibold">
            <span>Show</span>
            <EntriesSelect />
            <span>entries</span>
          </div>
          <p className="font-semibold text-[12px] md:hidden">Showing 1 to 5 of 20 reports</p>
        </div>

        <div className="flex items-center justify-center gap-[5px] w-full md:w-auto">
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center cursor-pointer hover:bg-gray-50">
            <Icons.First className="text-[14px]" />
          </button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center cursor-pointer hover:bg-gray-50">
            <Icons.Prev className="text-[14px]" />
          </button>
          <button className="w-[30px] h-[30px] rounded-[7px] bg-[var(--color-primary)] text-white font-semibold cursor-pointer">1</button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center cursor-pointer hover:bg-gray-50">
            <Icons.Next className="text-[14px]" />
          </button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center cursor-pointer hover:bg-gray-50">
            <Icons.Last className="text-[14px]" />
          </button>
        </div>

        <p className="text-right font-semibold text-[12px] hidden md:block">Showing 1 to 5 of 20 reports</p>
      </div>
    </section>
  );
};

export default SalesReportTable;
