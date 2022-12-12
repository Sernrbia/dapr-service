import { ServicesConfig } from "@app/config/Config";
import axios, { Axios } from "axios";
import ServiceError from "../ServiceError";
import UserService, { UserModel } from "./UserService";

export class RealUserError extends Error {
    constructor(message: string) {
        super(`[RealUser] Error - ${message}`);
    }
}

export default class RealUser implements UserService {

    private readonly axios: Axios

    constructor({ user }: ServicesConfig) {
        this.axios = axios.create({
            baseURL: user
        })
    }

    async get(id: string): Promise<UserModel> {
        try {
            const response = await this.axios.get<UserModel>(`/users/${id}`)
            return response.data
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.get`, error)
        }
    }
    async getBusinessUsers(business: string): Promise<UserModel[]> {
        try {
            const response = await this.axios.get<UserModel[]>(`/users?business=${business}`)
            return response.data
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.getBusinessUsers`, error)
        }
    }

    async inviteUser(email: string, business: string, role: string): Promise<void> {
        try {
            await this.axios.post(`/invitations/invite-user`, {
                email,
                businessId: business,
                role
            })
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.inviteUser`, error)
        }
    }
}