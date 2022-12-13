import { Application } from "express";

import Api from "./api/Api";
import PingRouter from "./api/PingRouter";
import { ConfigData } from "./config/types";
import HttpServer, { ErrorResponse } from "./HttpServer";

export default class HttpApi extends HttpServer {
  private readonly pingRouter;

  constructor(config: ConfigData, private readonly api: Api) {
    super(config);
    this.pingRouter = new PingRouter().router();
  }

  protected router(app: Application): void {
    app.use("/ping", this.pingRouter);
    app.use("/", this.api.router());
  }
  protected handleError(error: Error): ErrorResponse {
    return this.api.handleError(error);
  }
}
