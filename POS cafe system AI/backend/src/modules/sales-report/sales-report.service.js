import * as salesReportRepo from './sales-report.repository.js';
import { getDateRange } from '../../utils/sales.helper.js';

export const getSalesReport = async (pagination, filters) => {
  const { page, limit } = pagination;
  const offset = (page - 1) * limit;

  const { datePreset, dateFrom, dateTo, selectedItem } = filters;
  const { startDate, endDate } = getDateRange(datePreset, dateFrom, dateTo);

  const { sales, totalRecords } = await salesReportRepo.getSalesReport(
    offset,
    limit,
    {
      selectedItem,
      startDate,
      endDate
    }
  );

  return {
    sales,
    totalRecords,
    currentPage: page,
    pageSize: limit,
    totalPages: Math.ceil(totalRecords / limit),
  };
};

export const getSalesItems = async () => {
  return await salesReportRepo.getSalesItems();
};
