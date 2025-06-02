import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from "@angular/core";
import { Router } from "@angular/router";
import { UserTokenDto } from "../../routes/user/user-token.dto.type";
import { CacheService } from "../cache.service";
import { GlobalState } from "./global.type";

@Injectable({
  providedIn: "root",
})
export class GlobalStore {
  private readonly cache = inject(CacheService);
  private router = inject(Router);

  private getInitialState = (): GlobalState => {
    const cachedState = this.cache.get<GlobalState>("globalState");
    if (cachedState) {
      return cachedState;
    }
    return {
      theme: "dark",
      user: undefined,
      ip: undefined,
      token: undefined,
    };
  };

  private state: WritableSignal<GlobalState> = signal<GlobalState>(
    this.getInitialState()
  );

  private onGlobalStateChange = effect(() => {
    // trigger
    const currentState = this.state();
    // action
    this.cache.set("globalState", currentState);
  });

  // private onUserEffect = effect(() => {
  //   const user = this.user();
  //   if (user) this.router.navigate(["user", user]);
  //   else this.router.navigate(["user", "register"]);
  // });

  public theme = computed(() => this.state().theme);

  public token = computed(() => this.state().token);

  public user = computed(() => this.state().user);

  public changeTheme(theme: string) {
    this.state.update((state: GlobalState): GlobalState => {
      const clonedState = { ...state };
      clonedState.theme = theme;
      return clonedState;
    });
  }
  public changeIp(ip: string) {
    this.state.update((state: GlobalState): GlobalState => {
      const clonedState = { ...state };
      clonedState.ip = ip;
      return clonedState;
    });
  }

  public changeUserToken(userToken: UserTokenDto) {
    this.state.update((state: GlobalState): GlobalState => {
      const clonedState = { ...state };
      clonedState.user = userToken.user;
      clonedState.token = userToken.token;
      return clonedState;
    });
  }
}
