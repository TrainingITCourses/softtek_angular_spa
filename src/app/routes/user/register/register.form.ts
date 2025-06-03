import { Component, output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FormErrorsComponent } from "../../../shared/form-errors.component";
import { mustMatchValidator, passwordValidator } from "./password.validator";
import { RegisterDto } from "./register-dto.type";

@Component({
  selector: "app-register-form",
  imports: [ReactiveFormsModule, FormErrorsComponent],
  template: `
    <form [formGroup]="form">
      <fieldset>
        <label for="name">Name</label>
        <input
          id="name"
          formControlName="name"
          [attr.aria-invalid]="isInvalid('name')"
        />
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
          name="password"
          [attr.aria-invalid]="isInvalid('password')"
        />
        <label for="password2">Repeat Password</label>
        <input
          id="password2"
          formControlName="password2"
          type="password"
          name="password2"
          [attr.aria-invalid]="isInvalid('password2')"
        />
        <span>Accept the terms and conditions</span>
        <input
          id="terms"
          type="checkbox"
          formControlName="terms"
          [attr.aria-invalid]="form.controls['terms'].invalid"
        />
      </fieldset>
      <button type="submit" [disabled]="form.invalid" (click)="onSubmit()">
        Register
      </button>
      <button type="reset" class="secondary outline" (click)="onReset()">
        Reset
      </button>
      <app-form-errors [form]="form" />
    </form>
  `,
})
export class RegisterForm {
  public submit = output<RegisterDto>();
  protected form = new FormGroup(
    {
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        passwordValidator,
      ]),
      password2: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    },
    {
      validators: [mustMatchValidator("password", "password2")],
    }
  );

  protected isInvalid(controlName: string): boolean | undefined {
    const control = this.form.get(controlName);
    if (!control) return undefined;
    if (control.pristine) return undefined;
    return control.invalid;
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const body: RegisterDto = {
      name: this.form.value.name ?? "",
      email: this.form.value.email ?? "",
      password: this.form.value.password ?? "",
    };
    this.submit.emit(body);
  }

  protected onReset(): void {
    this.form.reset();
  }
}
