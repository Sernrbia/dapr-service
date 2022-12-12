import { ServicesConfig } from "@app/config/Config";
import axios, { Axios } from "axios";
import ServiceError from "../ServiceError";
import MeasuringPointService, { MeasuringPointModel, MeasuringResult } from "./MeasuringPointService";

export class RealMeasuringPointError extends Error {
    constructor(message: string) {
        super(`[RealMeasuringPoint] Error - ${message}`);
    }
}

export default class RealMeasuringPoint implements MeasuringPointService {

    private readonly axios: Axios

    constructor({ measuringPoint }: ServicesConfig) {
        this.axios = axios.create({
            baseURL: measuringPoint
        })
    }


    async getAll(): Promise<MeasuringPointModel[]> {
        try {
            const response = await this.axios.get<MeasuringPointModel[]>(`/measuring-points`)
            return response.data
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.getAll`, error)
        }
    }
    async getAllForBusiness(business: string): Promise<MeasuringPointModel[]> {
        try {
            const response = await this.axios.get<MeasuringPointModel[]>(`/measuring-points`, {
                params: { business }
            })
            return response.data
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.getAllForBusiness`, error)
        }
    }
    async get(id: string): Promise<MeasuringPointModel> {
        try {
            const response = await this.axios.get<MeasuringPointModel>(`/measuring-points/${id}`)
            return response.data
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.get`, error)
        }
    }
    async lastMeasuring(id: string, count: number): Promise<MeasuringResult> {
        try {
            const response = await this.axios.get<MeasuringResult>(`/measuring-points/${id}/measuring/last`, {
                params: { count }
            })
            return response.data
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.lastMeasuring`, error)
        }
    }
    async rangeMeasuring(id: string, from: number, to: number, timezone: string): Promise<MeasuringResult> {
        try {
            const response = await this.axios.get<MeasuringResult>(`/measuring-points/${id}/measuring/range`, {
                params: { from, to, timezone }
            })
            return response.data
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.rangeMeasuring`, error)
        }
    }
    async aggregatedMeasuring(id: string, from: number, to: number, timezone: string, interval: string): Promise<MeasuringResult> {
        try {
            const response = await this.axios.get<MeasuringResult>(`/measuring-points/${id}/measuring/aggregated`, {
                params: { from, to, timezone, interval }
            })
            return response.data
        } catch (error) {
            throw new ServiceError(`${this.constructor.name}.aggregatedMeasuring`, error)
        }
    }
}