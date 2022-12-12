import LaimService, { LaimDevice } from "./LaimService";
import crypto from "crypto"

const DEVICES = [
    {
        "deviceId": "SURI",
        "subdomain": "41a8b153-bdd3-4b3c-8b22-35fdf48d2ccd",
        "firmware": "suri_firmware",
        "isLegacy": false
    },
    {
        "deviceId": "HW1",
        "subdomain": "41a8b153-bdd3-4b3c-8b22-35fdf48d2ccd",
        "isLegacy": true
    }
]

export default class FakeLaim implements LaimService {

    get link(): string {
        return "<link>"
    }
    async createTicket(resource: string): Promise<string> {
        return crypto.randomUUID()
    }
    async devices(resource: string): Promise<LaimDevice[]> {
        return DEVICES.map(({ deviceId, firmware }) => ({ deviceId, firmware }))
    }
}