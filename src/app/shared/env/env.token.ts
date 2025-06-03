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
  repository: string,
  author: {
    name: string;
    email: string;
    url: string;
  }
): EnvironmentProviders {
  const envValue: Env = {
    name,
    version,
    repository,
    author,
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
