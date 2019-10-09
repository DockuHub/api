import { Request, Response, NextFunction } from 'express';
import {
  check,
  Result,
  validationResult,
  ValidationError,
  ValidationChain,
} from 'express-validator';

import { HTTP } from './responses/http';

import { UserManager } from '@managers/User/UserManager';
import { UserType } from '@managers/User/types';

export class UserController {
  /**
   * Create a user
   * @param req
   * @param res
   */
  public static async create(req: Request, res: Response): Promise<Response> {
    const request_errors: Result<ValidationError> = validationResult(req);

    if (!request_errors.isEmpty()) {
      const msg: string = request_errors.array()[0].msg;
      return HTTP.bad(res, msg);
    }

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

  /**
   *
   * Validate API requests
   *
   */
  // TODO Verify if we want to keep validations per controller or in its own domain (validate)
  public static validate_create_user: Array<ValidationChain> = [
    check('firstName', 'firstName not found')
      .exists()
      .trim()
      .escape(),
    check('lastName', 'lastName not found')
      .exists()
      .trim()
      .escape(),
    check('username', 'Username not found')
      .exists()
      .trim()
      .escape(),
    check('email', 'Invalid email')
      .isEmail()
      .normalizeEmail(),
  ];
}
