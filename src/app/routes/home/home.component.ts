import { JsonPipe } from "@angular/common";
import {
  Component,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from "@angular/core";
import { LogService } from "../../shared/log/log.service";
import { IpApi } from "./ip-api.type";

@Component({
  selector: "app-home",
  imports: [JsonPipe],
  template: `
    <p>This is the home page data.</p>
    <pre>
      {{ ipApi() | json }}
    </pre
    >
    <button (click)="onCookiesClick()">Accept Cookies</button>
  `,
  styles: ``,
})
export class HomeComponent {
  private readonly log = inject(LogService);
  public ipApi: InputSignal<IpApi | undefined> = input<IpApi | undefined>();
  public cookiesAccepted: OutputEmitterRef<boolean> = output<boolean>();

  onCookiesClick(): void {
    this.log.info("Cookies clicked");
    this.cookiesAccepted.emit(true);
  }
}
