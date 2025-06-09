import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function containsNonAlphanumeric(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && /[^a-zA-Z0-9]/.test(value)) {
        return null; //Success return
    }
    else {
        return { nonAlphaNumeric: true }; //Error return
    }
  };
}