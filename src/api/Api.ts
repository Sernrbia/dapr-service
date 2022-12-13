import { Router } from "express";
import HttpRouter from "../HttpRouter";
import { ErrorResponse } from "../HttpServer";
import ServiceError from "../service/ServiceError";
import { MissingParameterError } from "./controllers/controllerErrors";

export default class Api extends HttpRouter {
  constructor(private readonly serviceRouter: HttpRouter) {
    super();
  }

  router(): Router {
    return Router().use("/v1", this.serviceRouter.router());
  }

  handleError(error: Error): ErrorResponse {
    console.log(error.message);
    if (error instanceof ServiceError)
      return { message: error.errorMessage, errorCode: error.errorCode, status: error.status };
    if (error instanceof MissingParameterError)
      return { message: error.message, errorCode: "MISSING_PARAMETER", status: 400 };

    return {
      message: "Internal server error",
      errorCode: "SERVER_ERROR",
      status: 500
    };
  }
}
