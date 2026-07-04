import express from 'express';
import * as authController from './auth.controller.js';
import { registerValidation, loginValidation } from './auth.validation.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = express.Router();

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.getMe);

export default router;
