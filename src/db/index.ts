import { createConnection, Connection } from 'typeorm';

/**
 *
 * TypeORM connection
 *
 */
async function connect_db(): Promise<Connection> {
  try {
    const conn: Connection = await createConnection();
    console.log('> Connected to DB');
    return conn;
  } catch (e) {
    console.log(`Error connecting to DB: ${e}`);
    return e;
  }
}

connect_db();
