import HttpRouter from "@app/HttpRouter"
import { Router } from "express";

export default class PingRouter extends HttpRouter {
    router(): Router {
        return Router()
            .get("/", (req, res) => res.json({ message: "OK" }))
    }
}