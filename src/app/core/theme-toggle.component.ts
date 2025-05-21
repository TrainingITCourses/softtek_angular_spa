import {
  Component,
  computed,
  effect,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";

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
  private theme: WritableSignal<string> = signal("dark");
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
    this.theme.update((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }
}
