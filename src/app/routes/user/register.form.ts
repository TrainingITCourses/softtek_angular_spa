import { Component, output, OutputEmitterRef } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RegisterDto } from "./register-dto.type";

@Component({
  selector: "app-register-form",
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <fieldset>
        <label for="name">Name</label>
        <input
          id="name"
          formControlName="name"
          [attr.aria-invalid]="form.controls['name'].invalid"
        />
        <label for="email">Email</label>
        <input
          id="email"
          formControlName="email"
          type="email"
          aria-invalid="false"
        />
      </fieldset>
      <button type="button" (click)="onSubmit()">Register</button>
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
      password: new FormControl("password", [
        Validators.required,
        Validators.minLength(4),
        //passwordValidator,
      ]),
      password2: new FormControl("password", [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    {
      validators: [
        //mustMatchValidator("password", "password2")
      ],
    }
  );

  protected onSubmit() {
    console.log(this.form.value);
    //this.submit.emit(defaultRegisterDto);
  }
}
