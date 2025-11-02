import { dialog } from "electron";
import { logMain } from "./logger";

/**
 * Opens a dialog for the user to pick a directory.
 *
 * @param dialogTitle The title of the dialog.
 * @returns The first file path selected, or `null` if the dialog was canceled.
 */
async function pickDirectory(dialogTitle: string): Promise<string | null> {
  logMain.info("User opened directory picker.");

  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
    title: dialogTitle,
  });

  if (result.canceled) {
    logMain.info("User canceled directory picker dialog.");

    return null;
  }

  const selected = result.filePaths[0];

  logMain.info("User selected a directory.", {
    selected,
  });

  return selected;
}

/**
 * Opens a dialog for the user to pick a single image file.
 *
 * @param dialogTitle The title of the dialog.
 * @returns The first file selected, or `null` if the dialog was canceled.
 */
async function pickImageFile(dialogTitle: string): Promise<string | null> {
  logMain.info("User opened image file picker dialog.");

  const result = await dialog.showOpenDialog({
    title: dialogTitle,
    buttonLabel: "Select",
    properties: ["openFile"],
    filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png"] }],
  });

  if (result.canceled) {
    logMain.info("User canceled image file picker dialog.");

    return null;
  }

  const selected = result.filePaths[0];

  logMain.info("User selected an image file", {
    selected,
  });

  return selected;
}

export { pickDirectory, pickImageFile };
