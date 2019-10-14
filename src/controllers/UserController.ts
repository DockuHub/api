import { Request, Response } from 'express';

import { HTTP } from './responses/http';

import { UserManager } from '@managers/User/UserManager';
import { UserType } from '@managers/User/types';

import { Mail } from '../server';
import { MailMessage } from '@services/mail/types';

import { logger as winston } from '@config/winston';

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

      // TODO Create MagicLink flow
      // Send email
      const mailMessage: MailMessage = {
        to: user.email,
        subject: 'Welcome to Docku',
        template: 'create_user',
        context: { magiclink: 'https://mangohacks.com' },
      };

      // TODO Add return type to this response
      // Check if response length is > 0. That tells us a messageId was created
      const response = await Mail.send([mailMessage]);
      winston.info({
        message: `Account created for: ${user.email}`,
        emailId: response,
      });

      return HTTP.created(res);
    } catch (e) {
      winston.error(e.message);
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
