import { ipcMain } from "electron";
import { pickDirectory, pickImageFile } from "../services/dialog.js";
import { IpcChannels } from "./channels.js";

/**
 * Registers the dialog-related IPC handlers.
 */
function registerHandlers() {
  ipcMain.handle(IpcChannels.PICK_DIRECTORY, async (_, dialogTitle: string) =>
    pickDirectory(dialogTitle)
  );

  ipcMain.handle(IpcChannels.PICK_IMAGE_FILE, async (_, dialogTitle: string) =>
    pickImageFile(dialogTitle)
  );
}

export { registerHandlers };
