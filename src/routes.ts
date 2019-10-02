import { Router } from 'express';

export const api: Router = Router();

/**
 *
 * User
 *
 */

import { UserController } from '@controllers/UserController';

// TODO Create user middleware
api.get('/users', UserController.get);
api.get('/users/:user_id', UserController.getById);
api.post('/users/:user_id', UserController.create);
api.put('/users/:user_id', UserController.update);
