import { Component, effect, inject, input, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalStore } from "../../../shared/global/global.store";
import { LogService } from "../../../shared/log/log.service";
import { PageComponent } from "../../../shared/page.component";

@Component({
  selector: "app-user",
  imports: [PageComponent],
  template: `
    <app-page [title]="userId()">
      <p>User data to be loaded...</p>
      <button (click)="onLogoutClick()">Log out</button>
    </app-page>
  `,
  styles: ``,
})
export default class UserPage {
  public userId = input.required<string>();
  private log = inject(LogService);
  private globalStore = inject(GlobalStore);
  private router = inject(Router);
  protected user: Signal<string | undefined> = this.globalStore.user;
  constructor() {
    this.log.warn("HELLO");
  }

  private userIdEffect = effect(() => {
    this.log.warn(`Logged user: ${this.userId()}`);
  });

  private onUserEffect = effect(() => {
    const user = this.user();
    if (user) return;
    this.router.navigate(["user", `register`]);
  });

  protected onLogoutClick() {
    this.globalStore.changeUserToken({
      user: undefined,
      token: undefined,
    });
    // this.router.navigate(["user", `register`]);
  }
}
