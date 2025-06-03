import { JsonPipe } from "@angular/common";
import { Component, inject, input } from "@angular/core";
import { Router } from "@angular/router";
import { PageComponent } from "../../../shared/page.component";
import { UserStore } from "./user.store";

@Component({
  imports: [PageComponent, JsonPipe],
  template: `
    <app-page title="User">
      <h1>User: {{ userId() }}</h1>
      @if (user()) {
        <h2>User: {{ user() | json }}</h2>
      } @else {
        <h2>User not found</h2>
      }
      <button (click)="logout()">Log out</button>
    </app-page>
  `,
})
export default class UserPage {
  public userId = input<string>();
  private userStore = inject(UserStore);
  private router = inject(Router);
  protected user = this.userStore.user;
  public logout() {
    this.userStore.logout();
    this.router.navigate(["/"]);
  }
}
