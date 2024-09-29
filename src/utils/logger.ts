import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json, colorize } = format;

const consoleLogFromat = format.combine(
  colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] :: ${level} -> ${message}`;
  }),
);

const logger = createLogger({
  level: 'info',
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFromat,
    }),
    new transports.File({ filename: 'app.log' }),
  ],
});
export default logger;
