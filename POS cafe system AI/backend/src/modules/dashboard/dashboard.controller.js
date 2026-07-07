import * as dashboardService from './dashboard.service.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.fetchDashboardStats();
    res.status(200).json({
      success: true,
      message: 'Dashboard stats fetched successfully',
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getSalesOverview = async (req, res, next) => {
  try {
    const period = req.query.period || 'daily';
    const overview = await dashboardService.fetchSalesOverview(period);
    res.status(200).json({
      success: true,
      message: 'Sales overview fetched successfully',
      data: overview,
    });
  } catch (error) {
    next(error);
  }
};

export const getTopSellingItems = async (req, res, next) => {
  try {
    const period = req.query.period || 'this_week';
    const items = await dashboardService.fetchTopSellingItems(period);
    res.status(200).json({
      success: true,
      message: 'Top selling items fetched successfully',
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentTransactions = async (req, res, next) => {
  try {
    const transactions = await dashboardService.fetchRecentTransactions();
    res.status(200).json({
      success: true,
      message: 'Recent transactions fetched successfully',
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const getLowStockAlerts = async (req, res, next) => {
  try {
    const alerts = await dashboardService.fetchLowStockAlerts();
    res.status(200).json({
      success: true,
      message: 'Low stock alerts fetched successfully',
      data: alerts,
    });
  } catch (error) {
    next(error);
  }
};
