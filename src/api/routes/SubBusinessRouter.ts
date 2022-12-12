import HttpRouter from "@app/HttpRouter";
import { Router } from "express";
import asyncHandler from "express-async-handler"
import SubBusinessesController from "../controller/SubBusinessesController";

export default class SubBusinessRouter extends HttpRouter {
    constructor(
        private readonly controller: SubBusinessesController,
        private readonly mpRouter: Router
    ) {
        super()
    }
    router(): Router {
        return Router({ mergeParams: true })
            .get('/:subBusinessId', this.guard.viewer(), asyncHandler(async (req, res) => this.controller.info(req, res)))
            .get('/:subBusinessId/measuring-points', this.guard.viewer(), asyncHandler(async (req, res) => this.controller.measuringPoints(req, res)))
            .use('/:subBusinessId/measuring-points', this.mpRouter)
    }
}