import DependencyContainer from "./DependencyContainer";
import HttpApi from "./HttpApi";

const { config, api } = new DependencyContainer().dependency(process.env)

const server = new HttpApi(config, api)
server.start()
