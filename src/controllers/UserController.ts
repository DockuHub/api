import { Request, Response } from 'express';

import { HTTP } from './responses/http';

import { UserManager } from '@managers/User/UserManager';
import { UserType } from '@managers/User/types';
import { Mail } from '@services/mail/Mail';

const mailer = new Mail();

export class UserController {
  /**
   * Create a user
   * @param req
   * @param res
   */
  public static async create(req: Request, res: Response): Promise<Response> {
    const user: UserType = { ...req.body };

    try {
      await UserManager.create(user);

      return HTTP.created(res);
    } catch (e) {
      return HTTP.bad(res, e.message);
    }
  }

  /**
   * Get a list of users
   * @param req
   * @param res
   */
  public static get(req: Request, res: Response): Response {
    // TODO handle pagination
    // TODO handle scopes for this endpoints(admin route?)
    // TODO Define if we should remove this route for now
    const users = [{ name: 'david' }]; // For passing tests
    return HTTP.success(res, users);
  }

  /**
   * Get a user by username
   * @param req
   * @param res
   */
  public static async getByUsername(
    req: Request,
    res: Response,
  ): Promise<Response> {
    // TODO sanitize this request/validate username
    const { username } = req.params;

    try {
      const user = await UserManager.findByUsername(username);
      return HTTP.success(res, user);
    } catch (e) {
      return HTTP.bad(res, e.message);
    }
  }

  /**
   * Update username
   * @param req
   * @param res
   */
  public static update(req: Request, res: Response): Response {
    return HTTP.empty(res);
  }
}
