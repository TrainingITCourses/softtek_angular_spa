import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { filter, tap, throwError } from "rxjs";
import { CacheService } from "../shared/cache.service";

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== "GET") {
    return next(req);
  }

  const cache = inject(CacheService);
  const cachedResponse = cache.get<HttpResponse<unknown>>(req.url);
  if (cachedResponse) {
    return throwError(() => new Error("Fake error"));
    //return of(cachedResponse).pipe(delay(5000));
  }

  return next(req).pipe(
    filter((event: HttpEvent<unknown>) => event instanceof HttpResponse),
    tap((event: HttpResponse<unknown>) => cache.set(req.url, event))
  );
};
