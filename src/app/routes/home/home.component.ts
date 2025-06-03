import { JsonPipe } from "@angular/common";
import { Component, input, InputSignal } from "@angular/core";
import { IpApi } from "./ip-api.type";

@Component({
  selector: "app-home",
  imports: [JsonPipe],
  template: `
    <p>This is the home page data.</p>
    <pre>{{ ipApi() | json }}</pre>
  `,
  styles: ``,
})
export class HomeComponent {
  public ipApi: InputSignal<IpApi | undefined> = input<IpApi | undefined>();
}
