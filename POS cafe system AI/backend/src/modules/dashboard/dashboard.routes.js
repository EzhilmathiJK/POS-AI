import express from 'express';
import * as dashboardController from './dashboard.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';

const router = express.Router();

router.use(authenticate);
router.use(authorize('dashboard'));

router.get('/stats', dashboardController.getDashboardStats);
router.get('/sales-overview', dashboardController.getSalesOverview);
router.get('/top-selling', dashboardController.getTopSellingItems);
router.get('/recent-transactions', dashboardController.getRecentTransactions);
router.get('/low-stock', dashboardController.getLowStockAlerts);

export default router;
