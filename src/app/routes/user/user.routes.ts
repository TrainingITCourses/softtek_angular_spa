import { Routes } from "@angular/router";

export const UserRoutes: Routes = [
  {
    path: "",
    loadComponent: () => import("./user.page"),
  },
  {
    path: "register",
    loadComponent: () => import("./register.page"),
  },
];
