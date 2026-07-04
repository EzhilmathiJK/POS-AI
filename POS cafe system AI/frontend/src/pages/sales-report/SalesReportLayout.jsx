import { useState } from 'react';
import SalesReportTopBar from './components/SalesReportTopBar';
import SalesReportFilters from './components/SalesReportFilters';
import SalesReportTable from './components/SalesReportTable';

const SalesReportLayout = () => {
  const [isSubView, setIsSubView] = useState(false);
  const [subViewTitle, setSubViewTitle] = useState('');

  return (
    <div className="w-full h-full min-w-0 flex flex-col bg-[var(--color-app-bg)] overflow-x-hidden overflow-y-auto box-border px-[15px] sm:px-[13px] pb-[12px] gap-[12px]">
      <SalesReportTopBar isSubView={isSubView} subViewTitle={subViewTitle} />
      <SalesReportFilters />
      <SalesReportTable />
    </div>
  );
};

export default SalesReportLayout;

