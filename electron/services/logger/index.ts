import BackendLogger from "./BackendLogger.js";
import MainLogger from "./MainLogger.js";

/**
 * The logger for the main process.
 */
export const logMain = new MainLogger();

/**
 * The logger for the backend process.
 */
export const logBackend = new BackendLogger();
