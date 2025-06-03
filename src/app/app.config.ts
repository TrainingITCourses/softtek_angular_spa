import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { environment } from "../environments/environment";
import { routes } from "./app.routes";
import { authInterceptor } from "./core/auth.interceptor";
import { cacheInterceptor } from "./core/cache.interceptor";
import { logFakeInterceptor } from "./core/log-fake.interceptor";
import { usersFakeInterceptor } from "./core/users-fake.interceptor";
import { provideEnv, withData } from "./shared/env/env.token";
import { GlobalStore } from "./shared/global/global.store";
import { LogService } from "./shared/log/log.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideEnv(
      withData(
        environment.APP_NAME,
        environment.APP_VERSION,
        environment.APP_REPOSITORY,
        environment.APP_AUTHOR
      )
    ),
    provideAppInitializer(async () => {
      const globalStore = inject(GlobalStore);
      const logService = inject(LogService);
      logService.info(`App initialized at ${globalStore.ip()}`);
    }),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        cacheInterceptor,
        usersFakeInterceptor,
        logFakeInterceptor,
      ])
    ),
  ],
};
