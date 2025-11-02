import { app } from "electron";
import { IpcChannel } from "../ipc/channels.js";
import { format, transports, createLogger, Logger } from "winston";
import path from "path";
import { type AppProcess } from "types/shared.js";

const { combine, timestamp, printf, colorize } = format;

const logsDir = app.getPath("logs");
const appLogFile = path.join(logsDir, "app.log");
const errorLogFile = path.join(logsDir, "error.log");

const logLevel = process.env.APP_ENV === "production" ? "info" : "debug";

/**
 * Custom class for creating application loggers.
 */
class AppLogger {
  /**
   * The logger instance.
   */
  private logger: Logger;

  /**
   * Instantiates the logger to the base Winston logger.
   *
   * @param process The process that the logger's logs will pertain to.
   */
  constructor(private process: AppProcess) {
    const logFormat = printf(({ level, message, timestamp, ...meta }) => {
      const metaString = Object.keys(meta).length
        ? `\n${JSON.stringify(meta, null, 2)}`
        : "";

      return `[${this.process.toUpperCase()}] [${timestamp}] [${level}]: ${message}${metaString}`;
    });

    this.logger = createLogger({
      level: logLevel,
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
          filename: appLogFile,
          maxsize: 5 * 1024 * 1024,
          maxFiles: 5,
          tailable: true,
        }),
        new transports.File({
          filename: errorLogFile,
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

  /**
   * Logs IPC events.
   *
   * @param channel The channel of the event.
   * @param out Whether the event was sent into or out of the main process, true for in, false or out.
   * @param payload The payload attached to the event signal.
   * @returns The logger instance.
   */
  ipc(channel: IpcChannel, out: boolean, payload?: Record<string, any>) {
    return this.debug(`IPC ${out ? "→" : "←"} ${channel}, Payload:`, payload);
  }
}

/**
 * Logger for the main process.
 */
const logMain = new AppLogger("main");
const logBackend = new AppLogger("backend");

export { logMain, logBackend };
