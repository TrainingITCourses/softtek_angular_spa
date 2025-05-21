import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from "@angular/core";

export const APP_NAME = new InjectionToken<string>("APP_NAME");

export function provideAppName(
  envProviders: EnvironmentProviders
): EnvironmentProviders {
  return makeEnvironmentProviders([envProviders]);
}

export function withName(appName: string) {
  return makeEnvironmentProviders([
    {
      provide: APP_NAME,
      useValue: appName,
    },
  ]);
}
