import { Component, effect, inject, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { RegisterDto } from "./register-dto.type";
import { RegisterForm } from "./register.form";
import { RegisterStoreService } from "./register.service";
@Component({
  imports: [RegisterForm],
  template: `
    <app-register-form (submit)="register($event)" />
    @if (error()) {
      <p>{{ error() }}</p>
    }
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

  public register(registerDto: RegisterDto): void {
    this.registerStore.register(registerDto);
  }
}
