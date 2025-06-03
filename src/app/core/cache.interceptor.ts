import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { of } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { CacheService } from "../shared/cache.service";
import { LogService } from "../shared/log/log.service";

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== "GET") {
    return next(req);
  }
  if (!req.url.includes("http://ip-api.com/json")) {
    return next(req);
  }

  const cache: CacheService = inject(CacheService);
  const log: LogService = inject(LogService);

  const cachedResponse: HttpResponse<unknown> | undefined = cache.get(
    req.url
  ) as HttpResponse<unknown>;

  if (cachedResponse) {
    return of(cachedResponse as HttpResponse<unknown>);
  }

  return next(req).pipe(
    filter((event: HttpEvent<unknown>) => event instanceof HttpResponse),
    tap((event: HttpResponse<unknown>) => {
      cache.set(req.url, event);
    })
  );
};
