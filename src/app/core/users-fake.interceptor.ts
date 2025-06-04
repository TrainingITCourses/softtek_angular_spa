import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { of } from "rxjs";

export const usersFakeInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes("users")) {
    return next(req);
  }
  if (req.method === "POST") {
    const body: any = req.body as any;
    return of(
      new HttpResponse({
        status: 201,
        body: {
          user: body.email,
          token: "a_fake_token" + new Date().getTime(),
        },
      })
    );
  }
  return of(
    new HttpResponse({
      status: 201,
      body: {
        id: "1",
        email: "test@test.com",
        name: "Test User",
      },
    })
  );
};
