import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./routes/home/home.page"),
  },
  {
    path: "user",
    loadComponent: () => import("./routes/user/user.page"),
  },
  {
    path: "user/register",
    loadComponent: () => import("./routes/user/register.page"),
  },
];
