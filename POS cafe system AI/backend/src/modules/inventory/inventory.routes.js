import { Router } from 'express';
import * as inventoryController from './inventory.controller.js';
import { uploadInventoryImage } from '../../middleware/upload.js';

const router = Router();

router.get('/', inventoryController.getInventoryList);
router.post('/', uploadInventoryImage.single('image'), inventoryController.createInventoryItem);
router.put('/:id', uploadInventoryImage.single('image'), inventoryController.updateInventoryItem);
router.delete('/:id', inventoryController.deleteInventoryItem);

export default router;
