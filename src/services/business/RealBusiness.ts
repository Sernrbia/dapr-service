import { ServicesConfig } from "@app/config/Config";
import axios, { Axios } from "axios";
import ServiceError from "../ServiceError";
import BusinessService, { BusinessModel, CreateBusinessRequest } from "./BusinessService";


export class RealBusinessError extends Error {
    constructor(message: string) {
        super(`[RealBusiness] Error - ${message}`);
    }
}

export default class RealBusiness implements BusinessService {

    private readonly axios: Axios

    constructor({ business }: ServicesConfig) {
        this.axios = axios.create({
            baseURL: business
        })
    }

    async getAll(): Promise<BusinessModel[]> {
        try {
            const response = await this.axios.get<BusinessModel[]>(`/businesses`)
            return response.data
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.getAll`, error)
        }
    }
    async getBusinessByParent(id: string): Promise<BusinessModel[]> {
        try {
            const response = await this.axios.get<BusinessModel[]>(`/businesses?parent=${id}`)
            return response.data
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.getBusinessByParent`, error)
        }
    }
    async getBusiness(id: string): Promise<BusinessModel> {
        try {
            const response = await this.axios.get<BusinessModel>(`/businesses/${id}`)
            return response.data
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.getBusiness`, error)
        }
    }
    async createBusiness(id: string, request: CreateBusinessRequest): Promise<string> {
        try {
            const response = await this.axios.post<{ id: string }>(`/businesses/${id}/create-business`, request)
            return response.data.id
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.createBusiness`, error)
        }
    }
}