import { JsonPipe } from "@angular/common";
import { Component, input, InputSignal } from "@angular/core";
import { IpApi } from "../../home/ip-api.type";

@Component({
  selector: "app-ip",
  imports: [JsonPipe],
  template: `
    <p>This is your IP address and connection details.</p>
    <pre>{{ ipApi() | json }}</pre>
  `,
  styles: ``,
})
export class IpComponent {
  public ipApi: InputSignal<IpApi | undefined> = input<IpApi | undefined>();
}
