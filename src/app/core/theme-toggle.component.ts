import { Component, computed, effect, inject, Signal } from "@angular/core";
import { GlobalStore } from "../shared/global/global.store";

@Component({
  selector: "app-theme-toggle",
  imports: [],
  template: `
    <a aria-label="Toggle theme">
      <span (click)="toggleTheme()"> {{ icon() }} </span>
    </a>
  `,
  styles: ``,
})
export class ThemeToggleComponent {
  private readonly globalStore = inject(GlobalStore);
  private theme: Signal<string> = this.globalStore.theme;
  protected icon: Signal<string> = computed(() =>
    this.theme() === "light" ? "🔳" : "🔲"
  );
  private onThemeChange = effect(() => {
    // trigger
    const currentTheme = this.theme();
    // action
    document.documentElement.setAttribute("data-theme", currentTheme);
  });
  protected toggleTheme() {
    const newTheme = this.theme() === "light" ? "dark" : "light";
    this.globalStore.changeTheme(newTheme);
  }
}
