import { ConfigData } from "@config/types";
import express from "express";
import cors from "cors";
import helmet from "helmet";

export type ErrorResponse = {
  message: string;
  errorCode: string;
  status: number;
};

export default abstract class HttpServer {
  private port: number;

  constructor({ server }: ConfigData) {
    const { port } = server;
    this.port = port;
  }

  start() {
    const app = express()
      .set("trust proxy", true)
      .use(cors({ credentials: true, origin: true }))
      .use(helmet())
      .use(express.json())
      .use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));

    app.listen(this.port, () => console.log(`Listening on port ${this.port}...`));
  }

  protected abstract router(app: express.Application): void;
}
