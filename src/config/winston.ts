import appRoot from 'app-root-path';
import winston from 'winston';
import moment from 'moment';

const { NODE_ENV } = process.env;

/**
 *
 *  Winston log transport options
 *
 */
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/src/logs/api.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
};

/**
 *
 * Winston Logger
 *
 */
export const logger: winston.Logger = winston.createLogger({
  transports: [new winston.transports.File(options.file)],
  exitOnError: false,
});

/**
 *
 * Set console log as simple format on dev
 *
 */
if (NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

/**
 *
 * Writable stream used by morgan
 *
 */
export const stream = {
  write: (message: string): void => {
    logger.info(message);
  },
};
