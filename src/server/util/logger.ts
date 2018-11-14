import { createLogger, format, Logger, transports } from 'winston';

const { combine, label, prettyPrint, timestamp } = format;

const logger: Logger = createLogger({
  format: combine(
    label({ label: 'Polac-Portal Api Debug' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new (transports.Console)({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
    }),
    new (transports.File)({
      filename: 'debug.log',
      level: 'debug',
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export { logger };
