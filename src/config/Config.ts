import BaseConfig from "./BasicConfig";
import { ConfigData } from "./types";

export default class Config extends BaseConfig {
  private readonly ENV_PREFIX = "APP_";

  public readonly config: ConfigData;
  constructor(env: any) {
    super();
    this.config = this.parseConfig(env);
  }
  protected parseConfig(env: any): ConfigData {
    return {
      env: this.convertToString(`NODE_ENV`, env[`NODE_ENV`]),
      server: {
        port: this.convertToString(`${this.ENV_PREFIX}SERVICE_HTTP_PORT`, env[`${this.ENV_PREFIX}SERVICE_HTTP_PORT`])
      },
      dapr: {
        host: this.convertToString(`${this.ENV_PREFIX}DAPR_HTTP_HOST`, env[`${this.ENV_PREFIX}DAPR_HTTP_HOST`]),
        port: this.convertToString(`${this.ENV_PREFIX}DAPR_HTTP_PORT`, env[`${this.ENV_PREFIX}DAPR_HTTP_PORT`])
      }
    };
  }
}
