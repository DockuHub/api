import { Router } from 'express';

export const api: Router = Router();

/**
 *
 * User
 *
 */

import { UserController } from '@controllers/UserController';

// TODO Create user middleware
api.get('/user', UserController.read);
api.post('/user', UserController.create);
api.put('/user', UserController.update);
