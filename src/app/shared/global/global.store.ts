import {
  computed,
  effect,
  EffectRef,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";
import { CacheService } from "../cache.service";
import { defaultGlobalState, GlobalState } from "./global.type";

@Injectable({
  providedIn: "root",
})
export class GlobalStore {
  private cache: CacheService = inject(CacheService);

  private readonly state: WritableSignal<GlobalState> = signal<GlobalState>(
    this.getInitialState()
  );

  private getInitialState(): GlobalState {
    const cachedState = this.cache.get<GlobalState>("global");
    return cachedState || defaultGlobalState;
  }

  public readonly theme: Signal<string> = computed(() => this.state().theme);

  public readonly ip: Signal<string> = computed(
    () => this.state().ip || "127.0.0.1"
  );

  public readonly user: Signal<string | undefined> = computed(
    () => this.state().user
  );

  public readonly token: Signal<string | undefined> = computed(
    () => this.state().token
  );

  public changeTheme(theme: string): void {
    this.state.update((state) => ({ ...state, theme }));
  }

  public changeUser(user: string | undefined): void {
    this.state.update((state) => ({ ...state, user }));
  }

  public changeToken(token: string | undefined): void {
    this.state.update((state) => ({ ...state, token }));
  }

  public changeIp(ip: string): void {
    this.state.update((state) => ({ ...state, ip }));
  }

  private onAnyChangeEffect: EffectRef = effect(() => {
    const state = this.state();
    this.cache.set("global", state);
  });

  private onThemeChange: EffectRef = effect(() => {
    const theme = this.theme();
    document.documentElement.setAttribute("data-theme", theme);
  });
}
