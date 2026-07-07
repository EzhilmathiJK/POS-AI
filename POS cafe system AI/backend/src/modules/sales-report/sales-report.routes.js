import express from 'express';
import { query, validationResult } from 'express-validator';
import * as salesReportController from './sales-report.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';

const router = express.Router();

router.use(authenticate);
router.use(authorize('sales_report'));

export const salesReportValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer.')
    .toInt(),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100.')
    .toInt(),

  query('selectedItem').optional().trim(),

  query('datePreset')
    .optional()
    .isIn(['all', 'today', 'yesterday', 'thisWeek', 'thisMonth', 'custom'])
    .withMessage('Invalid date preset. Must be one of: all, today, yesterday, thisWeek, thisMonth, custom'),

  query('dateFrom')
    .optional({ values: 'falsy' })
    .custom((value, { req }) => {
      if (req.query.datePreset === 'custom') {
        if (!value) {
          throw new Error('dateFrom is required when using custom date preset.');
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          throw new Error('Invalid dateFrom format. Use YYYY-MM-DD.');
        }
      }
      return true;
    }),

  query('dateTo')
    .optional({ values: 'falsy' })
    .custom((value, { req }) => {
      if (req.query.datePreset === 'custom') {
        if (!value) {
          throw new Error('dateTo is required when using custom date preset.');
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          throw new Error('Invalid dateTo format. Use YYYY-MM-DD.');
        }
        if (req.query.dateFrom && value) {
          const from = new Date(req.query.dateFrom);
          const to = new Date(value);
          from.setHours(0, 0, 0, 0);
          to.setHours(0, 0, 0, 0);
          if (to < from) {
            throw new Error('dateTo must be after dateFrom.');
          }
        }
      }
      return true;
    }),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

router.get('/items', salesReportController.getSalesItems);
router.get('/', salesReportValidator, validateRequest, salesReportController.getSalesReport);

export default router;
