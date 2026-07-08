import express from 'express';
import passport from '../../config/passport.js';
import * as authController from './auth.controller.js';
import { registerValidation, loginValidation } from './auth.validation.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = express.Router();

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.getMe);

router.get('/google/login',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

router.get('/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: 'http://localhost:5174/login?error=google_login_failed'
    }),
    authController.googleCallback
);

export default router;
