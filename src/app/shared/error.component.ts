import { Component, input, InputSignal } from "@angular/core";

@Component({
  selector: "app-error",
  template: `<input
    disabled
    aria-invalid="true"
    [value]="'💣 Error ...' + message()"
  />`,
})
export class ErrorComponent {
  public message: InputSignal<string> = input("");
}
