import express from 'express';
import * as billingController from './billing.controller.js';
import { authenticate } from '../../middleware/authenticate.js';

import { authorize } from '../../middleware/authorize.js';

const router = express.Router();

router.use(authenticate);
router.use(authorize('billing'));

router.post('/', billingController.createBill);

export default router;
