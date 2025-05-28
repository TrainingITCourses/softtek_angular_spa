import { Component, effect, inject, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { RegisterDto } from "./register-dto.type";
import { RegisterForm } from "./register.form";
import { RegisterStoreService } from "./register.service";

@Component({
  imports: [RegisterForm],
  template: `
    <app-register-form (submit)="register($event)" />

    <pre>
      {{ user() }}
      {{ error() }}
    </pre
    >
  `,
  styles: ``,
})
export default class RegisterPage {
  private registerStore = inject(RegisterStoreService);
  private router = inject(Router);
  protected user: Signal<string | undefined> = this.registerStore.user;
  protected error: Signal<string | undefined> = this.registerStore.error;

  private onUserEffect = effect(() => {
    const user = this.user();
    if (!user) return;
    this.router.navigate(["user", user]);
  });

  public register(registerDto: RegisterDto) {
    this.registerStore.register(registerDto);
  }
}
