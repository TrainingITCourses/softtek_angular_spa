import { Component, inject, Signal, signal } from "@angular/core";
import { ErrorComponent } from "../../shared/error.component";
import { LogService } from "../../shared/log/log.service";
import { PageComponent } from "../../shared/page.component";
import { WaitingComponent } from "../../shared/waiting.component";
import { HomeComponent } from "./home.component";
import { HomeStoreService } from "./home.store.service";
import { IpApi } from "./ip-api.type";

@Component({
  imports: [PageComponent, HomeComponent, WaitingComponent, ErrorComponent],
  template: `
    <app-page [title]="title()">
      @if(ipApiStatus()==='Loading'){
      <app-waiting />
      } @if(ipApiStatus()==='Error'){
      <app-error />
      } @defer(when ipApiStatus()==='Resolved'){
      <app-home [ipApi]="ipApi()" (cookiesAccepted)="onAcceptCookies($event)" />
      }
    </app-page>
  `,
})
export default class HomePage {
  private readonly log = inject(LogService);
  private readonly homeStore = inject(HomeStoreService);

  protected title: Signal<string> = signal("Home Page Title");
  protected ipApi: Signal<IpApi | undefined> = this.homeStore.ipApi;
  protected ipApiStatus: Signal<string> = this.homeStore.ipApiStatus;

  onAcceptCookies(accepted: boolean): void {
    this.log.info("Cookies accepted " + accepted);
  }
}
