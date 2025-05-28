import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { GlobalStore } from "../shared/global/global.store";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(GlobalStore).token;
  const authReq = req.clone({
    headers: req.headers.set("Authorization", `Bearer ${token()}`),
  });
  return next(authReq);
};
