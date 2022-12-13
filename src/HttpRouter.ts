import { Router } from "express";

export default abstract class HttpRouter {
  abstract router(): Router;
}
