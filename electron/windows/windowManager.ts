import { BrowserWindow } from "electron";

/**
 * Class for managing application windows.
 */
class WindowManager {
  /**
   * All application windows.
   */
  private windows = new Set<BrowserWindow>();

  /**
   * Adds a new window to the set of application windows.
   *
   * @param window The window to add.
   * @returns The window.
   */
  register(window: BrowserWindow): BrowserWindow {
    this.windows.add(window);

    window.on("closed", () => {
      this.windows.delete(window);
    });

    return window;
  }

  /**
   * Closes all application windows.
   */
  closeAll() {
    for (const windows of this.windows) {
      if (!windows.isDestroyed()) windows.close();
    }
  }
}

/**
 * Singleton WindowManager instance for managing application windows.
 */
const windowManager = new WindowManager();

export default windowManager;
