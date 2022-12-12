import HttpRouter from "@app/HttpRouter";
import { Router } from "express";
import asyncHandler from "express-async-handler"
import BusinessController from "../controller/BusinessController";

export default class BusinessRouter extends HttpRouter {
    constructor(private readonly controller: BusinessController) {
        super()
    }
    router(): Router {
        return Router({ mergeParams: true })
            .get('/', this.guard.viewer(), asyncHandler(async (req, res) => this.controller.business(req, res)))
            .get('/dashboard', this.guard.viewer(), asyncHandler(async (req, res) => this.controller.dashboard(req, res)))
            .post('/create-business', this.guard.manager(), asyncHandler(async (req, res) => this.controller.createBusiness(req, res)))
    }
}