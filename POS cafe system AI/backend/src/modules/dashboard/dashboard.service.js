import * as dashboardRepo from './dashboard.repository.js';

export const fetchDashboardStats = async () => {
  return await dashboardRepo.getDashboardStats();
};

export const fetchSalesOverview = async (period) => {
  return await dashboardRepo.getSalesOverview(period);
};

export const fetchTopSellingItems = async (period) => {
  return await dashboardRepo.getTopSellingItems(period);
};

export const fetchRecentTransactions = async () => {
  return await dashboardRepo.getRecentTransactions();
};

export const fetchLowStockAlerts = async () => {
  return await dashboardRepo.getLowStockAlerts();
};
