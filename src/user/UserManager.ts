class UserManager {
  public save(username: string) /*: User Type  */ {
    if (username) {
      // Update
      // return user;
    }

    // create method from user model and return user
  }

  public search(username: string, filters: {}) /** : User | Users */ {
    if (username) {
      // search by username and apply necessary filters
      // return user
    }

    // apply filters to collection search of all users and return user collection
  }
}

/**
 *
 * Functional Route
 */

function save(username: string | null, body: {}) /*: User Type  */ {
  if (username) {
    // Update for example User.update(username, body);
    // return user;
  }

  // create method from user model and return user
}

function search(username: string | null, filters: {}) /** : User | Users */ {
  if (username) {
    // search by username and apply necessary filters
    // return user
  }

  // apply filters to collection search of all users and return user collection
}
