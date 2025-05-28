import { AbstractControl, ValidationErrors } from "@angular/forms";

export const passwordValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.value;
  const hasDigit = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  if (hasDigit && hasLetter) {
    return null;
  }
  return {
    password: "Password must have a digit and a letter",
  };
};

export function mustMatchValidator(
  controlName: string,
  matchingControlName: string
) {
  const validationFn = (form: AbstractControl): ValidationErrors | null => {
    const control = form.get(controlName);
    const matchingControl = form.get(matchingControlName);
    if (!control || !matchingControl) return null;
    if (control.value === matchingControl.value) return null;
    const error = {
      mustMatch: `Values of the ${controlName} and ${matchingControlName} must much`,
    };
    matchingControl.setErrors(error);
    return error;
  };
  return validationFn;
}
