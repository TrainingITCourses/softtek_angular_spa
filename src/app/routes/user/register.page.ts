import { Component, inject, Signal } from "@angular/core";
import { RegisterDto } from "./register-dto.type";
import { RegisterForm } from "./register.form";
import { RegisterStoreService } from "./register.service";

@Component({
  imports: [RegisterForm],
  template: `
    <app-register-form (submit)="register($event)" />

    <pre>
      {{ userSignal() }}
      {{ errorSignal() }}
    </pre
    >
  `,
  styles: ``,
})
export default class RegisterPage {
  private registerStore = inject(RegisterStoreService);

  protected userSignal: Signal<string | undefined> =
    this.registerStore.userSignal;
  protected errorSignal: Signal<string | undefined> =
    this.registerStore.errorSignal;

  public register(registerDto: RegisterDto) {
    this.registerStore.register(registerDto);
  }
}
