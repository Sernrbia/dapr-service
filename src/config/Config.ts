import BaseConfig from "./BasicConfig";

export interface HttpServerConfig {
    port: number
}
export interface ServicesConfig {
    business: string
    user: string
    measuringPoint: string
    laim: string
    laimKey: string
}

export interface ConfigData {
    env: string
    http: HttpServerConfig
    services: ServicesConfig
}

export default class Config extends BaseConfig {
    private readonly ENV_PREFIX = "BFF_WEB"

    public readonly config: ConfigData;
    constructor(env: any) {
        super();
        this.config = this.parseConfig(env)
    }
    protected parseConfig(env: any): ConfigData {
        return {
            env: this.convertToString(`NODE_ENV`, env[`NODE_ENV`]),
            http: {
                port: this.convertToNumber(`${this.ENV_PREFIX}_HTTP_PORT`, env[`${this.ENV_PREFIX}_HTTP_PORT`])
            },
            services: {
                business: this.convertToString(`${this.ENV_PREFIX}_BUSINESS_URL`, env[`${this.ENV_PREFIX}_BUSINESS_URL`]),
                user: this.convertToString(`${this.ENV_PREFIX}_USER_URL`, env[`${this.ENV_PREFIX}_USER_URL`]),
                measuringPoint: this.convertToString(`${this.ENV_PREFIX}_MEASURING_POINT_URL`, env[`${this.ENV_PREFIX}_MEASURING_POINT_URL`]),
                laim: this.convertToString(`${this.ENV_PREFIX}_LAIM_URL`, env[`${this.ENV_PREFIX}_LAIM_URL`]),
                laimKey: this.convertToString(`${this.ENV_PREFIX}_LAIM_KEY`, env[`${this.ENV_PREFIX}_LAIM_KEY`]),
            }
        }
    }
}