import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { delay, of } from "rxjs";
import portfolio from "../shared/models/portfolio.json";
export const portfolioFakeInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes("portfolio")) {
    return next(req);
  }
  if (req.method !== "GET") {
    return next(req);
  }
  return of(
    new HttpResponse({
      body: portfolio,
    })
  ).pipe(delay(1000));
};
