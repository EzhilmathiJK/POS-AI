import express from 'express';
import * as billingController from './billing.controller.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = express.Router();

// All billing routes require authentication
router.use(authenticate);

router.post('/', billingController.createBill);

export default router;
