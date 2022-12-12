import HttpRouter from '@app/HttpRouter';
import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import MeasuringPointController from '../controller/MeasuringPointController';

export default class MeasuringPointRouter extends HttpRouter {
    constructor(private readonly controller: MeasuringPointController) {
        super()
    }
    router(): Router {
        return Router()
            .get('/:mpId', asyncHandler(async (req, res) => this.controller.measuringPoint(req, res)))
            .get('/:mpId/last', asyncHandler(async (req, res) => this.controller.measuringPointsLast(req, res)))
            .get('/:mpId/range', asyncHandler(async (req, res) => this.controller.measuringPointsRange(req, res)))
    }
}