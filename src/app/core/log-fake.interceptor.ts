import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { of } from "rxjs";

export const logFakeInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== "POST" || !req.url.includes("logs")) {
    return next(req);
  }
  return of(
    new HttpResponse({
      status: 201,
      body: { message: "Log entry received" },
    })
  );
};
