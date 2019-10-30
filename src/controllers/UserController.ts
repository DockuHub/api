import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as JWT from 'jsonwebtoken';

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return HTTP.bad(res, errors.array().toString());
    }

    const { email } = req.body;

    try {
      const user = !!UserManager.findByEmail(email);
      if (!!user) {
        const logInMailMessage: MailMessage = {
          to: email,
          subject: "Here's your verification",
          template: 'magiclink_user',
          context: { magiclink: 'https://mangohacks.com' },
        };

        const response = await Mail.send([logInMailMessage]);

        winston.info({
          message: `Sending magic link for: ${email}`,
          emailId: response,
        });

        return HTTP.success(res);
      }

      await UserManager.create(email);

      const createMailMessage: MailMessage = {
        to: email,
        subject: 'Welcome to Docku',
        template: 'create_user',
        context: { magiclink: 'https://mangohacks.com' },
      };

      const response = await Mail.send([createMailMessage]);

      winston.info({
        message: `Account created for: ${email}`,
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
      const user = await UserManager.findByEmail(username);
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
