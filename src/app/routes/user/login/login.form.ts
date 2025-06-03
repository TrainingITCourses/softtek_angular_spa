import { Component, output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FormErrorsComponent } from "../../../shared/form-errors.component";
import { LoginDto } from "./login-dto.type";

@Component({
  selector: "app-login-form",
  imports: [ReactiveFormsModule, FormErrorsComponent],
  template: `
    <form [formGroup]="form">
      <fieldset>
        <label for="email">Email</label>
        <input
          id="email"
          formControlName="email"
          type="email"
          [attr.aria-invalid]="isInvalid('email')"
        />
        <label for="password">Password</label>
        <input
          id="password"
          formControlName="password"
          type="password"
          [attr.aria-invalid]="isInvalid('password')"
        />
      </fieldset>
      <button [disabled]="form.invalid" (click)="onLoginClick()">Login</button>
      <button type="reset" class="secondary outline" (click)="onReset()">
        Reset
      </button>
      <app-form-errors [form]="form" />
    </form>
  `,
})
export class LoginForm {
  public login = output<LoginDto>();
  protected form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  protected isInvalid(controlName: string): boolean | undefined {
    const control = this.form.get(controlName);
    if (!control) return undefined;
    if (control.pristine) return undefined;
    return control.invalid;
  }

  protected onLoginClick(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const body: LoginDto = {
      email: this.form.value.email ?? "",
      password: this.form.value.password ?? "",
    };
    this.login.emit(body);
  }

  protected onReset(): void {
    this.form.reset();
  }
}
