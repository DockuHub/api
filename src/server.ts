import 'module-alias/register';
import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

/**
 *
 * Application providers
 *
 */
import { api } from './routes';
import { connect_db } from './db';

export const app: express.Application = express();

/**
 *
 * Enviornment variables
 *
 */
const { PORT, NODE_ENV } = process.env;

/**
 *
 * Middleware
 *
 */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

/**
 *
 * API Router
 *
 */
app.use('/api', api);

/**
 *
 * Server API
 *
 */
if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`> In ${NODE_ENV}`);
    console.log(`> Listening on ${PORT}`);

    connect_db();
  });
}
