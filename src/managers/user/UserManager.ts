import { User } from '@models/User';
import { Repository, getRepository, ObjectType } from 'typeorm';

import { UserType } from '@managers/User/types';

export class UserManager {
  static async create(user: UserType): Promise<User> {
    // Validation goes here
    const repo: Repository<User> = getRepository(User);
    const new_user = User.fill(new User(), user);

    return await repo.save(new_user);
  }
}
