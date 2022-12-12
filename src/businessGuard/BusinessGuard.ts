import { Request, Response, NextFunction, RequestHandler } from "express";
import Requester, { BusinessRole, Privilege } from "./Requester";
import decode from "jwt-decode";


export default class BusinessGuard {
    manager(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            this.hasPrivilege(req, res, next, "support")
        }
    }
    viewer(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            this.hasPrivilege(req, res, next, "viewer")
        }
    }

    private hasPrivilege(req: Request, res: Response, next: NextFunction, lowestPossibleRole: string) {
        try {
            const business = this.business(req)
            const requester = this.requester(req)

            if (!requester.hasAccess(new Privilege(business, new BusinessRole(lowestPossibleRole))))
                throw new Error("You do not have the privilege to execute this request")

            next()
        } catch (error) {
            let message = "You do not have the privilege to execute this request"
            if (error instanceof Error)
                message = error.message
            res.status(403).json({ message })
        }
    }
    private business(req: Request): string {
        const url = req.originalUrl
        if (url.match(new RegExp("/businesses/(.+)", "g")) === null) throw new Error("Business in url is missing")
        const parts = url.split("/businesses/")[1]
        return parts.split("/")[0];
    }
    private requester(req: Request): Requester {
        const toRole = (group: string | undefined) => {
            if (group === "admins") return "admin"
            if (group === "supports") return "support"
            if (group === "viewers") return "viewer"
            return ""
        }
        if (req.headers.authorization === undefined) throw new Error("Authorization header is missing")
        const token = decode<any>(req.headers.authorization.split(" ")[1])
        if(token.groups === undefined) throw new Error("Provided token does not have any groups")
        const policies = (token.groups as string[]).map(g => {
            const parts = g.split("/")
            return new Privilege(parts[1], new BusinessRole(toRole(parts[2])))
        })
        return new Requester(policies);
    }
}