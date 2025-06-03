import { Component, Signal, signal } from "@angular/core";

@Component({
  selector: "app-waiting",
  template: `<fieldset role="group">
    <input disabled [value]="message()" />
    <button disabled aria-busy="true" class="outline">.</button>
  </fieldset>`,
})
export class WaitingComponent {
  public message: Signal<string> = signal("⏳ loading ...");
}
