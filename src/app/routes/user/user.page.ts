import { Component, effect, inject, input } from "@angular/core";
import { LogService } from "../../shared/log/log.service";

@Component({
  selector: "app-user",
  imports: [],
  template: `
    <p>user works!</p>
    {{ userId() }}
  `,
  styles: ``,
})
export default class UserPage {
  public userId = input.required();
  private log = inject(LogService);

  constructor() {
    this.log.warn("HELLO");
  }

  private userIdEffect = effect(() => {
    this.log.warn(`Logged user: ${this.userId()}`);
  });
}
