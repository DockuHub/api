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
api.get('/users/:username', UserController.getByUsername);
api.post('/users', UserController.validate_create_user, UserController.create);
api.patch('/users/:user_id', UserController.update);
