import { Router } from 'express';
import { UserController } from '@controllers/UserController';

export const api: Router = Router();

/**
 *
 * User
 *
 */

// TODO Create user middleware
api.get('/users', UserController.get);
api.get('/users/:username', UserController.getById);
api.post('/users', UserController.create);
api.patch('/users/:user_id', UserController.update);
