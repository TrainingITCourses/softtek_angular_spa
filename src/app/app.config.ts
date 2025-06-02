import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { environment } from "../environments/environment";
import { routes } from "./app.routes";
import { authInterceptor } from "./core/auth.interceptor";
import { cacheInterceptor } from "./core/cache.interceptor";
import { registerFakeInterceptor } from "./core/register-fake.interceptor";
import { provideAppName, withName } from "./shared/app-name.token";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppName(withName(environment.APP_NAME)),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        cacheInterceptor,
        registerFakeInterceptor,
      ])
    ),
  ],
};
