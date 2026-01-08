import adbkit from '@devicefarmer/adbkit'
import { exec } from 'child_process'
import { promisify } from 'util'

const { Adb } = adbkit
const execAsync = promisify(exec)


export class ADBClient{
    constructor(options = {}) {
        this.client = Adb.createClient(options)
    }

    async isADBAvailable() {
        try {
            const { stdout } = await execAsync('adb version')
            return stdout.includes('Android Debug Bridge')
        } catch (error) {
            return false
        }
    }

    async listDevices() {
        return this.client.listDevices()
    }

    async executeShellCommand(deviceId, command) {
        const device = await this.client.getDevice(deviceId)
        const stream = await device.shell(command)
        const buffer = await Adb.util.readAll(stream)

        return buffer.toString().trim()
    }
}