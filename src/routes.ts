import { Router } from 'express';
import { UserController } from '@controllers/UserController';
import { check } from 'express-validator';

export const api: Router = Router();

/**
 *
 * User
 *
 */

// TODO Create user middleware
api.get('/users/:username', UserController.getByUsername);
api.post(
  '/users',
  [
    check('email')
      .exists()
      .isEmail(),
  ],
  UserController.create,
);
api.patch('/users/:user_id', UserController.update);
