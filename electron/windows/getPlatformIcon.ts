/**
 * Gets the icon filename depending on the platform.
 *
 * @returns THe filename.
 */
export default function getPlatformIcon(): string {
  switch (process.platform) {
    case "win32":
      return "icon.ico";
    case "darwin":
      return "icon.icns";
    default:
      return "icon.png";
  }
}
