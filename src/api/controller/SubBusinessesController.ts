import BusinessService from '@app/services/business/BusinessService';
import MeasuringPointService, { MeasuringPointModel } from '@app/services/measuringPoint/MeasuringPointService';
import { Request, Response } from 'express';

export default class SubBusinessesController {

    constructor(private readonly businessService: BusinessService, private readonly mpService: MeasuringPointService) { }

    async info(req: Request, res: Response): Promise<void> {
        const { subBusinessId } = req.params
        res.json(await this.businessService.getBusiness(subBusinessId))
    }
    async measuringPoints(req: Request, res: Response): Promise<void> {
        const { subBusinessId } = req.params
        res.json(this.map(await this.mpService.getAllForBusiness(subBusinessId)))
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