import { Component, inject, Signal, signal } from "@angular/core";
import { LogService } from "../../shared/log/log.service";
import { PageComponent } from "../../shared/page.component";
import { HomeComponent } from "./home.component";
import { HomeStoreService } from "./home.store.service";
import { IpApi } from "./ip-api.type";

@Component({
  imports: [PageComponent, HomeComponent],
  template: `
    <app-page [title]="title()">
      <app-home
        [ipApi]="ipApi()"
        [ipApiStatus]="ipApiStatus()"
        (cookiesAccepted)="onAcceptCookies($event)"
      />
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
