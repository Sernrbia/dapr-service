import HttpRouter from '@app/HttpRouter';
import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import MeasuringPointsController from '../controller/MeasuringPointsController';
import MeasuringPointRouter from './MeasuringPointRouter';

export default class MeasuringPointsRouter extends HttpRouter {
    constructor(
        private readonly controller: MeasuringPointsController,
        private readonly mpRouter: Router
    ) {
        super()
    }
    router(): Router {
        return Router({ mergeParams: true })
            .get('/', this.guard.viewer(), asyncHandler(async (req, res) => this.controller.measuringPoints(req, res)))
            .use('/', this.guard.viewer(), this.mpRouter)

    }
}