import { Component, effect, inject, Signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { PageComponent } from "../../../shared/page.component";
import { LoginDto } from "./login-dto.type";
import { LoginForm } from "./login.form";
import { LoginStoreService } from "./login.service";

@Component({
  imports: [LoginForm, PageComponent, RouterLink],
  template: `
    <app-page title="Login to your account">
      <app-login-form (login)="onLogin($event)" />
      <footer>
        @if (error()) {
          <p>{{ error() }}</p>
        }
        <a routerLink="/user/register"
          >Go to register if you don't have an account</a
        >
      </footer>
    </app-page>
  `,
})
export default class LoginPage {
  private loginStore = inject(LoginStoreService);
  private router = inject(Router);
  protected error: Signal<string | undefined> = this.loginStore.error;

  private userToken = this.loginStore.userToken;

  private onUserTokenEffect = effect(() => {
    const userToken = this.userToken();
    if (userToken) {
      this.router.navigate(["/", "user", userToken.user]);
    }
  });

  public onLogin(loginDto: LoginDto): void {
    this.loginStore.login(loginDto);
  }
}
