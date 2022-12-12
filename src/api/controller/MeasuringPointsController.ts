import MeasuringPointService, { MeasuringPointModel } from '@app/services/measuringPoint/MeasuringPointService';
import { Request, Response } from 'express';

export default class MeasuringPointsController {

    constructor(
        private readonly measuringPointsService: MeasuringPointService
    ) { }

    async measuringPoints(req: Request, res: Response): Promise<void> {
        const rootBusiness = req.params.businessId
        res.json(this.map(await this.measuringPointsService.getAllForBusiness(rootBusiness)))
    }

    private map(measuringPoints: MeasuringPointModel[]) {
        return measuringPoints
            .map(mp => ({
                id: mp.id,
                name: mp.name,
                siotId: mp.businessIdOfMp,
                consumptionStatus: "ON_TRACK",
                consumptionSpent: 3650,
                consumptionLimit: 6930,
                consumptionUnit: "kWh"
            }))
    }
} 