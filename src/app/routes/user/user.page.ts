import { Component, input } from "@angular/core";

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
}
