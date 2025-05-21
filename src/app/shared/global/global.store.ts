import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from "@angular/core";
import { CacheService } from "../cache.service";
import { GlobalState } from "./global.type";

@Injectable({
  providedIn: "root",
})
export class GlobalStore {
  private readonly cache = inject(CacheService);

  private getInitialState = (): GlobalState => {
    const cachedState = this.cache.get<GlobalState>("globalState");
    if (cachedState) {
      return cachedState;
    }
    return {
      theme: "dark",
      user: undefined,
      ip: undefined,
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

  public theme = computed(() => this.state().theme);

  public changeTheme(theme: string) {
    this.state.update((state: GlobalState): GlobalState => {
      const clonedState = { ...state };
      clonedState.theme = theme;
      return clonedState;
    });
  }
}
