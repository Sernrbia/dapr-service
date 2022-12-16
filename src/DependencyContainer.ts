import Api from "./api/Api";
import ServiceController from "./api/controllers/ServiceController";
import ServiceRouter from "./api/routes/ServiceRouter";
import Config from "./config/Config";
import { ConfigData } from "./config/types";
import Service from "./service/Service";
import ServiceInstance from "./service/ServiceInstance";

export interface Dependency {
  config: ConfigData;
  api: Api;
}

interface Services {
  service: Service;
}

export default class DependencyContainer {
  dependency(env: any): Dependency {
    const config = new Config(env).config;

    const { service } = this.load(config);

    const controllers = {
      service: new ServiceController(service)
    };

    return {
      config,
      api: new Api(new ServiceRouter(controllers.service))
    };
  }

  private load(config: ConfigData): Services {
    console.log("service loaded.");
    return {
      service: new ServiceInstance(config.dapr)
    };
  }
}
