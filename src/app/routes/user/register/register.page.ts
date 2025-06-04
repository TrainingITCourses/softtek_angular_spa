import { Component, effect, inject, Signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { PageComponent } from "../../../shared/page.component";
import { RegisterDto } from "./register-dto.type";
import { RegisterForm } from "./register.form";
import { RegisterStoreService } from "./register.service";
@Component({
  imports: [RegisterForm, PageComponent, RouterLink],
  template: `
    <app-page title="Register your account">
      <app-register-form (register)="onRegister($event)" />
      <footer>
        @if (error()) {
          <p>{{ error() }}</p>
        }
        <a routerLink="/user/login"
          >Go to login if you already have an account</a
        >
      </footer>
    </app-page>
  `,
})
export default class RegisterPage {
  private registerStore = inject(RegisterStoreService);
  private router = inject(Router);
  protected error: Signal<string | undefined> = this.registerStore.error;

  private userToken = this.registerStore.userToken;

  private onUserTokenEffect = effect(() => {
    const userToken = this.userToken();
    if (userToken) {
      this.router.navigate(["/", "user", userToken.user]);
    }
  });

  public onRegister(registerDto: RegisterDto): void {
    this.registerStore.register(registerDto);
  }
}
