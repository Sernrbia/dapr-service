import Api from "./api/Api";
import AvailableBusinessesRouterController from "./api/controller/AvailableBusinessesController";
import BusinessController from "./api/controller/BusinessController";
import MeasuringPointController from "./api/controller/MeasuringPointController";
import MeasuringPointsController from "./api/controller/MeasuringPointsController";
import SubBusinessesController from "./api/controller/SubBusinessesController";
import UsersController from "./api/controller/UsersController";
import AvailableBusinessesRouter from "./api/routes/AvailableBusinessesRouter";
import BusinessRouter from "./api/routes/BusinessRouter";
import MeasuringPointRouter from "./api/routes/MeasuringPointRouter";
import MeasuringPointsRouter from "./api/routes/MeasuringPointsRouter";
import SubBusinessRouter from "./api/routes/SubBusinessRouter";
import UsersRouter from "./api/routes/UsersRouter";
import Config, { ConfigData } from "./config/Config";
import BusinessService from "./services/business/BusinessService";
import FakeBusiness from "./services/business/FakeBusiness";
import RealBusiness from "./services/business/RealBusiness";
import DaprService from "./services/dapr/DaprService";
import FakeLaim from "./services/laim/FakeLaim";
import LaimService from "./services/laim/LaimService";
import RealLaim from "./services/laim/RealLaim";
import FakeMeasuringPoint from "./services/measuringPoint/FakeMeasuringPoint";
import MeasuringPointService from "./services/measuringPoint/MeasuringPointService";
import RealMeasuringPoint from "./services/measuringPoint/RealMeasuringPoint";
import FakeUser from "./services/user/FakeUser";
import RealUser from "./services/user/RealUser";
import UserService from "./services/user/UserService";

export interface Dependency {
  config: ConfigData;
  api: Api;
}

interface Services {
  userService: UserService;
  businessService: BusinessService;
  measuringPointService: MeasuringPointService;
  laim: LaimService;
}

export default class DependencyContainer {
  dependency(env: any): Dependency {
    const config = new Config(env).config;

    const { userService, businessService, measuringPointService } =
      config.env === "production" ? this.real(config) : this.fake(config);

    const controllers = {
      businesses: new AvailableBusinessesRouterController(userService, businessService),
      business: new BusinessController(businessService, userService, measuringPointService),
      usersController: new UsersController(userService),
      measuringPoints: new MeasuringPointsController(measuringPointService),
      measuringPoint: new MeasuringPointController(measuringPointService),
      subBusiness: new SubBusinessesController(businessService, measuringPointService)
    };

    return {
      config,
      api: new Api(
        new AvailableBusinessesRouter(controllers.businesses),
        new BusinessRouter(controllers.business),
        new UsersRouter(controllers.usersController),
        new MeasuringPointsRouter(
          controllers.measuringPoints,
          new MeasuringPointRouter(controllers.measuringPoint).router()
        ),
        new SubBusinessRouter(controllers.subBusiness, new MeasuringPointRouter(controllers.measuringPoint).router())
      )
    };
  }

  private fake(config: ConfigData): Services {
    console.log("FAKE services loaded.");
    return {
      userService: new FakeUser(),
      businessService: new FakeBusiness(),
      measuringPointService: new FakeMeasuringPoint(),
      laim: new FakeLaim()
    };
  }
  private real(config: ConfigData): Services {
    console.log("REAL services loaded.");
    return {
      userService: new RealUser(config.services),
      businessService: new RealBusiness(config.services),
      measuringPointService: new RealMeasuringPoint(config.services),
      laim: new RealLaim(config.services)
    };
  }
}
