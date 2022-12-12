export type MeasuringPointModel = {
    id: string
    businessIdOfMp: string
    business: string
    name: string
    createdAt: string
    modifiedAt?: string
}
export type MeasuringResult = {
    unit: string,
    data: { time: number, value: number }[]
}

export default interface MeasuringPointService {
    get(id: string): Promise<MeasuringPointModel>
    getAllForBusiness(businessId: string):  Promise<MeasuringPointModel[]>
    getAll(): Promise<MeasuringPointModel[]>

    lastMeasuring(id: string, count: number): Promise<MeasuringResult>
    rangeMeasuring(id: string, from: number, to: number, timezone: string): Promise<MeasuringResult>
    aggregatedMeasuring(id: string, from: number, to: number, timezone: string, interval: string): Promise<MeasuringResult>
}