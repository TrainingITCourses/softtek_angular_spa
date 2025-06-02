import { Routes } from "@angular/router";

export const UserRoutes: Routes = [
  {
    path: "register",
    loadComponent: () => import("./register/register.page"),
  },
  {
    path: ":userId",
    loadComponent: () => import("./user/user.page"),
  },
];
