import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';

import { User } from '@models/User';
import { HTTP } from './responses/http';

export class UserController {
  public static async create(req: Request, res: Response) {
    try {
      // TODO move to UserManager
      // TODO Finish user model
      // Below is to test if inserting into Pg works, it works
      const userRepo: Repository<User> = getRepository(User);

      const user = new User();
      user.firstName = 'david';
      user.lastName = 'castaneda';
      user.email = 'dcast188@fiu.edu';
      user.username = 'dcast188@fiu.edu';
      user.description = 'Testing';
      user.profile_location = 'Miami';
      const new_user = await userRepo.save(user);

      // TODO return created HTTP response
      return HTTP.success(res, new_user);
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
