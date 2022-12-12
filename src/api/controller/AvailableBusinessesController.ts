import BusinessService from "@app/services/business/BusinessService";
import UserService from "@app/services/user/UserService";
import { Request, Response } from "express";

export default class AvailableBusinessesController {

    constructor(private readonly users: UserService, private readonly business: BusinessService) { }

    async businesses(req: Request, res: Response): Promise<void> {
        const [user, businesses] = await Promise.all([
            this.users.get(req.body._userId),
            this.business.getAll()
        ])

        const response: { id: string, name: string, role: string }[] = []

        user.businesses.forEach(({ id, role }) => {
            const business = businesses.find(business => business.id === id)
            if (business === undefined) return

            response.push({
                id,
                name: business.name,
                role
            })
        })

        res.json(response)
    }
} 