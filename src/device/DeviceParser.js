export class DeviceParser {
    static getEmulatorPort(deviceId = '') {
        const match = deviceId.match(/^emulator-(\d+)$/)
        return match ? Number(match[1]) : null
    }

    static getDeviceAddress(deviceId = '') {
        const emulatorPort = this.getEmulatorPort(deviceId)
        if (emulatorPort) {
            return {
                type: 'emulator',
                host: '127.0.0.1',
                port: emulatorPort
            }
        }

        if (deviceId.includes(':')) {
            const [host, port] = deviceId.split(':')
            return {
                type: 'tcp/ip',
                host,
                port: Number(port)
            }
        }

        //usb device
        return {
            type: 'usb',
            deviceId
        }
    }
}