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
  private port: string;

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

    this.router(app);

    // app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //   const { errorCode, message, status } = this.handleError(err);
    //   res.status(status).json({ message, errorCode });
    // });

    app.get("/dapr/subscribe", (_req, res) => {
      console.log("GET");
      res.json([
        {
          pubsubname: "pubsub",
          topic: "checkout",
          routes: {
            rules: [
              {
                match: 'event.type == "order"',
                path: "/orders"
              }
            ],
            default: "/products"
          }
        }
      ]);
    });

    app.post("/orders", (req, res) => {
      console.log(req.body);
      res.sendStatus(200);
    });

    app.listen(this.port, () => console.log(`Listening on port ${this.port}...`));
  }

  protected abstract router(app: express.Application): void;
  // protected abstract handleError(err: Error): ErrorResponse;
}
