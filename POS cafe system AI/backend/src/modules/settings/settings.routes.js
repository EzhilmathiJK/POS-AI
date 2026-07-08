import express from 'express';
import * as settingsController from './settings.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { uploadSettingsLogo } from '../../middleware/upload.js';

const router = express.Router();

// Publicly accessible general settings (used by login page before auth)
router.get('/general', settingsController.getGeneralSettings);

router.use(authenticate);
router.get('/categories', settingsController.getCategories);
router.get('/inventory', settingsController.getInventorySettings);

router.use(authorize('settings'));

router.put('/general', uploadSettingsLogo.single('cafe_logo'), settingsController.updateGeneralSettings);
router.put('/inventory', settingsController.updateInventorySettings);

router.get('/permissions', settingsController.getRolePermissions);
router.put('/permissions/:role', settingsController.updateRolePermission);

router.post('/categories', settingsController.createCategory);
router.delete('/categories/:id', settingsController.deleteCategory);

export default router;
