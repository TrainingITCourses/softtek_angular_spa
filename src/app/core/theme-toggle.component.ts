import { Component, computed, inject, Signal } from "@angular/core";
import { GlobalStore } from "../shared/global/global.store";

@Component({
  selector: "app-theme-toggle",
  template: `
    <span aria-label="Toggle theme" (click)="toggleTheme()">
      {{ icon() }}
    </span>
  `,
})
export class ThemeToggleComponent {
  private globalStore: GlobalStore = inject(GlobalStore);
  private theme: Signal<string> = this.globalStore.theme;

  protected icon: Signal<string> = computed(() =>
    this.theme() === "light" ? "🔳" : "🔲"
  );

  protected toggleTheme(): void {
    const newTheme = this.theme() === "light" ? "dark" : "light";
    this.globalStore.changeTheme(newTheme);
  }
}
