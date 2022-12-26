import { DaprConfig, ServiceConfig } from "@app/config/types";
import axios, { Axios } from "axios";
import Service from "./Service";

export class RealUserError extends Error {
  constructor(message: string) {
    super(`[RealUser] Error - ${message}`);
  }
}

export default class ServiceInstance implements Service {
  private readonly axios: Axios;

  constructor(config: DaprConfig) {
    const { host, port } = config;
    this.axios = axios.create({
      baseURL: `${host}:${port}`
    });
  }

  //   async get(id: string): Promise<UserModel> {
  //     try {
  //       const response = await this.axios.get<UserModel>(`/users/${id}`);
  //       return response.data;
  //     } catch (error) {
  //       throw new ServiceError(`${this.constructor.name}.get`, error);
  //     }
  //   }
  //   async getBusinessUsers(business: string): Promise<UserModel[]> {
  //     try {
  //       const response = await this.axios.get<UserModel[]>(`/users?business=${business}`);
  //       return response.data;
  //     } catch (error) {
  //       throw new ServiceError(`${this.constructor.name}.getBusinessUsers`, error);
  //     }
  //   }

  //   async inviteUser(email: string, business: string, role: string): Promise<void> {
  //     try {
  //       await this.axios.post(`/invitations/invite-user`, {
  //         email,
  //         businessId: business,
  //         role
  //       });
  //     } catch (error) {
  //       throw new ServiceError(`${this.constructor.name}.inviteUser`, error);
  //     }
  //   }
}
