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
