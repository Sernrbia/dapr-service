import { Router } from "express";
import HttpRouter from "../HttpRouter";

export default class PingRouter extends HttpRouter {
  router(): Router {
    return Router().get("/", (_req, res) => res.json({ message: "OK" }));
  }
}
