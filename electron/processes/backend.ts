import { app } from "electron";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import chokidar from "chokidar";
import path from "path";
import { logBackend, logMain } from "../services/logger/index.js";

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
    });
  }
}

/**
 * Registers event handlers for the backend process.
 *
 * @param proc The backend process.
 */
function registerBackendEventHandlers(proc: ChildProcessWithoutNullStreams) {
  const handleStreamOutput =
    (fallback: "info" | "error") => (chunk: Buffer) => {
      const data = chunk.toString().trim();

      if (!data) return;

      logBackend.log(data, fallback);
    };

  proc.stdout.on("data", handleStreamOutput("info"));
  proc.stderr.on("data", handleStreamOutput("error"));

  proc.stdout.on("error", (error) =>
    logMain.error("Failed to read backend log stream.", { error })
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

  const execPath =
    process.env.APP_ENV === "development"
      ? path.join(__dirname, "..", "..", "..", ".venv", "bin", "python")
      : path.join(
          process.resourcesPath,
          "backend",
          process.platform === "win32" ? "backend.exe" : "backend"
        );

  const args =
    process.env.APP_ENV === "development"
      ? [path.join(backendSrcFolder, "app.py")]
      : [];

  const spawnOptions = {
    cwd: path.dirname(execPath),
    env: {
      USER_DATA_DIR: app.getPath("userData"),
      APP_NAME: process.env.VITE_APP_NAME,
      FRONTEND_APP_URL: process.env.VITE_APP_URL,
      APP_ENV: process.env.APP_ENV,
      SPOTIFY_CLIENT_ID: process.env.VITE_SPOTIFY_CLIENT_ID,
      SPOTIFY_REDIRECT_URI: process.env.VITE_SPOTIFY_REDIRECT_URI,
      RESOURCES_PATH: process.resourcesPath,
    },
  };

  logMain.debug("Starting backend...");
  backendProcess = spawn(execPath, args, spawnOptions);
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
