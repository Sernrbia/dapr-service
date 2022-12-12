import { Request, Response } from "express";
import MeasuringPointService, { MeasuringPointModel } from "@app/services/measuringPoint/MeasuringPointService";
export default class MeasuringPointController {

    constructor(
        private readonly measuringPointsService: MeasuringPointService
    ) { }

    async measuringPoint(req: Request, res: Response): Promise<void> {
        const { mpId } = req.params

        const measuringPoint = await this.measuringPointsService.get(mpId)

        res.json({
            id: measuringPoint.id,
            name: measuringPoint.name,
            siotId: measuringPoint.businessIdOfMp,
            consumptionStatus: "ON_TRACK",
            consumptionSpent: 3650,
            consumptionLimit: 6930,
            consumptionUnit: "kWh"
        })
    }
    async measuringPointsRange(req: Request, res: Response): Promise<void> {
        const { mpId } = req.params

        const from = parseInt(req.query.from as string)
        const to = parseInt(req.query.to as string)
        const timezone = req.query.timezone as string
        const interval = req.query.interval !== undefined ? req.query.interval as string : undefined

        const response = await (
            interval !== undefined ?
                this.measuringPointsService.aggregatedMeasuring(mpId, from, to, timezone, interval) :
                this.measuringPointsService.rangeMeasuring(mpId, from, to, timezone)
        )
        res.json(response)
    }
    async measuringPointsLast(req: Request, res: Response): Promise<void> {
        const { mpId } = req.params
        const count = parseInt(req.query.count as string)

        res.json(await this.measuringPointsService.lastMeasuring(mpId, count))
    }
} 