import { Routes } from "@angular/router";

export const USER_ROUTES: Routes = [
  {
    path: "login",
    loadComponent: () => import("./login/login.page"),
  },
  {
    path: "register",
    loadComponent: () => import("./register/register.page"),
  },
  {
    path: "reset-password",
    loadComponent: () => import("./reset-password.page"),
  },
  {
    path: ":userId",
    loadComponent: () => import("./user-id/user.page"),
  },
];
