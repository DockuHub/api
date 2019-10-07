import { Router } from 'express';
import { UserController } from '@controllers/UserController';
import { ApiPath } from 'swagger-express-ts';

export const api: Router = Router();

/**
 *
 * User
 *
 */

// TODO Create user middleware

api.get('/users', UserController.get);
api.get('/users/:user_id', UserController.getById);
api.post('/users', UserController.create);
api.patch('/users/:user_id', UserController.update);
