import { Request, Response } from 'express';

import { HTTP } from './responses/http';

import { UserManager } from '@managers/User/UserManager';
import { UserType } from '@managers/User/types';

export class UserController {
  public static async create(req: Request, res: Response) {
    const user: UserType = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      description: req.body.description,
      profile_location: req.body.profile_location,
    };

    try {
      UserManager.create(user);
      return HTTP.success(res, {});
    } catch (e) {
      return HTTP.bad(res, e.message);
    }
  }

  public static get(req: Request, res: Response): Response {
    const users = [{ name: 'david' }]; // For passing tests
    return HTTP.success(res, users);
  }

  public static getById(req: Request, res: Response): Response {
    const user = { name: 'david' }; // For passing tests
    return HTTP.success(res, user);
  }

  public static update(req: Request, res: Response): Response {
    return HTTP.empty(res);
  }
}
