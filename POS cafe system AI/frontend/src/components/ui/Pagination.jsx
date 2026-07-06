import { Icons } from '../../assets/icons';

const Pagination = ({
  pagination,
  onPageChange,
  onLimitChange,
  itemName = 'entries'
}) => {
  const { page = 1, totalPages = 1, totalRecords = 0, limit = 10 } = pagination || {};
  const startRecord = totalRecords > 0 ? (page - 1) * limit + 1 : 0;
  const endRecord = Math.min(page * limit, totalRecords);

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-[32px] h-[32px] rounded-[7px] text-[14px] font-semibold flex items-center justify-center transition-colors ${
            page === i 
              ? 'bg-[var(--color-primary)] text-white border border-[var(--color-primary)]' 
              : 'bg-white border border-[#deddf6] text-[var(--color-primary)] hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="w-full px-[14px] py-[14px] flex flex-col md:flex-row md:items-center justify-between gap-[10px] shrink-0 text-[12px] text-[var(--color-primary)]">
      
      <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-[10px]">
        <div className="flex items-center gap-[7px] font-semibold">
          <span>Show</span>
          <div className="relative h-[27px] w-[50px]">
            <select
              value={limit}
              onChange={(e) => onLimitChange?.(Number(e.target.value))}
              aria-label={`Entries per page`}
              className="w-full h-full appearance-none rounded-[5px] border border-[var(--color-border)] bg-[#fbfbfd] pl-[11px] pr-[18px] text-[var(--color-text)] font-semibold outline-none focus:border-[var(--color-primary)] cursor-pointer"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <Icons.ChevronDown className="absolute right-[7px] top-[9px] text-[10px] text-[#b2b5c2] pointer-events-none" />
          </div>
          <span>{itemName}</span>
        </div>
        {totalRecords > 0 && (
          <p className="font-semibold text-[12px] md:hidden">
            Showing {startRecord} to {endRecord} of {totalRecords} {itemName}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-[6px] w-full md:w-auto">
        <button 
          disabled={page === 1} 
          onClick={() => onPageChange(1)} 
          className="w-[32px] h-[32px] rounded-[7px] bg-white border border-[#deddf6] text-[var(--color-primary)] flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
        >
          <Icons.First className="text-[14px]" />
        </button>
        <button 
          disabled={page === 1} 
          onClick={() => onPageChange(page - 1)} 
          className="w-[32px] h-[32px] rounded-[7px] bg-white border border-[#deddf6] text-[var(--color-primary)] flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
        >
          <Icons.Prev className="text-[14px]" />
        </button>
        
        {renderPageNumbers()}
        
        <button 
          disabled={page === totalPages || totalPages === 0} 
          onClick={() => onPageChange(page + 1)} 
          className="w-[32px] h-[32px] rounded-[7px] bg-white border border-[#deddf6] text-[var(--color-primary)] flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
        >
          <Icons.Next className="text-[14px]" />
        </button>
        <button 
          disabled={page === totalPages || totalPages === 0} 
          onClick={() => onPageChange(totalPages)} 
          className="w-[32px] h-[32px] rounded-[7px] bg-white border border-[#deddf6] text-[var(--color-primary)] flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
        >
          <Icons.Last className="text-[14px]" />
        </button>
      </div>

      {totalRecords > 0 ? (
        <p className="text-right font-semibold text-[12px] hidden md:block">
          Showing {startRecord} to {endRecord} of {totalRecords} {itemName}
        </p>
      ) : (
        <div className="hidden md:block w-[150px]"></div>
      )}
    </div>
  );
};

export default Pagination;
