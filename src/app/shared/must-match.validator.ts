import { AbstractControl, ValidationErrors } from "@angular/forms";

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
