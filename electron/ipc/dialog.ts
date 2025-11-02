import { ipcMain } from "electron";
import { pickDirectory, pickImageFile } from "../services/dialog.js";
import { IpcChannel } from "./channels.js";
import { logMain } from "../services/logger/index.js";

/**
 * Registers the dialog related IPC handlers.
 */
function registerHandlers() {
  ipcMain.handle(IpcChannel.PICK_DIRECTORY, async (_, dialogTitle: string) => {
    logMain.ipc(IpcChannel.PICK_DIRECTORY, false, { dialogTitle });
    return pickDirectory(dialogTitle);
  });

  ipcMain.handle(IpcChannel.PICK_IMAGE_FILE, async (_, dialogTitle: string) => {
    logMain.ipc(IpcChannel.PICK_IMAGE_FILE, false, { dialogTitle });
    return pickImageFile(dialogTitle);
  });

  logMain.debug("Registered dialog related IPC handlers.");
}

export { registerHandlers };
