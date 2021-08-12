import { transports, format, createLogger } from 'winston';
import winstonDaliy from 'winston-daily-rotate-file';
const { timestamp, combine, printf } = format;

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level} ${info.message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new winstonDaliy({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs/info',
      filename: `%DATE%.log`,
      maxFiles: '30d',
    }),
    new winstonDaliy({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs/error',
      filename: `%DATE%.log`,
      maxFiles: '30d',
    }),
  ],
});

if (process.env.ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(format.colorize(), format.simple()),
    }),
  );
}
export default logger;
