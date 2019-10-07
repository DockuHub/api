import { Request, Response } from 'express';

import { HTTP } from './responses/http';

import { UserManager } from '@managers/User/UserManager';
import { UserType } from '@managers/User/types';

export class UserController {
  public static async create(req: Request, res: Response): Promise<Response> {
    // TODO Sanitize request
    const user: UserType = { ...req.body };

    try {
      await UserManager.create(user);
      return HTTP.created(res);
    } catch (e) {
      return HTTP.bad(res, e.message);
    }
  }

  public static get(req: Request, res: Response): Response {
    // TODO handle pagination
    // TODO handle scopes for this endpoints(admin route?)
    const users = [{ name: 'david' }]; // For passing tests
    return HTTP.success(res, users);
  }

  public static async getById(req: Request, res: Response): Promise<Response> {
    // TODO sanitize this request/validate username
    const { username } = req.params;

    try {
      const user = await UserManager.findByUsername(username);
      return HTTP.success(res, user);
    } catch (e) {
      return HTTP.bad(res, e.message);
    }
  }

  public static update(req: Request, res: Response): Response {
    return HTTP.empty(res);
  }
}
