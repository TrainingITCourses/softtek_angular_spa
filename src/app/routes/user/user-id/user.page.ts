import { JsonPipe } from "@angular/common";
import {
  Component,
  inject,
  input,
  ResourceStatus,
  Signal,
} from "@angular/core";
import { Router } from "@angular/router";
import { ErrorComponent } from "../../../shared/error.component";
import { PageComponent } from "../../../shared/page.component";
import { WaitingComponent } from "../../../shared/waiting.component";
import { IpApi } from "../../home/ip-api.type";
import { IpComponent } from "./ip.component";
import { UserStore } from "./user.store";

@Component({
  imports: [
    PageComponent,
    JsonPipe,
    WaitingComponent,
    ErrorComponent,
    IpComponent,
  ],
  template: `
    <app-page title="User">
      <h1>User: {{ userId() }}</h1>
      @if (user()) {
        <h2>User: {{ user() | json }}</h2>
      } @else {
        <h2>User not found</h2>
      }
      <button (click)="logout()">Log out</button>
      @if (ipApiStatus() === "loading") {
        <app-waiting />
      }
      @if (ipApiStatus() === "error") {
        <app-error />
      }
      @defer (when ipApiStatus() === "resolved") {
        <app-ip [ipApi]="ipApi()" />
      }
    </app-page>
  `,
})
export default class UserPage {
  public userId = input<string>();
  private userStore = inject(UserStore);
  private router = inject(Router);
  protected ipApi: Signal<IpApi | undefined> = this.userStore.ipApi;
  protected ipApiStatus: Signal<ResourceStatus> = this.userStore.ipApiStatus;
  protected user = this.userStore.user;

  public logout() {
    this.userStore.logout();
    this.router.navigate(["/"]);
  }
}
