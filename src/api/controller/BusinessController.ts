import BusinessService from "@app/services/business/BusinessService";
import MeasuringPointService, { MeasuringPointModel } from "@app/services/measuringPoint/MeasuringPointService";
import UserService from "@app/services/user/UserService";
import { Request, Response } from "express";
import { MissingParameterError } from "./controllerErrors";

export default class BusinessController {

    constructor(
        private readonly businessService: BusinessService,
        private readonly userService: UserService,
        private readonly mpService: MeasuringPointService
    ) { }

    async business(req: Request, res: Response): Promise<void> {
        const business = await this.businessService.getBusiness(req.params.businessId)
        res.json(business)
    }

    async createBusiness(req: Request, res: Response): Promise<void> {
        const rootBusiness = req.params.businessId
        const { name, ceoName, address, city, zip, accountNumber } = req.body

        if (name === undefined || name.length === 0)
            throw new MissingParameterError("name")

        const id = await this.businessService.createBusiness(rootBusiness, {
            name,
            ceoName,
            address,
            city,
            zip,
            accountNumber,
        })

        const user = await this.userService.get(req.body._userId)
        await this.userService.inviteUser(user.email, id, "admin")

        res.json({ id })
    }

    async dashboard(req: Request, res: Response): Promise<void> {
        const rootBusiness = req.params.businessId

        const [businesses, measuringPoints] = await Promise.all([
            this.businessService.getBusinessByParent(rootBusiness),
            this.mpService.getAll()
        ])

        const response = [{
            businessId: rootBusiness,
            business: "self",
            measuringPoints: this.pointsForBusiness(rootBusiness, measuringPoints)
        }].concat(businesses.map(({ id, name }) => ({
            businessId: id,
            business: name,
            measuringPoints: this.pointsForBusiness(id, measuringPoints)
        })))

        res.json(response)
    }

    private pointsForBusiness(business: string, measuringPoints: MeasuringPointModel[]) {
        return measuringPoints
            .filter(mp => mp.business === business)
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