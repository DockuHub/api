import { Request, Response } from 'express';

import { HTTP } from './responses/http';

import { UserManager } from '@managers/User/UserManager';
import { UserType } from '@managers/User/types';
import { Mail } from '@services/mail/Mail';

export class UserController {
  /**
   * Create a user
   * @param req
   * @param res
   */
  public static async create(req: Request, res: Response): Promise<Response> {
    // TODO Welcome email template with magic link included to signin?
    const user: UserType = { ...req.body };

    try {
      await UserManager.create(user);

      return HTTP.created(res);
    } catch (e) {
      return HTTP.bad(res, e.message);
    }
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
