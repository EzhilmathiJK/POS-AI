import express from 'express';
import * as settingsController from './settings.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';

const router = express.Router();

router.use(authenticate);
router.use(authorize('settings'));

router.get('/permissions', settingsController.getRolePermissions);
router.put('/permissions/:role', settingsController.updateRolePermission);

router.get('/categories', settingsController.getCategories);
router.post('/categories', settingsController.createCategory);
router.delete('/categories/:id', settingsController.deleteCategory);

export default router;
