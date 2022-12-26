import { DaprConfig } from "@app/config/types";
import { DaprClient, HttpMethod } from "@dapr/dapr";
import Client from "./Client";

export default class ClientInstance implements Client {
  private client: DaprClient;

  constructor({ host, port }: DaprConfig) {
    this.client = new DaprClient(host, port);
  }

  async mockGet() {
    try {
      await this.client.invoker.invoke("serviceAppId", "serviceMethod", HttpMethod.GET);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async mockPost() {
    try {
      await this.client.invoker.invoke("serviceAppId", "serviceMethod", HttpMethod.POST, { hello: "world" });
    } catch (err: any) {
      console.log(err.message);
    }
  }
}
