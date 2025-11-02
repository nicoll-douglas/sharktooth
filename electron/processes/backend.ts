import { app } from "electron";
import {
  ChildProcessWithoutNullStreams,
  spawn,
  SpawnOptionsWithStdioTuple,
  StdioOptions,
} from "child_process";
import chokidar from "chokidar";
import path from "path";
import { logBackend, logMain } from "../services/logger.js";

/**
 * Source code directory for the Python backend.
 */
const backendSrcFolder = path.join(__dirname, "../../../backend");

let backendProcess: ChildProcessWithoutNullStreams | null = null;

/**
 * Kill the backend Python process of the application.
 */
async function killBackend() {
  if (backendProcess && !backendProcess.killed) {
    logMain.debug("Killing existing backend process...");
    backendProcess.kill();

    await new Promise<void>((resolve) => {
      backendProcess?.once("close", () => resolve());
      setTimeout(() => resolve(), 5000);
    });
  }
}

/**
 * Registers event handlers for the backend process.
 *
 * @param proc The backend process.
 */
function registerBackendEventHandlers(proc: ChildProcessWithoutNullStreams) {
  proc.stdout.on("data", (chunk: Buffer) => {
    const message = chunk.toString().trim();

    if (!message) return;

    logBackend.info(message);
  });

  proc.stderr.on("data", (chunk: Buffer) => {
    const message = chunk.toString().trim();

    if (!message) return;

    logBackend.error(message);
  });

  proc.stdout.on("error", (error) =>
    logBackend.error("Failed to read backend log stream.", { error })
  );

  proc.on("error", (error) =>
    logMain.error("Failed to start backend.", { error })
  );

  proc.on("spawn", () => {
    logMain.info("Backend process spawned.");
  });

  proc.on("close", (code, signal) => {
    if (code) {
      logMain.debug("Backend process exited.", { code });
      return;
    }

    if (signal) {
      logMain.debug("Backend process terminated.", { signal });
      return;
    }

    logMain.warn(
      "Abnormal termination of backend process, no code or signal was captured."
    );
  });
}

/**
 * Starts the backend Python process of the application.
 */
async function startBackend() {
  await killBackend();

  const pyPath = path.join(__dirname, "../../../.venv/bin/python");
  const script = path.join(backendSrcFolder, "app.py");

  const spawnOptions = {
    cwd: backendSrcFolder,
    env: {
      USER_DATA_DIR: app.getPath("userData"),
      APP_NAME: process.env.VITE_APP_NAME,
      FRONTEND_APP_URL: process.env.VITE_APP_URL,
      APP_ENV: process.env.APP_ENV,
      SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
      SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
    },
  };

  logMain.debug("Starting backend...");
  backendProcess = spawn(pyPath, [script], spawnOptions);
  registerBackendEventHandlers(backendProcess);
}

/**
 * Starts the backend Python process of the application in watch mode.
 *
 * Should be used in development only.
 */
function watchBackend() {
  const watcher = chokidar.watch(backendSrcFolder, {
    ignored: (path, stats) => !!stats?.isFile() && !path.endsWith(".py"),
    ignoreInitial: true,
  });

  watcher.on("all", async (event, filePath) => {
    logMain.debug("Backend source file changed, restarting backend...", {
      filePath,
      event,
    });
    await startBackend();
  });

  watcher.on("ready", () => {
    logMain.debug("Watching backend source files for changes...");
  });
}

export { killBackend, startBackend, watchBackend };
