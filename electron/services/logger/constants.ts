import { app } from "electron";
import path from "path";

/**
 * The application's logs directory.
 */
export const LOGS_DIR = app.getPath("logs");

/**
 * The main application log file.
 */
export const APP_LOG_FILE = path.join(LOGS_DIR, "app.log");

/**
 * The application's error log file.
 */
export const ERROR_LOG_FILE = path.join(LOGS_DIR, "error.log");

/**
 * The application's log level.
 */
export const LOG_LEVEL =
  process.env.APP_ENV === "production" ? "info" : "debug";
