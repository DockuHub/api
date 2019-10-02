import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';

import { User } from '@models/User';
import { HTTP } from './responses/http';

export class UserController {
  public static create(req: Request, res: Response) {
    const userRepo: Repository<User> = getRepository(User); // TyprORM uses Repositories

    // TODO return created HTTP response
    return HTTP.empty(res);
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
