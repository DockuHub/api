import 'module-alias/register';
import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

/**
 *
 * Application providers
 *
 */
import { api } from './routes';
import { connect_db } from './db';
import { logger as winston, stream } from '@config/winston';
import { UserController } from '@controllers/UserController';

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

if (NODE_ENV == 'production') {
  app.use(morgan('combined', { stream }));
} else {
  app.use(morgan('dev'));
}

/**
 *
 * API DOCS
 *
 */
const swaggerDefinition = {
  info: {
    // API informations (required)
    title: 'Hello World', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host: `localhost:${PORT}`, // Host (optional)
  basePath: '/', // Base path (optional)
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js', './swagger.yaml'],
};

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
