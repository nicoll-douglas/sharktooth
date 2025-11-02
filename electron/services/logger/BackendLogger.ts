import { Logger } from "winston";
import AppLogger from "./AppLogger.js";

/**
 * Class to create a logger for the backend process.
 */
export default class BackendLogger extends AppLogger {
  constructor() {
    super("backend");
  }

  /**
   * Converts specifically formatted stdout output from the backend into the respective winston log.
   *
   * @param data The data received from the backend via stdout.
   * @returns The logger instance.
   */
  log(data: string, fallback: "info" | "error"): Logger {
    const logLevelMap = {
      CRITICAL: "error",
      ERROR: "error",
      WARNING: "warn",
      INFO: "info",
      DEBUG: "debug",
    };

    const [pythonLevel, message] = data.split("|");

    if (data.toLowerCase().includes("http")) {
      return this.debug(data);
    }

    if (!Object.keys(logLevelMap).includes(pythonLevel)) {
      return this.logger.log(fallback, data);
    }

    let winstonLevel = logLevelMap[pythonLevel as keyof typeof logLevelMap];

    return this.logger.log(winstonLevel, message);
  }
}
