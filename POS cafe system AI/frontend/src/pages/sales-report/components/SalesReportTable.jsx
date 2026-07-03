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
    <section className="flex-1 min-h-0 bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] mt-[14px] px-[16px] pt-[18px] pb-[14px] flex flex-col">
      <div className="flex items-start justify-between shrink-0 px-[6px]">
        <div>
          <h2 className="text-[13px] leading-[19px] font-semibold text-[var(--color-text)]">Sales Reports</h2>
          <p className="text-[12px] leading-[18px] font-normal text-[var(--color-primary)]">Total 20 reports</p>
        </div>

        <button style={{ fontSize: '14px' }} className="h-[40px] px-[16px] rounded-[6px] border border-[var(--color-primary)] bg-white text-[var(--color-primary)] flex items-center gap-[7px] font-bold hover:bg-[var(--color-primary-soft)]">
          <Icons.FileExcel className="text-[14px]" />
          Export to Excel
        </button>
      </div>

      <div className="mt-[18px] border border-[#deddf6] rounded-[7px] overflow-hidden flex-1 min-h-0 relative">
        <div className="h-full overflow-auto custom-scrollbar inventory-table-scroll">
          <table className="w-full min-w-[500px] table-fixed border-collapse text-[12px] text-[var(--color-primary)]">
            <colgroup>
              <col style={{ width: '42%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '28%' }} />
            </colgroup>
            <thead className="sticky top-0 z-10">
              <tr className="h-[50px] bg-[#f7f6ff] border-b border-[#deddf6]">
                {columns.map((column) => (
                  <th key={column} className="font-semibold text-[13px] text-[var(--color-text)] px-[24px] text-left whitespace-nowrap">
                    {column}
                    <SortMark />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleReports.map((report) => (
                <tr key={report.itemName} className="h-[48px] border-b border-[#deddf6] last:border-b-0">
                  <td className="px-[24px] font-normal whitespace-nowrap">{report.itemName}</td>
                  <td className="px-[24px] font-normal text-center whitespace-nowrap">{report.soldQuantity}</td>
                  <td className="px-[24px] font-normal text-center whitespace-nowrap">{report.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="min-h-[42px] pt-[14px] flex flex-wrap items-center justify-between gap-[14px] shrink-0 text-[12px] text-[var(--color-primary)] px-[2px]">
        <div className="flex items-center gap-[7px] font-semibold">
          <span>Show</span>
          <EntriesSelect />
          <span>entries</span>
        </div>

        <div className="flex justify-center gap-[5px]">
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

        <p className="text-right font-semibold text-[12px]">Showing 1 to 5 of 20 reports</p>
      </div>
    </section>
  );
};

export default SalesReportTable;

