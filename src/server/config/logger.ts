import { createLogger, format, Logger, transports } from 'winston';

const { combine, label, prettyPrint, timestamp } = format;

export const logger: Logger = createLogger({
  format: combine(
    label({ label: 'Polac-Portal Api Debug' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new (transports.Console)({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      handleExceptions: true,
    }),
    new (transports.File)({
      filename: 'debug.log',
      level: 'debug',
      handleExceptions: true,
    })
  ],
  exitOnError: false
});
