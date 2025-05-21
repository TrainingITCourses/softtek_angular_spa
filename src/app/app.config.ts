import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { environment } from "../environments/environment";
import { routes } from "./app.routes";
import { cacheInterceptor } from "./core/cache.interceptor";
import { provideAppName, withName } from "./shared/app-name.token";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppName(withName(environment.APP_NAME)),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([cacheInterceptor])),
  ],
};
