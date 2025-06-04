import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { GlobalStore } from "../shared/global/global.store";
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(GlobalStore).token();
  if (token) {
    req = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });
  }
  return next(req);
};
