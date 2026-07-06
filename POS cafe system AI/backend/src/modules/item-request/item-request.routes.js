import express from 'express';
import * as itemRequestController from './item-request.controller.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = express.Router();

router.use(authenticate);

router.get('/filter-dropdown', itemRequestController.getItemRequestFilters);
router.post('/', itemRequestController.createItemRequest);
router.get('/', itemRequestController.getAllItemRequests);
router.get('/:id', itemRequestController.getItemRequestById);
router.put('/:id', itemRequestController.updateItemRequest);
router.patch('/:id/submit', itemRequestController.submitItemRequest);
router.patch('/:id/cancel', itemRequestController.cancelItemRequest);

export default router;
