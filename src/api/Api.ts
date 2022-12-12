import HttpRouter from '@app/HttpRouter';
import { ErrorResponse } from '@app/HttpServer';
import ServiceError from '@app/services/ServiceError';
import { Router } from 'express';
import jwtDecode from 'jwt-decode';
import { MissingParameterError } from './controller/controllerErrors';

export default class Api extends HttpRouter {

    constructor(
        private readonly businessesRouter: HttpRouter,
        private readonly businessRouter: HttpRouter,
        private readonly usersRouter: HttpRouter,
        private readonly measuringPointsRouter: HttpRouter,
        private readonly subBusinessRouter: HttpRouter
    ) {
        super()
    }

    router(): Router {
        return Router()
            .use((req, res, next) => {
                if (req.headers.authorization) {
                    const decoded: any = jwtDecode(req.headers.authorization.split(" ")[1]);
                    req.body._userId = decoded.sub
                }
                next()
            })
            .use('/available-businesses', this.businessesRouter.router())

            .use('/businesses/:businessId', this.businessRouter.router())
            .use('/businesses/:businessId/users', this.usersRouter.router())
            .use('/businesses/:businessId/measuring-points', this.measuringPointsRouter.router())

            .use('/businesses/:businessId/sub-businesses', this.subBusinessRouter.router())
    }

    handleError(error: Error): ErrorResponse {
        console.log(error.message)
        if (error instanceof ServiceError)
            return { message: error.errorMessage, errorCode: error.errorCode, status: error.status }
        if (error instanceof MissingParameterError)
            return { message: error.message, errorCode: "MISSING_PARAMETER", status: 400 }

        return {
            message: "Internal server error",
            errorCode: "SERVER_ERROR",
            status: 500
        }
    }
}