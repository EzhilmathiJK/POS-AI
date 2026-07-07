import * as salesReportService from './sales-report.service.js';

export const getSalesReport = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { selectedItem, datePreset, dateFrom, dateTo } = req.query;

    const data = await salesReportService.getSalesReport(
      { page, limit },
      { selectedItem, datePreset, dateFrom, dateTo }
    );

    res.status(200).json({
      success: true,
      message: 'Sales report retrieved successfully',
      data
    });
  } catch (error) {
    next(error);
  }
};

export const getSalesItems = async (req, res, next) => {
  try {
    const items = await salesReportService.getSalesItems();
    res.status(200).json({
      success: true,
      message: 'Sales items retrieved successfully',
      data: items
    });
  } catch (error) {
    next(error);
  }
};
