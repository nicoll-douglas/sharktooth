import { format, transports, createLogger, Logger } from "winston";
import { type AppProcess } from "types/shared.js";
import { LOG_LEVEL, APP_LOG_FILE, ERROR_LOG_FILE } from "./constants.js";

const { combine, timestamp, printf, colorize } = format;

/**
 * Custom class for creating application loggers.
 */
export default class AppLogger {
  /**
   * The logger instance.
   */
  protected logger: Logger;

  /**
   * Instantiates the logger to the base Winston logger.
   *
   * @param process The process that the logger's logs will pertain to.
   */
  constructor(protected process: AppProcess) {
    const logFormat = printf(({ level, message, timestamp, ...meta }) => {
      const metaString = Object.keys(meta).length
        ? `\n${JSON.stringify(meta, null, 2)}`
        : "";

      return `[${timestamp}] [${level}] [${this.process}]: ${message}${metaString}`;
    });

    this.logger = createLogger({
      level: LOG_LEVEL,
      format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
      transports: [
        new transports.Console({
          format: combine(
            colorize(),
            timestamp({ format: "HH:mm:ss" }),
            logFormat
          ),
        }),
        new transports.File({
          filename: APP_LOG_FILE,
          maxsize: 5 * 1024 * 1024,
          maxFiles: 5,
          tailable: true,
        }),
        new transports.File({
          filename: ERROR_LOG_FILE,
          level: "error",
          maxsize: 2 * 1024 * 1024,
          maxFiles: 10,
          tailable: true,
          handleExceptions: true,
          handleRejections: true,
        }),
      ],
    });
  }

  /**
   * Logs messages at the debug level.
   *
   * @param message The log message.
   * @param meta Any log metadata.
   * @returns The logger instance.
   */
  debug(message: string, ...meta: any[]): Logger {
    return this.logger.log("debug", message, ...meta);
  }

  /**
   * Logs messages at the info level.
   *
   * @param message The log message.
   * @param meta Any log metadata.
   * @returns The logger instance.
   */
  info(message: string, ...meta: any[]): Logger {
    return this.logger.log("info", message, ...meta);
  }

  /**
   * Logs messages at the error level.
   *
   * @param message The log message.
   * @param meta Any log metadata.
   * @returns The logger instance.
   */
  error(message: string, ...meta: any[]): Logger {
    return this.logger.log("error", message, ...meta);
  }

  /**
   * Logs messages at the warning level.
   *
   * @param message The log message.
   * @param meta Any log metadata.
   * @returns The logger instance.
   */
  warn(message: string, ...meta: any[]): Logger {
    return this.logger.log("warn", message, ...meta);
  }
}
