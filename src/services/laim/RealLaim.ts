import { ServicesConfig } from "@app/config/Config";
import axios, { Axios } from "axios";
import ServiceError from "../ServiceError";
import LaimService, { LaimDevice } from "./LaimService";

export class RealLaimError extends Error {
    constructor(message: string) {
        super(`[RealLaim] Error - ${message}`);
    }
}

export default class RealLaim implements LaimService {

    private readonly axios: Axios
    private readonly laimLink: string

    constructor({ laim, laimKey }: ServicesConfig) {
        this.axios = axios.create({
            baseURL: laim,
            headers: {
                "x-api-key": laimKey
            }
        })
        this.laimLink = laim
    }

    get link() {
        return this.laimLink
    }
    async createTicket(resource: string): Promise<string> {
        try {
            const response = await this.axios.post<{ id: string }>("/indoor-app/tickets", { resource })
            return response.data.id
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.createTicket`, error)
        }
    }
    async devices(resource: string): Promise<LaimDevice[]> {
        try {
            const response = await this.axios.post<any[]>(`/indoor-app/device/devices-by-subdomain?subdomain=${resource}`)
            return response.data.map(({ deviceId, firmware }) => ({ deviceId, firmware }))
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.devices`, error)
        }
    }
}