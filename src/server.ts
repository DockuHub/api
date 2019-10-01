import 'module-alias/register';
import 'reflect-metadata';

import './db';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { api } from './routes';

const app: express.Application = express();

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
app.use(bodyParser.json({ limit: '50mb' }));
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
app.listen(PORT, () => {
  console.log(`> In ${NODE_ENV}`);
  console.log(`> Listening on ${PORT}`);
});
