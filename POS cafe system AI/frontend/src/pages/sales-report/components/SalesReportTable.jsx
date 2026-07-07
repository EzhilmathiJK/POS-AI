import { Icons } from '../../../assets/icons';
import Pagination from '../../../components/ui/Pagination';

const columns = ['Item Name', 'Sold Quantity', 'Total Price'];

const SortMark = () => (
  <span className="inline-flex flex-col ml-[5px] align-middle translate-y-[1px]">
    <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-[#9da5b3]" />
    <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#9da5b3] mt-[1px]" />
  </span>
);



const SalesReportTable = ({ salesData, pagination, onPageChange, onLimitChange, loading }) => {

  return (
    <section className="w-full flex-1 min-h-[520px] lg:min-h-0 flex flex-col bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] mt-[14px] overflow-hidden min-w-0 shrink-0">
      
      {/* Header: Title + Action Buttons */}
      <div className="w-full px-[16px] pt-[18px] pb-[10px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[14px] shrink-0">
        <div className="flex flex-row items-center justify-between sm:flex-col sm:items-start gap-[2px]">
          <h2 className="text-[13px] leading-[19px] font-semibold text-[var(--color-text)]">Sales Reports</h2>
          <p className="text-[12px] leading-[18px] font-normal text-[var(--color-primary)]">Total {pagination.totalRecords} reports</p>
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
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-[40px] text-center text-sm text-[var(--color-text)]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-[32px] h-[32px] border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </div>
                </td>
              </tr>
            ) : salesData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-[40px] text-center text-sm text-[var(--color-text)]">
                  No sales reports found matching the filters
                </td>
              </tr>
            ) : (
              salesData.map((report, index) => (
                <tr key={`${report.itemName}-${index}`} className="h-[48px] border-b border-[#deddf6] last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="px-[24px] font-normal whitespace-nowrap">{report.itemName}</td>
                  <td className="px-[24px] font-normal text-center whitespace-nowrap">{report.soldQuantity}</td>
                  <td className="px-[24px] font-normal text-center whitespace-nowrap">₹{Number(report.totalPrice).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination 
        pagination={pagination}
        itemName="reports"
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </section>
  );
};

export default SalesReportTable;
