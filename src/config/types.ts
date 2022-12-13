export interface ServiceConfig {
  port: number;
}

export interface DaprConfig extends ServiceConfig {
  host: string;
}

export type ConfigData = {
  env: string;
  server: ServiceConfig;
  dapr: DaprConfig;
};

export function getData<T>(value: T, missing: T): T {
  return value ?? missing;
}
