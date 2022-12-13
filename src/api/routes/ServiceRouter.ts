import HttpRouter from "@app/HttpRouter";
import { Router } from "express";

import ServiceController from "../controllers/ServiceController";

export default class ServiceRouter extends HttpRouter {
  constructor(private readonly controller: ServiceController) {
    super();
  }
  router(): Router {
    return Router({ mergeParams: true });
    // .get('/', this.guard.viewer(), asyncHandler(async (req, res) => this.controller.users(req, res)))
    // .post('/invite-user', this.guard.manager(), asyncHandler(async (req, res) => this.controller.inviteUser(req, res)))
  }
}
