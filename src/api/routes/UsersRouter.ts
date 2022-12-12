import HttpRouter from '@app/HttpRouter';
import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import UsersController from '../controller/UsersController';

export default class UsersRouter extends HttpRouter {
    constructor(private readonly controller: UsersController) {
        super()
    }
    router(): Router {
        return Router({ mergeParams: true })
            .get('/', this.guard.viewer(), asyncHandler(async (req, res) => this.controller.users(req, res)))
            .post('/invite-user', this.guard.manager(), asyncHandler(async (req, res) => this.controller.inviteUser(req, res)))
    }
}