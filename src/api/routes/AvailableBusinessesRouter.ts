import HttpRouter from "@app/HttpRouter";
import { Router } from "express";
import asyncHandler from "express-async-handler"
import AvailableBusinessesRouterController from "../controller/AvailableBusinessesController";

export default class AvailableBusinessesRouter extends HttpRouter {
    constructor(private readonly controller: AvailableBusinessesRouterController) {
        super()
    }
    router(): Router {
        return Router()
            .get('/', asyncHandler(async (req, res) => this.controller.businesses(req, res)))
    }
}