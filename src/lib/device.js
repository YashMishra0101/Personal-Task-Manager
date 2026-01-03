import { v4 as uuidv4 } from "uuid";

/**
 * Retrieves the current device ID from localStorage, or generates a new one if it doesn't exist.
 * This ID persists across sessions on the same browser/device.
 */
export function getDeviceId() {
  let deviceId = localStorage.getItem("task_manager_device_id");

  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem("task_manager_device_id", deviceId);
  }

  return deviceId;
}
