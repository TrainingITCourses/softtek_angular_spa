import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Custom validator to check if a password has a digit and a letter.
 * @param control The control to validate.
 * @returns A ValidationErrors object with the `password` property if validation fails, otherwise null.
 */
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

/**
 * Custom validator to check if two fields in a FormGroup have the same value.
 * @param controlName The name of the first control to compare.
 * @param matchingControlName The name of the second control to compare.
 * @returns A ValidatorFn that returns an error map with `mustMatch: true` if validation fails, otherwise null.
 */
export function mustMatchValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    const error = { mustMatch: "Values  of the controls must match" };

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors(error);
      return error;
    }
    matchingControl.setErrors(null);
    return null;
  };
}
