import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function containsDigit(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && /\d/.test(value)) {
        return null; //Success return
    }
    else {
        return { noDigit: true }; //Error return
    }
  };
}