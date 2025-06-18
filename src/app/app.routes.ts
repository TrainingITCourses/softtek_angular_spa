import { loadRemoteModule } from "@angular-architects/native-federation";
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./routes/home/home.page"),
  },
  {
    path: "user",
    loadChildren: () => import("./routes/user/user.routes").then((m) => m.USER_ROUTES),
  },
  {
    path: "assets/buy",
    loadComponent: () => import("./routes/assets/buy/buy-asset.page"),
  },
  {
    path: "stocks",
    loadComponent: () =>
      loadRemoteModule({
        remoteEntry: "http://localhost:4201/remoteEntry.json",
        remoteName: "angular-app",
        exposedModule: "./StocksPage",
      }),
  },
];
