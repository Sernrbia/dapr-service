import BusinessGuard from '@businessGuard/BusinessGuard';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import keycloak from 'keycloak-connect';
import morgan from 'morgan';
import { ConfigData } from './config/Config';
import { Dependency } from './DependencyContainer_old';

export type ErrorResponse = {
    message: string;
    errorCode: string;
    status: number;
}

export default abstract class HttpServer {

    private readonly port
    private readonly skippedRoutes = ["", "/ping", "/ping/protected"]
    private readonly memoryStore
    protected readonly keycloak
    protected readonly guard

    constructor(config: ConfigData) {
        const { port } = config.http
        this.port = port
        this.memoryStore = new session.MemoryStore();
        keycloak.prototype.accessDenied = (request: any, response: any) => {
            response.status(401)
            response.end('Unauthorized')
        }
        this.keycloak = new keycloak({ store: this.memoryStore }, "keycloak.json")
        this.guard = new BusinessGuard()
    }

    start() {
        const app = express()
            .set('trust proxy', true)
            .use(cors({ credentials: true, origin: true }))
            .use(helmet())
            .use(session({
                secret: 'some secret',
                resave: false,
                saveUninitialized: true,
                store: this.memoryStore
            }))
            .use(express.json())
            .use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }))
            .use(this.keycloak.middleware())
            .use(morgan((tokens, req, res) => {
                return [
                    `[${req.headers['user-agent'] ? req.headers['user-agent'] : "unknown"}]`,
                    tokens.method(req, res),
                    tokens.url(req, res),
                    tokens.status(req, res),
                    tokens.res(req, res, 'content-length'), '-',
                    tokens['response-time'](req, res), 'ms',
                ].join(' ')
            }, {
                skip: (req, res) => {
                    if (this.skippedRoutes.find(route => route === req.url)) return true;
                    return false;
                }
            }))

        this.router(app);

        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            const { errorCode, message, status } = this.handleError(err)
            res.status(status).json({ message, errorCode });
        })
        app.listen(this.port, () => console.log(`Listening on port ${this.port}...`))
    }

    protected abstract router(app: express.Application): void;
    protected abstract handleError(err: Error): ErrorResponse
}
