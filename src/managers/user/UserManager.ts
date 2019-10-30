import { User } from '@models/User';
import { Repository, getRepository, ObjectType } from 'typeorm';

import { UserType } from '@managers/User/types';

import { inject_template } from '@services/mail/utils/inject';

export class UserManager {
  /**
   *
   * Create a user
   *
   */

  static async create(user: UserType): Promise<User> {
    const repo: Repository<User> = getRepository(User);
    const new_user = new User();
    User.fill(new_user, user);

    return await repo.save(new_user);
  }

  /**
   *
   * Find user by username
   *
   */
  public static async findByEmail(email: string): Promise<User | undefined> {
    // TODO limit how much info gets returned
    const repo: Repository<User> = getRepository(User);
    const user = await repo.findOne({ where: { email } });

    return user;
  }
}
