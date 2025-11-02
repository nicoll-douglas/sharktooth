import AppLogger from "./AppLogger.js";
import { IpcChannel } from "../../ipc/channels.js";
import { Logger } from "winston";

/**
 * Class to create a logger for the main process.
 */
export default class MainLogger extends AppLogger {
  constructor() {
    super("main");
  }

  /**
   * Logs IPC events.
   *
   * @param channel The channel of the event.
   * @param out Whether the event was sent into or out of the main process, true for in, false or out.
   * @param payload The payload attached to the event signal.
   * @returns The logger instance.
   */
  ipc(
    channel: IpcChannel,
    out: boolean,
    payload?: Record<string, any>
  ): Logger {
    return this.debug(
      `IPC ${out ? "→" : "←"} ${channel}${payload ? ", Payload:" : ""}`,
      payload
    );
  }
}
