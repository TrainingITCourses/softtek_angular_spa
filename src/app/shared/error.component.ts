import { Component, signal, Signal } from "@angular/core";

@Component({
  selector: "app-error",
  template: `<input disabled aria-invalid="true" [value]="message()" />`,
})
export class ErrorComponent {
  public message: Signal<string> = signal("💣 Error ...");
}
