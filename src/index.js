import { ADBClient } from "./core/ADBClient.js"
import { DeviceParser } from "./device/DeviceParser.js"

export { ADBClient, DeviceParser }

export function createADB(options) {
    return new ADBClient(options)
}