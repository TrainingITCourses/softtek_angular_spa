import { Component, output, OutputEmitterRef } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FormErrorsComponent } from "../../shared/form-errors.component";
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
          type="text"
          [attr.aria-invalid]="isInvalid('password')"
        />
        <label for="password2">Repeat Password</label>
        <input
          id="password2"
          formControlName="password2"
          type="text"
          [attr.aria-invalid]="isInvalid('password2')"
        />
      </fieldset>
      <button type="button" (click)="onSubmit()">Register</button>
      <app-form-errors [form]="form" />
    </form>
  `,
})
export class RegisterForm {
  public submit: OutputEmitterRef<RegisterDto> = output<RegisterDto>();

  protected form = new FormGroup(
    {
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("pete@fake.com", [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        passwordValidator,
      ]),
      password2: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
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

  protected onSubmit() {
    console.log(this.form.value);
    //this.submit.emit(defaultRegisterDto);
  }
}
