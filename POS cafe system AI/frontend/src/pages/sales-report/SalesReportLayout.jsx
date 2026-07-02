import { useState } from 'react';
import SalesReportTopBar from './components/SalesReportTopBar';
import SalesReportFilters from './components/SalesReportFilters';
import SalesReportTable from './components/SalesReportTable';

const SalesReportLayout = () => {
  const [isSubView, setIsSubView] = useState(false);
  const [subViewTitle, setSubViewTitle] = useState('');

  return (
    <div className="flex flex-col h-full bg-[var(--color-app-bg)] px-[15px] pb-[12px]">
      <SalesReportTopBar isSubView={isSubView} subViewTitle={subViewTitle} />
      <SalesReportFilters />
      <SalesReportTable />
    </div>
  );
};

export default SalesReportLayout;

