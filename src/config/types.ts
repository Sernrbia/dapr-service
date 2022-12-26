export interface ServiceConfig {
  port: string;
}

export interface DaprConfig extends ServiceConfig {
  host: string;
}

export type ConfigData = {
  env: string;
  server: ServiceConfig;
  dapr: DaprConfig;
};
