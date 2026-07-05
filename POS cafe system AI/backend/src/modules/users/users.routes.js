import express from 'express';
import * as usersController from './users.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';

const router = express.Router();

// Both endpoints protected by authenticate and require 'users' page permission
router.use(authenticate);
router.use(authorize('users'));

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);

export default router;
