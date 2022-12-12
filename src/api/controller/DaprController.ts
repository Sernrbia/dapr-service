import DaprService from "@app/services/user/UserService";
import { Request, Response } from "express";
import { MissingParameterError } from "./controllerErrors";

export default class DaprController {
  constructor(private readonly userService: DaprService) {}

  // implement methods
}
