import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from "@angular/core";
import { defaultEnv, Env } from "./env.type";

export const ENV = new InjectionToken<Env>("ENV");

export function provideEnv(
  envProvider: EnvironmentProviders = defaultEnvProvider
): EnvironmentProviders {
  return makeEnvironmentProviders([envProvider]);
}

export function withData(
  name: string,
  version: string,
  environment: "development" | "production"
): EnvironmentProviders {
  const envValue: Env = {
    name,
    version,
    environment,
  };
  return makeEnvironmentProviders([
    {
      provide: ENV,
      useValue: envValue,
    },
  ]);
}

const defaultEnvProvider = makeEnvironmentProviders([
  {
    provide: ENV,
    useValue: defaultEnv,
  },
]);
